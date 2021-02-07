import { IModel, types } from "./types";

/**
 * @class UserModel
 */
export default class UserModel {

    public static create: IModel = {
        email: { required: true, type: types.string },
        firstName: { required: true, type: types.string, maxLength: 50 },
        lastName: { required: true, type: types.string, maxLength: 50 },
        password: { required: true, type: types.string, maxLength: 20 },
        phone: { maxLength: 12, type: types.string },
        username: { required: true, type: types.string, maxLength: 30 },
    };

    public static login: IModel = {};

    public static genPassResetLink: IModel = {
        email: { required: true, type: types.string }
    };

    public static resetPassword: IModel = {
        username: { required: true },
        password: { required: true },
        requestId: { required: true }
    };

}
