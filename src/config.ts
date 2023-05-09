import dotenv from 'dotenv';
import path from 'path';


const app_cfg: dotenv.DotenvParseOutput = dotenv.config({path: path.dirname(__filename) + "/../.env"}).parsed;

export default app_cfg;