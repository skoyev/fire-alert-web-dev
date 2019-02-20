"user strict";

/**
 * EmployeeService Enpoint Class
 */
let EmployeeService = (function(config){
  let client;

  const init = () => {
    const { Pool, Client } = require('pg')
    pool = new Pool({
      user:     config.database.username,
      host:     config.database.host,
      database: config.database.dbname,
      password: config.database.password,
      port:     config.database.port,
    })   
    constants = require('../models/constants');
  }

  /**
   * Create Employee
   * @param {*} req 
   * @param {*} res 
   */
  const createEmployee = async(req, res) => {
    try {
      const {name, type} = req.body;
      const {franchaisee_id}    = req.query;

      if(name && type && franchaisee_id) {
        console.log('Creating a new employee...');
        pool.query(constants.NewEmployeeQuery, [name, type, franchaisee_id])
            .then(rs => {
              res.status(200)
                 .json(new (require('../models/response'))(constants.Success));    
            }
        );
      } else {
        res.status(200)
          .json(new (require('../models/response'))(constants.Fail, 'Not enough params provided'));
      }
    } catch(ex) {
      res.status(500)
         .json(new (require('../models/response'))
                      (constants.Fail, ex.message));
    }
  }

  /**
   * Find employee
   */
  const findEmployeeByID = async (req, res) => {    
    try { 
      let urlParts = req.url.split('/');
      /*
      let id = urlParts.length > 0 ? parseInt(urlParts[urlParts.length - 1]) : null;
      let query = constants.FetchEmployeeByIDQuery;
      let params = [];

      if(id) {
          query  = constants.FetchTeamByFranchaiseeIDQuery;
          params = [id]
      }

      pool.query(query, params)
          .then(rs => {
                if(rs.rows.length > 0){
                    let team = id ? rs.rows[0] : rs.rows;
                    pool.query(constants.FetchEmployeesByTeamIDQuery, [team.id])
                        .then(rs => {
                          team.employees = rs.rows;
                          res.status(200).json(team);                    
                        }
                    );          
                } else {
                    throw new Error(`More then 1 team has been found for the id ${id}`)
                }
          }).catch(e => console.error(e.stack))
          */
    } catch (ex) {
      res.status(500)
         .json(new (require('../models/response'))
                      (constants.Fail, ex.message));
    }
  }

  return {
    findEmployeeByID : findEmployeeByID,
    createEmployee : createEmployee,
    init     : init
  };

})(config);

exports.findEmployeeByID   = EmployeeService.findEmployeeByID;
exports.createEmployee = EmployeeService.createEmployee;
exports.init           = EmployeeService.init;
