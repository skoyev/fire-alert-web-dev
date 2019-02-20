const express = require('express');
const router  = express.Router();
const employeeService = require('../services/employeeService');
employeeService.init();
router.get('/:id', employeeService.findEmployeeByID);
router.post('/', employeeService.createEmployee);

module.exports = router;