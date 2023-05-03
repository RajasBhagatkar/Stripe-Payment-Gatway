const express = require('express')
const router = express.Router();
const { stripWebHooks, webhookGet } = require('../controller/webhook.controller')

router.route('/webhook')
    .post(express.raw({ type: 'application/json' }), stripWebHooks)
    .get(webhookGet)
// http://localhost:3000/webhook
module.exports = router
