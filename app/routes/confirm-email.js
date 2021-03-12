const express = require('express');
const ConfirmCtrl = require('../controllers/confirm-email');
const confirmEmail = express.Router();
confirmEmail
    .post('/confirm_email', ConfirmCtrl.dataFormEmail)
module.exports = confirmEmail;