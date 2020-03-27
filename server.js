const args = process.argv;
import environment from 'dotenv';
import envExpand from "dotenv-expand";
import mongoDatabase from './src/config/mongo.config';
import expressConfig from './src/config/express.config';
import CategoryService from "./src/services/category.service";

const envFile = args.includes('env-prd') ? 'prd.env' : 'dev.env';
const env = environment.config({path: envFile});
envExpand(env);

mongoDatabase();

if (args.includes('categories')) {
   const categoryService = new CategoryService();
   const total = categoryService.getTotal();
   if (!total) categoryService.populateCategoryCollection();
}

expressConfig().listen(process.env.PORT, () => {
   console.log('environment:', process.env.APP_ENV);
   console.log('The server is working on port:', process.env.PORT);
});
