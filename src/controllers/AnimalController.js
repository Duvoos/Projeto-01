const animal = require("../models/Animais")
const Usuario = require("../models/Usuario")
const { verify } = require ('jsonwebtoken')
// const mapService = require('../service/map.service')
// const axios = requiere('axios')

class AnimalController {
    // Cadastrar um animal
 async cadastrar(req, res) {
        try {
            const { nome_do_animal, descricao, habitat, localizacao } = req.body;
            const decoder = verify(req.headers.authorization, process.env.SECRET_JWT);
            const usuario_id = decoder.usuario_id;

            if (!nome_do_animal) {
                return res.status(400).json({ error: 'O nome do animal é obrigatório!' });
            }

            if (!descricao) {
                return res.status(400).json({ error: 'Descrição obrigatória, é necessário uma descrição do animal!' });
            }

            if (!habitat) {
                return res.status(400).json({ error: 'Por favor, descreva o habitat do animal!' });
            }

            if (!localizacao) {
                return res.status(400).json({ error: 'Localização obrigatória!' });
            }

            const existeUsuario = await Usuario.findByPk(usuario_id);

            if (!existeUsuario) {
                return res.status(400).json({ error: 'Usuário não encontrado' });
            }

            const animal = await Animal.create({
                nome_do_animal,
                descricao,
                habitat,
                localizacao,
                usuario_id: usuario_id
            });
            res.status(201).json(animal);
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: 'Não foi possível cadastrar o animal.' });
        }
    }

    // Listar todos os animais
    async listar(req, res) {
        try {
            const animais = await Animal.findAll();
            res.json(animais);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Não foi possível listar os animais' });
        }
    }

    // Listar um animal específico
    async listarUm(req, res) {
        try {
            const { id } = req.params;
            const animal = await Animal.findByPk(id);

            if (!animal) {
                return res.status(404).json({ error: 'Animal não encontrado' });
            }

            res.json(animal);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Não foi possível listar o animal específico' });
        }
    }

    // Atualizar um animal existente
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome_do_animal, descricao, habitat, localizacao } = req.body;
            const decoder = verify(req.headers.authorization, process.env.SECRET_JWT);
            const usuario_id = decoder.usuario_id;

            const animal = await Animal.findByPk(id);

            if (!animal) {
                return res.status(404).json({ error: 'Animal não encontrado' });
            }

            if (animal.usuario_id !== usuario_id) {
                return res.status(403).json({ error: 'Usuário não autorizado a atualizar este animal' });
            }

            if (!nome_do_animal || !descricao || !habitat || !localizacao) {
                return res.status(400).json({ error: 'Campos nome do animal, descrição, habitat e localização são obrigatórios' });
            }

            animal.nome_do_animal = nome_do_animal;
            animal.descricao = descricao;
            animal.habitat = habitat;
            animal.localizacao = localizacao;

            await animal.save();
            res.json(animal);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Não foi possível atualizar o animal' });
        }
    }

    // Deletar um animal existente
    async deletar(req, res) {
        try {
            const { id } = req.params;
            const decoder = verify(req.headers.authorization, process.env.SECRET_JWT);
            const usuario_id = decoder.usuario_id;

            const animal = await Animal.findByPk(id);

            if (!animal) {
                return res.status(404).json({ error: 'Animal não encontrado' });
            }

            if (animal.usuario_id !== usuario_id) {
                return res.status(403).json({ error: 'Usuário não autorizado a deletar este animal' });
            }

            await animal.destroy();
            res.sendStatus(204);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Não foi possível deletar o animal' });
        }
    }
}

module.exports = new AnimalController();