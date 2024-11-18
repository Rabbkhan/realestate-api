import express from "express";
import { signup,signin, google, signout, VerifyEmail } from "../controller/auth.controller.js";

const router = express.Router();


router.post("/signup", signup)
router.post("/signin", signin)
router.post("/google", google)
router.get("/signout", signout)
router.post("/verifyemail", VerifyEmail)

export default router;