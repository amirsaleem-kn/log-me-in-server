/**
 * Express Application
 */

import express, { Application } from "express";
import path from "path";
/** Express.Router  */
import router from "../routes";

/** create a new express application  */
const app: Application = express();
/** parse json */
app.use(express.json({ limit: "50mb" }));
/** parse text */
app.use(express.text());
/** parse query parameters */
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 10000 }));
/** use /api for REST API routes  */
app.use("/api", router);

export default app;
