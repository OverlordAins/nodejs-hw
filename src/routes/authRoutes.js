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
  refreshUserSession,
} from '../controllers/authController.js';

const router = Router();

router.post(
  '/auth/register',
  celebrate({ body: registerUserShema }),
  registerUser,
);
router.post('/auth/login', celebrate({ body: loginUserShema }), loginUser);
router.post('/auth/logout', logoutUser);
router.post('/auth/refresh', refreshUserSession);

export default router;
