export interface PaymentSuccessPayload {
  sessionId: string;
}

export interface PaymentErrorPayload {
  message: string;
}

export interface CheckoutClosePayload {
  reason: string;
}

export interface CheckoutOptions {
  productId: string;
  checkoutUrl?: string;

  onSuccess?: (
    data: PaymentSuccessPayload
  ) => void;

  onClose?: (
    data: CheckoutClosePayload
  ) => void;

  onError?: (
    data: PaymentErrorPayload
  ) => void;
}