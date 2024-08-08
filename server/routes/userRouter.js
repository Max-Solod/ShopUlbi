const authMiddleware = require('../middleware/authMiddleware')
const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')


router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

module.exports = router