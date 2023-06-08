import { useEffect, useState } from "react";

export const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Succeeded!");
    }

    if (query.get("canceled")) {
      setMessage("Canceled.");
    }
  }, []);

  return message ? <Message message={message} /> : <ProductDisplay />;
};

const ProductDisplay = () => (
  <section>
    {/* TODO: BACKEND_URL は env から読む */}
    <form action="http://localhost:3000/checkout/setup" method="POST">
      <button type="submit">setup</button>
    </form>
  </section>
);

const Message = ({ message }: { message: string }) => (
  <section>
    <p>{message}</p>
  </section>
);
