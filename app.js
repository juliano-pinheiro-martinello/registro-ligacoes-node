import express from 'express'

import ligacoesRouter from './routes/registro.js'
import knex from 'knex';
import { development } from './knexfile.js';

const app = express();
const port = 3010;

const db = knex(development)

// middleware para autenticação usando Basic 
export function authentication(req, res, next) {
  const authHeader = req.headers.authorization;
  // console.log(req.headers);

  if (!authHeader) {
    let err = new Error('Usuario não autenticado');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err);
  }
  const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  const user = auth[0];
  const pass = auth[1];

  db.select('user', 'name', 'password', 'idUser').from('users').where('user', user).then((data) => {
    if (data.length == 0) {
      let err = new Error('Usuario não autenticado');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
    }

    if (data[0].password == Buffer.from(pass).toString('base64')) {
      req.user = {
        idUser: data[0].idUser,
        user: data[0].user,
        name: data[0].name
      }
      next();
    } else {
      let err = new Error('Usuario não autenticado');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
    }
  })

}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/ligacoes', ligacoesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({ err });

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

