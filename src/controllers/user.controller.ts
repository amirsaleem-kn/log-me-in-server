import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import User from "../dao/user.dao";
import ResetRequest from "../dao/reset-request.dao";
import ResponseHandler from "../etc/response";
import { md5, randomBytes } from "../lib/crypto";
import NodeMailer from "../lib/mailer";

/**
 * @class UserController
 */
export default class UserController {

    /**
     * @param { Express.Request } req Request
     * @param { Express.Response } res Response
     * @param { Express.NextFunction } next NextFunction
     */
    public static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { firstName, lastName, email, username, password, phone } = req.body;
            const createdAt = Date.now();
            const salt = randomBytes();
            const passwordHash = md5(password, salt);

            const userDetails = {
                createdAt,
                email,
                firstName,
                lastName,
                password: passwordHash,
                phone,
                salt,
                username,
            };

            const user = await User.create(userDetails);
            ResponseHandler.success(res, { user });
        } catch (e) {
            next(e);
        }
    }

    /**
     * @description
     * @param req
     * @param res
     * @param next
     */
    public static async genPassResetLink(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            const timestamp = Date.now();
            const user = await User.search({ email });
            if (user == null) {
                ResponseHandler.unprocessableEntity(res, [{ msg: "No User Found with this Email" }]);
                return;
            }
            const resetRequestId = await ResetRequest.create({ username: user.username, timestamp });
            const link = `${process.env.PASSWORD_RESET_BASE_URL}?requestId=${resetRequestId}`;
            await NodeMailer.sendEmail({ 
                from: "info@daakiya.email",
                to: email, 
                subject: "Password Reset Request | LogMeIn",
                text: `Hello ${user.firstName}, to reset your password click on this link ${link}` 
            });
            ResponseHandler.success(res, { msg: `reset password link has been emailed` });
        } catch (e) {
            next(e);
        }
    }

    /**
     * @param req
     * @param res
     * @param next 
     */
    public static async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password, requestId } = req.body;
            const user = await User.search({ username });
            if (user == null) {
                ResponseHandler.unprocessableEntity(res, [{ msg: "No User Found with this Email" }]);
                return;
            }
            const request = await ResetRequest.get(new ObjectId(requestId));
            if (request == null || request.username !== username) {
                ResponseHandler.unprocessableEntity(res, [{ msg: "Invalid Request" }]);
            }
            const passwordHash = md5(password, user.salt);
            await User.modify({ password: passwordHash }, new ObjectId(user._id));
            ResponseHandler.success(res, { msg: "Password has been updated successfully" });
        } catch (e) {
            next(e);
        }
    }

    /**
     * @param { Express.Request } req Request
     * @param { Express.Response } res Response
     * @param { Express.NextFunction } next NextFunction
     */
    public static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const auth = req.get("Authorization");
            const [username, password] = (Buffer.from(auth.split(" ").pop(), "base64").toString("utf8")).split(":");

            if (username == null || password == null) {
                ResponseHandler.unprocessableEntity(res, [{ msg: "User Not Found" }]);
            }

            const user = await User.search({ username });

            if (user == null) {
                ResponseHandler.unprocessableEntity(res, [{ msg: "Invalid Username or Password" }]);
                return;
            }

            const { salt, password: dbEncPassword } = user;
            const encPassword = md5(password, salt);

            if (dbEncPassword !== encPassword) {
                ResponseHandler.unprocessableEntity(res, [{ msg: "Invalid Username or Password" }]);
                return;
            }

            ResponseHandler.success(res, user);
        } catch (e) {
            next(e);
        }
    }

}
