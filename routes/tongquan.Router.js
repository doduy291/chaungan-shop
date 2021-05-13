const express = require('express');
const tongquan = require('./../controllers/tongquan.Controller');
const hoadonchoduyet = require('./../controllers/hoadonchoduyet.Controller');
const authJwt = require('../middleware/authJwt');
const hangkhachtra = require('../controllers/hangkhachtravakhachno.Controller');

//Router
const router = express.Router();

router
  .route('/tongquan')
  .get(authJwt.verifyToken, authJwt.isAdmin, tongquan.findHD);

router
  .route('/tongquan/hoadonchoduyet')
  .get(authJwt.verifyToken, authJwt.isAdmin, hoadonchoduyet.findAllHDchoduyet);
router
  .route('/tongquan/hoadondathanhtoan')
  .get(authJwt.verifyToken, authJwt.isAdmin, tongquan.findAllHDdathanhtoan);
router
  .route('/tongquan/danhsachhoadon')
  .get(authJwt.verifyToken, authJwt.isAdmin, tongquan.findAllHDToday);
router
  .route('/tongquan/hangkhachtravakhachno')
  .get(authJwt.verifyToken, authJwt.isAdmin, hangkhachtra.findHDKhachNo);

router.route('/tongquan/hoadonchoduyet/:id').get(authJwt.verifyToken, authJwt.isAdmin, hoadonchoduyet.update);

module.exports = router;
