import Joi from 'joi';

export const registerContract = {
  body: Joi.object().keys({
    networks: Joi.string().required(),
    contractAddress: Joi.string().required(),
    contract: Joi.object().required(),
  }),
};
