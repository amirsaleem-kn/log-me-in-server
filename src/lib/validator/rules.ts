import BadRequestException from "../../etc/exception/BadRequestException";
import Logger from "../../etc/logger";

const ERROR_MESSAGES = {
    enum: "$ has invalid value",
    maxLength: "$ must be less than equal to $",
    minLength: "$ must be greater than equal to $",
    regex: "$ has invalid value",
    required: "$ is Required",
    type: "$ must be of $ type",
};

export default async (req: any, validations: any) => {
    const data = { ...req.body, ...req.query, ...req.params, ...req.headers };
    // To Traverse Each Validation
    Object.keys(validations).forEach((item: any) => {
        const checkNull = validations[item].checkNull === false ? false : true;
        // To check Required Fields
        if (validations[item].required) {
            if (item.indexOf(".") > -1) {
                const parentEntity = item.substr(0, item.indexOf("."));
                if (!data[parentEntity] && validations[parentEntity].optional) {
                    return;
                }
                req.check(item, formatErrorMessage(ERROR_MESSAGES.required, item)).exists({ checkNull });
            } else {
                req.check(item, formatErrorMessage(ERROR_MESSAGES.required, item)).exists({ checkNull });
            }
        }

        if (validations[item].requiredWhen) {
            Object.keys(validations[item].requiredWhen).forEach((param: any) => {
                const requiredValue = validations[item].requiredWhen[param];
                if (Array.isArray(requiredValue) && requiredValue.indexOf(data[param]) > -1) {
                    req.check(item, formatErrorMessage(ERROR_MESSAGES.required, item)).exists({ checkNull });
                }
                if (!Array.isArray(requiredValue) && requiredValue === data[param]) {
                    req.check(item, formatErrorMessage(ERROR_MESSAGES.required, item)).exists({ checkNull });
                }
            });
        }

        // if (item in data) {

        // To Check Type
        if ("type" in validations[item]) {
            switch (validations[item].type) {
                case "number":
                    req.check(item, formatErrorMessage(ERROR_MESSAGES.type, item, validations[item].type))
                        .optional({ nullable: true })
                        .isNumeric();
                    break;
                case "string":
                    req.check(item, formatErrorMessage(ERROR_MESSAGES.type, item, validations[item].type))
                        .optional({ nullable: true })
                        .isString();
                    break;
                case "email":
                    req.check(item, formatErrorMessage(ERROR_MESSAGES.type, item, validations[item].type))
                        .optional({ nullable: true })
                        .isEmail();
                    break;
                case "mobile":
                    req.check(item, formatErrorMessage(ERROR_MESSAGES.type, item, validations[item].type))
                        .optional({ nullable: true })
                        .isMobilePhone();
                    break;
                case "array":
                    req.check(item, formatErrorMessage(ERROR_MESSAGES.type, item, validations[item].type))
                        .optional()
                        .isArray();
            }
        }

        // To Check Enum
        if ("in" in validations[item]) {
            Logger.info("<<<inside in>>");
            req.check(item, formatErrorMessage(ERROR_MESSAGES.enum, item)).optional({ nullable: true }).isIn(validations[item].in);
        }

        if ("ignoreCaseIn" in validations[item]) {
            req.check(item, formatErrorMessage(ERROR_MESSAGES.enum, item)).optional({ nullable: true }).ignoreCaseIn(validations[item].ignoreCaseIn);
        }

        // To Check Max Length
        if ("maxLength" in validations[item]) {
            req.check(item, formatErrorMessage(ERROR_MESSAGES.maxLength, item, validations[item].maxLength))
                .optional()
                .isLength({ max: validations[item].maxLength });
        }

        // To Check Min Length
        if ("minLength" in validations[item]) {
            req.check(item, formatErrorMessage(ERROR_MESSAGES.minLength, item, validations[item].minLength))
                .optional()
                .isLength({ min: validations[item].minLength });
        }

        // To Check Regex
        if ("regex" in validations[item]) {
            req.check(item, formatErrorMessage(ERROR_MESSAGES.regex, item))
                .optional()
                .matches(validations[item].regex);
        }

        // To Check Empty String
        if ("notEmpty" in validations[item]) {
            req.check(item, formatErrorMessage(ERROR_MESSAGES.regex, item))
                .optional()
                .notEmpty();
        }
        // }

    });

    // To Get Validation Result from express-validator
    const errors = await req.getValidationResult();
    if (errors.array().length) {
        const error = new BadRequestException("Invalid Data");
        error.message = errors.array();
        return error;
    }
    return false;
};

// To Replace $ in Error Message String With Proper Data
function formatErrorMessage(message: string, ...n: any[]) {
    n.forEach((item: any) => {
        message = message.replace("$", item);
    });
    return message;
}
