import { Sequelize } from "sequelize";
import { db_cfg } from './config';


const url = `${db_cfg.dialect}://${db_cfg.username}:${db_cfg.password}@${db_cfg.hostname}:${db_cfg.port}/${db_cfg.db_name}`;

const database: Sequelize = new Sequelize(url, {
  logging: false
})

async function print_url() {
  return url;
}

async function test_connection(database: Sequelize) {
  try {
    await database.authenticate();
    return 'Connection has been established successfully.';
  } catch (error) {
    return `Unable to connect to the database: ${error}`;
  }
}



export {
  test_connection,
  print_url,

}
export default database;