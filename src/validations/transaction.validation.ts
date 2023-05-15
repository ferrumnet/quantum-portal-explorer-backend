import Joi from 'joi';

export const getTransactions = {
  query: Joi.object().keys({
    address: Joi.string().allow(''),
    page: Joi.number().required(),
    limit: Joi.number().required(),
  }),
};

export const getTransaction = {
  params: Joi.object().keys({
    txId: Joi.string().required(),
  }),
};
