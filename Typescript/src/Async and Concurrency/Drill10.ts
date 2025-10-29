// Typing Async APIs
type ApiResponse<T> = { status: number; data: T };

async function typedFetch<T>(url: string): Promise<T> {
  const res = await fetch(url);
  return res.json() as Promise<T>;
}
