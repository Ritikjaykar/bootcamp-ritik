
//1
const fs = require('fs');

const readStream = fs.createReadStream('file.txt', { encoding: 'utf-8' });

console.log(' Readable stream created.');

//2
readStream.on('data', (chunk) => {
    console.log('Chunk received:', chunk);
    console.log('Chunk length:', chunk.length);
  });
  
  //3
  let chunkCount = 0;

readStream.on('data', (chunk) => {
  chunkCount++;
});

readStream.on('end', () => {
  console.log('Done reading.');
  console.log('Total chunks:', chunkCount);
});

//5
readStream.on('error', (err) => {
    console.error(' Error reading file:', err.message);
  });
  