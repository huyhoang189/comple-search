const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "department";
const COLLECTION_NAME = "Departments";

// Declare the Schema of the Mongo model
var schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    shortName: { type: String, required: true, trim: true },
    code: { type: String, trim: true },
    level: { type: Number, trim: true, default: 1 },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "department",
    },
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
