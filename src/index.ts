import express from 'express'
import { userRouter } from './routes'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.listen(3005, () => console.log('listening on http://localhost/3005'))

// GET /users
app.use('/v2/users', userRouter)
