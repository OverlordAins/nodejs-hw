import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  registerUserSchema,
  loginUserSchema,
  requestResetEmailSchema,
} from '../validations/authValidation.js';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserSession,
  requestResetEmail,
} from '../controllers/authController.js';

const router = Router();

router.post(
  '/auth/register',
  celebrate({ body: registerUserSchema }),
  registerUser,
);

router.post('/auth/login', celebrate({ body: loginUserSchema }), loginUser);
router.post('/auth/logout', logoutUser);
router.post('/auth/refresh', refreshUserSession);

router.post(
  '/auth/request-reset-email',
  celebrate(requestResetEmailSchema),
  requestResetEmail,
);

export default router;
