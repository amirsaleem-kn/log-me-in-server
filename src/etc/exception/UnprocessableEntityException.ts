/**
 * This file contains BadRequestException class implementation
 */

import Exception from "./Exception";
import { Exceptions } from "./types";

/**
 * @class UnprocessableEntityException
 * @extends Error
 */

export default class UnprocessableEntityException extends Exception {
    public code: number = null;
    constructor(params: any) {
        super(params, Exceptions.UnprocessableEntityException.code, Exceptions.UnprocessableEntityException.name);
    }
}
