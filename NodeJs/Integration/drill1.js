// 1. Import dependencies

const fetch = require("node-fetch"); // If Node < v18, install node-fetch
const AbortController = global.AbortController || require("abort-controller");


// 2. fetchJson helper with timeout

async function fetchJson(url, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    console.log(`[fetchJson] ${url} → ${response.status}`);

    // Handle non-200
    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        error: `Request failed with status ${response.status}`,
      };
    }

    // Safe JSON parse
    try {
      const data = await response.json();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: "Invalid JSON response" };
    }
  } catch (err) {
    if (err.name === "AbortError") {
      return { success: false, error: "Request timed out" };
    }
    return { success: false, error: err.message };
  }
}

// 3. Test fetchJson with a real public API

(async () => {
  console.log(" Drill 1 running...");

  const result1 = await fetchJson("https://jsonplaceholder.typicode.com/posts/1");
  console.log("Result 1:", result1);

  const result2 = await fetchJson("https://httpstat.us/404");
  console.log("Result 2:", result2);

  const result3 = await fetchJson("https://httpstat.us/200?sleep=6000", 3000);
  console.log("Result 3 (timeout):", result3);
})();
