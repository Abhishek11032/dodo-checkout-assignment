import type {
  PaymentSuccessPayload,
  PaymentErrorPayload,
  CheckoutClosePayload,
} from "../../../apps/checkout-app/src/types/payment.types";

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

class DodoCheckoutSDK {
  private overlay: HTMLDivElement | null = null;

  private iframe: HTMLIFrameElement | null = null;

  private scrollY = 0;

  private messageHandler?: (
    event: MessageEvent
  ) => void;

  open(options: CheckoutOptions) {
    // Prevent duplicate checkout
    if (this.overlay) {
      return;
    }

    // Cleanup old listener if any
    if (this.messageHandler) {
      window.removeEventListener(
        "message",
        this.messageHandler
      );
    }

    const checkoutUrl =
      options.checkoutUrl ??
      "http://localhost:5173";

    const overlay =
      document.createElement("div");

    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.background =
      "rgba(15, 23, 42, 0.55)";
    overlay.style.backdropFilter =
      "blur(4px)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent =
      "center";
    overlay.style.zIndex = "99999";

    const iframe =
      document.createElement("iframe");

    iframe.src =
      `${checkoutUrl}?productId=${encodeURIComponent(
        options.productId
      )}`;

    iframe.title = "Dodo Checkout";

    iframe.style.width = "440px";
    iframe.style.height = "720px";
    iframe.style.maxWidth = "95vw";
    iframe.style.maxHeight = "95vh";
    iframe.style.border = "none";
    iframe.style.borderRadius = "20px";
    iframe.style.background = "#fff";
    iframe.style.boxShadow =
      "0 25px 60px rgba(0,0,0,0.25)";

    overlay.appendChild(iframe);

    overlay.addEventListener(
      "click",
      (event) => {
        if (event.target === overlay) {
          options.onClose?.({
            reason: "overlay_click",
          });

          this.close();
        }
      }
    );

    document.body.appendChild(
      overlay
    );

    // Lock page scroll
    this.scrollY = window.scrollY;

    document.body.style.position =
      "fixed";

    document.body.style.top =
      `-${this.scrollY}px`;

    document.body.style.left = "0";

    document.body.style.right = "0";

    document.body.style.width = "100%";

    document.body.style.overflow =
      "hidden";

    this.overlay = overlay;
    this.iframe = iframe;

    const allowedOrigin =
      new URL(checkoutUrl).origin;

    this.messageHandler = (
      event: MessageEvent
    ) => {
      // Security validation
      if (
        event.origin !== allowedOrigin
      ) {
        return;
      }

      const { type, payload } =
        event.data || {};

      switch (type) {
        case "PAYMENT_SUCCESS":
          options.onSuccess?.({
            sessionId:
              payload?.sessionId,
          });

          this.close();
          break;

        case "PAYMENT_FAILED":
          options.onError?.({
            message:
              payload?.message ??
              "Payment Failed",
          });

          break;

        case "CHECKOUT_CLOSED":
          options.onClose?.({
            reason:
              payload?.reason ??
              "user_closed",
          });

          this.close();
          break;

        default:
          break;
      }
    };

    window.addEventListener(
      "message",
      this.messageHandler
    );
  }

  close() {
    if (this.overlay) {
      this.overlay.remove();
      this.overlay = null;
    }

    // Restore page scroll
    document.body.style.position =
      "";

    document.body.style.top = "";

    document.body.style.left = "";

    document.body.style.right = "";

    document.body.style.width = "";

    document.body.style.overflow =
      "";

    window.scrollTo(
      0,
      this.scrollY
    );

    this.iframe = null;

    if (this.messageHandler) {
      window.removeEventListener(
        "message",
        this.messageHandler
      );

      this.messageHandler =
        undefined;
    }
  }
}

export const DodoCheckout =
  new DodoCheckoutSDK();