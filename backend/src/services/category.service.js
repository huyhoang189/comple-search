const categoryModel = require("../models/category.model");

class CategoryService {
  // Get all categories that are active and match the keyword (case-insensitive search).

  getAll = async (keyword = "", offset, limit) => {
    // Create a query object to find active categories with a case-insensitive search for name or sign.
    const query = {
      status: "active",
      $or: [
        { name: { $regex: keyword, $options: "i" } }, // Case-insensitive regex search for name
      ],
    };

    // Find categories based on the query, limit, and offset.
    const categories = await categoryModel
      .find(query)
      .limit(limit)
      .skip(offset);

    // Get the total count of active categories that match the query (without pagination).
    const total = await categoryModel.countDocuments(query);

    return { categories, total };
  };

  // Get all categories (without any filtering or pagination).
  getAllRaw = async () => {
    // Find all categories without any query or filters.
    const categories = await categoryModel.find({});

    // Get the total count of all categories.
    const total = await categoryModel.countDocuments({});

    return { categories, total };
  };

  // Get a category by its unique _id (MongoDB ID) and ensure it is active.
  getById = async (_id) => {
    return await categoryModel.findOne({ _id: _id, status: "active" });
  };

  // Check if a category with the given name or sign already exists.
  // Used for validating before creating a new category.
  validateName = async (name) => {
    return await categoryModel.find({
      $or: [
        { name: name }, // Case exact search for name
      ],
    });
  };

  // Create a new category with the provided information.
  create = async (name, description) => {
    return await categoryModel.create({
      name,
      description,
      status: "active",
    });
  };

  // Update a category by its _id with the provided data.
  updateItem = async (id, category) => {
    return await categoryModel.findByIdAndUpdate(id, category, {
      new: true,
    });
  };

  // Soft delete a category by its _id (set status to "inactive").
  deleteItem = async (id) => {
    return await categoryModel.findByIdAndUpdate(
      id,
      {
        status: "inactive",
      },
      { new: true }
    );
  };
}

module.exports = CategoryService;
