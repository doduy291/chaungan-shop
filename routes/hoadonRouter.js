const express = require('express');
const hoadonController = require('../controllers/hoadon.Controller');

//Router
const router = express.Router();

router.route('/hoadon').get(hoadonController.findAllHD);

router.route('/hoadon/search').get(hoadonController.findSearchHD);
router.route('/hoadon/chitiethoadon/:id').get(hoadonController.findDetailHD);

module.exports = router;
