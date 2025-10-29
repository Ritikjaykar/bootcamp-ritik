// //Concurrency Limits (Semaphore)
// class Semaphore {
//   private slots: number;
//   private queue: (() => void)[] = [];

//   constructor(limit: number) {
//     this.slots = limit;
//   }

//   async acquire() {
//     if (this.slots > 0) {
//       this.slots--;
//       return;
//     }
//     await new Promise<void>(resolve => this.queue.push(resolve));
//     this.slots--;
//   }

//   release() {
//     this.slots++;
//     if (this.queue.length > 0) {
//       const next = this.queue.shift();
//       if (next) next();
//     }
//   }
// }

// // Usage:
// async function runTasks() {
//   const semaphore = new Semaphore(2);
//   const tasks = ["A", "B", "C", "D", "E"];
//   await Promise.all(
//     tasks.map(async task => {
//       await semaphore.acquire();
//       console.log("Start:", task);
//       await sleep(1000);
//       console.log("Finish:", task);
//       semaphore.release();
//     })
//   );
// }
