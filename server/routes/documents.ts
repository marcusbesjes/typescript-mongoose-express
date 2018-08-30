import { Request, Response, Router } from 'express'
import { BDocument } from '../models'

export class DocumentsRouter {
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
        this.router.get('/documents', async (request: Request, response: Response) => {
            const documents = await BDocument.find({}).exec()

            response.json(documents)
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
        this.router.post('/documents', async (request: Request, response: Response) => {
            try {
                const document = await BDocument.create(request.body)
                response.status(200).json(document)
            } catch (err) {
                response.status(500).json(err)
            }
        })

        return this.router
    }
}
