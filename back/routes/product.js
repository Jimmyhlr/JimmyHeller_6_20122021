const express = require('express');
const router = express.Router();

const productCtrl = require('../controllers/product');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('', auth, multer, productCtrl.createProduct);
router.put('/:id', auth, multer, productCtrl.modifyProduct);
router.delete('/:id', auth, multer, productCtrl.deleteProduct);
router.get('/:id', auth, multer, productCtrl.getOneProduct);
router.get('', auth, multer, productCtrl.getAllProducts);
router.post('/:id/like', auth, multer, productCtrl.likeProduct)

module.exports = router;