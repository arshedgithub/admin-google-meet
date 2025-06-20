import { Router } from 'express';
import { MeetController } from '../controllers/meet.controller';

const router = Router();

router.post('/', MeetController.create);
router.get('/', MeetController.list);
router.get('/:id', MeetController.getById);
router.put('/:id', MeetController.update);
router.delete('/:id', MeetController.delete);

export default router; 