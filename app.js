var express = require('express')
var fs = require('fs')
const port = 3000
var cors = require('cors')
var app = express()

app.use(cors())
// app.use(express.static('public'))


app.get('/users', function (req, res, next) {
    fs.readFile('./data/users.json', 'utf8', (err, data) => {
        if (err) {
            res.json({ 'msg': err });
        }
        var obj = JSON.parse(data);
        // делаем что-то с obj
        res.json(obj);
    });

})



app.get('/', function (req, res) {

    fs.readFile('./index.html', 'utf8', (err, data) => {
        if (err) {
            res.send(err);
        }
        res.send(data);
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))