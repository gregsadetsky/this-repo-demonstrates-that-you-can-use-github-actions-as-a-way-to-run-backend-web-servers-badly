import mainApp from "./app.js";
import request from "supertest";
import core from "@actions/core";

const incomingRequest = core.getInput("incomingRequest");
console.log(
  "incomingRequest",
  incomingRequest,
  "incomingRequest.length",
  incomingRequest.length,
);

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
