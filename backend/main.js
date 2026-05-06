import express from "express";
import router from "./routes/main.routes.js";
import {handleResponse} from "#/middleware/response.js"

async function mainController(app) {
  // using json
  app.use(express.json());
  // handling response
  app.use(handleResponse);
  // all routers
  app.use(router);
}

export default mainController;
