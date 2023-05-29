import express from 'express';
import { getUserById, getUserInfo, login, register } from '../controllers/user_controller.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

// register
router.route('/register')
    .post(register);

// login
router.route('/login')
    .post(login);

//get user id
router.route('/profile')
    .get(isAuthenticated, getUserInfo);

// get user by id
router.route('/:id')
    .get(isAuthenticated, getUserById);

export default router;