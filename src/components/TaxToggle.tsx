// src/components/TaxToggle.tsx
import React from "react";
import { useFormContext } from "react-hook-form";

const TaxToggle = () => {
  const { register } = useFormContext<{ tax: boolean }>();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="tax" className="font-medium">
        Include Tax:
      </label>
      <input
        type="checkbox"
        id="tax"
        {...register("tax")}
        className="checkbox checkbox-accent"
      />
    </div>
  );
};

export default TaxToggle;
