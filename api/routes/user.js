const express = require('express');
const router  = express.Router();
const userService = require('../services/userService');
userService.init();
//const uAccGetService  = require('../services/common/userAccountGetterService');

//router.use(uAccGetService.isAuthenticated);
router.get('/', userService.findUsers);
router.post('/auth', userService.login);

module.exports = router;