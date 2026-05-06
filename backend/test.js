let output = `{"userdata": {"title": {"data": "Stop Learning Web Dev the Wrong Way: 2026 Future-Proof Roadmap"}, "description": {"data": "Are you tired of following outdated coding tutorials that lead nowhere? This is the only web development roadmap you need to stay ahead of the curve and become future-proof in 2026. In this video, we dive deep into the exact steps you need to take, starting from the fundamentals to mastering the MERN stack and transitioning into Next.js for high-performance applications. We break down every single part in detail so you know exactly what to do at every stage of your journey. Whether you are a total beginner or looking to upgrade your skills, this guide ensures you are learning the right tools for the modern market. Stop wasting time on dead-end tech and start building your career today. Don't forget to subscribe for more industry-leading dev content and drop a comment if you're ready to start! #webdevelopment #mernstack #nextjs #codingroadmap #javascript"}, "tags": {"data": ["web development roadmap 2026", "mern stack tutorial", "nextjs for beginners", "full stack developer path", "future proof coding skills", "learn web dev from scratch", "modern web development", "software engineer career"]}, "thumbnailDescription": {"data": "A high-quality, professional YouTube thumbnail featuring a split-screen layout. On the left side, a stressed developer looking at 'OUTDATED 2020' text in red. On the right side, a confident developer looking at 'FUTURE-PROOF 2026' text in vibrant neon green. Center text: 'THE ONLY ROADMAP YOU NEED' in bold, white, 3D sans-serif font with a slight outer glow. Icons for MongoDB, Express, React, Node.js, and Next.js floating subtly in the background with a dark, sleek tech aesthetic. High contrast, sharp details, and cinematic lighting."}}}`;

function safeJsonParse(input) {
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
    const json= list.join('')
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
let final = safeJsonParse(output);
console.log(final);
