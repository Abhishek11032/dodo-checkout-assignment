export const EVENTS = {
  PAYMENT_SUCCESS: "PAYMENT_SUCCESS",
  PAYMENT_FAILED: "PAYMENT_FAILED",
  CHECKOUT_CLOSED: "CHECKOUT_CLOSED",
} as const;

export type EventType =
  (typeof EVENTS)[keyof typeof EVENTS];