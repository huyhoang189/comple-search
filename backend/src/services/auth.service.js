"use strict";

const {
  hashPassword,
  getRandomValues,
  checkPassword,
} = require("../utils/authentication");
const {
  BadRequestError,
  ConflictError,
  NotFoundError,
  ForbiddenError,
} = require("../utils/response/error.response");
const userModel = require("../models/user.model");
const { ROLE_USER } = require("../commom");
const { simplifyData } = require("../utils/simplifyData");

const signUp = async ({ name, email, password }) => {
  const holderUser = await userModel.findOne({ email: email });
  if (holderUser) {
    throw new ConflictError("User:: is conflict");
  }

  const passHash = await hashPassword(password);
  const newUser = await userModel.create({
    name,
    email,
    password: passHash,
    roles: [ROLE_USER.WRITER],
  });

  if (newUser) {
    return {
      user: simplifyData({
        fields: ["_id", "name", "email"],
        object: newUser,
      }),
    };
  }
  throw new BadRequestError("User:: Error");
};

const signIn = async ({ account, password }) => {
  const holderUser = await userModel.findOne({ email: email });
  if (!holderUser) {
    throw new NotFoundError("User:: User Not Found");
  }

  if (await checkPassword(password, holderUser.password)) {
    const tokens = await createToken({
      user: holderUser,
      publicKey,
      privateKey,
    });

    return {
      user: simplifyData({
        fields: ["_id", "name", "email"],
        object: holderUser,
      }),
      tokens,
    };
  }

  throw new ForbiddenError("User:: Not access");
};

module.exports = {
  signIn,
  signUp,
};
