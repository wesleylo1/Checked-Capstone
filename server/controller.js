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
      ORDER BY id ASC
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
    SELECT t.table_schema,t.table_name
    FROM information_schema.tables t
    INNER JOIN information_schema.columns c ON c.table_name = t.table_name AND c.table_schema = t.table_schema
    WHERE c.column_name = 'users_id_${id}'
    AND t.table_schema NOT IN ('information_schema', 'pg_catalog')
    AND t.table_type = 'BASE TABLE'
    ORDER BY t.table_schema;
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
          users_id_${id} int DEFAULT ${id}
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
      WHERE users_id_${id} = ${id}
      ORDER BY id ASC
    `)
    res.status(200).send(items[0])
  },

  deleteChecklist: async (req, res) => {
    let { listTitle } = req.params

    try {
      sequelize.query(`
        DROP TABLE ${listTitle}
      `)
      res.status(200)
    } catch {}
  },

  selectChecklist: async (req, res) => {
    let { id, title } = req.params

    let items = await sequelize.query(`
        SELECT tasks,completion,id FROM ${title}
        WHERE users_id_${id} = ${id}
        ORDER BY id ASC
      `)

    res.status(200).send(items[0])
  },

  addTask: async (req, res) => {
    let { task } = req.body
    let { title } = req.params

    try {
      sequelize.query(`
        INSERT INTO ${title} (tasks)
        VALUES ('${task}')
      `)
      res.status(200).send("done")
    } catch {}
  },

  receiveTasks: async (req, res) => {
    let { number, title } = req.params

    let items = await sequelize.query(`
      SELECT tasks,completion,id FROM ${title}
      WHERE users_id_${number} = ${number}
      ORDER BY id ASC
    `)
    res.status(200).send(items[0])
  },

  changeTrue: async (req, res) => {
    let { title, id } = req.params

    await sequelize.query(`
      UPDATE ${title}
      SET completion = 'true'
      WHERE id = ${id}
    `)
    res.status(200).status("complete")
  },

  changeFalse: async (req, res) => {
    let { title, id } = req.params

    await sequelize.query(`
      UPDATE ${title}
      SET completion = 'false'
      WHERE id = ${id}
    `)
    res.status(200).status("complete")
  },

  deleteUser: async (req, res) => {
    let { id } = req.params

    try {
      sequelize.query(`
        DELETE FROM users
        WHERE id = ${id}
      `)
    } catch {}
    res.status(200).send("account deleted")
  },

  changeEmail: async (req, res) => {
    let { id } = req.params
    let { email } = req.body
    try {
      sequelize.query(`
        UPDATE users
        SET email = '${email}'
        WHERE id = ${id}
      `)

      res.status(200).send("email changed")
    } catch {}
  }
}
