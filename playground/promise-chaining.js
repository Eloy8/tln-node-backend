require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('5d56f7d4be129485086fb5b7', { age: 1}).then(user => {
//   console.log(user)
//   return User.countDocuments({ age : 1 })
// }).then(result => {
//   console.log(result)
// }).catch(e => console.log(e))

const updateAgeAndCount = async (id, age) => {
  console.log(await User.findByIdAndUpdate(id, {age}))
  return await User.countDocuments({ age })
}

updateAgeAndCount('5d56a29039067172441eb151', 1)
  .then(count => console.log(count))
  .catch(e => console.log(e))