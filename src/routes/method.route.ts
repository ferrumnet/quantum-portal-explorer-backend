import express from 'express';
const router = express.Router();
import { methodController } from '../controllers';

router.get('/', methodController.callMethod);
router.get('/method-transaction', methodController.methodGetTransaction);

export default router;
