import express from 'express';
const router = express.Router();
import validate from '../middlewares/validate.middleware';
import { contractController } from './../controllers';
import { contractValidation } from '../validations';

router.post(
  '/',
  validate(contractValidation.registerContract),
  contractController.registerContract,
);

router.get('/:contractAddress', contractController.getContract);

export default router;
