import { Router } from 'express';
import { login } from '../controllers/AuthContoller';

const router = Router();

router.route('/login')
    .post(login);

export default router;