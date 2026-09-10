import {
  SUCCESS_CARD,
  DECLINE_CARD,
  RETRY_CARD,
} from "../constants/cards";

import type {
  PaymentResult,
} from "../types/payment.types";

let hasRetried = false;

const delay = (ms: number) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );

export const processPayment = async (
  cardNumber: string
): Promise<PaymentResult> => {
  await delay(2000);

  const cleanCard = cardNumber.replace(
    /\s/g,
    ""
  );

  switch (cleanCard) {
    case SUCCESS_CARD:
      return {
        success: true,
        sessionId: crypto.randomUUID(),
      };

    case DECLINE_CARD:
      throw new Error("Card Declined");

    case RETRY_CARD:
      if (!hasRetried) {
        hasRetried = true;
        throw new Error("Network Error");
      }

      hasRetried = false;

      return {
        success: true,
        sessionId: crypto.randomUUID(),
      };

    default:
      throw new Error("Invalid Test Card");
  }
};