const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

const signupValidations = require('../validations/signupValidations');
const signinValidations = require('../validations/signupValidations');

router.post('/signup', signupValidations, authController.signup);
router.post('/signin', signinValidations, authController.signin);
router.post('/authenticate', authController.authenticate);

module.exports = router;