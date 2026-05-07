import 'dotenv/config';
import "module-alias/register";
import express from "express";
import dns from 'dns';
import mainController from "./main.js";


//configuring google, cloudfare dns
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1', '1.0.0.1']);

// creating app
const app = express();


// calling main controller
mainController(app);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
