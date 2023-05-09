import { Request, Response, Router } from "express";
import AuthController from '../../controllers/AuthController';
import { validateRegistrationRequestBody } from '../../middlewares/AuthorizationMiddleware';
import { validateJWTTokenIfExistsMiddleware } from '../../middlewares/JWTTokenMiddleware';


const router = Router();

router.post("/login", [validateJWTTokenIfExistsMiddleware], async(req: Request, res: Response) => {
  const controller = new AuthController();
  const response = await controller.login(req.body);

  res.json(response);
})

router.post("/registration", [validateRegistrationRequestBody], async(req: Request, res: Response) => {
  const controller = new AuthController();
  const response = await controller.registration(req.body);

  res.json(response);
})

router.use("/auth", router);

export default router;
