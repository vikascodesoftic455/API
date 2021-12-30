const express =require("express")
const { check } = require('express-validator')
const res = require("express/lib/response")
const router = express.Router()
const customController = require('../Controller/customerController')
const isAuthenticationCustomer = require('../middleware/CustomerMidddleware')


router
   .route('/signup')
   .post([
          check('name').isEmpty(),
          check('email').isEmail(),
          check('password').isLength({ min : 8,max:15}).isEmpty().withMessage('The password must be 8+ chars long and contain a numbers'),
          check('phoneNumber').isLength({min:10}).withMessage('BusinessPhonenumber must be at least 10 digitNumber')
         ],
          customController.createcustomer
        )

router
   .route('/signiIn')
   .post([ 
          check('email').isEmail(),
          check('password').isLength({ min : 8,max:15}).isEmpty().withMessage('The password must be 8+ chars long and contain a numbers'),
         ],
        customController.Verifycustomer
     )


router
    .route('/payment/:id')
    .post(isAuthenticationCustomer,customController.PayementMethod)


router
     .route('/wallet')
     .get(customController.checkWallet)


router
     .route('/wallet/:id')
     .put(customController.updatewallet)


router
     .route('/wallet/sendmonytowallet/:id')
     .put(customController.sendMoenyToWallet)     





module.exports = router