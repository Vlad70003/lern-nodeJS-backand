const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController')
const {check} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль добжен быть больше 4 и меньше 10 символов").isLength({
        min: 4,
        max: 10,
    }),
], controller.registration)

router.post('/login', controller.login)

router.get('/user', authMiddleware, controller.getUser)

router.get('/users', authMiddleware, controller.getUsers)

router.delete('/deleteUser/:id', authMiddleware, controller.deleteUser)

module.exports = router;