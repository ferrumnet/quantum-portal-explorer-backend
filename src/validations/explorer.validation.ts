import Joi from 'joi';

export const searchData = {
  query: Joi.object().keys({
    data: Joi.string().required(),
    fromNetwork: Joi.string().allow(''),
    toNetwork: Joi.string().allow(''),
    fromDate: Joi.number().allow(''),
    toDate: Joi.number().allow(''),
  }),
};
