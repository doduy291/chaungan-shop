const express = require('express');
const phieunhapController = require('./../controllers/phieunhapController');

//Router
const router = express.Router();
router.route('/phieunhap').get(phieunhapController.findAllPN);



module.exports = router;
