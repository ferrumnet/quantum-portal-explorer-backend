import Joi from "joi";

export const infoQuery = {
   query: Joi.object().keys({
      days: Joi.number().min(1).max(365).default(180),
   }),
}