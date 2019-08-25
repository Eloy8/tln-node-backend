const app = require('./app')
const port = proces.env.PORT

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
