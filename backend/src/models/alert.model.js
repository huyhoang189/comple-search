const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "alert";
const COLLECTION_NAME = "Alerts";

// Declare the Schema of the Mongo model
var schema = new mongoose.Schema(
  {
    department_level_1: { type: String, trim: true },
    department_path: { type: String, trim: true },
    user: { type: String, trim: true },
    ip_address: { type: String, trim: true },
    mac_address: { type: String, trim: true },
    malware_description: { type: String, trim: true },
    infection_time: { type: String, trim: true },
    processing_time: { type: String, trim: true },
    processing_tool: { type: String, trim: true },
    processing_supervisor: { type: String, trim: true },
    malwareId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "malware",
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
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
