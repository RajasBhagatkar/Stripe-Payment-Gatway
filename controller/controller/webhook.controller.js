

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const endpointSecret = "whsec_DCKNIvHmSNAbn5V4ul7m6sfdBy599WYV";
// 
// const endpointSecret = "whsec_DCKNIvHmSNAbn5V4ul7m6sfdBy599WYVIE8J12J4";

const stripWebHooks = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Successfully constructed event
    console.log('✅ Success:', event.id);

    // Handle the event
    switch (event.type) {
        case 'billing_portal.session.created': {

            const billingPortalSessionCreated = event.data.object;
            // Then define and call a function to handle the event billing_portal.session.created
            console.log("In billingInProtalSessionCreate");
            console.log(billingPortalSessionCreated);


            break;
        }
        case 'checkout.session.async_payment_failed': {

            const checkoutSessionAsyncPaymentFailed = event.data.object;
            // Then define and call a function to handle the event checkout.session.async_payment_failed
            console.log("checkout session payment failed");
            console.log(checkoutSessionAsyncPaymentFailed);


            break;
        }
        case 'checkout.session.async_payment_succeeded': {

            const checkoutSessionAsyncPaymentSucceeded = event.data.object;
            // Then define and call a function to handle the event checkout.session.async_payment_succeeded
            console.log(`💰 PaymentIntent status `);
            console.log("checkout session payment succeeded");
            console.log(checkoutSessionAsyncPaymentSucceeded);



            break;
        }
        case 'checkout.session.completed': {

            const checkoutSessionCompleted = event.data.object;
            // Then define and call a function to handle the event checkout.session.completed
            console.log("checkout session completed");
            console.log(checkoutSessionCompleted);


            break;
        }
        case 'checkout.session.expired': {

            const checkoutSessionExpired = event.data.object;
            // Then define and call a function to handle the event checkout.session.expired
            console.log("checkotu session Expired");
            console.log(checkoutSessionExpired);

            break;
        }
        case 'payment_intent.succeeded': {
            const email = event['data']['object']['receipt_email'] // contains the email that will recive the recipt for the payment (users email usually)
            console.log(`PaymentIntent was successful for ${email}!`)
            break;
        }
        // ... handle other event types
        default:
            console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
            // Unexpected event type
            return res.status(400).end();
    }
    // Return a 200 response to acknowledge receipt of the event
    res.json({ received: true });
}

const webhookGet = async (req, res) => {
    return res.json({ message: "test running found" })
}

/**
 * 
 *
    const webHooks = async (request, response) => {
    // app.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        // event =console.log(event.type);
        event = stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret);

    } catch (err) {
        console.log(err);
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'billing_portal.session.created':
            const billingPortalSessionCreated = event.data.object;
            // Then define and call a function to handle the event billing_portal.session.created
            console.log("In billingInProtalSessionCreate");
            console.log(billingPortalSessionCreated);


            break;
        case 'checkout.session.async_payment_failed':
            const checkoutSessionAsyncPaymentFailed = event.data.object;
            // Then define and call a function to handle the event checkout.session.async_payment_failed
            console.log("checkout session payment failed");
            console.log(checkoutSessionAsyncPaymentFailed);


            break;
        case 'checkout.session.async_payment_succeeded':
            const checkoutSessionAsyncPaymentSucceeded = event.data.object;
            // Then define and call a function to handle the event checkout.session.async_payment_succeeded
            console.log("checkout session payment succeeded");
            console.log(checkoutSessionAsyncPaymentSucceeded);


            break;
        case 'checkout.session.completed':
            const checkoutSessionCompleted = event.data.object;
            // Then define and call a function to handle the event checkout.session.completed
            console.log("checkout session completed");
            console.log(checkoutSessionCompleted);


            break;
        case 'checkout.session.expired':
            const checkoutSessionExpired = event.data.object;
            // Then define and call a function to handle the event checkout.session.expired
            console.log("checkotu session Expired");
            console.log(checkoutSessionExpired);


            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
}

 */


module.exports = { stripWebHooks, webhookGet }
