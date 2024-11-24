import express from "express";
import AuthControllers from "../controllers/auth.controllers.js";
import verifyToken from "../middlewares/verifytoken.js";

const router = express.Router();
const authControllers = new AuthControllers();

// User register route
router.post("/register", authControllers.registerController);

// User login route
router.post("/login", authControllers.loginController);

// User profile route
router.get("/profile", verifyToken, authControllers.profileController);

// User profile update route
router.put("/profile", verifyToken, authControllers.profileUpdateController);

// User profile delete route
router.delete("/profile", verifyToken, authControllers.deleteProfileController);

export default router;