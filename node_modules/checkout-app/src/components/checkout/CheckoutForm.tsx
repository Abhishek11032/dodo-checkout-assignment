import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { processPayment } from "../../services/payment.service";
import { sendMessageToParent } from "../../utils/postMessage";
import type { PaymentStatus } from "../../types/payment.types";
import { EVENTS } from "../../constants/events";

interface CheckoutFormProps {
  amount: number;

  onStatusChange: (
  status: PaymentStatus,
  message?: string,
) => void;
}

function CheckoutForm({ amount, onStatusChange }: CheckoutFormProps) {
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!email.trim()) {
      return "Email is required";
    }

    const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    const cleanCard = cardNumber.replace(/\s/g, "");

    if (!cleanCard) {
      return "Card number is required";
    }

    if (cleanCard.length !== 16) {
      return "Card number must be 16 digits";
    }

    if (!expiry.trim()) {
      return "Expiry date is required";
    }

    const [month, year] = expiry.split("/");

    if (!month || !year) {
      return "Invalid expiry date";
    }

    const expiryMonth = Number(month);
    const expiryYear = Number(`20${year}`);

    if (expiryMonth < 1 || expiryMonth > 12) {
      return "Invalid expiry month";
    }

    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    if (
      expiryYear < currentYear ||
      (expiryYear === currentYear && expiryMonth < currentMonth)
    ) {
      return "Card has expired";
    }

    if (!cvv.trim()) {
      return "CVV is required";
    }

    if (cvv.length !== 3) {
      return "CVV must be 3 digits";
    }

    return "";
  };

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 4);

    if (cleaned.length <= 2) {
      return cleaned;
    }

    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
  };

  const handlePayment = async () => {
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    try {
      setLoading(true);

      onStatusChange("processing");

      const response = await processPayment(cardNumber);

      onStatusChange("success");

      sendMessageToParent(EVENTS.PAYMENT_SUCCESS, {
        sessionId: response.sessionId,
      });

      setEmail("");
      setCardNumber("");
      setExpiry("");
      setCvv("");
    } catch (error) {
      let message = "Payment Failed";

      if (error instanceof Error) {
        if (error.message === "Card Declined") {
          message = "Card was declined. Please try another card.";
        } else if (error.message === "Network Error") {
          message = "Network issue detected. Please retry payment.";
        } else {
          message = error.message;
        }
      }

      onStatusChange("failed", message);

      sendMessageToParent(EVENTS.PAYMENT_FAILED, {
        message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <Input
        label="Email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="john@example.com"
      />

      <Input
        label="Card Number"
        autoComplete="cc-number"
        value={cardNumber}
        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
        placeholder="4242 4242 4242 4242"
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Expiry"
          autoComplete="cc-exp"
          value={expiry}
          onChange={(e) => setExpiry(formatExpiry(e.target.value))}
          placeholder="MM/YY"
        />

        <Input
          label="CVV"
          autoComplete="cc-csc"
          value={cvv}
          onChange={(e) =>
            setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))
          }
          placeholder="123"
        />
      </div>

      <Button loading={loading} disabled={loading} onClick={handlePayment}>
        Pay ₹{amount}
      </Button>
    </div>
  );
}

export default CheckoutForm;
