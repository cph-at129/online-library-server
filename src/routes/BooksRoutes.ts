import { Router } from 'express';

import { canAccess } from '../utils/token';
import { 
    createBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook
} from '../controllers/BookController';

const router = Router();

canAccess(router);

router.route('/books/create')
    .post(createBook);

router.route('/books/getBooks')
    .get(getBooks);

router.route('/books/getBook')
    .get(getBook);

router.route('/books/updateBook')
    .post(updateBook);

router.route('/books/deleteBook')
    .post(deleteBook);

export default router;