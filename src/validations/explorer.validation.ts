import Joi from 'joi';

export const searchData = {
  query: Joi.object().keys({
    data: Joi.string().required(),
    fromNetwork: Joi.string(),
    toNetwork: Joi.string(),
    fromDate: Joi.number(),
    toDate: Joi.number(),
  }),
};
