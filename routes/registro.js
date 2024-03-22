import { Router } from 'express';
import knex from 'knex'
import { attachPaginate } from 'knex-paginate'
import { authentication } from '../app.js';
const router = Router();
import { development } from '../knexfile.js';

const db = knex(development)
attachPaginate(db)

/* GET home page. */
router.post('/', authentication, function (req, res) {
  const { body, user } = req;

  let ligacao = {
    id: 0,
    nomeContato: body.nomeContato,
    canal: body.canal,
    tipo: body.tipo,
    created_at: '',
    observacoes: body.observacoes,
    filial: {
      idFilial: body.idFilial,
      nome: ''
    },
    user: {
      ...user
    }
  }

  db.select('idFilial', 'nome').from('filiais').where('idFilial', body.idFilial).then((data) => {
    ligacao = { ...ligacao, filial: { ...ligacao.filial, nome: data[0].nome } }
    db('ligacoes').insert({
      nomeContato: body.nomeContato,
      canal: body.canal,
      tipo: body.tipo,
      observacoes: body.observacoes,
      idFilial: data[0].idFilial,
      idUser: user.idUser
    }, ['id', 'idFilial', 'nomeContato', 'canal', 'tipo', 'idUser', 'created_at', 'updated_at']).then((data) => {
      ligacao = { ...ligacao, created_at: data[0].created_at, id: data[0].id }
      res.status(201).json(ligacao);
    }).catch((err) => {
      console.log(err)
      res.status(500).json({ err })
    })
  })

});

// GET /ligacoes - Retorna todas as ligações do usuario
router.get('/', authentication, function (req, res, next) {
  const { user, query } = req
  console.log(query)

  let ligacao = {
    id: 0,
    nomeContato: '',
    canal: '',
    tipo: '',
    created_at: '',
    observacoes: '',
    filial: {
      idFilial: 0,
      nome: ''
    },
    user: {
      ...user
    }
  }


  db('ligacoes').join('filiais', 'ligacoes.idFilial', '=', 'filiais.idFilial').select('*').where('idUser', user.idUser).paginate({ perPage: 10, currentPage: query.page, isLengthAware: true }).then((retorno) => {
    ligacao = retorno.data.map((item) => (
      {
        ...ligacao,
        id: item.id,
        nomeContato: item.nomeContato,
        canal: item.canal,
        observacoes: item.observacoes,
        tipo: item.tipo,
        created_at: item.created_at,
        filial: {
          idFilial: item.idFilial,
          nome: item.nome
        }
      }
    ))
    res.status(200).json({ ligacao, pagination: retorno.pagination });
  }).catch((err) => {
    console.log(err)
    res.status(500).json({ err })
  })



})

// GET /ligacoes/all - Retorna todas as ligações
router.get('/all', function (req, res) {
  const { query } = req

  let ligacao = {}

  db('ligacoes').join('filiais', 'ligacoes.idFilial', 'filiais.idFilial').join('users').select('users.idUser', 'users.user', 'users.name', 'ligacoes.*', 'filiais.*').paginate({ perPage: 10, currentPage: query.page, isLengthAware: true }).then((retorno) => {
    console.log(retorno)
    ligacao = retorno.data.map((item) => (
      {
        id: item.id,
        nomeContato: item.nomeContato,
        canal: item.canal,
        tipo: item.tipo,
        observacoes: item.observacoes,
        created_at: item.created_at,
        updated_at: item.updated_at,
        filial: {
          idFilial: item.idFilial,
          nome: item.nome
        },
        user: {
          idUser: item.idUser,
          first_name: item.first_name,
          last_name: item.last_name
        }
      }
    ))
    res.status(200).json({ ligacao, pagination: retorno.pagination });
  }).catch((err) => {
    console.log(err)
    res.status(500).json({ err })
  })
})


// PUT /ligacoes/:id - Atualiza uma ligação
router.put('/:id', authentication, function (req, res, next) {
  const { body, params } = req
  const { id } = params

  db('ligacoes').where('id', id).update({
    nomeContato: body.nomeContato,
    canal: body.canal,
    tipo: body.tipo,
    idFilial: body.idFilial,
    observacoes: body.observacoes,
    updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
  }, ['id', 'idFilial', 'nomeContato', 'canal', 'tipo', 'created_at', 'updated_at']).then((data) => {
    res.status(200).json(data);
  }).catch((err) => {
    console.log(err)
    res.status(500).json({ err })
  })
})


// DELETE /ligacoes/:id - Deleta uma ligação
router.delete('/:id', authentication, function (req, res, next) {
  const { params } = req
  const { id } = params
  db('ligacoes').where('id', id).del().then((data) => {
    res.status(200).json({ mensagem: 'Ligação excluida com sucesso!' });
  }).catch((err) => {
    console.log(err)
    res.status(500).json({ err })
  })
})


export default router;
