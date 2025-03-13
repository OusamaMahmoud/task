// src/components/RoomStepper.tsx
import { useFormContext } from "react-hook-form";

const RoomStepper = () => {
  // Access form methods using useFormContext
  const { register, setValue, watch } = useFormContext<{ rooms: number }>();
  const roomCount = watch("rooms", 1); // default value of 1

  const increaseRooms = () => {
    const newCount = roomCount + 1;
    setValue("rooms", newCount);
  };

  const decreaseRooms = () => {
    const newCount = roomCount > 1 ? roomCount - 1 : 1;
    setValue("rooms", newCount);
  };

  return (
    <div className="flex items-center gap-2">
      <label className="font-medium">Rooms:</label>
      <button type="button" onClick={decreaseRooms} className="btn btn-outline">
        -
      </button>
      <input
        type="number"
        {...register("rooms", { required: true, min: 1 })}
        value={roomCount}
        readOnly
        className="input input-bordered w-16 text-center"
      />
      <button type="button" onClick={increaseRooms} className="btn btn-outline">
        +
      </button>
    </div>
  );
};

export default RoomStepper;
