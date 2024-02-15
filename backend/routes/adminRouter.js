import express from "express";

import userController from "../controllers/userController.js";
import suEOControllre from "../controllers/suEOControllre.js";
import middleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.post('/entre',suEOControllre.incoming)
router.post('/going',suEOControllre.userOut)
router.get('/getentre',suEOControllre.getObjectives)
router.get('/getallentre',suEOControllre.getUserIcoming);
router.get('/allusers',userController.getAllUsers)


export default router