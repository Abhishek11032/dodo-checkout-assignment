interface ProductCardProps {
  productName: string;
  price: number;
}

function ProductCard({
  productName,
  price,
}: ProductCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            {productName}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Monthly Subscription
          </p>
        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
          Active Plan
        </span>
      </div>

      <div className="mt-4">
        <div className="text-3xl font-bold text-slate-900">
          ₹{price}
          <span className="ml-1 text-base font-normal text-slate-500">
            /month
          </span>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span>✓</span>
          <span>Unlimited Transactions</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span>✓</span>
          <span>Priority Support</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span>✓</span>
          <span>Analytics Dashboard</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;