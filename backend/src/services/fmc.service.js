const fmcModel = require("../models/fmc.model");

class FmcService {
  // Get all fmcs that are active and match the keyword (case-insensitive search).

  getAll = async (keyword = "", offset, limit) => {
    // Create a query object to find active fmcs with a case-insensitive search for name or sign.
    const query = {
      status: "active",
      $or: [
        { name: { $regex: keyword, $options: "i" } }, // Case-insensitive regex search for name
      ],
    };

    // Find fmcs based on the query, limit, and offset.
    const fmcs = await fmcModel
      .find(query)
      .populate({
        path: "department",
        strictPopulate: false,
        select: "_id name shortName code level",
      })
      .limit(limit)
      .skip(offset);

    // Get the total count of active fmcs that match the query (without pagination).
    const total = await fmcModel.countDocuments(query);

    return { fmcs, total };
  };

  // // Get all fmcs (without any filtering or pagination).
  // getAllRaw = async () => {
  //   // Find all fmcs without any query or filters.
  //   const fmcs = await fmcModel.find({}).populate({
  //     path: "department",
  //     strictPopulate: false,
  //     select: "_id name shortName code level",
  //   });

  //   // Get the total count of all fmcs.
  //   const total = await fmcModel.countDocuments({});

  //   return { fmcs, total };
  // };

  // Get a fmc by its unique _id (MongoDB ID) and ensure it is active.
  getById = async (_id) => {
    return await fmcModel.findOne({ _id: _id, status: "active" });
  };

  // Check if a fmc with the given name or sign already exists.
  // Used for validating before creating a new fmc.
  validateName = async (name) => {
    return await fmcModel.find({
      $or: [
        { name: name }, // Case exact search for name
      ],
    });
  };

  // Create a new fmc with the provided information.
  create = async (name, description, department) => {
    return await fmcModel.create({
      name,
      description,
      department: department || null,
      status: "active",
    });
  };

  // Update a fmc by its _id with the provided data.
  updateItem = async (id, fmc) => {
    return await fmcModel.findByIdAndUpdate(id, fmc, {
      new: true,
    });
  };

  // Soft delete a fmc by its _id (set status to "inactive").
  deleteItem = async (id) => {
    return await fmcModel.findByIdAndUpdate(
      id,
      {
        status: "inactive",
      },
      { new: true }
    );
  };
}

module.exports = FmcService;
