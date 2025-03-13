import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useForm, SubmitHandler } from "react-hook-form";
import useFetchCityIDs from "../hooks/useFetchCityIDs";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import _ from "lodash"; // Import lodash
import { SearchFormInputs, searchFormSchema } from "../schema/searchFormSchema";
import useDebounce from "../utils/useDebounce";

const SearchForm = () => {
  const [cityID, setCityID] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SearchFormInputs>({ resolver: zodResolver(searchFormSchema) });

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
    console.log("Doc_ID =>", cityID);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-xl font-bold shadow-xl w-fit p-4 rounded-2xl">
        Search for hotels
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-2"
      >
        <div>
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
        <button type="submit" className="btn btn-accent w-fit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
