const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');
const {secret} = require('../config');

const generateAccessToken = (username, roles) => {
    const payload = {
        id: username,
        username: username,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}
class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Ошибка при регистрации', errors });
            }
            const {username, password} = req.body;
            const candidate = await User.findOne({username});
            if (candidate) {
                return res.status(400).json({message: 'User already exist'});
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: 'ADMIN'})
            const user = new User({username, password: hashPassword, roles: [userRole.value]});
            await user.save();
            return res.json({message: 'Пользователь успешно зарегистрирован'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'});
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if (!user) {
                return res.status(400).json({message: `Пользователь ${username} не найден`});
            }
            const validPassword  = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({message: `Пароль не верный`});
            }
            const token = await generateAccessToken(username, user.roles);
            return res.json({token});

        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'});
        }
    }

    async getUser(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodeData = jwt.verify(token, secret);
            res.json(decodeData);
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'GetUsers error'});
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (e) {

        }
    }

    async deleteUser(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodeData = jwt.verify(token, secret);

            if (decodeData?.username === req.params.id) {
                res.status(400).json({message: 'Нельзя удалить себя'});
            }
            const person = await User.findOne({username: req.params.id})
            const isDelete = await User.deleteOne({username: req.params.id});

            if (isDelete.deletedCount == 1) {
                res.json(person?.username);
            } else {
                res.status(400).json({message: 'Ошибка удаления пользователя'});
            }

        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'GetUsers error'});
        }
    }
}

module.exports = new AuthController();