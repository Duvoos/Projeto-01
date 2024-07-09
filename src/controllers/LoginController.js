// const { compare, hash } = require("bcryptjs")
const Usuario = require("../models/Usuario")
const { sign } = require('jsonwebtoken')


 

class LoginController {      

// Fazer login        TESTAR - STATUS = 

    async login(req, res) {
        try {
            const email = req.body.email
            const senha = req.body.senha

            if (!email) {
                return res.status(400).json({ message: 'O email é obrigatório' })
            }

            if (!senha) {
                return res.status(400).json({ message: 'A senha é obrigatório' })
            }

            const usuario = await Usuario.findOne({
                where: { email: email }
            })

            if (!usuario) {
                return res.status(404).json({ error: 'Nenhum usuario corresponde ao email e senha fornecidos!' })
            }
             
            const hashSenha = await compare(senha, usuario.senha)

            if(hashSenha === false) {
                return res.status(400).json({mensagem: 'Não encontrado essa conta'})
            }

            const payload = { sub: usuario_id, email: usuario.email, nome: usuario.nome }

            const token = sign(payload, process.env.SECRET_JWT)

            res.status(200).json({ Token: token })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error, message: 'Algo deu errado!' })
        }
    }
}

module.exports = new LoginController()





