import DuplicateResourceException from "../exception/DuplicateResourceException";

/**
 * Common error strings that Mongo throws
 */
const ErrorCodes = {
    DuplicateKeyError: "E11000 duplicate key error"
};

/**
 * @method to handle errors thrown by MongoDb, it dispatches the appropriate
 * Exception based on the Error Message
 */
function HandleMongoError(e: Error) {
    if (e.message.includes(ErrorCodes.DuplicateKeyError)) {
        throw new DuplicateResourceException(e);
    }
    throw e;
}

export default HandleMongoError;
