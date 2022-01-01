const product = require('../models/product');

exports.createProduct = (req, res, next) => {
    delete req.body._id;
    const newProduct = new product({
      ...req.body
    });
    newProduct.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  }

exports.modifyProduct = (req, res, next) => {
    product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié' }))
    .catch(error => res.status(400).json({ error }));
}

exports.deleteProduct = (req, res, next) => {
    product.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé'}))
    .catch(error => res.status(400).json({ error }));
}

exports.getOneProduct = (req, res, next) => {
    product.findOne({ _id: req.params.id })
    .then(newProduct => res.status(200).json(newProduct))
    .catch(error => res.status(404).json({ error }));
}

exports.getAllProducts = (req, res, next) => {
    product.find()
    .then(newProducts => res.status(200).json(newProducts))
    .catch(error => res.status(400).json({ error }));
}