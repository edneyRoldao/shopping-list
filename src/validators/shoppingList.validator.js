import { checkSchema } from 'express-validator';

export default () => {
    return checkSchema({
        userId: {
            exists: {
                errorMessage: 'id usuario nao informado',
            }
        },
        categoryId: {
            exists: {
                errorMessage: 'email is required',
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
