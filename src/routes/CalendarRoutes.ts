import { Router } from 'express';

import { canAccess } from '../utils/token';
import { 
    createEvent,
    getEvents,
    getEvent,
    updateEvent,
    deleteEvent,
    sendEventEmail
} from '../controllers/CalendarController';

const router = Router();

canAccess(router);

router.route('/calendar/create')
    .post(createEvent);

router.route('/calendar/getEvents')
    .post(getEvents);

router.route('/calendar/getEvent')
    .post(getEvent);

router.route('/calendar/updateEvent')
    .post(updateEvent);

router.route('/calendar/deleteEvent')
    .post(deleteEvent);

router.route('/calendar/sendEventEmail')
    .post(sendEventEmail);

export default router;