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
      SELECT * FROM users WHERE email = '${email}'
    `)

      let userObj = {
        id: info[0][0].id,
        name: info[0][0].first_name,
        email: info[0][0].email
      }

      let tablePassword = info[0][0].password

      if (await bcrypt.compare(password, tablePassword)) {
        res.status(200).send(userObj)
      } else {
        res.status(401).send("incorrect password")
      }
    } catch {
      res.status(401).send("incorrect email and/or password")
    }
  },

  getChecklist: async (req, res) => {
    let { id } = req.params

    let checklists = await sequelize.query(`
      SELECT * FROM events WHERE users_id = ${id}
    `)

    res.status(200).send(checklists[0])
  },

  newChecklist: async (req, res) => {
    let { title } = req.body
    let { id } = req.params

    try {
      sequelize.query(`
        CREATE TABLE ${title} (
          id serial primary key,
          tasks varchar(225) not null,
          completion boolean DEFAULT 'false' not null,
          users_id int DEFAULT ${id}
        )
      `)

      res.status(200).send("done")
    } catch {}
  },

  createNewTask: async (req, res) => {
    let { task, title } = req.body

    try {
      sequelize.query(`
        INSERT INTO ${title} (tasks)
        VALUES ('${task}')
      `)
      res.status(200).send("done")
    } catch {}
  },

  getTasks: async (req, res) => {
    let { id, listTitle } = req.params

    let items = await sequelize.query(`
      SELECT tasks,completion,id FROM ${listTitle}
      WHERE users_id = ${id}
    `)
    res.status(200).send(items[0])
  }
}
