import { Router } from 'express';
import { UserController } from '../controllers';

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/:id', UserController.getById);

export default router;
