import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { AuthController } from "./controllers/AuthController";
import { UserFavoritesController } from "./controllers/UserFavoritesController";
import { WordsController } from "./controllers/WordsController";

import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { passwordHash } from "./middleware/passwordHash";

const router = Router()

router.get("/")

//User
router.get("/user/profile", ensureAuthenticated, new UserController().profile)
router.post("/user/create", passwordHash, new UserController().create)

//Auth
router.post("/auth/login", passwordHash, new AuthController().login)

//UserFavorites
router.post("/user-favorites/add", ensureAuthenticated, new UserFavoritesController().addFavorite)
router.delete("/user-favorites/remove/:id", ensureAuthenticated, new UserFavoritesController().removeFavorite)
router.get("/user-favorites/get", ensureAuthenticated, new UserFavoritesController().getFavorites)

//Words
router.post("/words/add-list", new WordsController().addList)
router.get("/words/list", new WordsController().list)

export { router }