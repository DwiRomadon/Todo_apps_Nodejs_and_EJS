const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { getProfile, getDateFormatYYMMDD } = require('../../utils/utils')
const moment = require('moment')
exports.Index = async (req, res) => {
    try {
        return res.render('./template', {
            page: 'page/index',
            profile: getProfile(req)
        })

    } catch (error) {
        console.log(error)
        return res.render('./500')
    }
}

exports.tableKegiatan = async (req, res) => {
    try {

        const getData = await prisma.kegiatan.findMany({ where: { id_users: getProfile(req).id, tanggal_input: new Date(getDateFormatYYMMDD()) } })
        return res.render('./template', {
            page: 'page/tabel_kegiatan',
            data: getData,
            moment: moment,
            profile: getProfile(req)
        })
    } catch (error) {
        return res.render('./500')
    }
}

exports.formKegiatan = async (req, res) => {
    try {

        const getData = await prisma.kegiatan.findMany({
            where: {
                id_users: getProfile(req).id,
                tanggal_input: new Date(getDateFormatYYMMDD())
            }, take: 3, orderBy: { id: 'desc' }
        })
        return res.render('./template', {
            page: 'page/input_kegiatan',
            data: getData,
            moment: moment,
            profile: getProfile(req)
        })

    } catch (error) {
        return res.render('./500')
    }
}

exports.postKegiatan = async (req, res) => {
    try {
        const data = req.body
        data.tanggal_input = new Date(getDateFormatYYMMDD())
        data.id_users = getProfile(req).id
        await prisma.kegiatan.create({ data: data })
        res.writeHead(302, {
            'Location': '/form-kegiatan',

        })
        res.end()

    } catch (error) {
        console.log(error)
        return res.render('./500')
    }
}

exports.updateStatusKegiatan = async (req, res) => {
    try {
        await prisma.kegiatan.update({ where: { id: Number(req.params.id) }, data: { tercapai: JSON.parse(req.params.status) } })
        res.writeHead(302, {
            'Location': '/tabel-kegiatan',

        })
        res.end()
    } catch (error) {
        console.log(error)
        return res.render('./500')
    }
}

exports.updateKegiatan = async (req, res) => {
    try {
        const data = req.body
        await prisma.kegiatan.update({ where: { id: Number(req.params.id) }, data: data })
        res.writeHead(302, {
            'Location': '/tabel-kegiatan',

        })
        res.end()
    } catch (error) {
        console.log(error)
        return res.render('./500')
    }
}