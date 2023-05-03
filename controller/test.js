app.post('/webhook',
    // Stripe requires the raw body to construct the event
    express.raw({ type: 'application/json' }), function (req, res) {
        var sig = req.headers['stripe-signature'];
        var event;
        try {
            event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
        }
        catch (err) {
            // On error, log and return the error message
            console.log("\u274C Error message: ".concat(err.message));
            res.status(400).send("Webhook Error: ".concat(err.message));
            return;
        }
        // Successfully constructed event
        console.log('✅ Success:', event.id);
        // Cast event data to Stripe object
        if (event.type === 'payment_intent.succeeded') {
            var stripeObject = event.data
                .object;
            console.log("\uD83D\uDCB0 PaymentIntent status: ".concat(stripeObject.status));
        }
        else if (event.type === 'charge.succeeded') {
            var charge = event.data.object;
            console.log("\uD83D\uDCB5 Charge id: ".concat(charge.id));
        }
        else {
            console.warn("\uD83E\uDD37\u200D\u2640\uFE0F Unhandled event type: ".concat(event.type));
        }
        // Return a response to acknowledge receipt of the event
        res.json({ received: true });
    });
