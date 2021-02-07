/**
 * This middleware handles error if next(err) is called
 */

import { NextFunction, Request, Response } from "express";
import { Exceptions } from "../etc/exception/types";
import Logger from "../etc/logger";
import ResponseHandler from "../etc/response";

/**
 * @description middleware handles Error Responses for every type of exception
 * @param { one of Error | IllegalQueryException | DuplicateResourceException |
 *  UnprocessableEntityException | BadRequestException | UnauthorizedRequestException } error an Error object
 * @param { Express.Request } req Request
 * @param { Express.Response } res Respomse
 * @param { Express.Request } next NextFunction
 */

export default function ErrorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    Logger.info(error.name);
    Logger.info(error);
    switch (error.name) {
        case Exceptions.IllegalQueryException.name:
            ResponseHandler.unprocessableEntity(res, [{ msg: error.message }]); break;
        case Exceptions.DuplicateResourceException.name:
            ResponseHandler.conflict(res, [{ msg: error.message }]); break;
        case Exceptions.UnprocessableEntityException.name:
            ResponseHandler.unprocessableEntity(res, [{ msg: error.message }]); break;
        case Exceptions.BadRequestException.name:
            ResponseHandler.badRequest(res, [...error.message]); break;
        case Exceptions.UnauthorizedRequestException.name:
            ResponseHandler.unauthorised(res); break;
        default: ResponseHandler.serverError(res, [{ msg: `An internal exception has occurred` }]);
    }
}
