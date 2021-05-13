const express = require('express');
const KhachHangController = require('./../controllers/khachhang.Controller');

//Router
const router = express.Router();

router.route('/khachhang').get(KhachHangController.findAllKhachHang);

module.exports = router;
