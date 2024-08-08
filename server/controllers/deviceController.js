const uuid = require('uuid')//генерация рондомных имен
const path = require('path')//перемещает файл
const { Device, DeviceInfo } = require('../models/models')

class deviceController {
    async create(req, res) {
        try {
            let { name, price, brandId, typeId, info } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + '.jpg'//генерация рондомных имен
            img.mv(path.resolve(__dirname, '..', 'static', fileName))//перемещает файл в папку статик
            const device = await Device.create({ name, price, brandId, typeId, img: fileName })



            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }


            return res.json(device)
        } catch (e) {
            console.log(e)
        }
    }

    async getAll(req, res) {
        let { brandId, typeId, limit, page } = req.body
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({ limit, offset })
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({ where: { brandId }, limit, offset })
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { typeId }, limit, offset })
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { typeId, brandId }, limit, offset })
        }
        return res.json(devices)

    }

    async getOne(req, res) {
        const { id } = req.params
        const device = await Device.findOne(
            {
                where: { id },
                include: [{ model: DeviceInfo, as: 'info' }]
            }
        )
        return res.json(device)
    }
}


module.exports = new deviceController()