import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import useFetchCityIDs from "../hooks/useFetchCityIDs";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import _ from "lodash"; // Import lodash
import { SearchFormInputs, searchFormSchema } from "../schema/searchFormSchema";
import useDebounce from "../utils/useDebounce";
import RoomStepper from "./RoomStepper";
import DatePickerField from "./DatePicker";
import AdultsStepper from "./AdultsStepper";

const SearchForm = () => {
  const [cityID, setCityID] = useState("");

  const methods = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      rooms: 1,
      adults: 1,
      checkin: "",
      checkout: "",
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const hotelName = watch("hotelName");
  const debouncedHotelName = useDebounce(hotelName, 500); // Use debounce hook

  // Fetch city IDs with debounced hotel name
  const { data: cityIDs } = useFetchCityIDs(debouncedHotelName || "");

  // get City ID
  useEffect(() => {
    const targetGEOType = cityIDs?.find((city) => city.type === "GEO");
    const DOCUMENT_ID = targetGEOType?.document_id;
    setCityID(DOCUMENT_ID || "");
  }, [cityIDs]);

  const onSubmit: SubmitHandler<SearchFormInputs> = (data) => {
    if (!cityID) {
      toast.error(
        "Your search key doesn't match any city, please use another search key."
      );
      return;
    }

    console.log("Form Data =>", data);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-xl font-bold shadow-xl w-fit p-4 rounded-2xl">
        Search for hotels
      </h1>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-2"
        >
          <div className="mb-4">
            <label htmlFor="hotelName" className="label mb-2 block">
              Type Your Destination
            </label>
            <input
              id="hotelName"
              className="input input-accent"
              placeholder="Type hotel name..."
              {...register("hotelName")}
            />
            {errors.hotelName && (
              <p className="text-red-500 text-sm mt-0.5">
                {errors.hotelName.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="label mb-3 block">
              Select Check-in and Check-out
            </label>
            <DatePickerField />
          </div>
          <div className="mb-4">
            <label className="label mb-3 block">Select rooms number</label>
            <RoomStepper />
          </div>
          <div className="mb-4">
            <AdultsStepper />
          </div>
          <button type="submit" className="btn btn-accent w-fit">
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default SearchForm;
