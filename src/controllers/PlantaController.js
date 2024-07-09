const planta = require("../models/Plantas")
const usuario = require("../models/Usuario")
const { verify } = require ('jsonwebtoken')


class PlantaController{    

// Cadastrar uma planta             TESTAR - STATUS =           
    async cadastrar(req, res) {       
try {
    const {nome_da_planta, descricao, habitat, localizacao} = req.body
    const decoder = verify(req.headers.authorization, process.env.SECRET_JWT)
    const usuario_if = decoder.usuario_id

if (!nome_da_planta) {   
return res.status(400).json({ error: 'O nome da planta é obrigatorio!!'})
}

if (!descricao) {
            return res.status(400).json({ error: 'Descrição obrigatória, é necessário uma descriçao da planta!!' })
        }

if (!habitat) {
 return res.status(400).json({ error: ' Por Favor descreva o habitat da planta!!' })
 }

 if (!localizacao) {
    return res.status(400).json({ error: ' Localização obrigatoria!!' })
    }
 
 const existeUsuario = await usuario.findByPk(usuario_if)

 if (!existeUsuario){
    return res.status(400).json({error: 'Usuário não encontrado'})
 }
   
    
    const planta = await Planta.create({
        cep,
        descricao,
        habitat,
        localizacao,
        usuario_id: usuario_test
    })
    res.status(201).json(planta)

} catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Não foi possível cadastrar uma planta.' })
}

}

// Rota de listar todas as plantas  TESTAR - STATUS =
  async listar(req, res) {
    try {

const plantas = await Planta.findAll()
res.json(plantas)
        
    } catch (error) {
console.error(error.message)
res.status(500).json({error: 'Não foi possivel listar os destinos'})
        
    }
}

// Rota listar uma planta especifica TESTAR - STATUS =
async listarUm(req, res) {
 try {

    const { id } = req.params 

    const planta = await Planta.findByPk(id)

if (!planta) {
    return res.status(404).json({ error: "Planta não encontrada"})
}

res.json(planta)    

 } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: 'Não foi possivel listar a planta específica'})
    
 }
}

// Rota para atualizar uma planta existente  TESTAR - STATUS =
async atualizar(req, res) {
    try {
        const { id } = req.params;
        const { nome_da_planta, descricao, habitat, localizacao } = req.body;
        const decoder = verify(req.headers.authorization, process.env.SECRET_JWT);
        const usuario_test = decoder.usuario_id;

        const planta = await Planta.findByPk(id);

        if (!planta) {
            return res.status(404).json({ error: 'Planta não encontrada' });
        }

        if (planta.usuario_id !== usuario_test) {
            return res.status(403).json({ error: 'Usuário não autorizado a atualizar está planta' });
        }

        if (!nome_da_planta|| !descricao || !habitat || !localizacao) {
            return res.status(400).json({ error: 'Campos nome da planta, descrição, habitat e localização são obrigatórios' });
        }

       
        planta.nome_da_planta = nome_da_planta;
        planta.descricao = descricao;
        planta.habitat = habitat;
        planta.localizacao = localizacao;
        

        await planta.save();
        res.json(planta);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Não foi possível atualizar a planta' });
    }
}


// Rota para deletar uma planta existente    TESTAR - STATUS =
async deletar(req, res) {
    try {
        const { id } = req.params;
        const decoder = verify(req.headers.authorization, process.env.SECRET_JWT);
        const usuario_test = decoder.usuario_id;

        const planta = await Planta.findByPk(id);

        if (!planta) {
            return res.status(404).json({ error: 'Planta não encontrada' });
        }

        if (planta.usuario_id !== usuario_test) {
            return res.status(403).json({ error: 'Usuário não autorizado a deletar está planta' });
        }

        await planta.destroy();
        res.sendStatus(204);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Não foi possível deletar a planta' });
    }
}

}
 module.exports = new PlantaController();















// Rota de atualizar um destino

// async atualizar(req, res) {

//     const id  = req.params.id
//     const { cep, descricao } = req.bory

// try {

//     const destino = await Destino.findByPk(id)
//     if (!destino) {
//         return res.status(400).json({ error: " Desstino não encontrado" })
//     }

//     //  Obter longitude e latitude a partir do cep
     
//     const { latitude, longitude } = await mapService.getCepCoordinates(cep)

//     destino.cep = cep
//     destino.endereco = endereco
//     destino.descricao = descricao
//     destino.latitude = latitude
//     destino.longitude = longitude
//     destino.usuario_id = usuario_id

//     await destino.save()

//     res.status(200).json({ message: "Destino atualizado com sucesso"})

// } catch (error) {
//     console.error(error.message)
//     res.status(500).json({error: 'Não foi possivel atualizar o destino' })
    
// }

// }





















 //  const novoDestino = await Destino.create({
//     cep,
//     endereco,
//     descricao,
//     latitude,
//     longitude,
//     usuario_id
//  })

//  res.status(201).json(novoDestino)

// } catch (error) {
//     console.error(error.message)
//     res.status(500).json({error: 'Não foi possivel cadastrar o destino'})
// }