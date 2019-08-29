const cors = require('cors')
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

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

module.exports = app