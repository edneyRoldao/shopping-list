import expressConfig from './src/config/express.config';
import envVariables from './src/config/environment.config';
import mongoDatabase from './src/config/mongo.config';

mongoDatabase();

expressConfig().listen(envVariables.variables.port, () => {
   console.log('environment:', process.env.APP_ENV);
   console.log('The server is working on port:', envVariables.variables.port);
});
