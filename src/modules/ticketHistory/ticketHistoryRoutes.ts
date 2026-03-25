import { Router } from 'express';
import {
    create,
    getByTicketId,
} from './ticketHistoryActions.js';

const router = Router();

router.get('/:ticketId/history', getByTicketId);
router.post('/:ticketId/history', create);

export default router;