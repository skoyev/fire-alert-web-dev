"user strict";

/**
 * TeamService Enpoint Class
 */
let TeamService = (function(config){
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
   * Find team
   */
  const findTeam = async (req, res) => {    
    try { 
      let urlParts = req.url.split('/');
      let searchByFranchaiseeID = urlParts.includes('franchaisee');
      let id = urlParts.length > 0 ? parseInt(urlParts[urlParts.length - 1]) : null;
      let query = constants.FetchTeamQuery;
      let params = [];

      if(searchByFranchaiseeID && id) {
          query  = constants.FetchTeamByFranchaiseeIDQuery;
          params = [id]
      }

      pool.query(query, params)
          .then(rs => {
                if(rs.rows.length > 0){
                    let team = id ? rs.rows[0] : rs.rows;
                    team.employees = []
                    res.status(200).json(team);              
                } else {
                    throw new Error(`More then 1 team has been found for the id ${id}`)
                }
          }).catch(e => console.error(e.stack))
    } catch (ex) {
      res.status(500)
         .json(new (require('../models/response'))
                      (constants.Fail, ex.message));
    }
  }

  return {
    findTeam : findTeam,
    init     : init
  };

})(config);

exports.findTeam = TeamService.findTeam;
exports.init     = TeamService.init;
