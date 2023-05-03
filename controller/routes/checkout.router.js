const express = require('express')
const router = express.Router()
const { checkoutSession, test } = require('../controller/checkout.controller')



router.route('/create-checkout-session').post(checkoutSession)
router.route('/test').get(test)

module.exports = router;