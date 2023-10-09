import mainApp from "./app.js";
import request from "supertest";

// read env var 'GITHUB_CONTEXT' and un-json decode it
const githubContext = JSON.parse(process.env.GITHUB_CONTEXT);
const incomingRequest = githubContext.event.inputs.incomingRequest;
console.log("incomingRequest", incomingRequest);

const response = await request(mainApp).get("/").expect(200);

await fetch("https://en46p0h73hv41.x.pipedream.net", {
  method: "POST",
  body: JSON.stringify({
    body: response.text,
    headers: response.headers,
  }),
})
  .then((res) => res.json())
  .then((json) => console.log("json", json))
  .catch((err) => console.log("error", err));
