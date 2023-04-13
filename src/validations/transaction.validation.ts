import Joi from 'joi';

export const getRecentTransactions = {
  query: Joi.object().keys({
    page: Joi.number().required(),
    limit: Joi.number().required(),
  }),
};

export const getTransaction = {
  params: Joi.object().keys({
    txId: Joi.string().required(),
  }),
};
