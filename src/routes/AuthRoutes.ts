import { Router } from 'express';
import { login, forgottenPassword, resetPassword } from '../controllers/AuthContoller';

const router = Router();

router.route('/login')
    .post(login);

router.route('/forgottenPassword')
    .post(forgottenPassword);

router.route('/resetPassword')
    .post(resetPassword);

export default router;