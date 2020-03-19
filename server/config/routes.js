// require express
const express = require('express');
const path    = require('path');

// create our router object
const app = express.Router();

/**
 * Controllers (route handlers).
 */
const userController = require('../controllers/userController');

/**
 * User routes
 */
app.get('/', userController.getAll);
app.post('/', userController.create);
app.put('/:userId', userController.update);
app.delete('/:userId', userController.delete);

module.exports = app;
