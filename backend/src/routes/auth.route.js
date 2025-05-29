import express from "express"
import {signup} from "../controllers/auth.controller.js"
import {login} from "../controllers/auth.controller.js"
import {logout} from "../controllers/auth.controller.js"

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);


export default router