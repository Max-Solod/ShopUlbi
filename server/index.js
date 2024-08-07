require('dotenv').config()//из внешний среды
const express = require('express')
const sequelize = require('./db')//орм
const models = require('./models/models.js')
const router = require('./routes/index')
const cors = require('cors')//подключение к сторонним сервисам
const fielUpload = require('express-fileupload')//чтение файдов
const path = require('path')

// const errorHandler = require('./middleware/ErrorHandlingMiddleware')


const app = express()
app.use(cors())//подключение к сторонним сервисам
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fielUpload({}))//чтение файдов
app.use('/api', router)

//обязательно мидэлваре с ошибками идет в самом конце
// app.use(errorHandler)

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