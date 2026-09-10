export type PaymentStatus =
  | "idle"
  | "processing"
  | "success"
  | "failed";

export interface PaymentResult {
  success: boolean;
  sessionId?: string;
  message?: string;
}

export interface PaymentSuccessPayload {
  sessionId: string;
}

export interface PaymentErrorPayload {
  message: string;
}

export interface CheckoutClosePayload {
  reason: string;
}