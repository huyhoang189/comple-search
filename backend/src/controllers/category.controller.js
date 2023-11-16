const { Succeed, Created } = require("../utils/response/success.response");
const CategoryService = require("../services/category.service");
const {
  NotFoundError,
  ForbiddenError,
} = require("../utils/response/error.response");
const simplifyData = require("../utils/simplifyData");

const categoryService = new CategoryService();

const fields = ["_id", "name", "description"];

class CategoryController {
  getAll = async (req, res, next) => {
    const { offset, limit } = req.pagination;
    const { keyword } = req.query;
    const { categories, total } = await categoryService.getAll(
      keyword,
      offset,
      limit
    );

    if (!categories) throw new NotFoundError("Not found categorys");

    //return value
    return new Succeed({
      message: "Get categorys success",
      metadata: {
        data: simplifyData(fields, categories),
        limit,
        page: offset / limit + 1,
        total,
      },
    }).send(res);
  };

  getById = async (req, res, next) => {
    const { id } = req.params;
    if (!id) throw new NotFoundError("Not found Id");

    const category = await categoryService.getById(id);
    if (!category) throw new NotFoundError("Not found category");

    //return value
    return new Succeed({
      message: "Get by Id",
      metadata: simplifyData(fields, category),
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
    const { name, description } = req.body;
    console.log("s", description);

    const holderCategory = await categoryService.validateName(name);
    if (holderCategory.length > 0)
      throw new ForbiddenError(
        "The category exsit! Pls update new name and shortname!"
      );

    const category = await categoryService.create(name, description);
    if (!category) throw new ForbiddenError("Cannot create category");

    //return value
    return new Created({
      message: "Create category success",
      metadata: simplifyData(fields, category),
    }).send(res);
  };

  update = async (req, res, next) => {
    const { id } = req.params;
    const payload = req.body;

    const category = await categoryService.updateItem(id, payload);
    if (!category) throw new ForbiddenError("update category error");

    //return value
    return new Succeed({
      message: "Update category success",
      metadata: simplifyData(fields, category),
    }).send(res);
  };

  delete = async (req, res, next) => {
    const { id } = req.params;
    const category = await categoryService.deleteItem(id);
    if (!category) throw new ForbiddenError("Cannot delete category");

    //return value
    return new Succeed({
      message: "delete success category",
      metadata: simplifyData(fields, category),
    }).send(res);
  };
}

module.exports = CategoryController;
