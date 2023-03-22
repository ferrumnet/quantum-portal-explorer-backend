import Joi from 'joi';
import { objectId } from './custom';
export const registerContract = {
  body: Joi.object().keys({
    networks: Joi.string().required(),
    contractAddress: Joi.string().required(),
    contract: Joi.object().required(),
  }),
};
