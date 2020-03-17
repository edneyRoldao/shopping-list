import mongoose from 'mongoose';
import { checkSchema } from 'express-validator';

const ObjectId = mongoose.Types.ObjectId;

export default () => {
    return checkSchema({
        userId: {
            custom: {
                errorMessage: 'the id format is invalid. It should be a string with 12 bytes or 24 hex characters',
                options: value => ObjectId.isValid(value)
            },
            exists: {
                errorMessage: 'userId is required',
            }
        },
        categoryId: {
            custom: {
                errorMessage: 'the id format is invalid. It should be a string with 12 bytes or 24 hex characters',
                options: value => ObjectId.isValid(value)
            },
            exists: {
                errorMessage: 'categoryId is required',
            }
        },
        description: {
            exists: {
                errorMessage: 'the description is required',
            },
            isString: {
                errorMessage: 'the description should be a text',
            },
            isLength: {
                errorMessage: 'the description size must be in between 6 and 1024 characters',
                options: { min: 6, max: 255 }
            }
        }
    });
}
