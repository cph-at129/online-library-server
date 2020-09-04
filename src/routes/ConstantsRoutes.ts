import { Router } from 'express';
import { canAccess } from '../utils/token';

import { 
    getRoles,
    getBookCategories,
    getBranchesOfLibrary
} from '../controllers/ConstantsController';

const router = Router();

canAccess(router);

router.route('/branches/getBranchesOfLibrary')
    .post(getBranchesOfLibrary);

router.route('/roles/getRoles')
    .post(getRoles);

router.route('/categories/getBookCategories')
    .post(getBookCategories);

export default router;