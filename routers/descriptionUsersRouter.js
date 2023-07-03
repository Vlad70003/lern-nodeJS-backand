const Router = require('express')
const router = new Router()
const controller = require('../controllers/listController')
const {check} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/addToList', [
    check('name', "Поле name не может быть пустым").notEmpty(),
    check('description', "Поле description не может быть пустым").notEmpty(),
], controller.addToList);

router.get('/getList', authMiddleware, controller.getList);
router.delete('/delete/:id', authMiddleware, controller.delete);

module.exports = router;

