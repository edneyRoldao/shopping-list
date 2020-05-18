import { checkSchema } from 'express-validator';

const emailSchema = {
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
};

const activationCodeSchema = {
    exists: {
        errorMessage: 'activation code is required',
    },
    isString: {
        errorMessage: 'activation code should be alphanumeric',
    },
    isLength: {
        errorMessage: 'the activation code size must be 6 characters',
        options: { min: 6, max: 6 }
    }
};

export default (serviceType = 'activation') => {
    if (serviceType === 'activation') {
        return checkSchema({
            email: emailSchema,
            activationCode: activationCodeSchema
        });
    }

    return checkSchema({email: emailSchema});
}
