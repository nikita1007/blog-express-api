import Post from '../models/PostModel';
import { escapeHtml } from '../helpers/HTMLHelper';
import User from '../models/UserModel';


export interface IGetPostsOptions {
  limit?: number;
  page?: number;
  order?: "DESC" | "ASC";
  post_id?: number;
}

export interface IPostBody {
  id: number;
  title: string;
  text: string;
  author: number | string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IGetPostsResponse {
  posts: IPostBody[] | IPostBody; 
}

export interface IGetPostsPageCountResponse {
  count: number;
}

export interface ICreatePostParams {
  title: string;
  text: string;
  author: number;
}

export interface IPatchPostsParams {
  title?: string;
  text?: string;
}

export type ICreatePostResponse = {
  code: 201;
  message: "Пост был успешно создан";
} | {
  code: 403;
  message: "Ошибка валидации данных"; 
  error?: string;
};

export type IDeletePostResponse = {
  code: 200;
  message: "Пост был успешно удален" | "Вы не являетесь владельцем поста, потому не можете его удалить";
} | {
  code: 403;
  message: "Пост не был удален"; 
  error?: string;
};

export type IPatchPostResponse = {
  code: 200;
  message: "Пост был успешно изменен" | "Вы не являетесь владельцем поста, потому не можете его изменять";
} | { code: 403;
  message: "Пост не был изменен"; 
  error?: string;
} | {
  code: 400;
  message: "Данные для изменения поста не переданы. Request.Body должен содержать хотябы одно из полей: `text`, `title`";
};

interface IPostService {
  get(options?: IGetPostsOptions): Promise<IGetPostsResponse | Post>
  getPagesCount(limit: number): Promise<IGetPostsPageCountResponse>;
}

export default class PostService implements IPostService {
  public limit?: number = 20;
  public page?: number = 1;
  public order?: "DESC" | "ASC" = "ASC";

  constructor(options?: IGetPostsOptions) {
    if (options?.limit !== undefined) this.limit = options.limit;
    if (options?.page !== undefined) this.page = options.page;
    if (options?.order !== undefined) this.order = options.order;
  }

  /**
   * 
   * Возвращает записи постов из БД
   * 
   * @param options - параметры (необязательные)
   * @param options.limit - количество записей выводимых на странице (default: 20)
   * @param options.page - страница записей (defult: 1, startsFrom: 1)
   * @param options.order - порядок вывода записей (args: "DESC" | "ASC")(defult: "DESC")
   */
  public async get(options?: IGetPostsOptions): Promise<IGetPostsResponse> {
    if (options?.post_id !== undefined) {
      const post: IPostBody = await Post.findOne({
        where: {
          id: options.post_id,
        },
      });

      const res: IPostBody = post;

      res.author = (await User.findOne({
          attributes: ['username'],
          where: {
            id: res.author
          }
        })).username;

      return {posts: res};
    } else {
      const limit: number = options.limit ?? this.limit;
      const page: number = options.page ?? this.page;
      const order: "DESC" | "ASC" = options.order ?? this.order;
  
      const posts: IPostBody[] = await Post.findAll({
        offset: limit * (page - 1),
        limit: limit,
        order: [['createdAt', order]],
      });

      const res: IPostBody[] = posts;

      for (let i = 0; i < res.length; i++) {
        res[i].author = (await User.findOne({
          attributes: ['username'],
          where: {
            id: res[i].author
          }
        })).username;
      }
  
  
      return {posts: res};  
    }
  }

  /**
   * 
   * Выводит масимальное количество страниц 
   * 
   * @param _limit - количество записей выводимых на странице (default: 20)
   * @returns count - number
   */
  public async getPagesCount(_limit?: number): Promise<IGetPostsPageCountResponse> {
    const limit: number = _limit !== undefined ? _limit : this.limit;

    const page_count = Math.ceil(await Post.count() / limit);

    return {count: page_count};
  }

  /**
   * 
   * Создание поста
   * 
   * @param params
   * @returns 
   */
  public async create(params: ICreatePostParams): Promise<ICreatePostResponse> {
    try {
      await Post.create({
        title: params.title,
        text: escapeHtml(params.text),
        author: params.author
      })

      return {code:201, message: 'Пост был успешно создан'};
    } catch (error) {
      return {code: 403, message: 'Ошибка валидации данных', error: error};
    }
  }

  /**
   * 
   * Удаление поста из БД
   * 
   * @param id - ID поста
   * @param author - id пользователя
   * @returns 
   */
  public async delete(id: number, author: number): Promise<IDeletePostResponse> {
    try {
      const res = await Post.destroy({
        where: {
          id: id,
          author: author
        }
      })

      if (res === 1) {
        return {code:200, message: 'Пост был успешно удален'};
      } else {
        return {code: 200, message: 'Вы не являетесь владельцем поста, потому не можете его удалить'};
      }
    } catch (error) {
      return {code: 403, message: 'Пост не был удален', error: error};
    }
  }

  /**
   * 
   * Изменение поста из БД
   * 
   * @param id - ID поста
   * @param author - id пользователя
   * @returns 
   */
  public async patch(id: number, data: IPatchPostsParams, author: number): Promise<IPatchPostResponse> {
    if (data?.text === undefined && data?.title === undefined) {
      return {code: 400, message:  "Данные для изменения поста не переданы. Request.Body должен содержать хотябы одно из полей: `text`, `title`"};
    }

    const post = await Post.findOne({
      attributes: ["title", "text"],
      where: {
        id: id,
        author: author
      }
    });
    
    if (post) {
      const temp: IPatchPostsParams = {
        text: post.text,
        title: post.title
      }

      const text: string = data?.text ?? temp.text;
      const title: string = data?.title ?? temp.title;

      try {
        await Post.update({
          text: escapeHtml(text),
          title: title
        }, {
          where: {
            id: id,
            author: author,
          }
        });
  
        return {code:200, message: 'Пост был успешно изменен'};
      } catch (error) {
        return {code: 403, message: 'Пост не был изменен', error: error};
      }
    } else {
      return {code: 200, message: 'Вы не являетесь владельцем поста, потому не можете его изменять'};
    }
  }
}