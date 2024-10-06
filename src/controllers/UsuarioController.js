const Usuario = require('../models/Usuario')
const { verify } = require('jsonwebtoken');

class UsuarioController {

    async cadastrarUsuario(req, res) {
try {
    const nome = req.body.nome
    const sexo = req.body.sexo  
    const cpf = req.body.cpf
    const endereco = req.body.endereco
    const email = req.body.email
    const senha = req.body.senha
    const data_nascimento = req.body.data_nascimento

    if (!nome) {
        return res.status(400).json({ message: 'O nome é obrigatório' })
    }

if (!sexo) {
    return res.status(400).json({message: 'O sexo é obrigatório' })
}

if (!cpf) {
    return res.status(400).json({message: 'O cpf é obrigatório' })
}

if (!cpf.match(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)) {
    return res.status(400).json({ message: 'O cpf não está no formato correto' });
}

if (!endereco) {
    return res.status(400).json({message: 'O endereço é obrigatório' })
}

if (!email) {
    return res.status(400).json({message: 'O email é obrigatório' })
}

if (!senha) {
    return res.status(400).json({message: 'A senha é obrigatório' })
}

if (!data_nascimento) {
    return res.status(400).json({ message: 'A data de nascimento é obrigatória' })
}

if (!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)) {
    return res.status(400).json({ message: 'A data de nascimento não está no formato correto' })
}


    const usuario = await Usuario.create({
        nome: nome,
        sexo: sexo,
        cpf: cpf,
        endereco: endereco,
        email: email,
        senha: senha,
        data_nascimento: data_nascimento,
    })
    res.status(201).json(usuario)

} catch (error) {
    console.log(error.message)
    res.status(500).json({ error: 'Não possível cadastrar o usuario' })
}
}

async listar(req, res){
    const usuarios = await Usuario.findAll()
    res.json(usuarios)
  }
  
  async listarUm(req,res) {
    try {

        const { id } = req.params

        const usuario = await Usuario.findByPk(id)

        if (!usuario) {
            return res.status(404).json({ message: "Usuário não encontrado!" })
        }

        res.json(usuario)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            error: 'Não possível listar o usuario especifico',
            error: error
        })
    }
}

async atualizar(req, res) {
    const { id } = req.params

    try {
        const usuario = await Usuario.findByPk(id)
        if (!usuario) {
            return res.status(400).json({ erro: 'Usuario não encontrado' })
        }
        await usuario.update(req.body)
        await usuario.save()

        res.status(200).json({ mensagem: 'Usuario alterado com sucesso!' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ erro: 'Erro ao atualizar usuario' })
    }
}

async excluir(req, res) {
    try {
        const { id } = req.params
        const usuario = await Usuario.findByPk(id)

        if (!usuario) {
            return res.status(404).json({ erro: "Usuario não foi encontrado" })
        }

       Usuario.destroy({
            where: {
                id: id
            }
        })

        res.status(204).json({ mensagem: 'Usuario excluído com sucesso' })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            error: "Não foi possível localizar o usuario",
            error: error
        })
    }
}

}

module.exports = new UsuarioController()


