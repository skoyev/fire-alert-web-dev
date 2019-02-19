"use strict"

module.exports = class ProfileResponse {

    constructor(status, data, message){
      this.status  = status;
      this.data  = data;
      this.message  = message;
    }
};