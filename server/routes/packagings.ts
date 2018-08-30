import { Request, Response, Router } from 'express'
import { Packaging } from '../models'

export class PackagingsRouter {
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
        this.router.get('/packagings', async (request: Request, response: Response) => {
            const packagings = await Packaging.find({}).exec()

            response.json(packagings)
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
        this.router.post('/packagings', async (request: Request, response: Response) => {
            try {
                const packaging = await Packaging.create(request.body)
                response.status(200).json(packaging)
            } catch (err) {
                response.status(500).json(err)
            }
        })

        return this.router
    }
}
