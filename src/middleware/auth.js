// Verificar a autenticidade do token informado!                                                                     //FEITO 100%

const { verify } = require("jsonwebtoken")

async function auth(req, res, next) {
    try {
        const { authorization } = req.headers

         console.log("Entramos no Middleware")

        req['payload'] = verify(authorization, process.env.SECRET_JWT)

        next()

    } catch (error) {
        return res.status(401).json({
            message: "Autenticação Falhou!",
            cause: error.message
        })
    }
}

module.exports = { auth }