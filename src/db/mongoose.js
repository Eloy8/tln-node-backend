const mongoose = require('mongoose')

mongoose.connect(`${process.env.MONGODB_URL}/task-manager-api-next`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})