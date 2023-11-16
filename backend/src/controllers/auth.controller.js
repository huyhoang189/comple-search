"use strict";

const TokenService = require("../services/token-service");
const UserService = require("../services/user.service");
const AuthService = require("../services/auth.service");
const { Succeed, Created } = require("../utils/response/success.response");

class AuthController {
  static signUp = async (req, res, next) => {
    new Created({
      message: "Sign up success",
      metadata: await AuthService.signUp(req.body),
    }).send(res);
  };

  static signIn = async (req, res, next) => {
    new Succeed({
      message: "Sign in success",
      metadata: await AuthService.signIn(req.body),
    }).send(res);
  };
}

module.exports = AuthController;
