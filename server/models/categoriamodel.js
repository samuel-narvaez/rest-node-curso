var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var categoriaSchema = new Schema({
    descripcion: { type: String, required: false },
});


module.exports = mongoose.model('Categoria', categoriaSchema);