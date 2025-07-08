import express from "express";
import { signup, login } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// Optional test route
router.get("/secure-test", protect, (req, res) => {
  res.json({ message: `Welcome ${req.user.email}` });
});

export default router;
