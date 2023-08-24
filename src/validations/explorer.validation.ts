import Joi from 'joi';

export const searchData = {
  query: Joi.object().keys({
    data: Joi.string().trim().allow(''),
    fromNetwork: Joi.string().allow(''),
    toNetwork: Joi.string().allow(''),
    fromDate: Joi.string().allow(''),
    toDate: Joi.string().allow(''),
    type: Joi.string().allow(''),
    page: Joi.string().required(),
    limit: Joi.string().required(),
  }),
};
