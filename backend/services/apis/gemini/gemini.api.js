import getContext from "./context.js";
import getPrompt from "./prompt.js";
const response = (success, error, message, data = null) => {
  return {
    success,
    error,
    message,
    data,
  };
};
// sleep function
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));




// waits for complete response
async function checkResStatus(page) {
  while (true) {
    try {
      // search ele
      const search_button = await page.waitForSelector(
        `button[aria-label="Send message"]`,
      );
      console.log("response completed");
      return response(true, null, "successfullly checked status");
    } catch (error) {
      console.error(error);
    }
  }
  return response(false, error, "failed to check status");
}
// type in input field
async function type_in_input(page, prompt) {
   let failed = false
    let i = 0
   while(i<4){
    
     try {
      if(failed===true){ await sleep(2000)
console.log("failed to type sleep for 2sec",i);
      }
       // Query for getting input field
       await page.$eval(
         'rich-textarea div[role="textbox"] p',
         (el, value) => {
           el.textContent = value;
         },
         prompt,
       );
       return response(true, null, "successfuly typed in input field");
     } catch (error) {
      i++
      failed = true
       console.error("failed to typed in input field", error);
      
     }
}
 return response(false, null, "failed to typed in input field");
}
// sends message or click on send button
async function send_message(page) {
  try {
    // Query for getting send message button
    const send_button = await page.waitForSelector(
      `button[aria-label="Send message"]`,
    );
    await send_button.click();

    return response(true, null, "successfuly sended message");
  } catch (error) {
    console.error(error);
    return response(false, error, "failed send message");
  }
}
// get response from gemini
async function get_response(page) {
  let i =0
  let isFailed=false
  while (i<4)
 { try {
  if(isFailed){
    await sleep(2000)
    console.log("failed to get res sleeped 2 sec",i)
  }
    // Query for getting send message button
    let texts = await page.$$eval("message-content div p ", (ps) => {
      console.log(ps.innerHTML);
      return ps.map((p) => p.textContent);
    });

     
    if (!texts || texts.length===0) {
     isFailed= true
     i++
    }else{
 return response(true, null, "successfuly got response", texts[0]);
    }
   
  } catch (error) {
    console.error(error);
     isFailed = true;
    i++
  //  return response(false, error, "failed to get response");
  }}
  return response(false, null, "failed to get response");
}
/**
 * Cleans and parses the double-encoded JSON string.
 * @param {string} rawResponse - The raw output from your scraper.
 * @returns {object|null} - A clean Javascript object or null if invalid.
 */
 function JsonParser(input) {
   try {
     // Case 1: already object
     if (typeof input === "object") return input;

     let str = String(input).trim();

     let list = str.split("");
     if (list[0] === "`") {
       delete list[0];
     }
     if (list[list.length - 1] === "`") {
       delete list[list.length - 1];
     }
     const json = list.join("");
     console.log(json);
     // Case 3: try direct parse
     try {
       return JSON.parse(json);
     } catch (err1) {
       // Case 4: handle double stringified JSON
       const onceParsed = JSON.parse(JSON.stringify(json));
       return JSON.parse(onceParsed);
     }
   } catch (err) {
     return {
       error: "Invalid JSON response",
       raw: input,
     };
   }
 }
async function gemini(userInp) {
  console.log(
    "------------------------------------------------------------------",
  );
  const context = await getContext();
  if (!context) return null;
  // creating new page or tab
  const page = await context.newPage();
  // Navigate the page to a URL.
  await page.goto("https://gemini.google.com/app");
  // getting prompt
  const prompt = getPrompt(userInp);
  // type message
  await type_in_input(page, prompt);
  // send message
  await send_message(page);
  // waiting for complete response
  const completed = await checkResStatus(page);
  if (completed.success) {
    const res = await get_response(page);
    if (!res.success) {
      // closin context
      await page.close();
      return response(false, null, "failed to get data from gemini");
    }

    /*const cleanRes = res.data.replace(/```json/g, "")
       .replace(/```/g, "")
       .trim();
           console.log(cleanRes);*/
    //const data = JSON.parse(cleanRes);
  
    const data = JsonParser(res.data);
  console.log(data);
    // closin context
    await page.close();
    return response(
      true,
      null,
      "successfuly got data from gemini",
      data ? data.userdata : data,
    );
  } else {
    // closin context
    await page.close();
    return response(false, null, "failed to get data from gemini");
  }
}
export default gemini;
