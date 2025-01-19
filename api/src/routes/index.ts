import { Router } from "express";
import account from "./account";
import authentication from "./authentication";
import note from "./notes";
import { secureRoute } from "./SecureRoute";

const router = Router();

// health route
router.get("/health", (req, res) => {
  console.log("Health check");
  res.json({ status: "UP" });
});

router.get("/me", secureRoute, authentication.getMe);
router.post("/login", authentication.login);
router.post("/logout", secureRoute, authentication.logout);
router.post("/register", authentication.register);

router.get("/notes", secureRoute, note.getAll);
router.get("/notes/:id", secureRoute, note.get);

router.post("/notes", secureRoute, note.create);
router.patch("/notes/:id", secureRoute, note.update);
router.delete("/notes/:id", secureRoute, note.remove);

router.get("/account/:accountId", secureRoute, account.get);
router.get("/account/:accountId/notes", secureRoute, account.notes.getAll);

export default router;
