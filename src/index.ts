import express, {Express} from "express";
import morgan from "morgan";
import Router from "./routes/api";
import swaggerUi from 'swagger-ui-express';
import HTTPErrorHandler from "./middlewares/handlers/errors/HTTPErrorHandler";
import bodyParser from "body-parser";
import app_cfg from "./config";


const app: Express = express();
const PORT = app_cfg.PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("tiny"));
app.use(express.static("public"));

HTTPErrorHandler(app);

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.use(Router);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
