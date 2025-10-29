const { writeFile, appendFile, readFile, unlink, access, constants } = require('fs/promises');

// 1
async function createFile() {
  await writeFile('example.txt', 'Hello, Node.js');
  console.log(' File created and written.');
}

// 2
async function appendToFile() {
  await appendFile('example.txt', '\nAppended line: Learning Node.js');
  console.log(' Line appended.');
}

// 3
async function readFileContent() {
  const data = await readFile('example.txt', 'utf-8');
  console.log(' File contents:\n', data);
}

// 4
// async function deleteFile() {
//   await unlink('example.txt');
//   console.log(' File deleted.');
// }

// 5
async function safeReadFile() {
  try {
    await access('example.txt', constants.F_OK);
    const content = await readFile('example.txt', 'utf-8');
    console.log(' Safe read:\n', content);
  } catch (err) {
    console.log('File not found.');
  }
}


(async () => {
  await createFile();
  await appendToFile();
  await readFileContent();
  await safeReadFile();
  // await deleteFile();
})();
