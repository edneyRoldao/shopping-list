import { checkSchema } from 'express-validator';

export default () => {
    return checkSchema({
        name: {
            exists: {
                errorMessage: 'The name is required',
            },
            isString: {
                errorMessage: 'name should be a text',
            },
            isLength: {
                errorMessage: 'the size must be in between 6 and 255 characters',
                options: { min: 3, max: 255 }
            }
        },
        email: {
            exists: {
                errorMessage: 'email is required',
            },
            isString: {
                errorMessage: 'email should be a text',
            },
            isEmail: {
                errorMessage: 'email is not valid',
            },
            isLength: {
                errorMessage: 'the size must be in between 6 and 255 characters',
                options: { min: 6, max: 255 }
            }
        },
        password: {
            exists: {
                errorMessage: 'the password is required',
            },
            isString: {
                errorMessage: 'the password should be a text',
            },
            isLength: {
                errorMessage: 'the password size must be in between 6 and 1024 characters',
                options: { min: 6, max: 1024 }
            }
        }
    });
}
