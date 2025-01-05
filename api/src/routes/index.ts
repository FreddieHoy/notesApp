import { Router } from "express";
import account from "./account";
import * as UserDb from "./Authentication/user";
import note from "./notes";
import { secureRoute } from "./SecureRoute";

const router = Router();

router.get("/me", secureRoute, UserDb.getMe);
router.post("/login", UserDb.logIn);
router.post("/logout", secureRoute, UserDb.logOut);
router.post("/register", UserDb.register);

router.get("/notes", secureRoute, note.getAll);
router.get("/notes/:id", secureRoute, note.get);

router.post("/notes", secureRoute, note.create);
router.patch("/notes/:id", secureRoute, note.update);
router.delete("/notes/:id", secureRoute, note.remove);

router.get("/account/:accountId", secureRoute, account.get);
router.get("/account/:accountId/notes", secureRoute, account.notes.getAll);

export default router;
