require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5d56a33ab63b5e5dbcc53d61').then(task => {
//   console.log(task)
//   return Task.countDocuments({ completed : false })
// }).then(result => {
//   console.log(result)
// }).catch(e => console.log(e))

const deleteTaskAndCount = async (id, completed) => {
  console.log(await Task.findByIdAndDelete(id))
  return await Task.countDocuments(completed)
}

deleteTaskAndCount('5d5850fd6366915040850e31', false)
  .then(count => console.log(count))
  .catch(e => console.log(e))