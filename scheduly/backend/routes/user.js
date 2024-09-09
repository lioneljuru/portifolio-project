import { Router } from 'express';
import UserController from '../Controller/UserController.js'

const router = Router();

// Not yet implemented
router.get('/users', UserController.getUsers);
router.get('/users/:id', UserController.getUser);
router.post('/users', UserController.addUser);
router.patch('/users/:id', UserController.editUser);
router.put('/users/:id', UserController.updateUser);

export {router}