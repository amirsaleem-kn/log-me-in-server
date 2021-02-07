import { NextFunction, Request, Response } from "express";
export const types = {
    any: "any",
    array: "array",
    boolean: "boolean",
    email: "email",
    mobile: "mobile",
    number: "number",
    string: "string",
};

interface IObject<T> {
    [key: string]: T;
}

interface IModelItem {
    required?: boolean;
    checkNull?: boolean; // if passed false then null value will be considered as exist
    filter?: (req: Request, res: Response, next: NextFunction) => any;
    requiredWhen?: IObject<any>;
    type?: string;
    optional?: boolean;
    "in"?: any[];
    ignoreCaseIn?: any[];
    noEmpty?: boolean;
    maxLength?: number;
    minLength?: number;
    value?: string;
    nullConstraint?: boolean; // if passed then "is null" / "is not null" (0/1) will be appended to model.value and pushed to constraints
}

export type IModel = IObject<IModelItem>;
