
//1.
const buf1 = Buffer.from("Hello, Node.js");
console.log("Buffer:", buf1);
console.log("Buffer type:", typeof buf1);

//2.
const str = buf1.toString('utf-8');
console.log("String:", str);

//3
const buf2 = Buffer.from("Hello, Node.js");

console.log("UTF-8:", buf2.toString('utf-8'));
console.log("Base64:", buf2.toString('base64'));

//4
const buf3 = Buffer.alloc(10, 0xff);
console.log("Buffer with 0xff:", buf3);


//5
const str2 = "Hello, Node.js";
const buf4 = Buffer.from(str2);

console.log("String length:", str2.length); // characters
console.log("Buffer length:", buf4.length); // bytes
