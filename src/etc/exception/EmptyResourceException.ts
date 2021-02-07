/**
 * This file contains EmptyResourceException class implementation
 */

import Exception from "./Exception";
import { Exceptions } from "./types";

/**
 * @class EmptyResourceException
 * @extends Error
 */

export default class EmptyResourceException extends Exception {
    constructor(params: any) {
        super(params, Exceptions.EmptyResourceException.code, Exceptions.EmptyResourceException.name);
    }
}
