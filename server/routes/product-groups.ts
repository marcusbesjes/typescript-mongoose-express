import { Request, Response, Router } from 'express'
import { ProductGroup } from '../models'

export class ProductGroupsRouter {
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
        this.router.get('/product-groups', async (request: Request, response: Response) => {
            const productGroups = await ProductGroup.find({}).exec()

            response.json(productGroups)
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
        this.router.post('/product-groups', async (request: Request, response: Response) => {
            try {
                const product = await ProductGroup.create(request.body)
                response.status(200).json(product)
            } catch (err) {
                response.status(500).json(err)
            }
        })

        return this.router
    }
}
