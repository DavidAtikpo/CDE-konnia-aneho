import express  from "express";
import userController from "../controllers/userController.js";
import middleware from "../middleware/authMiddleware.js";
import Validator from "../Validator/Validator.js";
import suEOControllre from "../controllers/suEOControllre.js";



const router = express.Router();
router.post('/register',Validator.Validator,userController.register);

router.post('/login',userController.loginUser)
router.get("/verify-email/:token",userController.verifyEmail)
router.post('/entre',middleware.authMiddleware,suEOControllre.incoming)
router.post('/going',suEOControllre.userOut)
router.get('/getentre',suEOControllre.getObjectives)
router.put('/update',userController.updateUser)
export default router