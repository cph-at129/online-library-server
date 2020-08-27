import { Router } from 'express';

import { canAccess } from '../utils/token';
import { 
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    approveUser
} from '../controllers/UserController';

const router = Router();

canAccess(router);

router.route('/users/create')
    .post(createUser);

router.route('/users/getUsers')
    .post(getUsers);

router.route('/users/getUser')
    .post(getUser);

router.route('/users/updateUser')
    .post(updateUser);

router.route('/users/deleteUser')
    .post(deleteUser);

router.route('/users/approveUser')
    .post(approveUser);

export default router;