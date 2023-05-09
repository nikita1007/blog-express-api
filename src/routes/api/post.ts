import { Request, Response, Router } from "express";
import { authenticateUserMiddleware } from '../../middlewares/AuthorizationMiddleware';
import { validateJWTTokenIfExistsMiddleware } from '../../middlewares/JWTTokenMiddleware';
import PostController from '../../controllers/PostController';
import { IGetPostsOptions } from '../../services/PostService';
import { validatePostCreateRequestBody } from '../../middlewares/PostMiddleware';


const router = Router();

const controller = new PostController();

router.use("/posts", [validateJWTTokenIfExistsMiddleware, authenticateUserMiddleware]);

router.get("/posts", async (req: Request, res: Response) => {
  const options: IGetPostsOptions = req.query;

  const response = await controller.getPosts(options.limit, options.page, options.order);

  res.json(response);
});

router.get("/posts/:post_id", async (req: Request, res: Response) => {
  const response = await controller.getPost(Number.parseInt(req.params.post_id));

  res.json(response);
});

router.post("/posts", [validatePostCreateRequestBody], async (req: Request, res: Response) => {
  const response = await controller.createPost(req.body, req.headers.authorization);

  res.json(response);
});

router.patch("/posts/:post_id", async (req: Request, res: Response) => {
  const response = await controller.patchPost(Number.parseInt(req.params.post_id), req.body, req.headers.authorization);

  res.json(response);
});

router.delete("/posts/:post_id", async (req: Request, res: Response) => {
  const response = await controller.deletePost(Number.parseInt(req.params.post_id), req.headers.authorization);

  res.json(response);
});

export default router;