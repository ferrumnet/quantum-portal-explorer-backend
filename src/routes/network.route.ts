import express from 'express';
const router = express.Router();
import { supportedNetworkController } from '.././controllers';

router.get('/', supportedNetworkController.supportedNetwork);

export default router;
