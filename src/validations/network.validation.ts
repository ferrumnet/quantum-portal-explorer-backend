import Joi from 'joi';
import { objectId } from './custom';

export const createNetwork = {
  body: Joi.array().items(
    Joi.object().keys({
      name: Joi.string().required(),
      rpcUrl: Joi.string().required(),
    }),
  ),
};

export const getNetworkByName = {
  query: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

export const getNetwork = {
  params: Joi.object().keys({
    id: Joi.custom(objectId).required(),
  }),
};

export const deleteNetwork = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

export const updateNetwork = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};
