import express from 'express';
const router = express.Router();
import { infoController } from '../controllers';
import validate from '../middlewares/validate.middleware';
import { infoValidation } from '../validations';

router.get('/', validate(infoValidation.infoQuery), infoController.getInfoData);

export default router;
