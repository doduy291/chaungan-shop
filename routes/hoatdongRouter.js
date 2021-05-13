const { Router } = require('express');
const express = require('express');
const Hoatdong = require('../controllers/hoatdong.Controller');

//Router
const router = express.Router();

router.route('/hoatdong').get(Hoatdong.findAllHoatDong);

module.exports = router;
