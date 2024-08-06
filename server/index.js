require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models.js')
const router = require('./routes/index')
const cors = require('cors')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

//обязательно мидэлваре с ошибками идет в самом конце
app.use(errorHandler)

PORT = process.env.PORT || 5000


const start = async () => {
    try {
        await sequelize.authenticate()//устаналвливается полдключение к бд
        await sequelize.sync()//сверяет состояние бд со схемой бд
        app.listen(PORT, () => { console.log(`server started on PORT:${PORT}`) })

    } catch (e) {
        console.log(e)
    }
}

start()