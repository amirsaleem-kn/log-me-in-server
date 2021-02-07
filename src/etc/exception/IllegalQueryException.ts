import Exception from "./Exception";
import { Exceptions } from "./types";

/**
 * @class IllegalQueryException
 * @extends Error
 * An exception class which defines any error that has occurred
 * due to the violation of database query feature. Violations such as
 * illegal use of a resourceId, or querying a non assigned resource etc.
 * comes under IllegalQueryExceptions. IllegalQueryExceptions must resolve with
 * 422 Http Statuc code which means unprocessable entity
 */

export default class IllegalQueryException extends Exception {
    constructor(params: any) {
        super(params, Exceptions.IllegalQueryException.code, Exceptions.IllegalQueryException.name);
    }
}
