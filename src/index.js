const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

// app.use((req, res, next) => {
//   if (req.method === 'GET') {
//     res.send('GET requests are disabled')
//   } else {
//     next()
//   }
// })

// MIDDLEWARE - alle parameters moeten aanwezig zijn!
// app.use((req, res, next) => {
//   res.status(503).send('Server under Maintenance!')
//   next()
// })

const multer = require('multer')
const upload = multer({
  dest: 'images',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error('Please upload a Word document'))
    }
    cb(undefined, true)
  }
})
app.post('/upload', upload.single('upload'), (req, res) => {
  res.send()
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message})
})

app.use(express.json())
app.use(userRouter, taskRouter)

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})

// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
//   // const task = await Task.findById('5d5d3a913dffd0384802cd94')
//   // // Loads the data of another data instance via one reference!
//   // await task.populate('owner').execPopulate()
//   // console.log(task.owner)
//   await user.populate('tasks').execPopulate()
//   const user = await User.findById('5d5d3829ef55ed09d4dc3b3b')
//   console.log(user.tasks)
// }

// main()