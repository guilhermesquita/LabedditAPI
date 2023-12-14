import express, { Request, Response } from 'express'
import { productRouter } from './routes/productRouters'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.listen(3003, () => console.log('listening on http://localhost/3003'))

// GET /products
app.use('/products', productRouter)
