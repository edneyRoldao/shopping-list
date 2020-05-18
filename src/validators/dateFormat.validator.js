import { checkSchema } from 'express-validator';
import DateUtil from "../utils/date.util";

const dateUtil = new DateUtil();

export default (...fields) => {
    const objValidator = {};

    fields.forEach(field => {
        const validators = {};
        const isOptional = !(field['required'] === undefined || field['required']);

        if (isOptional) {
            validators.optional = {
                options: { nullable: true }
            };

        } else {
            validators.exists = {
                errorMessage: `the field ${field['name']} is required`
            };
        }

        validators.custom  = {
            errorMessage: `the field: ${field['name']} must be a date with the following format: ${dateUtil.getDefaultFormat()}`,
            options: value => dateUtil.checkFormatDate(value)
        };

        objValidator[field['name']] = validators;
    });

    return checkSchema(objValidator);
}
