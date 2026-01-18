import express from 'express';
import { login, signup, socialLogin,  } from '../controller/user.controller.js';

const router = express.Router();

// Route for traditional Email/Password registration
router.post("/signup", signup);

// Route for traditional Email/Password login
router.post("/login", login);

// Route for Google/GitHub/Firebase authentication
router.post("/social-login", socialLogin);

export default router;