const fmcIssueModel = require("../models/fmcIssue.model");

class FmcIssueService {
  // Get all fmcIssues that are active and match the keyword (case-insensitive search).

  getAll = async (keyword = "", offset, limit) => {
    // Create a query object to find active fmcIssues with a case-insensitive search for name or sign.
    const query = {
      status: "active",
      $or: [
        { name: { $regex: keyword, $options: "i" } }, // Case-insensitive regex search for name
      ],
    };

    // Find fmcIssues based on the query, limit, and offset.
    const fmcIssues = await fmcIssueModel
      .find(query)
      .populate({
        path: "department",
        strictPopulate: false,
        select: "_id name shortName code level",
      })
      .limit(limit)
      .skip(offset);

    // Get the total count of active fmcIssues that match the query (without pagination).
    const total = await fmcIssueModel.countDocuments(query);

    return { fmcIssues, total };
  };

  // // Get all fmcIssues (without any filtering or pagination).
  // getAllRaw = async () => {
  //   // Find all fmcIssues without any query or filters.
  //   const fmcIssues = await fmcIssueModel.find({}).populate({
  //     path: "department",
  //     strictPopulate: false,
  //     select: "_id name shortName code level",
  //   });

  //   // Get the total count of all fmcIssues.
  //   const total = await fmcIssueModel.countDocuments({});

  //   return { fmcIssues, total };
  // };

  // Get a fmcIssue by its unique _id (MongoDB ID) and ensure it is active.
  getById = async (_id) => {
    return await fmcIssueModel.findOne({ _id: _id, status: "active" });
  };

  // Check if a fmcIssue with the given name or sign already exists.
  // Used for validating before creating a new fmcIssue.
  validateName = async (name) => {
    return await fmcIssueModel.find({
      $or: [
        { name: name }, // Case exact search for name
      ],
    });
  };

  // Create a new fmcIssue with the provided information.
  create = async (name, description, department) => {
    return await fmcIssueModel.create({
      name,
      description,
      department: department || null,
      status: "active",
    });
  };

  // Update a fmcIssue by its _id with the provided data.
  updateItem = async (id, fmcIssue) => {
    return await fmcIssueModel.findByIdAndUpdate(id, fmcIssue, {
      new: true,
    });
  };

  // Soft delete a fmcIssue by its _id (set status to "inactive").
  deleteItem = async (id) => {
    return await fmcIssueModel.findByIdAndUpdate(
      id,
      {
        status: "inactive",
      },
      { new: true }
    );
  };
}

module.exports = FmcIssueService;
