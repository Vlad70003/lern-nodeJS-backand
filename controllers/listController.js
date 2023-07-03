const DescriptionUsers = require('../models/DescriptionUsers');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const {secret} = require('../config');

class ListController {

    async getList(req, res) {
        try {
            const users = await DescriptionUsers.find();
            const userFilter = await users?.map(item => ({name: item?.name, description: item?.description, id: item._id}))
            res.json(userFilter);
        } catch (e) {

        }
    }
    async addToList(req, res) {

        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Ошибка при добавлении пользователя', errors });
            }
            const {name, description} = req.body;
            const item = new DescriptionUsers({name, description});
            await item.save();
            return res.json(item)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'addToList error'});
        }
    }

    async delete(req, res) {
        console.log(req.params.id);
        const isDelete = await DescriptionUsers.deleteOne({_id: req.params.id});

        if (isDelete.deletedCount == 1) {
            res.json(req.params.id);
        } else {
            res.status(400).json({message: 'Ошибка удаления пользователя'});
        }
    }
}

module.exports = new ListController();