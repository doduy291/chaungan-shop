const { Router } = require('express');
const express = require('express');
const Nhacungcap = require('../controllers/nhacungcap.Controller');

//Router
const router = express.Router();

router.route('/nhacungcap').get(Nhacungcap.findAllNCC);

module.exports = router;
