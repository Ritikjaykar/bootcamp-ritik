const fs = require('fs');
const readline = require('readline');
const { Transform } = require('stream');


// 1️ Transform stream for filtering

const filterTransform = (keyword) =>
  new Transform({
    transform(chunk, encoding, callback) {
      const line = chunk.toString();
      if (!keyword || line.includes(keyword)) {
        callback(null, line + '\n'); 
      } else {
        callback(); 
      }
    }
  });


// 2️ Watch log file and stream new lines

function watchLogFile(filename, keyword) {
  let fileStream = fs.createReadStream(filename, { encoding: 'utf-8', start: fs.existsSync(filename) ? fs.statSync(filename).size : 0 });

  const rl = readline.createInterface({ input: fileStream });
  const transform = filterTransform(keyword);
  transform.pipe(process.stdout);

  rl.on('line', (line) => transform.write(line));

  const watcher = fs.watch(filename, (eventType) => {
    try {
      if (eventType === 'change') {
        const stats = fs.statSync(filename);
        fileStream.close();
        fileStream = fs.createReadStream(filename, { encoding: 'utf-8', start: stats.size });
        const rlNew = readline.createInterface({ input: fileStream });
        rlNew.on('line', (line) => transform.write(line));
      } else if (eventType === 'rename') {
        console.log(` File renamed or deleted: ${filename}`);
        watcher.close();
      }
    } catch (err) {
      console.error(' Error handling file change:', err.message);
    }
  });

  return watcher;
}


// 3️ Start monitoring

const logFile = 'app.log';             
const keyword = process.argv[2];         

const watcher = watchLogFile(logFile, keyword);
console.log(` Watching ${logFile} for new lines${keyword ? ` containing "${keyword}"` : ''}...`);


// 4️ Graceful exit

process.on('SIGINT', () => {
  console.log('\n Exiting log monitor...');
  watcher.close();
  process.exit();
});
