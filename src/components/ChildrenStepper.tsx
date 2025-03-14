import { useFormContext } from "react-hook-form";

const ChildrenStepper = () => {
  // Access form methods using useFormContext.
  const { register, setValue, watch } = useFormContext<{ childrens: number }>();
  // Watch the "childrens" field with a default value of 0.
  const childrens = watch("childrens", 0);

  // Increment children if current count is less than 10.
  const increaseChildrens = () => {
    if (childrens < 10) {
      setValue("childrens", childrens + 1);
    }
  };

  // Decrement children if current count is greater than 0.
  const decreaseChildrens = () => {
    if (childrens > 0) {
      setValue("childrens", childrens - 1);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <label className="font-medium">Children:</label>
      <button
        type="button"
        onClick={decreaseChildrens}
        className="btn btn-outline"
      >
        -
      </button>
      <input
        type="number"
        {...register("childrens", { required: true, min: 0, max: 10 })}
        value={childrens}
        readOnly
        className="input input-bordered w-16 text-center"
      />
      <button
        type="button"
        onClick={increaseChildrens}
        className="btn btn-outline"
      >
        +
      </button>
    </div>
  );
};

export default ChildrenStepper;
