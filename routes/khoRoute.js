const { Router } = require('express');
const express = require('express');
const Kho = require('../controllers/kho.Controller');

//Router
const router = express.Router();

router.route('/tonkho').get(Kho.findAllKho);

module.exports = router;
