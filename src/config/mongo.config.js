import mongoose from 'mongoose';

if (process.env.APP_ENV === 'dev') {
    mongoose.set('debug', true);
}

export default () => {
    mongoose.connect(process.env.MONGO_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

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