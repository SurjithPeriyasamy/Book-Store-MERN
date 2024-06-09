import { Router } from "express";
import { checkUser, createUser } from "../controllers/userController.js";

const router = Router();

router.post("/signup", createUser);
router.post("/login", checkUser);

export default router;
