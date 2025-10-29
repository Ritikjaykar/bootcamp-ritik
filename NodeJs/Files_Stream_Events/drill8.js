//1
const fs = require('fs');

const watcher = fs.watch('watch.txt', (eventType, filename) => {
  console.log(`File changed: ${filename}, event: ${eventType}`);
});

console.log(' Watching watch.txt for changes...');

//2
const watcher2 = fs.watch('watch.txt');

watcher2.on('change', (eventType, filename) => {
  console.log(`Modified: ${filename}`);
});


//3
watcher.on('change', (eventType, filename) => {
    if (eventType === 'rename') {
      console.log(`File renamed or deleted: ${filename}`);
    } else if (eventType === 'change') {
      console.log(`Modified: ${filename}`);
    }
  });
  

  //4
  let timeout;
watcher.on('change', (eventType, filename) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    console.log(`Debounced event: ${eventType} on ${filename}`);
  }, 300); 
});

//5
setTimeout(() => {
    watcher.close();
    console.log(' Stopped watching watch.txt');
  }, 10000); 
  
