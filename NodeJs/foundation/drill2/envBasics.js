const dotenv = require("dotenv");
// dotenv.config();

// console.log("API_KEY:", process.env.API_KEY);
// console.log("DB_URL:", process.env.DB_URL);


// override the API_KEY
// API_KEY=123 node envBasics.js


// dotenv.config();

// const PORT = process.env.PORT || 3000;
// console.log("PORT:", PORT);


//Implement fallback defaults if a variable is missing

// function requireEnv(name) {
//     const value = process.env[name];
//     if (!value) {
//       throw new Error(`Missing required environment variable: ${name}`);
//     }
//     return value;
//   }
  
//   try {
//     const apiKey = requireEnv("API_KEY");
//     console.log("API_KEY:", apiKey);
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1); // exit with failure
//   }


  //5.Write a function requireEnv(name) that throws if not defined
dotenv.config();

// Function to ensure required environment variables exist
function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

try {
  const API_KEY = requireEnv("API_KEY");
  const DB_URL = requireEnv("DB_URL");
  console.log(" Loaded API_KEY:", API_KEY);
  console.log(" Loaded DB_URL:", DB_URL);
} catch (error) {
  console.error("Error", error.message);
  process.exit(1); // exit with error code
}

  