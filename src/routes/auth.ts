import express from 'express';
const router = express.Router();
import { login, register, verifyUserAccount } from '../controllers/auth';

router.post('/register', register);
router.post('/login', login);
router.get('/:userId/verify/:token', verifyUserAccount);

export default router;
