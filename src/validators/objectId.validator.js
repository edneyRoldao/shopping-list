import mongoose from 'mongoose';
import { checkSchema } from 'express-validator';

const ObjectId = mongoose.Types.ObjectId;

export default (...fields) => {
    const objValidator = {};

    fields.forEach(field => {
        objValidator[field['name']] = {
            custom: {
                errorMessage: `the ${field['name']} format is invalid. It should be a string with 12 bytes or 24 hex characters`,
                options: value => {
                    const isRequired = (field['required'] === undefined || field['required']);
                    if (typeof value === 'undefined') return !isRequired;
                    return ObjectId.isValid(value);
                }
            }
        };
    });

    return checkSchema(objValidator);
}
