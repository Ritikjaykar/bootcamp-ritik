const { writeFile, readFile } = require('fs/promises');


//1
async function writeJSON() {
  const user = {
    name: "Ritik Jaykar",
    role: "Backend Developer",
    skills: ["Node.js", "Express", "MongoDB"],
    active: true
  };

  try {
    await writeFile('user.json', JSON.stringify(user));
    console.log(' JSON written to file.');
  } catch (err) {
    console.error(' Error writing JSON:', err.message);
  }
}

//2
async function readJSON() {
  try {
    const data = await readFile('user.json', 'utf-8');
    const obj = JSON.parse(data);
    console.log(' Parsed JSON object:', obj);
  } catch (err) {
    console.error(' Error reading or parsing JSON:', err.message);
  }
}

//3
async function safeReadJSON() {
  try {
    const data = await readFile('user.json', 'utf-8');
    const obj = JSON.parse(data);
    console.log(' JSON valid:', obj);
  } catch (err) {
    console.error(' Invalid JSON or file error:', err.message);
  }
}

//4
async function loadJSONSafe(filePath, defaults = {}) {
    try {
      const data = await readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      console.log(' Using default JSON due to error:', err.message);
      return defaults;
    }
  }
  
  // Example usage:
  (async () => {
    const config = await loadJSONSafe('config.json', { theme: 'dark', language: 'en' });
    console.log(' Loaded config:', config);
  })();
  

//5
async function writePrettyJSON() {
    const data = {
      project: "Node.js Drills",
      author: "Ritik",
      date: new Date().toISOString()
    };
  
    try {
      await writeFile('pretty.json', JSON.stringify(data, null, 2));
      console.log('Pretty JSON written successfully.');
    } catch (err) {
      console.error(' Error writing pretty JSON:', err.message);
    }
  }
  



async function main() {
  await writeJSON();
  await readJSON();
  await safeReadJSON();
  await writePrettyJSON();
}

main();



  
  