import puppeteer from "puppeteer";
let launching;
let browser;
let contextPool = [];
export {contextPool}
// launch new browser
async function launch_browser() {
  try {
    const browser = await puppeteer.launch({
      /*executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",*/
     // headless: false,
    });
    
    console.log("Launching new browser...");
    return browser;
  } catch (error) {
    return null;
  }
}

// get browser
export async function getBrowser() {
  if (browser && browser.isConnected()) {
    return browser;
  }
  if (!launching) {
    launching = true;
    browser = await launch_browser();
    if (!browser) {
      contextPool = [];
    }
    launching = false;
  }

  browser.on("disconnected", async () => {
    console.log("Browser disconnected!");
    browser = null;
    contextPool = [];
  });
  return browser;
}
