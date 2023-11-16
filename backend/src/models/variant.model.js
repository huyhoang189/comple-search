const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "variant";
const COLLECTION_NAME = "Variants";

// Declare the Schema of the Mongo model
var schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    hash: { type: String, trim: true },
    malwareId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "malware",
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
