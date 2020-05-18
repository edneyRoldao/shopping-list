import { checkSchema } from 'express-validator';

export default () => {
    return checkSchema({
        amount: {
            optional: {
                options: { nullable: true }
            },
            isInt: {
                errorMessage: 'amount must a integer number'
            }
        },
        description: {
            optional: {
                options: { nullable: true }
            },
            isString: {
                errorMessage: 'the description should be a text',
            }
        },
        purchased: {
            optional: {
                options: { nullable: true }
            },
            isBoolean: {
                errorMessage: 'the purchased field should be true or false',
            }
        },
        price: {
            optional: {
                options: { nullable: true }
            },
            isDecimal: {
                errorMessage: 'the price should be a decimal value',
            }
        },
        url: {
            optional: {
                options: { nullable: true }
            },
            isString: {
                errorMessage: 'the url should be a text',
            }
        }
    });
}
