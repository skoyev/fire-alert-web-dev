"user strict";

/**
 * UserService Enpoint Class
 */
let UserService = (function(config){
  let client;

  const init = () => {
    const { Pool, Client } = require('pg')
    pool = new Pool({
      user: config.database.username,
      host: config.database.host,
      database: config.database.dbname,
      password: config.database.password,
      port: config.database.port,
    })   
  }

  /**
   * Find users
   */
  const findUsers = async (req, res) => {
    const constants = require('../models/constants');
    try {      
      pool.query(constants.FetchAllUsers, [])
          .then(rs => {
            const userResponse = new (require('../models/userResponse'))
                                    (constants.Success, rs.rows);      
            res.status(200).json(userResponse);              
          })
          .catch(e => console.error(e.stack))
    } catch (ex) {
      res.status(500)
         .json(new (require('../models/userResponse'))
                      (constants.Fail, ex.message));
    }
  }

  return {
    findUsers : findUsers,
    init:init
  };

})(config);

exports.findUsers = UserService.findUsers;
exports.init = UserService.init;
