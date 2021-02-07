import nodemailer, { SendMailOptions } from "nodemailer";

/**
 * @class NodeMailer
 */

export default class NodeMailer {

    /**
     * @private
     * @static
     * @param { SendMailOptions } mailOptions mail configuration
     */
    public static async sendEmail(mailOptions: SendMailOptions) {
        const transporter = nodemailer.createTransport({
            auth: {
                pass: process.env.EMAIL_PASS,
                user: process.env.EMAIL_ID,
            },
            host: process.env.EMAIL_HOST,
            port: +process.env.EMAIL_PORT,
            secure: true,
        });
        return transporter.sendMail(mailOptions);
    }

}
