import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().required(),

  APP_PORT: Joi.number().required(),
  APP_ORIGIN: Joi.string().required(),

  FRONTEND_ORIGIN: Joi.string().required(),

  JWT_SECRET: Joi.string().uuid().required(),
  JWT_EXPIRES_IN: Joi.string().required(),

  SUPABASE_URL: Joi.string().required(),
  SUPABASE_ANON_KEY: Joi.string().required()
});
