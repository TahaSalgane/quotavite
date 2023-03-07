import express from 'express';
const router = express.Router();
import { getAllUsers, getSinglUser, deleteUser, blockUser, disabledUser } from '../controllers/UsersController';
import { register } from '../controllers/auth';

router.post('/', register);
router.get('/', getAllUsers);
router.get('/:id', getSinglUser);
router.put('/blocked/:id', blockUser);
router.put('/dis/:id', disabledUser);
router.delete('/:id', deleteUser);

export default router;
