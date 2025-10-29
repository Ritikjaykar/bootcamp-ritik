// // Synchronous error
// try {
//     throw new Error("This is a synchronous error");
//   } catch (err) {
//     console.error("Caught error:", err.message);
//   }
  
//   //Handle a rejected promise

//   // Asynchronous error
// Promise.reject(new Error("Promise was rejected"))
// .catch(err => {
//   console.error("Caught rejected promise:", err.message);
// });


// //Global uncaught exception handler
// // Catch unexpected synchronous errors
// process.on("uncaughtException", (err) => {
//     console.error("Uncaught Exception:", err.message);
//     // Optional: exit gracefully
//     process.exit(1);
//   });
  
//   // Example to trigger it
//   throw new Error("This will be caught by uncaughtException");

  
//   //Global unhandled promise rejection handler
//   process.on("unhandledRejection", (reason, promise) => {
//     console.error("Unhandled Rejection at:", promise, "reason:", reason);
//   });

  
//   //Exit gracefully
  process.on("uncaughtException", (err) => {
    console.error("Error occurred:", err.message);
    console.log("Cleaning up before exit...");
    // perform cleanup tasks here
    process.exit(1);
  });
  