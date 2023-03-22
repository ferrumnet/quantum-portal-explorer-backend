import express from 'express';
const router = express.Router();
import validate from '../middlewares/validate.middleware';
import { blockController } from '../controllers';
import { blockValidation } from '../validations';

router.get('/', validate(blockValidation.getBlocks), blockController.getBlocks);
router.get(
  '/hash',
  validate(blockValidation.getBlockByHash),
  blockController.getBlockByHash,
);
router.get(
  '/hash/txs',
  validate(blockValidation.getBlockTxs),
  blockController.getBlockTxs,
);

export default router;
