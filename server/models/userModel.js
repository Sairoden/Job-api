const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please provide name"],
    minLength: 3,
    maxLength: 50,
  },
  lastName: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 50,
    default: "lastName",
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    minLength: 3,
    maxLength: 50,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email address",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: 3,
  },
  location: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 50,
    default: "my city",
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  this.lastName.charAt(0).toUpperCase() + this.lastName.slice(1).toLowerCase();
});

userSchema.methods.createToken = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
