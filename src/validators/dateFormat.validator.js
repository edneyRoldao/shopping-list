import { checkSchema } from 'express-validator';
import DateUtil from "../utils/date.util";

const dateUtil = new DateUtil();

export default (...fields) => {
    const objValidator = {};

    fields.forEach(field => {
        objValidator[field['name']] = {
            custom: {
                errorMessage: `the field: ${field['name']} must be a date with the following format: ${dateUtil.getDefaultFormat()}`,
                options: value => {
                    const isRequired = (field['required'] === undefined || field['required']);
                    if (typeof value === 'undefined') return !isRequired;
                    return dateUtil.checkFormatDate(value);
                }
            }
        }
    });

    return checkSchema(objValidator);
}
