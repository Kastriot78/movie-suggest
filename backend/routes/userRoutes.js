import express from 'express';
const router = express.Router();

import { getUsers, login, register, updateUserProfile, updateUserPreferences, logoutUser } from '../controllers/userController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

router.get('/', protect, isAdmin, getUsers);
router.post('/', register);
router.post('/auth', login);
router.put('/:id', updateUserProfile);
router.put('/preferences/:id', updateUserPreferences);
router.post('/logout', logoutUser);
// router.post('/logout', protect, isAdmin, logoutUser);

export default router;