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
  '/token-transfer/:address',
  validate(transactionValidation.getTransferTokenTransactions),
  transactionController.getTransferTokenTransactions,
);
router.get(
  '/:txId',
  validate(transactionValidation.getTransaction),
  transactionController.getTransaction,
);
router.get(
  '/finalized/:txId',
  validate(transactionValidation.getTransaction),
  transactionController.getTransactionMinedAndFinalizedDetail,
);

export default router;
