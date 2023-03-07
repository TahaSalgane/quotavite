import express from 'express';
const router = express.Router();
import { login, register } from '../controllers/auth';

router.get('/register', register);
router.get('/login', login);

export default router;
