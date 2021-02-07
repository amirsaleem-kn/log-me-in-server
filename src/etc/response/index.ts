import { Response } from "express";

const HTTP_STATUS = {
    BAD_REQUEST: 400,
    CONFLICT: 409,
    CREATED: 201,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 503,
    SERVICE_UNAVAILABLE: 502,
    SUCCESS: 200,
    UNAUTHORISED: 401,
    UNPROCESSABLE_ENTITIY: 422,
};

export default class ResponseHandler {

    /**
     * @public
     * @static
     * @param { Express.Response } res Express Response Object
     * @param { *:any } data data to be shared with client
     */
    public static success(res: Response, data: any, metaData?: any) {
        res.json({
            api: "Blindsright Backend 1.0.0",
            data,
            errors: [],
            metaData,
            status: "success",
        });
    }

    /**
     * @public
     * @static
     * @param { Express.Response } res Express Response Object
     */
    public static serverError(res: Response, errors: any[]) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            api: "Blindsright Backend 1.0.0",
            data: null,
            errors: [
                { msg: "An internal error has occurred, please try again after some time" },
                ...errors
            ],
            status: "fail",
        });
    }

    public static badRequest(res: Response, errors: any[]) {
        res.status(400).json({
            api: "Blindsright Backend 1.0.0",
            data: null,
            errors,
            status: "fail",
        });
    }

    public static unprocessableEntity(res: Response, errors: any[]) {
        res.status(422).json({
            api: "Blindsright Backend 1.0.0",
            data: null,
            errors,
            status: "fail",
        });
    }

    public static conflict(res: Response, errors: any[]) {
        res.status(409).json({
            api: "Blindsright Backend 1.0.0",
            data: null,
            errors,
            status: "fail",
        });
    }

    public static unauthorised(res: Response) {
        res.status(401).json({
            api: "Blindsright Backend 1.0.0",
            data: null,
            errors: [ { msg: `user is not authorised to access this resource, identity validation failed` } ],
            status: "fail",
        });
    }

    public static forbidden(res: Response) {
        res.status(403).json({
            api: "Blindsright Backend 1.0.0",
            data: null,
            errors: [ { msg: `user is not allowed to access this resource` } ],
            status: "fail",
        });
    }
}
