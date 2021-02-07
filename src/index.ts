/**
 * Entry file for project
 */

import dotenv from "dotenv";
import app from "./app";
import connect from "./etc/db";
import Logger from "./etc/logger";

/** Boot up the application  */
(async () => {
    try {
        /** Spin up the application, load dependencies  */
        dotenv.config(); // initialise dotenv configuration
        await connect(); // initialise mongodb connection
        const _port: number = 8082;
        /** start the server on port { _port }  */
        app.listen(_port, (): void => {
            Logger.info(`server listening to port ${_port}`);
        });
    } catch (e) {
        Logger.info(e.stack);
        process.exit(1);
    }
})();
