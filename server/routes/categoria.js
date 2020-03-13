const express = require('express');

const app = express();

let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const categoria = require('../models/categoriamodel');


//==============================
// Mostrar todas las categorias
//==============================
app.get('/categoria', (req, res) => {

    Categoria.find({})
        .sort('descripcion') //ordenar los datos por la descripcion
        .populate('usuario', 'nombre email') // schema y campos a llenar
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
        });

    res.json({
        ok: true,
        categoria: categoriaDB
    });
});


//==============================
// Mostrar una categoria por ID
//==============================
app.get('/categoria/:id', (req, res) => {

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'el id no es correcto'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });

});


//==============================
// Crear nueva categoria
//==============================
app.post('/categoria', verificaToken, (req, res) => {

    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });




});


//==============================
// actualizar una categoria
//==============================
app.put('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, reunValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

//==============================
// Eliminar una categoria
//==============================
app.get('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.param.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'el id no existe'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Categoria borrada'
        });
    })
});




module.exports = app;