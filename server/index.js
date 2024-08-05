require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models.js')


const app = express()

PORT = process.env.PORT || 5000


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => { console.log(`server started on PORT:${PORT}`) })

    } catch (e) {
        console.log(e)
    }
}

start()