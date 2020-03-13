import expressConfig from './src/config/express.config';

expressConfig().listen(3000, () => {
   const port = 3000;
   const environment = 'dev';
   console.log('environment:', environment);
   console.log('The server is working on port:', port);
});
