// call built-in express
const express = require("express");
const app = express.Router();
const { createUser, findUser, updateUser, deleteUser, getAllUsers, login, resetPassword, getAllRandomUsers } = require("../controllers/userController");
const { validateCreateUser, validateUpdateUser, validateDeleteUser, validateLogin, validateResetPassword} = require("../validation/validator");


// POST Method
app.post('/createuser',  createUser);

// GET method
// find unique user by id
app.get('/users/:id', findUser);

//PUT Method to updateUser
app.put('/users/:id', validateUpdateUser, updateUser);

// DELETE Method to delete user
app.delete('/users/:id', validateDeleteUser, deleteUser)

// get all users
app.get('/allusers', getAllUsers);

//post for sigin
app.post('/Login', login);

// reset password
app.put('/resetpassword/:email', validateResetPassword, resetPassword);

app.get('/randomusers',getAllRandomUsers);

module.exports = app;