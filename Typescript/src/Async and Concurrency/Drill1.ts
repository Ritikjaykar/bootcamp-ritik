//Promise<number>

const promiseNum: Promise<number> = Promise.resolve(42);

promiseNum.then(num => console.log("Resolved number:", num));

//Async function returning a promise
async function add(a: number, b: number): Promise<number> {
  return a + b;
}

add(5, 10).then(res => console.log("Sum:", res));


//Convert callback to promise

function callbackStyle(a: number, cb: (res: number) => void) {
  setTimeout(() => cb(a * 2), 1000);
}

function promiseStyle(a: number): Promise<number> {
  return new Promise(resolve => callbackStyle(a, resolve));
}

promiseStyle(5).then(console.log); // 10 after 1s

//Difference: creating vs awaiting a promise
const p = add(1, 2); // creates Promise<number>
const result = await add(1, 2); // waits for resolution
