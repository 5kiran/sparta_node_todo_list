const express = require("express");
const Todo = require("../models/todo.js");

const router = express.Router();

router.get("/", (req,res) => {
  res.send("Hi");
})

router.post("/todos", async (req, res) => {
  const {value} = req.body;
  const maxOrderByUserId = await Todo.findOne().sort("-order").exec();

  const order = maxOrderByUserId  ? maxOrderByUserId.order + 1 : // 있을 때 +1을 할당
  1; // 없을 때 1 을 할당

  const todo = await Todo.create({value, order})

  res.send({todo});

})

router.get("/todos", async (req,res) => {
  const todos = await Todo.find({}).sort("-order").exec();

  res.send({todos})
})

router.patch("/todos/:todoId", async (req,res) => {
  const {todoId} = req.params;
  const {order,value,done} = req.body;
  console.log(order, value,done)

  // 1. todoId에 해당하는 할 일이 있는가?
  // 1-1. todoId에 해당하는 할 일이 없으면, 에러를 출력해야 합니다.

  const currentTodo = await Todo.findById(todoId);
  if (!currentTodo) {
    return res.status(400).json({"errorMessage":"존재하지 않는 할 일 입니다."})
  };

  if (order) {
    const targetTodo = await Todo.findOne({order})
    if (targetTodo) {
      targetTodo.order = currentTodo.order;
      await targetTodo.save();
    }
    currentTodo.order = order
    await currentTodo.save();
  };

  if (value) {
    currentTodo.value = value
  };
  
  if (done !== undefined) {
    currentTodo.doneAt = done ? new Date() : null; // done? true : false
  }

  currentTodo.save();

  res.send();
})

router.delete("/todos/:todoId", async (req,res) => {
  const {todoId} = req.params;

  await Todo.deleteOne({_id: todoId});

  res.send();

})


module.exports = router;