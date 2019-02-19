"user strict";

/**
 * ProfileService Enpoint Class
 */
let ProfileService = (function(config){
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
   * Find profiles
   */
  const findProfile = async (req, res) => {    
    try { 
        var id = req.params.id; 
        if(id) {      
            console.log('Calling fetch profile...')
            pool.query(constants.FetchProfileByIDQuery, [id])
                .then(rs => {
                    if(rs.rows.length > 0){
                        let profile = rs.rows[0];
                        // Find Business Profile
                        pool.query(constants.FetchBusinessProfileQuery, [id])
                            .then(rs => {
                                profile.business = rs.rows.length > 0 ? rs.rows[0] : {};
                                // Find Personal Profile
                                pool.query(constants.FetchPersonalProfileQuery, [id])
                                    .then(rs => {
                                        profile.personal = rs.rows.length > 0 ? rs.rows[0] : {};
                                        //const profileResponse = new (require('../models/profileResponse'))
                                          //                          (constants.Success, profile);      
                                        console.log(profile);
                                        res.status(200).json(profile);              
                                    }
                                );
                            }
                        );
                    } else {
                        throw new Error(`More then 1 profile has been found for the id ${id}`)
                    }
                })
                .catch(e => console.error(e.stack))
        } else {
            res.status(500)
               .json(new (require('../models/profileResponse'))
                            (constants.Fail, 'Profile Error.'));   
        }
    } catch (ex) {
      res.status(500)
         .json(new (require('../models/profileResponse'))
                      (constants.Fail, ex.message));
    }
  }

  return {
    findProfile : findProfile,
    init        : init
  };

})(config);

exports.findProfile = ProfileService.findProfile;
exports.init        = ProfileService.init;
