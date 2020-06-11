const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const values_controller = require('../controllers/value.js');
const auth_controller = require('../controllers/auth.js');

//GET página de registro dónde el usario rellena su username y contraseña
router.get('/signup', auth_controller.signUp);

//POST de los datos de signup, validación de los campos y redirección al perfil de usuario
router.post('/signup', auth_controller.registerUser);


//GET página de login dónde el usuario entra los datos de acceso
router.get('/login', auth_controller.logIn);

//POST de los datos de login, validación de los campos y redirección al perfil de usuario
router.post('/login', auth_controller.validateLogIn);

//POST logout
router.post("/logout", auth_controller.logOut);

// GET userProfile - Perfil del usuario con sus valores
router.get('/userProfile', values_controller.getAllValues);

// POST add symbol userProfile - Añadir un valor al userProfile
router.post('/userProfile', values_controller.createValue);

// POST delete symbol userProfile - Borrar un valor y volver al userProfile actualizado 
router.post('/delete/:item', values_controller.deleteValue);

//GET representación de los gráficos de los símbolos del usario
router.get("/charts", values_controller.chart);


module.exports = router;