
import express from "express";
import authenticate from "../middleware/authenticate.js";
import authorizeRole from "../middleware/authorize.js";
import { readUsers } from "../utils/db.js";

const router = express.Router();

router.get(
  "/users",
  authenticate,
  authorizeRole("admin"),
  (req, res) => {
    const users = readUsers().map((user) => {
      const { passwordHash, ...safeUser } = user;
      return safeUser;
    });

    return res.json({ users });
  }
);

export default router;
