import { checkSchema } from 'express-validator';

import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export default (field) => {

    const schemaObj = {};

    schemaObj[field] = {
        custom: {
            errorMessage: `the ${field} format is invalid. It should be a string with 12 bytes or 24 hex characters`,
            options: value => ObjectId.isValid(value)
        },
        exists: {
            errorMessage: `the ${field} is required!`
        }
    };

    return checkSchema(schemaObj);
}
