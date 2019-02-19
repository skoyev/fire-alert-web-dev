const express = require('express');
const router  = express.Router();
const franchaiseeService = require('../services/franchaiseeService');
franchaiseeService.init();
//const uAccGetService  = require('../services/common/userAccountGetterService');

//router.use(uAccGetService.isAuthenticated);
router.get('/*', franchaiseeService.findFranchaisee);
//router.post('/auth', userService.login);

module.exports = router;