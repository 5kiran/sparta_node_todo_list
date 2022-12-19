const mongoose = require("mongoose");
mongoose.set('strictQuery', false);


mongoose.connect("mongodb://127.0.0.1:27017/todo-demo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(value => console.log("MongoDB 연결에 성공하였습니다."))
  .catch(reason => console.log("MongoDB 연결에 실패하였습니다."))


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

module.exports = db;