require("dotenv").config()
const express = require('express')
const app = express()
const cors = require('cors')
// const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const bodyParser = require('body-parser')

const checkoutRoutes = require('./routes/checkout.router')
const UAStringRoutes = require('./routes/UAString.router')
const main = require('./connection/connect')
const webhooksRoutes = require('./routes/webHooks.router')


main().catch(err => { console.log(err) })

app.use(express.static('public'))
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// app.use(bodyParser.json({
//     verify: (req, res, buf) => {
//         req.rawBody = buf
//     }
// }))

app.use(function (req, res, next) {
    if (req.originalUrl === '/webhook') {
        next();
    }
    else {
        express.json()(req, res, next);
    }
});

// {
// origin: ['http://localhost:5173', 'http://127.0.0.1:5173']
// }
app.use(cors())

app.use('/', checkoutRoutes)
app.use('/', UAStringRoutes)
app.use('/', webhooksRoutes)


// // This is your Stripe CLI webhook secret for testing your endpoint locally.
// const endpointSecret = "whsec_bc601afa4f12fc9e89e92008cb705054947ec79394701d32a85c1de92864a000";

// app.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
//     console.log("route hit webhook");

//     const sig = request.headers['stripe-signature'];

//     let event;

//     try {
//         event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//     } catch (err) {
//         response.status(400).send(`Webhook Error: ${err.message}`);
//         return;
//     }

//     // Handle the event
//     switch (event.type) {
//         case 'payment_intent.succeeded':
//             const paymentIntentSucceeded = event.data.object;
//             // Then define and call a function to handle the event payment_intent.succeeded
//             break;
//         // ... handle other event types
//         default:
//             console.log(`Unhandled event type ${event.type}`);
//     }

//     // Return a 200 response to acknowledge receipt of the event
//     response.send();
// });



app.listen(process.env.PORT, () => {
    console.log("Running on ", process.env.PORT);

})


