const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'views')));

app.get('/form', (req, res, next) => {
    res.sendFile(__dirname + '/form.html');
})
var arr = []

app.post('/table', (req, res, next) => {
    arr.push(req.body)
    res.render('table', { arr: arr })
})

app.get('/table', (req, res, next) => {
    res.render('table', { arr: arr })
})

app.post('/delete', (req, res, next) => {
    var del = req.body.Del;
    var INDEX = Number(del);
    arr.splice(INDEX, 1)
    res.redirect('/table')
})

app.post('/update', (req, res, next) => {
    var Upd = req.body.Upd;
    var index = Number(Upd);
    res.render('form2', { arr: arr[index], index: index })
})

app.post('/table2', (req, res, next) => {
    var change = req.body.index;
    var index = Number(change)
    arr.splice(index, 1);
    arr.unshift(req.body);
    res.render('table', { arr: arr })
})

app.listen(4040)