/**
 * This middlware handles Preflight (OPTIONS) request by
 * setting up Response Headers
 */

import { NextFunction, Request, Response } from "express";

/**
 * @param { Express.Request } req Request
 * @param { Express.Response } res Response
 * @param { Express.NextFunction } next NextFunction
 */

export default function PreflightHandler(req: Request, res: Response, next: NextFunction) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
}
