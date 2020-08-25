import { Router } from 'express';

import { canAccess } from '../utils/token';
import { 
    getRoles,
    getBookCategories,
    getBranchesOfLibrary
} from '../controllers/ConstantsController';

const router = Router();

canAccess(router);

router.route('/roles/getRoles')
    .get(getRoles);

router.route('/categories/getBookCategories')
    .get(getBookCategories);

router.route('/branches/getBranchesOfLibrary')
    .get(getBranchesOfLibrary);

export default router;