import express from 'express';
const router = express.Router();
import { sendResetPasswordLink, getresetPasswordLink, resetpassword } from '../controllers/passwordController';

router.post('/reset-password-link', sendResetPasswordLink);
router.get('/reset-password/:userId/:token', getresetPasswordLink);
router.post('/reset-password/:userId/:token', resetpassword);

export default router;
