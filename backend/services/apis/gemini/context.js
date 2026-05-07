import { getBrowser, contextPool } from "#/puppeteer/index.js";
import { v4 as uuidv4 } from "uuid";

let contextID;
async function getContext() {
  // finding context in context pool
  const context_data = contextPool.find((data) => {
    if (data.contextID === contextID) return true;
  });
  if (context_data) {
    const context = context_data.context;
     if (context) return context;
  }
  // getting browser
  const browser = await getBrowser();
  if (!browser){ return null;
    console.error("Failed to get browser");
  }
  //  creating a new context window
  const newContext = await browser.createBrowserContext();
  // Generate a new context id
  let id = uuidv4();
  contextPool.push({ contextID: id, context: newContext });
  contextID = id;
  return newContext;
}
export default getContext;
