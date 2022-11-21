require('./db')()
import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import ENV from './config'
import router from './router'
import errorHandler from './middlewares/errorHandler'
const app: Application = express()
const { APP_PORT } = ENV

app.use(express.json())
app.use(cors())
app.use(errorHandler)

app.get("/",(req: Request, res: Response) => {
    res.send("<h1> Hello World!! </h1>")
})
app.use("/api",router)

app.listen(APP_PORT,()=> {
    console.log(`listening on http://localhost:${APP_PORT}`)
})