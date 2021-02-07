import { ObjectId } from "bson";

export interface ResetRequest {
    username: string;
    timestamp: number;
    _id: ObjectId;
}
