"use strict";

const UserService = require("../services/user-service");
const { Succeed, Created } = require("../utils/response/success-response");

class UserController {
  static getAll = async (req, res, next) => {
    new Succeed({
      message: "Get users success",
      metadata: await UserService.getUserAll(req),
    }).send(res);
  };
}

module.exports = UserController;
