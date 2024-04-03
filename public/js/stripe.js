/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alert";

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    "pk_test_51P07qBGoqEmrKVQlbze31wHIkJsUz9EjOyYRmXWSYWZYWZEEJr6SCHZ6yVYLonlxJbVgH0ZrUoDOHrxmIR7NPXGy00Xz293AkJ",
  );
  try {
    // GET CHECKOUT SESSION FROM API
    const session = await axios.get(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    );
    console.log(session);

    // CREATE CHECKOUT FORM + CHARGE CREDIT CARD
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert("error", err);
  }
};
