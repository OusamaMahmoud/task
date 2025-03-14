import React, { useState, useEffect } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { useFormContext } from "react-hook-form";

const DatePickerField = () => {
  // Access setValue and watch from React Hook Form's context
  const { setValue, watch } = useFormContext();

  // Get the initial form values (they are strings in YYYY-MM-DD format)
  const checkin = watch("checkin");
  const checkout = watch("checkout");

  // Initialize the local range state by converting form values to Date objects
  const [range, setRange] = useState<DateRange | undefined>(() => {
    const from = checkin ? new Date(checkin) : undefined;
    const to = checkout ? new Date(checkout) : undefined;
    return from || to ? { from, to } : undefined;
  });

  // When the range changes, update the form values accordingly.
  // We convert the Date objects to date strings (YYYY-MM-DD)
  useEffect(() => {
    if (range?.from) {
      const checkinDate = range.from.toISOString().split("T")[0];
      setValue("checkin", checkinDate);
    }
    if (range?.to) {
      const checkoutDate = range.to.toISOString().split("T")[0];
      setValue("checkout", checkoutDate);
    }
  }, [range, setValue]);

  return (
    <div className="flex flex-col gap-2">
      <button
        popoverTarget="rdp-popover"
        style={{ anchorName: "--rdp" } as React.CSSProperties}
        type="button"
        className="input input-bordered"
      >
        {range
          ? `${range.from?.toLocaleDateString()} → ${range.to?.toLocaleDateString()}`
          : "Pick a date range"}
      </button>
      <div
        popover="auto"
        id="rdp-popover"
        style={{ positionAnchor: "--rdp" } as React.CSSProperties}
        className="dropdown"
      >
        <DayPicker
          mode="range"
          selected={range}
          onSelect={setRange}
          className="react-day-picker"
        />
      </div>
    </div>
  );
};

export default DatePickerField;
