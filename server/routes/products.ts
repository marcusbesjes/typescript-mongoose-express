import { Request, Response, Router } from 'express'
import { Product } from '../models'

export class ProductsRouter {
    private router: Router = Router()

    public getRouter(): Router {
        /**
         * @swagger
         * /api/author:
         *   get:
         *     tags:
         *      - Author
         *     description:
         *      List of all authors registered in system.
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Authors
         *       400:
         *         description: Invalid request
         *       403:
         *         description: Forbidden
         */
        this.router.get('/products', async (request: Request, response: Response) => {
            const products = await Product.find({})
                .populate('documents')
                .populate('groups')
                .exec()

            response.json(products)
        })

        /**
         * @swagger
         * /api/author:
         *   post:
         *     tags:
         *      - Author
         *     description:
         *      Create new author.
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Author
         *       400:
         *         description: Invalid request
         *       403:
         *         description: Forbidden
         */
        this.router.post('/products', async (request: Request, response: Response) => {
            try {
                const product = await Product.create(request.body)
                response.status(200).json(product)
            } catch (err) {
                response.status(500).json(err)
            }
        })

        return this.router
    }
}
