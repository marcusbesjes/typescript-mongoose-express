import { Request, Response, Router } from 'express'
import { Material } from '../models'

export class MaterialsRouter {
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
        this.router.get('/materials', async (request: Request, response: Response) => {
            const materials = await Material.find({})
                .populate('documents')
                .populate('packaging')
                .populate('product')
                .exec()

            response.json(materials)
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
        this.router.post('/materials', async (request: Request, response: Response) => {
            const material = await Material.create(request.body)
            console.log('created', material)
            response.status(200).json(material)
        })

        return this.router
    }
}
