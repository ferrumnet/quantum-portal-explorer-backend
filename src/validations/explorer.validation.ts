import Joi from 'joi';
// import { isTransactionOrBlockHashOrAddress } from './custom';

export const searchData = {
  query: Joi.object()
    .keys({
      data: Joi.any().allow(''),
      fromNetwork: Joi.string().allow(''),
      toNetwork: Joi.string().allow(''),
      fromDate: Joi.string().allow(''),
      toDate: Joi.string().allow(''),
      type: Joi.string().allow(''),
      page: Joi.string().default(1),
      limit: Joi.number().default(20),
    })
    .or('data', 'type'),
};
