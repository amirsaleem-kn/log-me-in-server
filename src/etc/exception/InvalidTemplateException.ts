import Exception from "./Exception";
import { Exceptions } from "./types";

/**
 * @class InvalidTemplateException
 * @extends Error
 */

export default class InvalidTemplateException extends Exception {
    constructor(params: any) {
        super(params, Exceptions.InvalidTemplateException.code, Exceptions.InvalidTemplateException.name);
    }
}
