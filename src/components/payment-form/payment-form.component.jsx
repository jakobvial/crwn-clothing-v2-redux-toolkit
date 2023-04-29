import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";

import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import {FormContainer, PaymentFormContainer} from "./payment-form.styles";

const PaymentForm = () => {
    const stripe = useStripe(); // This hook is used to initialize Stripe.js with your publishable API key and provides access to the Stripe object.
    const elements = useElements(); // This hook is used to initialize the Elements components.

    const paymentHandler = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const response = await fetch("/.netlify/functions/create-payment-intent", {
            method: "post", // The HTTP method
            headers: { // Additional headers to send to the server
                "Content-Type": "application/json" // This header is required to send the data in JSON format.
            },
            body: JSON.stringify({amount: 10000}) // The data to send to the server
        }).then((res) => res.json());

        const {paymentIntent: {client_secret}} = response;

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: "Jakob Albrechtsen"
                }
            }
        });

        if (paymentResult.error) {
            alert(paymentResult.error.message);
        } else {
            if (paymentResult.paymentIntent.status === "succeeded") {
                alert("Payment succeeded!");
            }
        }
    };

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit card payment: </h2>
                <CardElement/>
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</Button>
            </FormContainer>
        </PaymentFormContainer>
    );
};

export default PaymentForm;