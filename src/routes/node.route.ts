import express from 'express';
import { nodeController } from '.././controllers';

const router = express.Router();

router.route('/sync').post(nodeController.syncNode);

export default router;
