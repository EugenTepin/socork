var express = require('express')
//var fs = require('fs')
var jwt = require('jsonwebtoken')
const port = 3000;
const secret = 'do not tell anyone!';
var cors = require('cors')
var app = express();

app.use(cors());
app.use(express.json());
// app.use(express.static('public'))

var options = {
    root: __dirname,
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
}


app.post('/login', function (req, res, next) {
    // fs.readFile('./data/users.json', 'utf8', (err, data) => {
    //     if (err) {
    //         res.json({ 'msg': err });
    //     }
    //     var obj = JSON.parse(data);
    //     // делаем что-то с obj
    //     res.json(obj);
    // });

})

app.post('/register', function (req, res, next) {
    //
    //console.log(req.body);
    var payload = {
        token: jwt.sign(req.body, secret)
    }
    res.json(payload);
})



app.get('/', function (req, res) {
    res.sendFile('index.html', options, function (err) {
        if (err) {
            next(err)
        } else {
            //console.log('Sent:', fileName)
        }
    })
})

app.get('/signup.html', function (req, res) {
    res.sendFile('signup.html', options, function (err) {
        if (err) {
            next(err)
        } else {
            //console.log('Sent:', fileName)
        }
    })
})


app.get('/protected.html', function (req, res) {
    res.sendFile('protected.html', options, function (err) {
        if (err) {
            next(err)
        } else {
            //console.log('Sent:', fileName)
        }
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))