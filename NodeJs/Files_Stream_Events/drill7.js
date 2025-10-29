const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// 1️ Single listener
myEmitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});

// 2️ Multiple listeners
myEmitter.on('greet', (name) => {
  console.log(`Welcome, ${name}!`);
});

// Emit 'greet'
myEmitter.emit('greet', 'Ritik');

// 3️ Removing a listener
function byeListener(name) {
  console.log(`Goodbye, ${name}!`);
}

myEmitter.on('farewell', byeListener);
myEmitter.emit('farewell', 'Ritik'); 

myEmitter.removeListener('farewell', byeListener);
myEmitter.emit('farewell', 'Ritik'); 
