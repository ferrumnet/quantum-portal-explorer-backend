import Joi from 'joi';

export const getBlocks = {
  query: Joi.object().keys({
    page: Joi.number().integer().required(),
    limit: Joi.number().integer().required(),
  }),
};

export const getBlockTxs = {
  query: Joi.object().keys({
    blockHash: Joi.string().required(),
    page: Joi.string().required(),
    limit: Joi.string().required(),
  }),
};

export const getBlockByHash = {
  query: Joi.object().keys({
    blockHash: Joi.string().required(),
  }),
};
