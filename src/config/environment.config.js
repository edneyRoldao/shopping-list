import systemVariables from 'dotenv';
import dev from './environments/environment.dev';
import prd from './environments/environment.prd';

const config = () => {
    const env = {};
    systemVariables.config();

    if (process.env.APP_ENV === 'dev') {
        env.variables = dev();
    }

    if (process.env.APP_ENV === 'prd') {
        env.variables = prd();
    }

    return env;
};

export default config();
