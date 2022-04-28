import Joi from 'joi';
import { Util } from '@utils/Util';

const validate = schema => (req, res, next) => {
  const validSchema = Util.pick(schema, ['params', 'query', 'body']);
  const object = Util.pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map(details => details.message).join(', ');
    console.log('error', errorMessage);
    return res.status(422).json({ error: errorMessage });
  }
  Object.assign(req, value);
  return next();
};

export default validate;
