import Joi from 'joi';

export const getAccount = {
  query: Joi.object().keys({
    address: Joi.string().required(),
  }),
};

export const getAccountTransactions = {
  query: Joi.object().keys({
    address: Joi.string().required(),
    page: Joi.number().required(),
    limit: Joi.string().required(),
  }),
};

export const getAccountBalances = {
  query: Joi.object().keys({
    address: Joi.string().required(),
  }),
};
