import Joi from 'joi';

export const searchData = {
  query: Joi.object().keys({
    data: Joi.string().required(),
  }),
};
