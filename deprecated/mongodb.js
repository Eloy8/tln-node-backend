// CRUD Create Read Update Delete
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true} , (error, client) => {
  if (error) {
    return console.log('Unable to connect to database!')
  }

  console.log('Connected correctly!')

  const db = client.db(databaseName)
  // CREATE
  db.collection('users').insertOne({
    name: 'Test',
    age: 23
  }).then(result => console.log(result))
  .catch(error => console.log(error))

  // READ
  // db.collection('tasks').findOne({ _id: new ObjectID("5d5554d2538eeb21f0803d0f")}, ((error, task) => {
  //   console.log(task)
  // }))
  //   db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
  //   console.log(tasks)
  // })


  // UPDATE

  // Promise pattern, directly chain the then and catch to the collection's actions
  // db.collection('users').updateOne({
  //   _id: new ObjectID("5d554f0649ac26590cb21dcd")
  // }, {
  //   $inc: {
  //     age: 1
  //   }
  //   // $set: {
  //   //   name: 'Mike'
  //   // }
  // }).then((result) => {
  //   console.log(result)
  // }).catch((error) => {
  //   console.log(error)
  // })

  // db.collection('tasks')
  // .updateMany({
  //   completed: false
  // }, {
  //   $set: {
  //   completed: true
  //   }
  // })
  // .then(result => console.log(result))
  // .catch(error => console.log(error))
  
  // DELETE

  db.collection('users').deleteMany({
    age: 27
  }).then(result => console.log(result))
  .catch(error => console.log(error))

  db.collection('tasks').deleteOne({
    _id: new ObjectID('5d5554d2538eeb21f0803d0e')
  }).then(result => console.log(result))
  .catch(error => console.log(error))
})

