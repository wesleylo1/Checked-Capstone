const sequelize = require("./sequelize")
const bcrypt = require("bcrypt")

module.exports = {
  registerUser: async (req, res) => {
    let { firstName, lastName, email, password } = req.body

    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      sequelize.query(`
        insert into users (first_name,last_name,email,password) values ('${firstName}','${lastName}','${email}','${hashedPassword}')
      `)
      res.sendStatus(200)
    } catch {
      res.status(500).send()
    }
  },

  loginUser: async (req, res) => {
    let { email, password } = req.body

    try {
      let info = await sequelize.query(`
      SELECT password FROM users WHERE email = '${email}'
    `)

      let tablePassword = info[0][0].password

      if (await bcrypt.compare(password, tablePassword)) {
        res.status(200).send("Success")
      } else {
        res.send("incorrect password")
      }
    } catch {
      res.send("incorrect email/password")
    }
  }
}

// res.redirect('page')
