const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "fmc";
const COLLECTION_NAME = "Fmcs";

// Declare the Schema of the Mongo model
var schema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    description: { type: String, trim: true },
    department: {
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
