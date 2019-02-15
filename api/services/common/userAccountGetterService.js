"user strict";

let UserAccountGetterService = (function(){
  let constants;
  let userAccount;
  let directoryDataService;
  let accountService;
  let userAccountDBService;
  let api;
  let serviceResponse;
  let assert;

  let init = function(){
    api         = require('./apiService');
    constants   = require('../../model/constants');
    userAccount = require('../../model/userAccount');
  }

  /**
   * Get user account by user name.
   */
  var getByUserName = async function(userName){
    init();
    try {
      return await userAccountDBService.getByUserName(userName);
    } catch(ex) {
      console.log(ex);
      throw new Error('Error has happened during fetching user account by userName - ' + userName);
    }
  };

  /**
   * Create User Account Local
   */
  let userAccountCreateLocal = function(userName, password){
      let account = new userAccount('', '', userName, constants.Active, password);
      try {
        userAccountDBService.save(account);
      } catch(ex){
        console.log(ex);
        throw new Error('Error has happened during saving account ' + account);
      }
      return account;
  }

  /**
   * Check if current user is logged in by sessionID
   */
  let isAuthenticated = async function(req, res, next) {
      init();

      try {
        let sessionID = req.headers[constants.VNCAuthHeaderName];
        assert(sessionID, 'Session ID is required.');
        let session = await api.getSessionByID(sessionID);
        if(session){
          req.accountID = session.account.id;
          next();
        } else {
          let response = new serviceResponse(constants.Fail, 'Session ID is invalid');
          res.status(200).json(response);
        }
      } catch (ex) {
        let response = new serviceResponse(constants.Fail, ex.message);
        res.status(200).json(response);
      }
  }

  return {
    isAuthenticated : isAuthenticated,
    getByUserName   : getByUserName,
    userAccountCreateLocal : userAccountCreateLocal
  };
})();

exports.isAuthenticated = UserAccountGetterService.isAuthenticated;
exports.getByUserName   = UserAccountGetterService.getByUserName;
exports.userAccountCreateLocal = UserAccountGetterService.userAccountCreateLocal;