const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "category";
const COLLECTION_NAME = "Categorys";

// Declare the Schema of the Mongo model
var schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, schema);
