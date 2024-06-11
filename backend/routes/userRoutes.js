import { Router } from "express";
import { currentUser, login, register } from "../controllers/userController.js";
import { validateToken } from "../middlewares/validateTokenHandler.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/current", validateToken, currentUser);
export default router;
