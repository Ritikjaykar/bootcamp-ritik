// Error Handling Patterns

type Result<T> = { ok: true; value: T } | { ok: false; error: string };

async function safeFetch(): Promise<Result<string>> {
  try {
    const data = await mockFetch(true);
    return { ok: true, value: data };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}
