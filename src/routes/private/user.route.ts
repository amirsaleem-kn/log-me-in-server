import { Router } from "express";
import controller from "../../controllers/user.controller";
import { validateRequest } from "../../lib/validator/validator";
import model from "../../models/user.model";

const router = Router();

router.route("/")
    .post(validateRequest(model.create), controller.create);

router.route("/login")
    .post(validateRequest(model.login), controller.login);

router.route("/reset/password/link")
    .post(validateRequest(model.genPassResetLink), controller.genPassResetLink);

router.route("/reset/password")
    .post(validateRequest(model.resetPassword), controller.resetPassword);

export default router;
