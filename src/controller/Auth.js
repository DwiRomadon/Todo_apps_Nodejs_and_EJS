const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
    try {
        return res.render('./page/auth/login', { success: false, error: false, })
    } catch (error) {
        return res.render('./500')
    }
}

exports.register = async (req, res) => {
    try {
        return res.render('./page/auth/registrasi', {
            error: false,
        })
    } catch (error) {
        return res.render('./500')
    }
}

exports.postRegistrasi = async (req, res) => {
    try {
        const data = req.body
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(data.password, salt);
        data.password = hash
        const cekEmail = await prisma.users.findUnique({ where: { email: data.email } })
        if (cekEmail) {
            return res.render('./page/auth/registrasi', {
                error: true,
                msg: 'Email sudah digunakan'
            })
        } else {
            await prisma.users.create({ data: data })
            return res.render('./page/auth/login', {
                success: true,
                error: false
            })
        }

    } catch (error) {
        return res.render('./500')
    }
}

exports.postLogin = async (req, res, next) => {
    try {
        const data = req.body
        const cekUsers = await prisma.users.findUnique({ where: { email: data.email } })

        if (cekUsers) {
            if (bcrypt.compareSync(data.password, cekUsers.password)) {
                delete cekUsers.token
                const token = jwt.sign(cekUsers, 'devweb', { expiresIn: '1d' })
                const mail = cekUsers.email
                const updateUsers = await prisma.users.update({
                    where: { email: mail },
                    data: { token: token }
                })
                res.cookie('userLogin', updateUsers)
                res.writeHead(302, {
                    'Location': '/'
                })
                res.end()
            } else {
                return res.render('./page/auth/login', { success: false, error: true, msg: 'Password anda salah!!!' })
            }
        } else {
            return res.render('./page/auth/login', { success: false, error: true, msg: 'Email tidak terdaftar!!!' })
        }

    } catch (error) {
        console.log(error)
        return res.render('./500')
    }
}

exports.logOut = async (req, res) => {
    res.clearCookie('userLogin');
    res.writeHead(302, {
        'Location': '/auth'
    })
    res.end()
}