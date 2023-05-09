import { Body, Delete, Example, Get, Header, Patch, Path, Post, Query, Route, Tags } from "tsoa";
import PostService, { ICreatePostParams, IGetPostsOptions, IGetPostsResponse, IPatchPostsParams } from '../services/PostService';
import { ICreatePostBodyParams } from '../types/PostTypes';
import User from "../models/UserModel";
import TokenHelper from '../helpers/TokenHelper';
import { JWTTokenBody } from '../types/JWTTokenType';

@Tags('posts')
@Route('/api/')
export default class PostController {

  @Get('/posts')
  public async getPosts(
    @Query() limit?: number,
    @Query() page?: number,
    @Query() order?: "DESC" | "ASC",
  ) {
    const options: IGetPostsOptions = { limit, page, order }

    const posts = (await new PostService().get(options)).posts;
    const posts_page_count = (await new PostService().getPagesCount(options.limit)).count;

    return {posts: posts, page_count: posts_page_count};
  }

  @Get('/posts/{post_id}')
  public async getPost(
    @Path() post_id: number
  ) {
    const options: IGetPostsOptions = { post_id: post_id };
    const post = (await new PostService().get(options)).posts;

    return post;
  }

  @Post('/posts')
  public async createPost(
    @Body() bodyParams: ICreatePostBodyParams,
    @Header("Authorization") token: string
  ) {
    const token_helper: TokenHelper = new TokenHelper();
    const _token: JWTTokenBody = token_helper.decodeJWT(token_helper.getHeaderToken(token));

    const author_id: number = (await User.findOne({
      attributes: ["id"],
      where: {
        username: _token.user_nickname,
      }
    })).id;

    const params: ICreatePostParams = {text: bodyParams.text, title: bodyParams.title, author: author_id};

    try {
      const res = await new PostService().create(params);

      return res;
    } catch (error) {
      return error;
    }
  }

  @Delete('/posts/{post_id}')
  public async deletePost(
    @Path() post_id: number,
    @Header("Authorization") token: string
  ) {
    const token_helper: TokenHelper = new TokenHelper();
    const _token: JWTTokenBody = token_helper.decodeJWT(token_helper.getHeaderToken(token));

    const author_id: number = (await User.findOne({
      attributes: ["id"],
      where: {
        username: _token.user_nickname,
      }
    })).id;
    
    try {
      const res = await new PostService().delete(post_id, author_id);
  
      return res;
    } catch (error) {
      return error;
    }
  }

  @Patch('/posts/{post_id}')
  public async patchPost(
    @Path() post_id: number,
    @Body() data: IPatchPostsParams,
    @Header("Authorization") token: string
  ) {
    const token_helper: TokenHelper = new TokenHelper();
    const _token: JWTTokenBody = token_helper.decodeJWT(token_helper.getHeaderToken(token));

    const author_id: number = (await User.findOne({
      attributes: ["id"],
      where: {
        username: _token.user_nickname,
      }
    })).id;
    
    try {
      const res = await new PostService().patch(post_id, data, author_id);
  
      return res;
    } catch (error) {
      return error;
    }
  }
}