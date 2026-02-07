import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  registerUserShema,
  loginUserShema,
} from '../validations/authValidation.js';
import {
  registerUser,
  loginUser,
  logoutUser,
} from '../controllers/authController.js';

const router = Router();

router.post('/auth/register', celebrate(registerUserShema), registerUser);
router.post('/auth/login', celebrate(loginUserShema), loginUser);
router.post('/auth/logout', logoutUser);
export default router;
