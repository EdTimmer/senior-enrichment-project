const express = require('express');
const app = express();
const path = require('path');

const db = require('./db');
const { sync, seed } = db;
const { Campus, Student } = db.models;

app.use(require('body-parser').json());

app.use('/dist', express.static(path.join(__dirname, 'dist')));

// app.use('./vendor', express.static(path.join(__dirname, 'node_modules')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/campuses', (req, res, next)=> {
  Campus.findAll()
    .then( campuses => res.send(campuses))
    .catch(next);
});

app.get('/api/students', (req, res, next)=> {
  Student.findAll()
    .then( students => res.send(students))
    .catch(next);
});

// app.post('/api/campuses/:id/students', (req, res, next)=> {
//   Student.create({ campusId: req.params.id })
//     .then( student => res.send(student))
//     .catch(next);
// });

app.post('/api/campuses/create', (req, res, next)=> {
  Campus.create(req.body)
    .then( campus => res.send(campus))
    .catch(next);
});

app.post('/api/students/create', (req, res, next)=> {
  Student.create(req.body)
    .then( student => res.send(student))
    .catch(next);
});

app.use((err, req, res, next)=> {
  res.status(500).send(err);
});

const port = process.env.PORT || 3000;

app.listen(port, ()=> `listening on port ${port}`);

sync()
  .then(()=> seed());