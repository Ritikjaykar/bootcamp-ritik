//Cancellation with AbortController
const controller = new AbortController();
const signal = controller.signal;

function mockFetchWithAbort(ms: number, signal: AbortSignal): Promise<string> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => resolve("Done!"), ms);
    signal.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new Error("Aborted"));
    });
  });
}

// Abort after 1s
setTimeout(() => controller.abort(), 1000);

mockFetchWithAbort(3000, signal)
  .then(res => console.log(res))
  .catch(err => console.log(err.message)); // "Aborted"
