/**
 * This file contains BadRequestException class implementation
 */

import Exception from "./Exception";
import { Exceptions } from "./types";

/**
 * @class BadRequestException
 * @extends Error
 * An exception class which defines any error that is due to the
 * BadRequest from the client, Bad Request must resolve with a 400
 * Http Status Code. Bad Request means the payload sent in the request
 * by the client is not properly formed, and is missing the syntax defines in
 * the resource model definition
 */

export default class BadRequestException extends Exception {
    public code: number = null;
    constructor(params: any) {
        super(params, Exceptions.BadRequestException.code, Exceptions.BadRequestException.name);
    }
}
