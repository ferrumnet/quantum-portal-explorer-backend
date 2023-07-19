import express from 'express';
const router = express.Router();
import validate from '../middlewares/validate.middleware';
import { explorerController } from '../controllers';
import { explorerValidation } from '../validations';

router.get(
  '/search',
  validate(explorerValidation.searchData),
  explorerController.searchData,
);

export default router;
