const ApiError = require("../error/ApiError")

class UserController {
    async registration(req, res) {

    }

    async login(req, res) {

    }

    async check(req, res) {
        const { id } = req.query
        if (!id) {
            return next(ApiError.badRequest('u must send id'))
        }
        res.json(query)
    }
}

module.exports = new UserController()