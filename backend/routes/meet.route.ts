import { Router } from 'express';
import { MeetController } from '../controllers';
import { authenticate, requireAdmin,  } from '../middleware';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Admin only routes
router.post('/', requireAdmin, MeetController.create);
router.put('/:id', requireAdmin, MeetController.update);
router.delete('/:id', requireAdmin, MeetController.delete);

// Authenticated user routes
router.get('/', MeetController.list);
router.get('/:id', MeetController.getById);

export default router; 