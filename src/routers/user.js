const express = require('express')
const sharp = require('sharp')
const auth = require('../middleware/auth')
const User = require('../models/user')
const userRouter = new express.Router()
const { sendWelcomeEmail, sendCancelEmail } = require('../emails/account')

// CREATE SINGLE

userRouter.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    sendWelcomeEmail(user.email, user.name)
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

// LOGIN

userRouter.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (e) {
    res.status(400).send()
  }
})

// LOGOUT (CURRENT SESSION)

userRouter.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()
  
    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

// LOGOUT (ALL SESSIONS)

userRouter.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
  
    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

// AVATAR UPLOAD
const multer = require('multer')
const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('File extension must be jpg, jpeg or png!'))
    }
    cb(undefined, true)
  }
})

// READ SINGLE

// userRouter.get('/user/:id', async (req, res) => {
//   try {
//     const user = await User.findById({_id: req.params.id})
//     if (!user) return res.status(404).send()
//     res.send(user)
//   } catch (e) {
//     res.status(500).send()
//   }
// })

// READ MULTIPLE (DEPRECATED)

// userRouter.get('/users', auth,  async (req, res) => {
//   try {
//     const users = await User.find({})
//     res.send(users)
//   } catch (e) {
//     res.status(500).send()
//   }
// })

// READ PROFILE

userRouter.get('/users/me', auth,  async (req, res) => {
  res.send(req.user)
})

// UPDATE

userRouter.patch('/user/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) return res.status(400).send({error: 'Invalid updates!'})

  try {
    updates.forEach((update) => req.user[update] = req.body[update])

    await req.user.save()

    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // })
    // if(!user) res.status(404).send()
    res.send(req.user)
  } catch (e) {
    res.status(400).send(e)
  }
})

// DELETE

userRouter.delete('/user/me', auth, async (req, res) => {
  try {
    await req.user.remove()
    sendCancelEmail(req.user.email,req.user.name)
    res.send(req.user)
  } catch (e) {
    res.status(500).send()
  }
})

// SAVE AVATAR

userRouter.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
  req.user.avatar = buffer
  await req.user.save()
  res.send()
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})

// VIEW AVATAR

userRouter.get('/user/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user || !user.avatar ) {
      throw new Error()
    }

    res.set('Content-Type', 'image/png')
    res.send(user.avatar)
  } catch (e) {
    res.status(404).send()
  }
})

// DELETE AVATAR

userRouter.delete('/user/me/avatar', auth, async (req, res) => {
  try {
    if (!req.user.avatar) {
      throw new Error('No avatar to delete on this profile!')
    }
    req.user.avatar = undefined
    await req.user.save()
    res.send(req.user)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = userRouter