import express from "express"
import {onboard, signup, login, logout , updateProfile} from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

//before calling the onboard method when "/onboarding" is used, it will check the protectRoute method first 
// to check if the route is protected (by checking if the jwt token is valid or not)
router.post("/onboarding",protectRoute,onboard);

router.put("/profile", protectRoute, updateProfile);
router.get("/me",protectRoute,(req,res)=>{
    return res.status(200).json({success: true,user: req.user})
});
export default router