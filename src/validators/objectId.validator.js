import mongoose from 'mongoose';
import { checkSchema } from 'express-validator';

const ObjectId = mongoose.Types.ObjectId;

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
            errorMessage: `the ${field['name']} format is invalid. It should be a string with 12 bytes or 24 hex characters`,
            options: value => ObjectId.isValid(value)
        };

        objValidator[field['name']] = validators;
    });

    return checkSchema(objValidator);
}
