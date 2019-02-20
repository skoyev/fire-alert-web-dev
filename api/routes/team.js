const express = require('express');
const router  = express.Router();
const teamService = require('../services/teamService');
teamService.init();
//const uAccGetService  = require('../services/common/userAccountGetterService');

//router.use(uAccGetService.isAuthenticated);
router.get('/*', teamService.findTeam);
router.post('/', teamService.createTeam);

module.exports = router;