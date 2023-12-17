import express from 'express'
import { postRouter, userRouter } from './routes'
import cors from 'cors'
import dotenv from 'dotenv'
import { loginRouter } from './routes/loginRouter'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.listen(Number(process.env.PORT || 3005), () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})

// GET /users
app.use('/v2/users', userRouter)
app.use('/v2', loginRouter)

// GET /posts
app.use('/v2/posts', postRouter)