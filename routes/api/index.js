const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
// router.use('/bins', require('./bins'));

module.exports = router;