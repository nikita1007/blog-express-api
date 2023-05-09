import { Dialect } from 'sequelize';
import app_cfg from '../config';


export const db_cfg = {
  dialect: app_cfg.DB_DRIVER as Dialect || 'postgres',
  username: app_cfg.DB_USERNAME,
  password: app_cfg.DB_PASSWORD,
  hostname: app_cfg.DB_HOSTNAME,
  port: Number.parseInt(app_cfg.DB_PORT || "5432"),
  db_name: app_cfg.DB_NAME,
}