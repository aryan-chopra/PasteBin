import express from 'express'
import dotenv from 'dotenv'

import entityRoutes from './routes/entityRoutes.js'
import homeRoutes from './routes/homeRoutes.js'
import connectToDatabase from './db.js'

const app = express()
const PORT = process.env.PORT

dotenv.config()
connectToDatabase()

app.use(express.json())

app.use('/create', entityRoutes)
app.use('/', homeRoutes)

app.listen(PORT, (error) => {
    if (!error) {
        console.log("starting server at localhost:" + PORT)
    } else {
        console.error("Error starting server" + error)
    }
})