import crypto from "crypto";

export const md5 = (str: string, password: string) => {
    return crypto.createHash("md5").update(str + password).digest("hex");
};

export const randomBytes = () => crypto.randomBytes(32).toString("hex");
