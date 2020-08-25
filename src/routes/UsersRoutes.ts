import { Router } from 'express';

import { canAccess } from '../utils/token';
import { 
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
} from '../controllers/UserController';

const router = Router();

// canAccess(router);

router.route('/users/create')
    .post(createUser);

router.route('/users/getUsers')
    .get(getUsers);

router.route('/users/getUser')
    .get(getUser);

router.route('/users/updateUser')
    .post(updateUser);

router.route('/users/deleteUser')
    .post(deleteUser);

export default router;