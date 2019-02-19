const express = require('express');
const router  = express.Router();
const profileService = require('../services/profileService');
profileService.init();
//const uAccGetService  = require('../services/common/userAccountGetterService');

//router.use(uAccGetService.isAuthenticated);
router.get('/:id', profileService.findProfile);
//router.post('/auth', userService.login);

module.exports = router;