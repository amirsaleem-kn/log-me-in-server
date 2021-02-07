/**
 * This middleware authenticates private routes
 */

import { NextFunction, Request, Response } from "express";
import UnauthorizedRequestException from "../etc/exception/UnauthorisedException";

/**
 * @param { Express.Request } req Request
 * @param { Express.Response } res Response
 * @param { Express.NextFunction } next NextFunction
 */

export default function PrivateAuthenticate(req: Request, res: Response, next: NextFunction) {
    try {
        if (req.method === "OPTIONS") {
            return next();
        }
        const apiKey = req.get("x-api-key");
        /** compare the username and password with that of a server  */
        if (apiKey !== process.env.APIKEY) {
            throw new UnauthorizedRequestException(`User is unauthorised to request this route`);
        }
        /** user is authorised */
        next();
    } catch (e) {
        /** user is unauthorised  */
        next(new UnauthorizedRequestException(`User is unauthorised to request this route`));
    }
}
