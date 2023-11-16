const { Succeed, Created } = require("../utils/response/success.response");
const DepartmentService = require("../services/department.service");
const {
  NotFoundError,
  ForbiddenError,
} = require("../utils/response/error.response");
const simplifyData = require("../utils/simplifyData");

const departmentService = new DepartmentService();

class DepartmentController {
  getAll = async (req, res, next) => {
    const { offset, limit } = req.pagination;
    const { keyword } = req.query;
    const { departments, total } = await departmentService.getAll(
      keyword,
      offset,
      limit
    );

    if (!departments) throw new NotFoundError("Not found departments");

    //return value
    return new Succeed({
      message: "Get departments success",
      metadata: {
        // data: simplifyData(fields, departments),
        data: departments,
        limit,
        page: offset / limit + 1,
        total,
      },
    }).send(res);
  };

  getAllRaw = async (req, res, next) => {
    const { departments, total } = await departmentService.getAllRaw();
    if (!departments) throw new NotFoundError("Not found departments");

    //return value
    return new Succeed({
      message: "Get departments success",
      metadata: {
        data: departments,
        total,
      },
    }).send(res);
  };

  getById = async (req, res, next) => {
    const { id } = req.params;
    if (!id) throw new NotFoundError("Not found Id");

    const department = await departmentService.getById(id);
    if (!department) throw new NotFoundError("Not found department");

    //return value
    return new Succeed({
      message: "Get by Id",
      metadata: department,
    }).send(res);
  };

  create = async (req, res, next) => {
    const { name, shortName, code, parent, level } = req.body;

    const holderDepartment = await departmentService.validateName(
      name,
      shortName
    );
    if (holderDepartment.length > 0)
      throw new ForbiddenError(
        "The department exsit! Pls update new name and shortname!"
      );

    const department = await departmentService.create(
      name,
      shortName,
      code,
      parent,
      level
    );
    if (!department) throw new ForbiddenError("Cannot create department");

    //return value
    return new Created({
      message: "Create department success",
      metadata: department,
    }).send(res);
  };

  update = async (req, res, next) => {
    const { id } = req.params;
    const payload = req.body;

    const department = await departmentService.updateItem(id, payload);
    if (!department) throw new ForbiddenError("update department error");

    //return value
    return new Succeed({
      message: "Update department success",
      metadata: department,
    }).send(res);
  };

  delete = async (req, res, next) => {
    const { id } = req.params;
    const department = await departmentService.deleteItem(id);
    if (!department) throw new ForbiddenError("Cannot delete department");

    //return value
    return new Succeed({
      message: "delete success department",
      metadata: department,
    }).send(res);
  };
}

module.exports = DepartmentController;
