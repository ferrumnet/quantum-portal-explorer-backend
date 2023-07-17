import Joi from 'joi';

export const readContractInteractionMethod = {
  body: Joi.array().items(
    Joi.object().keys({
      name: Joi.string().required(),
      rpcUrl: Joi.string().required(),
    }),
  ),
};

export const writeContractInteractionMethod = {
  body: Joi.array().items(
    Joi.object().keys({
      name: Joi.string().required(),
      rpcUrl: Joi.string().required(),
    }),
  ),
};
