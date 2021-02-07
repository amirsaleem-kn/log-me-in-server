import { NextFunction, Request, Response } from "express";
import expressValidator from "express-validator";
import validator from "./rules";

const customValidations = {
    ignoreCaseIn: (value: any, modelItem: string[]) => {
        if (typeof value !== "string" || !Array.isArray(modelItem)) {
            return false;
        }
        modelItem.forEach((item: any) => { item = item.toLowerCase(); });
        value = value.toLowerCase();
        return modelItem.indexOf(value) > -1;
    },
    isArray: (value: any) => {
        return Array.isArray(value);
    },
    noEmpty: (array: any) => {
        if (Array.isArray(array)) {
            return array.length > 0;
        }
        return false;
    }
};

export function validateRequest(model: any) {
    return (req: Request, res: Response, next: NextFunction) => {
        validator(req, model).then((error: any) => {
            if (error) {
                next(error);
            }
            next();
        });
    };
}

export default expressValidator({
    customValidators: customValidations
});
