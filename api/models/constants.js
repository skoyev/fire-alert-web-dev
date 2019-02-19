"use strict"

module.exports = {
  VNCAuthHeaderName : "x-vnc-auth",
  VNCAuthZimbraHeaderName : 'zm_auth_token',
  Success : "SUCCESS",
  Fail : "FAIL",
  Full : "Full",
  Active : 'Active',
  NAME : 'name',
  Inactive : 'Inactive',
  FetchUserAccountByUserNameQuery : 'SELECT id, user_name, first_name, last_name, account_state from USER_ACCOUNT WHERE user_name = $1',
  CreateUserAccountQuery     : 'INSERT INTO USER_ACCOUNT (user_name, password, first_name, last_name, account_state) VALUES ($1, $2, $3, $4, $5)',
  DeleteUserAccountByIDQuery : 'DELETE FROM USER_ACCOUNT WHERE id = $1',
  FetchAllPreferencesQuery   : 'SELECT id, app_name, content, account_id, name FROM USER_PREFERENCE WHERE app_name = $1',
  CreatePreferenceQuery      : 'INSERT INTO USER_PREFERENCE (app_name, content, account_id, name) VALUES ($1, $2, $3, $4)',
  DeletePreferenceQuery      : 'DELETE FROM USER_PREFERENCE WHERE id = $1',
  UpdateUserPreferenceQuery  : 'UPDATE USER_PREFERENCE SET content = $1 WHERE app_name = $2 and account_id = $3',
  LoginUserNamePassword      : 'SELECT user_id as id, username, firstname as firstName, lastname as lastName from users where username = $1 and password = $2',
  FindUserQuery             :  'SELECT name FROM roles WHERE role_id in (SELECT role_id FROM user_role WHERE user_id = $1)',
  FetchProfileByIDQuery     :  'SELECT id, name, type, location FROM profile WHERE user_id = $1',
  FetchBusinessProfileQuery :  'SELECT legal_name as legalname, business_reg_num as businessregnum, ownership, agr_start_date as agrstartdate, agr_renewal_date as agrrenewaldate,royalty_fee as royaltyfee, marketing_fee as marketingfee, taxes FROM profile_business WHERE profile_id = $1',
  FetchPersonalProfileQuery :  'SELECT first_name as firstname, last_name as lastname, gender, age, birthday, home_phone as homephone, cell_phone as cellphone, address, email, website FROM profile_personal WHERE profile_id = $1',
  FetchFranchaiseeQuery     :  'SELECT id, name FROM franchaisee',
  FetchFranchaiseeByUserIDQuery : 'SELECT id, name from franchaisee where id in (select franchaisee_id as id from franchaisee_user WHERE user_id = $1)',
  FetchTeamByUserIDQuery:         'select id, name from team where franchaisee_id in (select franchaisee_id as id from franchaisee_user WHERE user_id = $1)',
  FetchTeamByFranchaiseeIDQuery:  'select id, name from team where franchaisee_id = $1',
  FetchTeamQuery : 'SELECT id, name from team'
};