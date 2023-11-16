const { Succeed, Created } = require("../utils/response/success.response");
const VariantService = require("../services/variant.service");
const {
  NotFoundError,
  ForbiddenError,
} = require("../utils/response/error.response");
const simplifyData = require("../utils/simplifyData");

const variantService = new VariantService();

const fields = ["_id", "name", "hash", "malwareId"];

class VariantController {
  getAll = async (req, res, next) => {
    const { offset, limit } = req.pagination;
    const { keyword, id } = req.query;
    const { variants, total } = await variantService.getAll(
      keyword,
      offset,
      limit
    );

    if (!variants) throw new NotFoundError("Not found variants");

    //return value
    return new Succeed({
      message: "Get variants success",
      metadata: {
        data: simplifyData(fields, variants),
        limit,
        page: offset / limit + 1,
        total,
      },
    }).send(res);
  };

  getAllByMalwareId = async (req, res, next) => {
    const { offset, limit } = req.pagination;
    const { keyword, id } = req.query;
    const { variants, total } = await variantService.getAllByMalwareId(
      keyword,
      offset,
      limit,
      id
    );

    if (!variants) throw new NotFoundError("Not found variants");

    //return value
    return new Succeed({
      message: "Get variants success",
      metadata: {
        data: simplifyData(fields, variants),
        limit,
        page: offset / limit + 1,
        total,
      },
    }).send(res);
  };

  getById = async (req, res, next) => {
    const { id } = req.params;
    if (!id) throw new NotFoundError("Not found Id");

    const variant = await variantService.getById(id);
    if (!variant) throw new NotFoundError("Not found variant");

    //return value
    return new Succeed({
      message: "Get by Id",
      metadata: simplifyData(fields, variant),
    }).send(res);
  };

  create = async (req, res, next) => {
    const { name, hash, malwareId } = req.body;

    // const holderVariant = await variantService.validateName(name);
    // if (holderVariant.length > 0)
    //   throw new ForbiddenError(
    //     "The variant exsit! Pls update new name and shortname!"
    //   );

    const variant = await variantService.create(name, hash, malwareId);
    if (!variant) throw new ForbiddenError("Cannot create variant");

    //return value
    return new Created({
      message: "Create variant success",
      metadata: simplifyData(fields, variant),
    }).send(res);
  };

  update = async (req, res, next) => {
    const { id } = req.params;
    const payload = req.body;

    const variant = await variantService.updateItem(id, payload);
    if (!variant) throw new ForbiddenError("update variant error");

    //return value
    return new Succeed({
      message: "Update variant success",
      metadata: simplifyData(fields, variant),
    }).send(res);
  };

  delete = async (req, res, next) => {
    const { id } = req.params;
    const variant = await variantService.deleteItem(id);
    if (!variant) throw new ForbiddenError("Cannot delete variant");

    //return value
    return new Succeed({
      message: "delete success variant",
      metadata: simplifyData(fields, variant),
    }).send(res);
  };
}

module.exports = VariantController;
