//Retries with Backoff
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function retry<T>(
  op: () => Promise<T>,
  attempts = 2,
  backoffMs = 250
): Promise<T> {
  let lastError: any;
  for (let i = 0; i < attempts; i++) {
    try {
      return await op();
    } catch (err: any) {
      lastError = err;
      if (!err.retryable) throw err;
      await sleep(backoffMs);
    }
  }
  throw lastError;
}
