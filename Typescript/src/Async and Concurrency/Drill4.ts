// Timeouts
function timeout<T>(p: Promise<T>, ms: number): Promise<T> {
  const timer = new Promise<T>((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), ms)
  );
  return Promise.race([p, timer]);
}

// Example:
timeout(fetchUser("1"), 500).catch(err => console.log(err.message)); // Timeout
