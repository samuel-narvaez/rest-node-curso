require('./server/config/config');


const express = require('express');
const app = express();

//Middel
const bodyparser = require('body-parser');

//parse application/x-www-form-urlencode
app.use(bodyparser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyparser.json());




////////////////////////////////////////////////////////

app.get('/usuario', function(req, res) {
    res.json('Get User');
});

app.post('/usuario', function(req, res) {

    let body = req.body;

    res.json({
        Persona: body
    });
});

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;

    res.json({
        id
    });
});

app.delete('/usuario', function(req, res) {
    res.json('Delete User');
});

app.listen(process.env.PORT, () => {
    console.log('Listener in port:', process.env.PORT);
});