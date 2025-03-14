import { useFormContext } from "react-hook-form";

const CurrencySelect = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ cur: string }>();

  const currencies = [
    "USD",
    "INR",
    "EUR",
    "GBP",
    "AUD",
    "CAD",
    "SGD",
    "CHF",
    "JPY",
    "CNY",
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <label htmlFor="cur" className="font-medium">
          Currency:
        </label>
        <select
          id="cur"
          {...register("cur", { required: "Currency is required" })}
          className="select select-bordered"
        >
          <option value="">Select currency</option>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      {errors.cur && (
        <p className="text-red-500 text-sm mt-0.5">{errors.cur.message}</p>
      )}
    </div>
  );
};

export default CurrencySelect;
