const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const checkToken = {
    requireAuth: async function (req, res, next) {
        // const token = req.headers['access-token'];
        const usersAkses = req.headers.cookie

        if (usersAkses === undefined) {
            res.writeHead(302, {
                'Location': '/auth'
            })
            res.end()
        } else {
            const parseCookies = parseCookie(usersAkses)
            const dataUser = JSON.parse(parseCookies.userLogin)
            if (dataUser) {
                try {
                    const cariUser = await prisma.users.findMany({ where: { email: dataUser.email, token: dataUser.token } })
                    if (cariUser[0]) {
                        return next()
                    } else {
                        res.writeHead(302, {
                            'Location': '/auth'
                        })
                        res.end()
                    }
                } catch (err) {
                    res.writeHead(302, {
                        'Location': '/auth'
                    })
                    res.end()
                }
            } else {
                res.writeHead(302, {
                    'Location': '/auth'
                })
                res.end()
            }
        }


    }
}

function parseCookie(cookie) {
    var output = {};
    cookie.split(/\s*;\s*/).forEach(function (pair) {
        pair = pair.split(/\s*=\s*/);
        var name = decodeURIComponent(pair[0]);
        var value = decodeURIComponent(pair.splice(1).join('='));
        var splits = value.split('j:')
        output[name] = splits[1];
    });
    return output;
}

module.exports = checkToken;