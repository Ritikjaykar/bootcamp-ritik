//1
const fs = require('fs');

const writeStream = fs.createWriteStream('log.txt', 'utf-8');

writeStream.on('finish', () => {
  console.log(' Finished writing log.txt');
});

writeStream.on('error', (err) => {
  console.error(' Error writing:', err.message);
});

//2
for (let i = 1; i <= 5; i++) {
    const ok = writeStream.write(`This is log line ${i}\n`);
    console.log(`Line ${i} written:`, ok);
  }
  
  // Close the stream
  writeStream.end(); // triggers 'finish' event
  

  //3
  function writeLogs() {
    let i = 0;
    function write() {
      let ok = true;
      while (i < 20 && ok) {
        ok = writeStream.write(`Log line ${i}\n`);
        i++;
      }
      if (i < 20) {
        // If false, wait for 'drain' event
        writeStream.once('drain', write);
      }
    }
    write();
  }
  
  writeLogs();
  writeStream.end();
  

  //4
  const bufferStream = fs.createWriteStream('binary.bin');
const buf = Buffer.from([0x01, 0x02, 0x03, 0x04, 0xff]);

bufferStream.write(buf);
bufferStream.end();

bufferStream.on('finish', () => {
  console.log(' Binary data written to binary.bin');
});
