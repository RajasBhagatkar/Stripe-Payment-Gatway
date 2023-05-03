const express = require('express')
const router = express.Router()
const { getUserSystemIdentifier } = require('../controller/UAString.controller.js')

router.route('/user-agent-string').get(getUserSystemIdentifier)

module.exports = router