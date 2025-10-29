// 1️⃣ wait helper function
function wait<T>(ms: number, value?: T): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(value as T), ms));
}

// 2️⃣ RetryOptions type
type RetryOptions = {
  attempts: number;
  backoffMs: number;
};

// 3️⃣ HttpClientOptions type
type HttpClientOptions = {
  baseURL?: string;
  concurrency?: number;
  timeoutMs?: number;
  retry?: RetryOptions;
};

// 4️⃣ Simple Semaphore class
class Semaphore {
  private slots: number;
  private queue: (() => void)[] = [];

  constructor(limit: number) {
    this.slots = limit;
  }

  async acquire() {
    if (this.slots > 0) {
      this.slots--;
      return;
    }
    await new Promise<void>(resolve => this.queue.push(resolve));
    this.slots--;
  }

  release() {
    this.slots++;
    if (this.queue.length > 0) {
      const next = this.queue.shift();
      if (next) next();
    }
  }
}

// 5️⃣ Now your HttpClient class (same as your code)
class HttpClient {
  private baseURL: string;
  private semaphore: Semaphore;
  private timeoutMs: number;
  private retry: RetryOptions;
  private closed = false;

  constructor(options: HttpClientOptions = {}) {
    this.baseURL = options.baseURL || "";
    this.semaphore = new Semaphore(options.concurrency || 4);
    this.timeoutMs = options.timeoutMs || 5000;
    this.retry = options.retry || { attempts: 2, backoffMs: 250 };
  }

  private async request<T>(
    method: "GET" | "POST",
    path: string,
    body?: unknown,
    signal?: AbortSignal
  ): Promise<T> {
    await this.semaphore.acquire();

    if (this.closed) {
      this.semaphore.release();
      throw new Error("HttpClient disposed");
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);
    const finalSignal = signal || controller.signal;

    let attempts = 0;
    while (true) {
      try {
        attempts++;
        const res = await fetch(this.baseURL + path, {
          method,
          body: body !== undefined ? JSON.stringify(body) : null,
          headers: { "Content-Type": "application/json" },
          signal: finalSignal,
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        clearTimeout(timeoutId);
        this.semaphore.release();
        return data as T;
      } catch (err: any) {
        if (err.name === "AbortError" || attempts > this.retry.attempts) {
          clearTimeout(timeoutId);
          this.semaphore.release();
          throw err;
        }
        await wait(this.retry.backoffMs, null);
      }
    }
  }

  get<T>(path: string, opts?: { signal?: AbortSignal }): Promise<T> {
    return this.request<T>("GET", path, undefined, opts?.signal);
  }

  post<T>(path: string, body: unknown, opts?: { signal?: AbortSignal }): Promise<T> {
    return this.request<T>("POST", path, body, opts?.signal);
  }

  async dispose() {
    this.closed = true;
  }
}
