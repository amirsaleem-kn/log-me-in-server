/**
 * This Middleware logs incoming requests
 */

import { NextFunction, Request, Response } from "express";
import Logger from "../etc/logger";

export default function RequestLogger(req: Request, res: Response, next: NextFunction) {
    Logger.info((new Date()).toLocaleString(), req.method, req.originalUrl);
    next();
}
