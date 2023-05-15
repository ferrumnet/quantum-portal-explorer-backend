import express from 'express';
const router = express.Router();
import validate from '../middlewares/validate.middleware';
import { transactionController } from '../controllers';
import { transactionValidation } from '../validations';

router.get(
  '/',
  validate(transactionValidation.getTransactions),
  transactionController.getTransactions,
);
router.get(
  '/:txId',
  validate(transactionValidation.getTransaction),
  transactionController.getTransaction,
);

export default router;
