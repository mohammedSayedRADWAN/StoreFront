import express, { Application, Request, Response } from 'express'
import routes from './handlers'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import bodyParser from 'body-parser'

//import db from './database'
//import client from './database'
dotenv.config()
//console.log(dotenv.config())

const PORT = process.env.PORT || 3000
// create an instance server
const app: Application = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// HTTP request logger middleware
app.use(morgan('common'))

app.use('/api', routes)
// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World ali🌍'
  })
})

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})

export default app
