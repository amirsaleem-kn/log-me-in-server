/**
 * @description This file contains DAO logic for User Collection
 */

import { ObjectId } from "bson";
import { Collection, Db } from "mongodb";
import { User } from "../types/user.types";

/**
 * @class User
 */
export default class UserDAO {

    /**
     * @public
     * @static
     * @async
     * @param { Db } db
     */
    public static async injectDB(db: Db): Promise<Collection> {
        if (UserDAO.initialised) {
            return UserDAO.collection;
        }
        UserDAO.collection = db.collection("User");
        await UserDAO.collection.createIndex({ email: 1, username: 1 }, { unique: true });
        UserDAO.initialised = true;
        return UserDAO.collection;
    }

    /**
     * @public
     * @static
     * @param { Promise<User> } User
     * @returns { Promise<any> }
     */
    public static async create(user: Omit<User, "_id">): Promise<unknown> {
        const result = await UserDAO.collection.insertOne(user);
        return result.insertedId;
    }

    /**
     * @public
     * @static
     * @param {  Partial<User> } filters
     * @returns { Promise<User> }
     */
    public static async search(filters: Partial<User>): Promise<User> {
        const result = await UserDAO.collection.findOne(filters ? filters : null);
        return result;
    }

    /**
     * @public
     * @static
     * @async
     * @param { ObjectId } userId uniqueId of the user
     * @returns { Promise<ObjectId> }
     */
    public static async modify(params: Partial<Omit<User, "_id">>, userId: ObjectId): Promise<ObjectId> {
        await UserDAO.collection.updateOne({ _id: userId }, { $set: params });
        return userId;
    }

    private static initialised = false;
    private static collection: Collection;

}
