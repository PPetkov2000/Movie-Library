const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: [true, "Username is required"] },
    password: { type: String, required: [true, "Password is required"] },
    favoriteMovies: { type: Array, default: [] },
    ratings: [{ type: "ObjectId", ref: "Rating" }],
    notes: [{ type: "ObjectId", ref: "Note" }],
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
