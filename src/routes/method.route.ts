import express from 'express';
const router = express.Router();
import { methodController } from '../controllers';

router.post('/write', methodController.contractCallMethod);
router.post('/read', methodController.contractGetMethod);

export default router;
