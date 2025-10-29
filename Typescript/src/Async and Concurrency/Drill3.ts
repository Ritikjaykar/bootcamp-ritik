//Sequential vs Parallel
async function sequential() {
  const start = Date.now();
  const first = await fetchUser("1");
  const second = await fetchUser("2");
  const end = Date.now();
  console.log(first, second);
  console.log("Time Taken:", end - start); // ~2s
}

async function parallel() {
  const start = Date.now();
  const [first, second] = await Promise.all([fetchUser("1"), fetchUser("2")]);
  const end = Date.now();
  console.log(first, second);
  console.log("Time Taken:", end - start); // ~1s
}
