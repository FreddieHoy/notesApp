import { Router } from "express";
import * as UserDb from "./Authentication/Users";
import note from "./notes";
import { secureRoute } from "./SecureRoute";

const router = Router();

router.post("/login", UserDb.logIn);
router.post("/logout", secureRoute, UserDb.logOut);
router.post("/register", UserDb.register);

router.get("/notes", secureRoute, note.getAll);
router.get("/notes/:id", secureRoute, note.get);
router.post("/notes", secureRoute, note.create);
router.put("/notes/:id", secureRoute, note.update);
router.delete("/notes/:id", secureRoute, note.remove);

router.get("/me", secureRoute, UserDb.getMe);

export default router;
