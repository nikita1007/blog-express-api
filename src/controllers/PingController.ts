import { Get, Post, Route, Tags } from "tsoa";

interface IPingResponse {
  message: string;
}

@Route("api/ping")
@Tags("ping")
export default class PingController {
  
  @Get("/")
  public async get(
  ): Promise<IPingResponse> {
    return {
      message: "pong",
    };
  }

  @Post("/")
  public async post(
  ): Promise<IPingResponse> {
    return {
      message: "pong"
    }
  }
}