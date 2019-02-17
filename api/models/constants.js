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
  HistoryEntryClass : 'VNCTalk_Conversation',
  FetchUserAccountByUserNameQuery : 'SELECT id, user_name, first_name, last_name, account_state from USER_ACCOUNT WHERE user_name = $1',
  CreateUserAccountQuery     : 'INSERT INTO USER_ACCOUNT (user_name, password, first_name, last_name, account_state) VALUES ($1, $2, $3, $4, $5)',
  DeleteUserAccountByIDQuery : 'DELETE FROM USER_ACCOUNT WHERE id = $1',
  FetchAllPreferencesQuery   : 'SELECT id, app_name, content, account_id, name FROM USER_PREFERENCE WHERE app_name = $1',
  CreatePreferenceQuery      : 'INSERT INTO USER_PREFERENCE (app_name, content, account_id, name) VALUES ($1, $2, $3, $4)',
  DeletePreferenceQuery      : 'DELETE FROM USER_PREFERENCE WHERE id = $1',
  UpdateUserPreferenceQuery  : 'UPDATE USER_PREFERENCE SET content = $1 WHERE app_name = $2 and account_id = $3',
  FetchAllHistoryEntriesQuery: 'SELECT id, content, history_class, key, time_stamp, useraccount_id_oid FROM history_entry WHERE history_class = $1 AND useraccount_id_oid = $2',
  FetchAllUsers:               'SELECT user_id, username FROM users',
  LoginUserNamePassword :      'SELECT user_id as id, username, firstname as firstName, lastname as lastName from users where username = $1 and password = $2'
};