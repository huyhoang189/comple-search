const variantModel = require("../models/variant.model");

class VariantService {
  // Get all variants that are active and match the keyword (case-insensitive search).
  // Paginate the results based on the given offset and limit.
  getAll = async (keyword = "", offset, limit) => {
    // Create a query object to find active variants with a case-insensitive search for name or sign.
    const query = {
      status: "active",
      $or: [
        { name: { $regex: keyword, $options: "i" } }, // Case-insensitive regex search for name
        { hash: { $regex: keyword, $options: "i" } }, // Case-insensitive regex search for sign
      ],
    };

    // Find variants based on the query, limit, and offset.
    const variants = await variantModel.find(query).limit(limit).skip(offset);

    // Get the total count of active variants that match the query (without pagination).
    const total = await variantModel.countDocuments(query);

    return { variants, total };
  };

  // Get all variants (without any filtering or pagination).
  getAllByMalwareId = async (keyword = "", offset, limit, malwareId) => {
    // Create a query object to find active variants with a case-insensitive search for name or sign.
    const query = {
      status: "active",
      malwareId: malwareId,
      $or: [
        { name: { $regex: keyword, $options: "i" } }, // Case-insensitive regex search for name
        { hash: { $regex: keyword, $options: "i" } }, // Case-insensitive regex search for sign
      ],
    };

    // Find variants based on the query, limit, and offset.
    const variants = await variantModel.find(query).limit(limit).skip(offset);

    // Get the total count of active variants that match the query (without pagination).
    const total = await variantModel.countDocuments(query);

    return { variants, total };
  };

  // Get a variant by its unique _id (MongoDB ID) and ensure it is active.
  getById = async (_id) => {
    return await variantModel.findOne({ _id: _id, status: "active" });
  };

  // Get a variant by malwareId (MongoDB ID) and ensure it is active.
  getByMalwareId = async (malwareId) => {
    return await variantModel.findOne({
      malwareId: malwareId,
      status: "active",
    });
  };

  // Check if a variant with the given name or sign already exists.
  // Used for validating before creating a new variant.
  validateName = async (name) => {
    return await variantModel.find({
      $or: [
        { name: name }, // Case exact search for name
      ],
    });
  };

  // Create a new variant with the provided information.
  create = async (name, hash, malwareId) => {
    return await variantModel.create({
      name,
      hash,
      malwareId,
      status: "active",
    });
  };

  // Update a variant by its _id with the provided data.
  updateItem = async (id, variant) => {
    return await variantModel.findByIdAndUpdate(id, variant, {
      new: true,
    });
  };

  // Soft delete a variant by its _id (set status to "inactive").
  deleteItem = async (id) => {
    return await variantModel.findByIdAndUpdate(
      id,
      {
        status: "inactive",
      },
      { new: true }
    );
  };
}

module.exports = VariantService;
