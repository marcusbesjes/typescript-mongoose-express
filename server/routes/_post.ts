import { Request, Response, Router } from 'express'
import { Author } from '../models/_author'
import { Post } from '../models/_post'

export class PostRouter {
    public static routes(): Router {
        return Router()
            .get('/post', async (request: Request, response: Response) => {
                const posts = await Post.find({})
                    .populate('author')
                    .exec()

                response.json(posts)
            })
            .post('/post', async (request: Request, response: Response) => {
                const data = request.body
                const author = await Author.findOne().exec()

                data.author = author && author._id

                const post = await Post.create(data)

                response.json(post)
            })
    }
}
