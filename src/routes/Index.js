const express = require('express').Router()
const controller = require('../controller/Index')
const middleware = require('../../middleware/auth')

express.get('/', middleware.requireAuth, controller.Index)
express.get('/tabel-kegiatan-harian', middleware.requireAuth, controller.tableKegiatanHarian)
express.get('/tabel-kegiatan', middleware.requireAuth, controller.tableKegiatan)
express.get('/form-kegiatan', middleware.requireAuth, controller.formKegiatan)
express.post('/form-kegiatan', middleware.requireAuth, controller.postKegiatan)
express.post('/form-kegiatan/:id', middleware.requireAuth, controller.updateKegiatan)
express.get('/update-status-kegiatan/:id/:status', middleware.requireAuth, controller.updateStatusKegiatan)

module.exports = express