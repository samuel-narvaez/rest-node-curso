require('./server/config/config');


const express = require('express');
const mongoose = require('mongoose');

const app = express();

//Middel
const bodyparser = require('body-parser');

//parse application/x-www-form-urlencode
app.use(bodyparser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyparser.json());



app.use(require('./server/routes/index'));



//conexions mongoose
mongoose.connect('mongodb://localhost:27017/cafe', (err, res) => {
    if (err) throw err;
    console.log('Base de datos Online');

});



//Port
app.listen(process.env.PORT, () => {
    console.log('Listener in port:', process.env.PORT);
});