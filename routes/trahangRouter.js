const { Router } = require('express');
const express = require('express');
const Trahang = require('../controllers/trahang.Controller');

//Router
const router = express.Router();

router.route('/trahang').get(Trahang.findAllTH);

module.exports = router;
