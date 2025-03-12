import { useEffect, useState } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/style.css";

const DatePicker = () => {
  // Initialize the range state with the DateRange type
  const [range, setRange] = useState<DateRange | undefined>();

  useEffect(() => {
    if (range?.from || range?.to) {
      console.log(range?.from?.toLocaleDateString());
      console.log(range?.to?.toLocaleDateString());
    }
  }, [range]);

  return (
    <>
      <button
        popoverTarget="rdp-popover"
        className="input input-border m-10"
        style={{ anchorName: "--rdp" } as React.CSSProperties}
      >
        {range
          ? `${range.from?.toLocaleDateString() || ""} => ${
              range.to?.toLocaleDateString() || ""
            }`
          : "Pick a date"}
      </button>
      <div
        popover="auto"
        id="rdp-popover"
        className="dropdown"
        style={{ positionAnchor: "--rdp" } as React.CSSProperties}
      >
        <DayPicker
          className="react-day-picker"
          mode="range"
          selected={range}
          onSelect={setRange}
        />
      </div>
    </>
  );
};
export default DatePicker;
