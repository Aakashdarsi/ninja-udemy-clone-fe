import { Table } from "./shared/Table";
import inv from "../fake_data/inventory";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useMemo } from "react";
import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
import { ProductDisplayLayout } from "./ProductDisplayLayout";

export const Inventory = () => {
  const headers = Object.keys(inv[0]);
  const stripePromise = loadStripe(
    "pk_test_51SFgkpHJm1IF05tPvESjasylDeuKyhvt4cQV7dr5JlhYntxMSq5mBiOQpc98kxx3PXrT4KC7uauX8V5Z562jyykD00ubktGxGS",
  );
  const promise = useMemo(() => {
    return fetch("/create-checkout-session", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);
  return (
    <div className="mt-3">
      {/* <Table headers={headers} data={ inv} />
      <CheckoutProvider
        stripe={stripePromise}
        options={{ clientSecret: promise }}
      >
        <CheckoutForm />
      </CheckoutProvider> */}
      <ProductDisplayLayout />
    </div>
  );
};
