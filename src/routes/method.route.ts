import express from 'express';
const router = express.Router();
import { methodController } from '../controllers';

router.get('/write', methodController.contractCallMethod);
router.get('/read', methodController.contractGetMethod);

export default router;
