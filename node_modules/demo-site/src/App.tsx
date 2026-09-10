import { useState } from "react";
import { DodoCheckout } from "@dodo/sdk";

interface LogEntry {
  id: string;
  type: "success" | "error" | "close";
  message: string;
  time: string;
}

function App() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = (
    type: LogEntry["type"],
    message: string
  ) => {
    const log: LogEntry = {
      id: crypto.randomUUID(),
      type,
      message,
      time: new Date().toLocaleTimeString(),
    };

    setLogs((prev) => [log, ...prev]);
  };

  const openCheckout = () => {
    DodoCheckout.open({
      productId: "prod_123",

      checkoutUrl: "http://localhost:5173",

      onSuccess: ({ sessionId }) => {
        addLog(
          "success",
          `Payment completed successfully (${sessionId})`
        );
      },

      onError: ({ message }) => {
        addLog(
          "error",
          `Payment failed: ${message}`
        );
      },

      onClose: ({ reason }) => {
        addLog(
          "close",
          `Checkout closed (${reason})`
        );
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-4xl">
        {/* Hero */}
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-4xl font-bold">
            Demo Store
          </h1>

          <p className="mt-2 text-slate-600">
            Premium Monthly Subscription
          </p>

          <div className="mt-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Price
              </p>

              <p className="text-3xl font-bold">
                ₹999
              </p>
            </div>

            <button
              onClick={openCheckout}
              className="rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:opacity-90"
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* Activity */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            Payment Activity
          </h2>

          {logs.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-slate-500">
              No payment activity yet
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={
                        log.type === "success"
                          ? "text-green-600"
                          : log.type === "error"
                          ? "text-red-600"
                          : "text-slate-600"
                      }
                    >
                      {log.type === "success" && "✅ Success"}
                      {log.type === "error" && "❌ Failed"}
                      {log.type === "close" && "🚪 Closed"}
                    </span>

                    <span className="text-xs text-slate-400">
                      {log.time}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-700">
                    {log.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;