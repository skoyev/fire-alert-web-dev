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
   * Create Team
   * @param {*} req 
   * @param {*} res 
   */
  const createTeam = async(req, res) => {
    try {
      const {name} = req.body;  
      const {franchaisee_id} = req.query
      if(name && franchaisee_id){
        let existTeam = await checkIfExistTeam(name, franchaisee_id);
        if(!existTeam){
          console.log('Creating a new team...');
          pool.query(constants.NewTeamQuery, [name, franchaisee_id])
              .then(rs => {
                res.status(200)
                   .json(new (require('../models/response'))(constants.Success));    
              }
          );  
        } else {
          res.status(500)
            .json(new (require('../models/response'))(constants.Fail, `Team already exist for the Franchaisee ID: ${franchaisee_id}`));    
        }
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

  const checkIfExistTeam = async(name, franchaisee_id) => {
    const result = await pool.query(constants.FindTeamQuery, [name, franchaisee_id]);
    return result.rows.length > 0;
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
                    pool.query(constants.FetchEmployeesByTeamIDQuery, [team.id])
                        .then(rs => {
                          team.employees = rs.rows;
                          res.status(200).json(team);                    
                        }
                    );          
                } else {
                    throw new Error(`More then 1 or Not Found team has been found for the frId ${id}`)
                }
          }).catch(e => res.status(500).json(e.message))
    } catch (ex) {
      res.status(500)
         .json(new (require('../models/response'))
                      (constants.Fail, ex.message));
    }
  }

  return {
    findTeam : findTeam,
    createTeam : createTeam,
    init     : init
  };

})(config);

exports.findTeam = TeamService.findTeam;
exports.createTeam = TeamService.createTeam;
exports.init     = TeamService.init;
