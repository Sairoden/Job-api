const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: "String",
      required: [true, "Please provide company"],
      minLength: 3,
      maxLength: 50,
    },
    position: {
      type: "String",
      required: [true, "Please provide position"],
      minLength: 3,
      maxLength: 100,
    },
    status: {
      type: "String",
      enum: ["interview", "decline", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      requireD: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
