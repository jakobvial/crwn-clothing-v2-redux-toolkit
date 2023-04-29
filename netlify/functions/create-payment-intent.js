require("dotenv").config(); // read .env file if present and add to process.env
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // secret key from .env file

// What it does:
// 1. Receives a request from client
// 2. Creates a payment intent with the total amount
// 3. Send the payment intent to the client
exports.handler = async (eventRequest) => {
    try {
        const {amount} = JSON.parse(eventRequest.body);
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method_types: ["card"]
        });

        return {
            statusCode: 200,
            body: JSON.stringify({paymentIntent})
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({error})
        };
    }
};