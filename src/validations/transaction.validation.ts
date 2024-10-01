import Joi from 'joi';

export const getTransactions = {
  query: Joi.object().keys({
    address: Joi.string().allow(''),
    page: Joi.number().required().default(1),
    limit: Joi.number().required().default(20),
  }),
};
export const getInternalTransactions = {
  query: Joi.object().keys({
    address: Joi.string(),
    page: Joi.number().required().default(1),
    limit: Joi.number().required().default(20),
  }),
};

export const getTransferTokenTransactions = {
  query: Joi.object().keys({
    address: Joi.string().allow(''),
    page: Joi.number().required().default(1),
    limit: Joi.number().required().default(20),
  }),
};

export const getTransaction = {
  params: Joi.object().keys({
    txId: Joi.string().required(),
  }),
};
