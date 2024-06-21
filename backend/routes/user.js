const express = require('express');
const { updateUser } = require('../controller/usercontroller');

const router = express.Router();

router.put('/:id', updateUser);

module.exports = router;
