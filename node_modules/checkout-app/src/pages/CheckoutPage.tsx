import { useEffect, useMemo, useState } from "react";

import ProductCard from "../components/checkout/ProductCard";
import CheckoutForm from "../components/checkout/CheckoutForm";
import PaymentStatus from "../components/checkout/PaymentStatus";
import { sendMessageToParent } from "../utils/postMessage";
import type { PaymentStatus as PaymentStatusType } from "../types/payment.types";
import { PRODUCTS } from "../constants/products";
import { EVENTS } from "../constants/events";

function CheckoutPage() {
  const [status, setStatus] = useState<PaymentStatusType>("idle");

  const [message, setMessage] = useState("");

  const productId = useMemo(() => {
    const params = new URLSearchParams(window.location.search);

    return params.get("productId") || "prod_123";
  }, []);

  const product =
    PRODUCTS[productId as keyof typeof PRODUCTS] ?? PRODUCTS.prod_123;

  const handleStatusChange = (newStatus: PaymentStatusType, msg?: string) => {
    setStatus(newStatus);
    setMessage(msg || "");
  };

  const closeCheckout = (reason: "user_closed" | "escape_key") => {
    sendMessageToParent(EVENTS.CHECKOUT_CLOSED, {
      reason,
    });
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeCheckout("escape_key");
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="h-screen overflow-y-auto bg-slate-100 p-4 scrollbar-hide">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold">Secure Checkout</h1>

            <p className="text-sm text-slate-500">
              Complete your purchase securely
            </p>
          </div>

          <button
            onClick={() => closeCheckout("user_closed")}
            className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close checkout"
          >
            ✕
          </button>
        </div>

        <ProductCard productName={product.name} price={product.price} />

        {status !== "success" && (
          <CheckoutForm
            amount={product.price}
            onStatusChange={handleStatusChange}
          />
        )}

        <PaymentStatus status={status} message={message} />
      </div>
    </div>
  );
}

export default CheckoutPage;
