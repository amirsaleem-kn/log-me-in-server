/**
 * MongoDb Entry File
 */

import mongodb from "mongodb";
import ResetRequest from "../../dao/reset-request.dao";
/** DAO  */
import User from "../../dao/user.dao";
/** Logger */
import Logger from "../logger";

/** create a new mongoDb client  */
const client = mongodb.MongoClient.connect;
/** create a connect function for MongoDb client  */
async function connect() {
    const connection = (await client(process.env.BLINDS_DB_URI, { useUnifiedTopology: true })).db(process.env.BLINDS_NS);
    Logger.info("MongoDB Connection Successfull");
    await User.injectDB(connection); // User collection
    await ResetRequest.injectDB(connection); // ResetRequest collection
    return connection;
}

export default connect;
