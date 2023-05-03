
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)


const User = require('../model/user.model')
const StripUserId = require('../model/stripUserid.model')

//! save this on server in database send id of the respective product from client to send 
//! like user want to by 🍨 which has id 2 and want to 2 of these default is one
//? why =>  dont send these price from client as any one how changes the value in frontend get's it for free
const storeItems = new Map([
    [1, { priceInRs: 99.99, name: "Learn React Tody" }],
    [2, { priceInRs: 200, name: "Learn Css Today" }]
])


const checkoutSession = async (req, res) => {

    // app.post('/create-checkout-session', async (req, res) => {
    try {
        /**
         ** for one time payment
         **         mode: 'payment' 
         ** for subscription mode
         **         mode: 'subscription' 
         ** 
         * 
         * 
         **  payment_method_type = [] all type of payment to accept
         * 
         ** price_data : {
         **   currency: 'what currency you want to use',
         **   product_data : {
         **       name: name of the item
         **   },
         **   unit_amount: amount of single amount
         **}
         ** quantity: how many
         * 
         * 
         *! all amound should be in cents in stripe for usd smiliary should be applicable to all?? 
         * 
         * 
         */

        //* user id 
        const { userId } = req.body
        if (!userId) { return res.status(401) }

        console.log("in request to create session");

        let session


        console.log("above await stripuserid");

        //* user find strip user object id from database
        const userObjectId = await StripUserId.findOne({ userId: userId })

        const user = await User.findById(userId)

        //* if not found create Strip user object id and store 
        if (!userObjectId) {
            // create object checkout session and create user Id
            const customer = await stripe.customers.create({
                email: user.email,
                name: 'Rajas Bhagatkar',
                // other customer information
            });
            const customerId = customer.id;

            // save userid successfully
            await StripUserId.create({
                userId: userId,
                stripId: customerId
            })



            session = await stripe.checkout.sessions.create({
                customer: customerId,
                mode: 'payment',
                payment_method_types: ['card'],
                line_items: req.body.items.map(item => {
                    const storeItem = storeItems.get(item.id)
                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: storeItem.name
                            },
                            unit_amount: storeItem.priceInRs * 100
                        },
                        quantity: item.quantity
                    }
                }),
                phone_number_collection: {
                    enabled: true,
                },
                tax_id_collection: {
                    enabled: true,
                },
                shipping_address_collection: {
                    allowed_countries: ['US', 'INDIA'],
                },
                success_url: 'http://127.0.0.1:3000/success.html',
                cancel_url: 'http://127.0.0.1:3000/cancel.html',
            });


        } else {

            // customer id alredy exists
            session = await stripe.checkout.sessions.create({
                customer: userObjectId.stripId,
                mode: 'payment',
                payment_method_types: ['card'],
                line_items: req.body.items.map(item => {
                    const storeItem = storeItems.get(item.id)
                    return {
                        price_data: {
                            currency: 'inr',
                            product_data: {
                                name: storeItem.name
                            },
                            unit_amount: storeItem.priceInRs * 100
                        },
                        quantity: item.quantity
                    }
                }),
                phone_number_collection: {
                    enabled: true,
                },
                tax_id_collection: {
                    enabled: true,
                },
                customer_update: {
                    name: 'auto',
                    address: 'auto',
                },
                success_url: 'http://127.0.0.1:3000/success.html',
                cancel_url: 'http://127.0.0.1:3000/cancel.html',
            });



        }


        return res.json({ url: session.url })


    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
    // })

}

const test = async (req, res) => {
    // const user = {
    //     email: "rajas@gmail.com",
    //     password: 'password@123'
    // }


    // const user = await StripUserId.findOne({ userId: "642beb6ab644c8dc5c079312" })
    // return res.status(200).json(user)


    const paymentIntents = await stripe.paymentIntents.list({
        customer: 'cus_NePUuhNQegJ8mV',
    });
    return res.json(paymentIntents)




    // return res.status(200).json({ message: "usercreate", user: createdUser })


    // const createdUser = await StripUserId.create({ userId: '642beb6ab644c8dc5c079312', stripId: '1212h3j12h3j12h3j5h1u3io12u5345gdf123' })
    // return res.json(createdUser)

}



module.exports = { checkoutSession, test }


/**
 * 
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id)
                return {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.priceInRs * 100
                    },
                    quantity: item.quantity
                }
            }),
            // doesn't matter where you send 
            success_url: `${process.env.SERVER_URL}/success.html`,
            cancel_url: `${process.env.SERVER_URL}/cancel.html`,
        })

        return res.json({ url: session.url })
 */
