"use strict"

module.exports = class UserResponse {

    constructor(status, data, message){
      this.status  = status;
      this.data  = data;
      this.message  = message;
    }
};