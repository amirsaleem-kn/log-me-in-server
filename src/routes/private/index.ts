/**
 * Top level file for private routes
 * Private routes are available on /api/private and are accessible using access token and a client key
 */

import express from "express";
import expressValidator from "../../lib/validator/validator";
import ErrorMiddleware from "../../middlewares/error.middleware";
import PrivateAuthenticate from "../../middlewares/private-authenticate.middleware";
import userRouter from "./user.route";

const router = express.Router();

router.use(PrivateAuthenticate);

router.use(expressValidator);

router.use("/user", userRouter);

router.use(ErrorMiddleware);

export default router;
