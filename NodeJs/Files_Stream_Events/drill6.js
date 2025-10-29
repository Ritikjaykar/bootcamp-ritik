const fs = require('fs');
const { Transform } = require('stream');

// 1️ Transform stream to uppercase
const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    const upperChunk = chunk.toString().toUpperCase();
    callback(null, upperChunk);
  }
});

// 2️ Read and write streams
const readStream = fs.createReadStream('input.txt', 'utf-8');
const writeStream = fs.createWriteStream('output_upper.txt', 'utf-8');

// 3️ Pipe through transform
readStream.pipe(upperCaseTransform).pipe(writeStream);

// 4️ Events
writeStream.on('finish', () => {
  console.log(' Transformation complete! Data written to output_upper.txt');
});

readStream.on('error', (err) => console.error(' Read error:', err.message));
writeStream.on('error', (err) => console.error(' Write error:', err.message));
