"user strict";

/**
 * UserService Enpoint Class
 */
let UserService = (function(config){
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
   * User login.
   */
  const login = async (request, response) => {
    try {  
      const {username, password} = request.body;
      console.log('Calling login...')
      if((username && username.length > 0) && 
            (password && password.length > 0)) {
        pool.query(constants.LoginUserNamePassword, [username, password])
            .then(rs => {
              console.log(`Size ${rs.rows.length}`)
              if(rs.rows.length == 1) {
                let user = rs.rows[0]
                console.log(user)
                pool.query(constants.FindUserQuery, [user.id])
                    .then(rs => {
                      if(rs.rows.length == 1) {
                        user.roles = rs.rows;                        
                        const userResponse = new (require('../models/userResponse'))
                                            (constants.Success, user);      
                        response.status(200).json(userResponse);              
                      } else {
                        response.status(500)
                                .json(new (require('../models/userResponse'))
                                     (constants.Fail, 'User Role Error'));
                      }
                    })
              } else {
                const userResponse = new (require('../models/userResponse'))
                                      (constants.Fail, '', 'More then 1 or not found profile has been found for this user...');      
                response.status(200).json(userResponse);              
              }
            })
            .catch(e => console.error(e.stack))
      } else {
        throw new Error('username or password is not provided')
      }
    } catch (ex) {
      response.status(500)
         .json(new (require('../models/userResponse'))
                      (constants.Fail, ex.message));
    }
  }

  /**
   * Find users
   */
  const findUsers = async (req, res) => {    
    try {      
      pool.query(constants.FetchAllUsers, [])
          .then(rs => {
              const userResponse = new (require('../models/userResponse'))
                                      (constants.Success, rs.rows[0]);      
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
    login : login,
    init  : init
  };

})(config);

exports.findUsers = UserService.findUsers;
exports.init  = UserService.init;
exports.login = UserService.login;
