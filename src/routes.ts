import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { AuthController } from "./controllers/AuthController";

import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { passwordHash } from "./middleware/passwordHash";

const router = Router()

router.get("/")

//User
router.get("/user/profile", ensureAuthenticated, new UserController().profile)
router.post("/user/create", passwordHash, new UserController().create)

//Auth
router.post("/auth/login", passwordHash, new AuthController().login)

export { router }