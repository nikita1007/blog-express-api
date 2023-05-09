import {Router} from "express";
import PingController from "../../controllers/PingController";


const router = Router();

router.route("/ping/")
.get(async (req, res) => {
  const controller = new PingController();
  const response = await controller.get();
  return res.send(response);
})
.post(async (req, res) => {
  const controller = new PingController();
  const response = await controller.post();
  return res.send(response);
});

export default router;