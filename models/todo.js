const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  value: String,
  doneAt: Date,
  order: Number,
});

todoSchema.virtual("todoId").get(function () {
  return this._id.toHexString();
});

todoSchema.set("toJSON", {virtuals : true});


module.exports = mongoose.model("Todo" , todoSchema);