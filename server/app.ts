import { json, urlencoded } from 'body-parser'
import * as express from 'express'
import * as http from 'http'
import * as path from 'path'

import { AuthorRouter } from './routes/_author'
import { PostRouter } from './routes/_post'
import { APIDocsRouter } from './routes/swagger'

import { DocumentsRouter } from './routes/documents'
import { MaterialsRouter } from './routes/materials'
import { OrdersRouter } from './routes/orders'
import { PackagingsRouter } from './routes/packagings'
import { ProductGroupsRouter } from './routes/product-groups'
import { ProductsRouter } from './routes/products'

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

app.use('/api', new DocumentsRouter().getRouter())
app.use('/api', new MaterialsRouter().getRouter())
app.use('/api', new OrdersRouter().getRouter())
app.use('/api', new PackagingsRouter().getRouter())
app.use('/api', new ProductGroupsRouter().getRouter())
app.use('/api', new ProductsRouter().getRouter())

const server: http.Server = app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port', process.env.PORT || 3000)
})

export { server }
