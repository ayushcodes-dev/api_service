import puppeteer from "puppeteer";
let launching;
let failedLaunch = 0;
let browser;
let contextPool = [];
export { contextPool };
// launch new browser
async function launch_browser() {
  try {
    const browser = await puppeteer.launch({
      /*executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",*/
      // headless: false,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
    });

    console.log("Launching new browser...");
    return browser;
  } catch (error) {
    return null;
  }
}

// get browser
export async function getBrowser() {
  while (failedLaunch < 3 && !browser) {
    try {
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
      if (browser) {
        browser.on("disconnected", async () => {
          console.log("Browser disconnected!");
          browser = null;
          contextPool = [];
          return null
        });
        return browser;
      }
    } catch (error) {
      console.error("Error in getBrowser:", error);
      return null;
    }
  }
  return null
}
