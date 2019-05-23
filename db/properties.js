'use strict';

const db = require('./database');
const Sequelize = require('sequelize');

const Property = db.define('property', {
  city: {
    type: Sequelize.STRING,
  },
  
  address: {
    type: Sequelize.STRING,
    
  },
  description: Sequelize.TEXT
},
)

module.exports = Property;
