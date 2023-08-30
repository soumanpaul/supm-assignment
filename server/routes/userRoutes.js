import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserTheme,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
console.log("IN User Router....")


router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router
  .route('/theme')
  .get(protect, getUserProfile)
  .put(protect, updateUserTheme);

export default router;
