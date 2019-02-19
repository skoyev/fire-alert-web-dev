"user strict";

/**
 * FranchaiseeService Enpoint Class
 */
let FranchaiseeService = (function(config){
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
   * Find franchaisee
   */
  const findFranchaisee = async (req, res) => {    
    try { 
        let urlParts = req.url.split('/');
        let searchByUserID = urlParts.includes('user');
        let id = urlParts.length > 0 ? parseInt(urlParts[urlParts.length - 1]) : null;
        let query = constants.FetchFranchaiseeQuery;
        let params = [];

        if(searchByUserID && id) {
            query  = constants.FetchFranchaiseeByUserIDQuery;
            params = [id]
        }
        console.log('Calling fetch franchaisee...')
        pool.query(query,params)
            .then(rs => {
                if(rs.rows.length > 0){
                    res.status(200).json(id ? rs.rows[0] : rs.rows);              
                } else {
                    throw new Error(`No franchaisee has been found for the id ${id}`)
                }
            }).catch(e => res.status(200).json(e.stack))
    } catch (ex) {
      res.status(500)
         .json(new (require('../models/profileResponse'))
                      (constants.Fail, ex.message));
    }
  }

  return {
    findFranchaisee : findFranchaisee,
    init     : init
  };

})(config);

exports.findFranchaisee = FranchaiseeService.findFranchaisee;
exports.init     = FranchaiseeService.init;
