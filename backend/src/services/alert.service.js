const { query } = require("express");
const alertModel = require("../models/alert.model");

class AlertService {
  // Get all alerts that are active and match the keyword (case-insensitive search).
  // Paginate the results based on the given offset and limit.
  getAll = async (keyword = "", offset, limit) => {
    // Create a query object to find active alerts with a case-insensitive search for name or shortName.
    const query = {
      status: "active",
      $or: [
        { name: { $regex: keyword, $options: "i" } }, // Case-insensitive regex search for name
        { shortName: { $regex: keyword, $options: "i" } }, // Case-insensitive regex search for shortName
      ],
    };

    // Find alerts based on the query, limit, and offset.
    const alerts = await alertModel.find(query).limit(limit).skip(offset);

    // Get the total count of active alerts that match the query (without pagination).
    const total = await alertModel.countDocuments(query);

    return { alerts, total };
  };

  // Get all alerts (without any filtering or pagination).
  getAllRaw = async () => {
    // Find all alerts without any query or filters.
    const alerts = await alertModel.find({});

    // Get the total count of all alerts.
    const total = await alertModel.countDocuments({});

    return { alerts, total };
  };

  // Get a alert by its unique _id (MongoDB ID) and ensure it is active.
  getById = async (_id) => {
    return await alertModel.findOne({ _id: _id, status: "active" });
  };

  // Check if a alert with the given name or shortName already exists.
  // Used for validating before creating a new alert.
  validateName = async (name, shortName) => {
    return await alertModel.find({
      $or: [
        { name: name }, // Case exact search for name
        { shortName: shortName }, // Case exact search for shortName
      ],
    });
  };

  // Create a new alert with the provided information.
  create = async (name, shortName, code, parentId, level) => {
    return await alertModel.create({
      name,
      shortName,
      code,
      parentId,
      level,
      status: "active",
    });
  };

  // Update a alert by its _id with the provided data.
  updateItem = async (id, alert) => {
    return await alertModel.findByIdAndUpdate(id, alert, {
      new: true,
    });
  };

  // Soft delete a alert by its _id (set status to "inactive").
  deleteItem = async (id) => {
    return await alertModel.findByIdAndUpdate(
      id,
      {
        status: "inactive",
      },
      { new: true }
    );
  };
}

module.exports = AlertService;
