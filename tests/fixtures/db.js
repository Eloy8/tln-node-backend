const mognoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

// BEFORE LIFECYCLE, DELETES PREVIOUS USERS AND ADDS ONE

const userOneId = new mognoose.Types.ObjectId()
const userOne = {
  _id: userOneId,
  name: 'Mike',
  email: 'mike@example.com',
  password: '56what!!',
  tokens: [{
    token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
  }]
}

const userTwoId = new mognoose.Types.ObjectId()
const userTwo = {
  _id: userTwoId,
  name: 'jonas',
  email: 'jonas@example.com',
  password: 'myhouse099@@',
  tokens: [{
    token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
  }]
}

// beforeEach(async () => {
//   await User.deleteMany()
//   await new User(userOne).save()
// })

// afterEach(() => console.log('afterEach'))

const taskOne = {
  _id: new mognoose.Types.ObjectId(),
  description: 'First task',
  completed: 'false',
  owner: userOne._id
}

const taskTwo = {
  _id: new mognoose.Types.ObjectId(),
  description: 'Second task',
  completed: 'true',
  owner: userOne._id
}

const taskThree = {
  _id: new mognoose.Types.ObjectId(),
  description: 'Third task',
  completed: 'true',
  owner: userTwo._id
}

const setupDatabase = async () => {
  await User.deleteMany()
  await Task.deleteMany()
  await new User(userOne).save()
  await new User(userTwo).save()
  await new Task(taskOne).save()
  await new Task(taskTwo).save()
  await new Task(taskThree).save()
}

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  setupDatabase
}