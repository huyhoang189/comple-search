const { Succeed, Created } = require("../utils/response/success.response");
const FmcService = require("../services/fmc.service");
const {
  NotFoundError,
  ForbiddenError,
} = require("../utils/response/error.response");

const fmcService = new FmcService();

class FmcController {
  getAll = async (req, res, next) => {
    const { offset, limit } = req.pagination;
    const { keyword } = req.query;
    const { fmcs, total } = await fmcService.getAll(keyword, offset, limit);

    if (!fmcs) throw new NotFoundError("Not found fmcs");

    //return value
    return new Succeed({
      message: "Get fmcs success",
      metadata: {
        data: fmcs,
        limit,
        page: offset / limit + 1,
        total,
      },
    }).send(res);
  };

  getById = async (req, res, next) => {
    const { id } = req.params;
    if (!id) throw new NotFoundError("Not found Id");

    const fmc = await fmcService.getById(id);
    if (!fmc) throw new NotFoundError("Not found fmc");

    //return value
    return new Succeed({
      message: "Get by Id",
      metadata: fmc,
    }).send(res);
  };
  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  create = async (req, res, next) => {
    const { name, description, department } = req.body;

    const holderFmc = await fmcService.validateName(name);
    if (holderFmc.length > 0)
      throw new ForbiddenError(
        "The fmc exsit! Pls update new name and shortname!"
      );

    const fmc = await fmcService.create(name, description, department);
    if (!fmc) throw new ForbiddenError("Cannot create fmc");

    //return value
    return new Created({
      message: "Create fmc success",
      metadata: fmc,
    }).send(res);
  };

  update = async (req, res, next) => {
    const { id } = req.params;
    const payload = req.body;

    const fmc = await fmcService.updateItem(id, payload);
    if (!fmc) throw new ForbiddenError("update fmc error");

    //return value
    return new Succeed({
      message: "Update fmc success",
      metadata: fmc,
    }).send(res);
  };

  delete = async (req, res, next) => {
    const { id } = req.params;
    const fmc = await fmcService.deleteItem(id);
    if (!fmc) throw new ForbiddenError("Cannot delete fmc");

    //return value
    return new Succeed({
      message: "delete success fmc",
      metadata: fmc,
    }).send(res);
  };
}

module.exports = FmcController;
