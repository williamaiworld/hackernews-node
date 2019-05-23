'use strict'

// The sole purpose of this module is to establish a connection to your
// Postgres database by creating a Sequelize instance (called `db`).

const chalk = require('chalk')
const Sequelize = require('sequelize')
require('dotenv').config();


console.log(chalk.yellow('Opening database connection at ', process.env.DATABASE_URL))

const db = new Sequelize(
  process.env.DATABASE_URL , {
    logging: false // so we don't see all the SQL queries getting made
  }
)

module.exports = db
