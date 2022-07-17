import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { postController } from "../controllers/post.controller";
import { userController } from "../controllers/user.controller";
import { authToken } from "../middlewares/auth";

const router = Router();

router.post("/users", userController.save);
router.post("/auth", authController.auth);
router.post("/post", authToken, postController.save);

export { router };
