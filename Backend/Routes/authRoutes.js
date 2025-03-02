import express from 'express';
import { login, logout, register, sendVerifyOtp, verifyEmail } from '../Controllers/authContoller.js';
import userAuth from '../Middleware/userAuth.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-email', userAuth, verifyEmail);

export default authRouter;