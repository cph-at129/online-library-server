import { Router } from 'express';

import { canAccess } from '../utils/token';
import {
    sendEmail
} from '../controllers/ContactController';

const router = Router();

canAccess(router);

router.route('/contact/sendEmail')
    .post(sendEmail);

export default router;