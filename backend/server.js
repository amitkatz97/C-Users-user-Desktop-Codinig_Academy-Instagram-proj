import express, { query } from 'express'
import cors from 'cors'
import fs from "fs";
import path from 'path'
import cookieParser from 'cookie-parser'
import { loggerService } from './services/logger.service.js'
import { storiesRoutes } from './api/story/story.routes.js';
import { userRoutes } from './api/user/user.routes.js';
import bodyParser from 'body-parser'



const app = express()

const corsOptions = {
    origin: [
        'http://127.0.0.1:5173',
        'http://localhost:5173',
        'http://127.0.0.1:5174',
        'http://localhost:5174'
    ],
    credentials: true
}
//* App Configuration 
app.use(cors(corsOptions))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())

//*Router

app.use('/api/story', storiesRoutes)
app.use('/api/user', userRoutes)




const PORT = process.env.PORT || 3031
app.listen(PORT, () => {loggerService.info(`Server ready at port ${PORT}`)})