/**
 * Module dependencies.
 */
const express = require('express');
const logger = require('morgan');
const router = require('./routes');
const path = require('path');
const errorHandler = require('errorhandler');
const cors = require("cors");
const db = require("../models");

const corsOptions = {
  origin: "http://localhost:3000"
};

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
require('dotenv').config({path: path.join(__dirname, '../.env')})

// Sync db
db.sequelize.sync();

/**
 * Export our configuration
 */
module.exports = app => {
  /**
   * Express configuration.
   */
  app.use(cors(corsOptions));
  app.use(logger('dev'));
  app.use(errorHandler());
  app.use(express.json());
  app.set('port', process.env.PORT || 8001);
  app.use(express.urlencoded({ extended: true }));
  app.use('/v1/api/users', router);
  app.use(express.static(path.join(__dirname,'../client/build')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
};
