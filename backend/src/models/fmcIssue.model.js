const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "fmcIssue";
const COLLECTION_NAME = "FmcIssues";

// Declare the Schema of the Mongo model
var schema = new mongoose.Schema(
  {
    fmc: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "fmc",
    },
    department_lv1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "department",
    },
    result: { type: String, trim: true },
    cause: { type: String, trim: true },
    detection_time: { type: String, trim: true },
    complete_time: { type: String, trim: true },
    handle_employee: { type: String, trim: true },
    handle_time: { type: String, trim: true },

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
