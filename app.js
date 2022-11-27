const express = require('express')
const exphbs = require('express-handlebars')
const users = require('./models/users')
const session = require('express-session')

const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "I am kai3kai2",
    resave: false,
    saveUninitialized: true
  })
)

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const { email, password } = req.body
  for (const user of users) {
    if (user.email === email && user.password === password) {
      req.session.login = true
      console.log(req.sessionID)
      user.sessionID = req.sessionID
      console.log((user))
      return res.render('home', { user: user.firstName })
    } else {
      return res.render('error', { error: "Your Email or Password not correct. Check please." })
    }
  }
})

app.get('/home', (req, res) => {
  res.render('home')
})

app.listen(port, () => {
  console.log(`Your express is running on https://localhost:${port}`)
})