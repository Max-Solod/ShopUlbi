const uuid = require('uuid')//генерация рондомных имен
const path = require('path')//перемещает файл
const { Device } = require('../models/models')

class deviceController {
    async create(req, res) {
        try {
            const { name, price, brandId, typeId, info } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + '.jpg'//генерация рондомных имен
            img.mv(path.resolve(__dirname, '..', 'static', fileName))//перемещает файл в папку статик

            const device = await Device.create({ name, price, brandId, typeId, img: fileName })

            return res.json(device)
        } catch (e) {
            console.log(e)
        }
    }

    async getAll(req, res) {

    }

    async getOne(req, res) {

    }
}


module.exports = new deviceController()