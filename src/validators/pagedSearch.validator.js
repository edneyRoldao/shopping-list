import { checkSchema } from 'express-validator';

export default () => {
    return checkSchema({
        pageNumber: {
            optional: {
                options: { nullable: true }
            },
            isInt: {
                errorMessage: 'pageNumber must a integer number'
            }
        },
        pageSize: {
            optional: {
                options: { nullable: true }
            },
            isInt: {
                errorMessage: 'pageSize must a integer number'
            }
        }
    });
}
