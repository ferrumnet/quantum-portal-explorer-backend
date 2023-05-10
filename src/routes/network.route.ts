import express from 'express';
import validate from '../middlewares/validate.middleware';
import { networkController } from '.././controllers';
import { networkValidation } from '../validations';

const router = express.Router();

router
  .route('/')
  .post(
    validate(networkValidation.createNetwork),
    networkController.createNetwork,
  )
  .get(networkController.getAllNetworks);

router
  .route('/:id')
  .get(validate(networkValidation.createNetwork), networkController.getNetwork)
  .patch(
    validate(networkValidation.updateNetwork),
    networkController.updateNetwork,
  )
  .delete(
    validate(networkValidation.deleteNetwork),
    networkController.deleteNetwork,
  );

export default router;
