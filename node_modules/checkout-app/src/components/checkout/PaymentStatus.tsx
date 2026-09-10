import Spinner from "../ui/Spinner";
import type { PaymentStatus as PaymentStatusType } from "../../types/payment.types";

interface PaymentStatusProps {
  status: PaymentStatusType;
  message?: string;
}

function PaymentStatus({
  status,
  message,
}: PaymentStatusProps) {
  switch (status) {
    case "processing":
      return (
        <div className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <Spinner size="sm" />

          <div>
            <p className="font-medium text-blue-700">
              Processing Payment
            </p>

            <p className="text-sm text-blue-600">
              Please do not close this window.
            </p>
          </div>
        </div>
      );

    case "success":
      return (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4">
          <div className="flex items-start gap-3">
            <div className="text-xl">🎉</div>

            <div>
              <p className="font-medium text-green-700">
                Payment Successful
              </p>

              <p className="text-sm text-green-600">
                Your subscription has been activated successfully.
              </p>
            </div>
          </div>
        </div>
      );

    case "failed":
      return (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <div className="flex items-start gap-3">
            <div className="text-xl">❌</div>

            <div>
              <p className="font-medium text-red-700">
                Payment Failed
              </p>

              <p className="text-sm text-red-600">
                {message ||
                  "Something went wrong. Please try again."}
              </p>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default PaymentStatus;