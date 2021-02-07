import { ObjectId } from "bson";
import { Collection, Db } from "mongodb";
import { ResetRequest } from "../types/reset-request.types";

class ResetRequestDAO {

    /**
     * @public
     * @static
     * @async
     * @param { Db } db
     */
    public static async injectDB(db: Db): Promise<Collection> {
        if (ResetRequestDAO.initialised) {
            return ResetRequestDAO.collection;
        }
        ResetRequestDAO.collection = db.collection("ResetRequest");
        ResetRequestDAO.initialised = true;
        return ResetRequestDAO.collection;
    }

    public static async create(request: Omit<ResetRequest, "_id">) {
        const result = await ResetRequestDAO.collection.insertOne(request);
        return result.insertedId;
    }

    public static async get(requestId: ObjectId): Promise<ResetRequest> {
        const result = await ResetRequestDAO.collection.findOne({ _id: requestId });
        return result;
    }

    private static initialised = false;
    private static collection: Collection;

}

export default ResetRequestDAO;
