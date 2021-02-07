/**
 * This file contains DuplicateResourceException class implementation
 */

import Exception from "./Exception";
import { Exceptions } from "./types";

/**
 * @class DuplicateResourceException
 * @extends Error
 * An exception class which defines any error that has occurred
 * due to the creation of an already existing resource in the data source.
 * Duplicate Resource Creation should resolve with 409 Http Status Code
 * which means conflict
 */

export default class DuplicateResourceException extends Exception {
    constructor(params: any) {
        super(params, Exceptions.IllegalQueryException.code, Exceptions.IllegalQueryException.name);
    }
}
