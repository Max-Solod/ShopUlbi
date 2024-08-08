//const ApiError = require("../error/ApiError")

const bcrypt = require('bcrypt')
const { User, Basket } = require('../models/models')
const jwt = require('jsonwebtoken')
const { json } = require('sequelize')

const generateJwt = (id, email, role) => {
    return jwt.sign({ id: id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {
    async registration(req, res) {
        const { email, password, role } = req.body
        const candidate = await User.findOne({ where: { email } })
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ email, role, password: hashPassword })
        const basket = await Basket.create({ userId: user.id })
        const token = generateJwt(user.id, user.email, user.role)
        return res.json(token)
    }

    async login(req, res) {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })
        if (!User) {
            return res.json({ message: "User not found" })
        }

        let comparePassord = bcrypt.compareSync(password, user.password)
        if (!comparePassord) {
            return res.json({ message: "Password not true" })
        }

        const token = generateJwt(user.id, user.email, user.role)
        return res.json(token)
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        res.json({ message: 'all working' })

    }
}

module.exports = new UserController()