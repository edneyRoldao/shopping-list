import mongoose from 'mongoose';
import envVariables from '../config/environment.config';

if (envVariables.variables.env === 'dev') {
    mongoose.set('debug', true);
}

export default () => {
    mongoose.connect(envVariables.variables.mongoUrlConnection);

    mongoose.connection.on('connected', () => {
        console.log('mongo is connected!');
    });

    mongoose.connection.on('disconnected', () => {
        console.log('mongo has been disconnected!');
    });

    mongoose.connection.on('error', (err) => {
        console.log('There was an error while trying to connect on mongo database:', err);
    });

}