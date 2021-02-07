import { ObjectId } from "bson";

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    createdAt: number;
    username: string;
    password: string;
    salt: string;
    _id: ObjectId;
}
