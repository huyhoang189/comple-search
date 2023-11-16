const userModel = require("../models/user.model");

class UserService {
  // Get all users that are active and match the keyword (case-insensitive search).
  // Paginate the results based on the given offset and limit.
  getAll = async (keyword = "", offset, limit) => {
    // Create a query object to find active users with a case-insensitive search for name or shortName.
    const query = {
      status: "active",
      $or: [
        { name: { $regex: keyword, $options: "i" } }, // Case-insensitive regex search for name
        { shortName: { $regex: keyword, $options: "i" } }, // Case-insensitive regex search for shortName
      ],
    };

    // Find users based on the query, limit, and offset.
    const users = await userModel.find(query).limit(limit).skip(offset);

    // Get the total count of active users that match the query (without pagination).
    const total = await userModel.countDocuments(query);

    return { users, total };
  };

  // Get all users (without any filtering or pagination).
  getAllRaw = async () => {
    // Find all users without any query or filters.
    const users = await userModel.find({});

    // Get the total count of all users.
    const total = await userModel.countDocuments({});

    return { users, total };
  };

  // Get a user by its unique _id (MongoDB ID) and ensure it is active.
  getById = async (_id) => {
    return await userModel.findOne({ _id: _id, status: "active" });
  };

  // Check if a user with the given name or shortName already exists.
  // Used for validating before creating a new user.
  validateName = async (name, shortName) => {
    return await userModel.find({
      $or: [
        { name: name }, // Case exact search for name
        { shortName: shortName }, // Case exact search for shortName
      ],
    });
  };

  // Create a new user with the provided information.
  create = async (name, shortName, code, parentId, level) => {
    return await userModel.create({
      name,
      shortName,
      code,
      parentId,
      level,
      status: "active",
    });
  };

  // Update a user by its _id with the provided data.
  updateItem = async (id, user) => {
    return await userModel.findByIdAndUpdate(id, user, {
      new: true,
    });
  };

  // Soft delete a user by its _id (set status to "inactive").
  deleteItem = async (id) => {
    return await userModel.findByIdAndUpdate(
      id,
      {
        status: "inactive",
      },
      { new: true }
    );
  };
}

module.exports = UserService;
