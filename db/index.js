'use strict'

const db = require('./database')

// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models (which you should define in separate modules in this directory).

const Property = require('./properties')
const User = require('./users')

// After you've required all of your models into this module, you should establish
// associations (https://sequelize-guides.netlify.com/association-types/) between them here as well!

Property.belongsTo(User);
User.hasMany(Property)


module.exports = {
  // Include your models in this exports object as well!
  db,
  User,
  Property
}
