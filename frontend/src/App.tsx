import { useEffect, useState } from "react";

export const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage("Order canceled -- continue to shop around and checkout when you're ready.");
    }
  }, []);

  return message ? <Message message={message} /> : <ProductDisplay />;
};

const ProductDisplay = () => (
  <section>
    {/* TODO: BACKEND_URL は env から読む */}
    <form action="http://localhost:3000/checkout" method="POST">
      <button type="submit">Checkout</button>
    </form>
  </section>
);

const Message = ({ message }: { message: string }) => (
  <section>
    <p>{message}</p>
  </section>
);
