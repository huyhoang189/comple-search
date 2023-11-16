"use strict";

const _ = require("lodash");

const simplifyData = (fields = [], data) => {
  return Array.isArray(data)
    ? data.map((object) => _.pick(object, fields))
    : _.pick(data, fields);
};

// const simplifyDatas = ({ fields = [], objects = [] }) => {
//   return objects.map((object) => simplifyData({ fields, object }));
// };
module.exports = simplifyData;
