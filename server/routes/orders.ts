import { Request, Response, Router } from 'express'
import { Order, OrderLine, IOrderLine } from '../models'

export class OrdersRouter {
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
        this.router.get('/orders', async (request: Request, response: Response) => {
            const orders = await Order.find({})
                .populate('orderLines')
                .exec()

            response.json(orders)
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
        this.router.post('/orders', async (request: Request, response: Response) => {
            try {
                const orderInput = request.body
                const orderLinesInput = orderInput.orderLines
                delete orderInput.orderLines
                const order = new Order(orderInput)
                console.log('\norder created', order)

                const orderLineCreates = orderLinesInput.map((lineInput: IOrderLine) => {
                    lineInput.order = order._id
                    return OrderLine.create(lineInput).then((orderLine: IOrderLine) =>
                        order.orderLines.push(orderLine._id),
                    )
                })

                await Promise.all(orderLineCreates)
                await order.save()
                response.status(200).json(order)
            } catch (err) {
                console.log('terrible error during /orders handling', err)
                response.status(500).json(err)
            }
        })

        return this.router
    }
}
