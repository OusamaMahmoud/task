// src/components/AdultsStepper.tsx
import { useFormContext } from "react-hook-form";

const AdultsStepper = () => {
  // Access form methods via context
  const { register, setValue, watch } = useFormContext<{ adults: number }>();
  // Watch the "adults" field, with a default of 1
  const adults = watch("adults", 1);

  // Function to increment the count
  const increaseAdults = () => {
    setValue("adults", adults + 1);
  };

  // Function to decrement the count (ensuring a minimum of 1)
  const decreaseAdults = () => {
    setValue("adults", adults > 1 ? adults - 1 : 1);
  };

  return (
    <div className="flex items-center gap-2">
      <label className="font-medium">Adults:</label>
      <button type="button" onClick={decreaseAdults} className="btn btn-outline">
        -
      </button>
      <input
        type="number"
        {...register("adults", { required: true, min: 1 })}
        value={adults}
        readOnly
        className="input input-bordered w-16 text-center"
      />
      <button type="button" onClick={increaseAdults} className="btn btn-outline">
        +
      </button>
    </div>
  );
};

export default AdultsStepper;
