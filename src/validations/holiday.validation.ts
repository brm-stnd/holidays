import DateExtension from '@joi/date';
import JoiImport from 'joi';

const Joi = JoiImport.extend(DateExtension) as typeof JoiImport;

const holidayValidations = {
  postHoliday: {
    body: Joi.object({
      start_date: Joi.date().format('MM/DD/YYYY').required(),
      end_date: Joi.date().format('MM/DD/YYYY').required(),
    }),
  },
};

export default holidayValidations;
