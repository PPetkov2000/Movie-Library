const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      minlength: [6, "Username should be at least 6 characters long"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password should be at least 6 characters long"],
    },
    favoriteMovies: { type: Array, default: [] },
  },
  { timestamps: true }
);

userSchema.methods.passwordsMatch = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

module.exports = mongoose.model("User", userSchema);
