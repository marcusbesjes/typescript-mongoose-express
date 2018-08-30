import { json, urlencoded } from 'body-parser'
import * as express from 'express'
import * as http from 'http'
import * as path from 'path'

import { AuthorRouter } from './routes/_author/author'
import { PostRouter } from './routes/_post/post'
import { APIDocsRouter } from './routes/swagger'

import { MaterialsRouter } from './routes/materials/materials'
import { ProductsRouter } from './routes/products/products'
import { OrdersRouter } from './routes/orders/orders'

const app = express()

app.use(json())
app.use(
    urlencoded({
        extended: true,
    }),
)

app.get('/', (request: express.Request, response: express.Response) => {
    response.json({
        name: 'Express application',
    })
})

app.use(
    (
        err: Error & { status: number },
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ): void => {
        response.status(err.status || 500)
        response.json({
            error: 'Server error',
        })
    },
)

app.use('/api', PostRouter.routes())
app.use('/api', new AuthorRouter().getRouter())
app.use('/api', new AuthorRouter().getRouter())
app.use('/api/swagger', new APIDocsRouter().getRouter())
app.use('/docs', express.static(path.join(__dirname, './assets/swagger')))

app.use('/api', new MaterialsRouter().getRouter())
app.use('/api', new ProductsRouter().getRouter())
app.use('/api', new OrdersRouter().getRouter())

const server: http.Server = app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port', process.env.PORT || 3000)
})

export { server }
