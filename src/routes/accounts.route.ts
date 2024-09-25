import express from 'express';
const router = express.Router();
import validate from '../middlewares/validate.middleware';
import { accountValidation } from '../validations';
import { accountController } from '../controllers';

router.get(
  '/:address',
  validate(accountValidation.getAccount),
  accountController.getAccount,
);
// router.get(
//   '/account-transactions',
//   validate(accountValidation.getAccountTransactions),
//   accountController.getAccountTransactions,
// );
router.get(
  '/account-balances',
  validate(accountValidation.getAccountBalances),
  accountController.getBalances,
);

router.get('/addresses/:address', accountController.getAddressDetail);
router.get('/addresses/:address/logs', accountController.getAddressLogs);

export default router;
