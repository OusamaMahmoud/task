import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import useFetchCityIDs from "../hooks/useFetchCityIDs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import _ from "lodash"; // Import lodash
import { SearchFormInputs, searchFormSchema } from "../schema/searchFormSchema";
import useDebounce from "../utils/useDebounce";
import RoomStepper from "./RoomStepper";
import DatePickerField from "./DatePicker";
import AdultsStepper from "./AdultsStepper";
import ChildrenStepper from "./ChildrenStepper";
import CurrencySelect from "./CurrencySelect";
import TaxToggle from "./TaxToggle";
import useFetchHotels, { HotelSearchParams } from "../hooks/useFetchHotels";
import HotelResults from "./HotelResults";
import { AxiosError } from "axios";
import ApiKeyInput from "./ApiKeyInput";
import useApiKeyStore from "../store/useApiKeyStore";

const SearchForm = () => {
  const { apiKey } = useApiKeyStore();

  const [cityID, setCityID] = useState("");
  const [searchParams, setSearchParams] = useState<null | HotelSearchParams>(
    null
  );
  const methods = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      hotelName: "",
      rooms: 1,
      adults: 1,
      childrens: 1,
      checkin: "",
      checkout: "",
      cur: "",
      tax: false, // Default: false (prices without tax)
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
  const {
    data: cityIDs,
    error: cityIDsError,
    isError: isCityIDsError,
  } = useFetchCityIDs(debouncedHotelName || "", apiKey);

  // get City ID
  useEffect(() => {
    const targetGEOType = cityIDs?.find((city) => city.type === "GEO");
    const DOCUMENT_ID = targetGEOType?.document_id;
    setCityID(DOCUMENT_ID || "");
  }, [cityIDs]);

  useEffect(() => {
    if (cityIDsError instanceof AxiosError)
      toast.error(cityIDsError?.response?.data?.message);
  }, [cityIDsError, isCityIDsError]);

  const {
    data: hotels,
    isLoading,
    isError,
    error: hotelsError,
  } = useFetchHotels(searchParams);

  const [currentPage, setCurrentPage] = useState(0);
  const onSubmit: SubmitHandler<SearchFormInputs> = (data) => {
    if (!cityID) {
      toast.error(
        "Your search key doesn't match any city, please use another search key."
      );
      return;
    }

    console.log("Form Data =>", data);
    setCurrentPage(0);
    setSearchParams({
      ...data,
      cityid: cityID,
      api_key: apiKey,
      pagination: 0, // Start from page 0 as per API docs
    });
  };

  const handlePageChange = (newPage: number) => {
    // Directly update searchParams without changing currentPage state
    console.log("Changing to page:", newPage);

    if (searchParams) {
      setSearchParams({
        ...searchParams,
        pagination: newPage - 1, // Convert from 1-based UI to 0-based API
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 p-4">
      <ApiKeyInput />
      <h1 className="text-xl font-bold shadow-xl w-fit p-4 rounded-2xl mb-4">
        Search for hotels
      </h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 p-2 items-center">
            <div className="mb-4">
              <input
                id="hotelName"
                className="input"
                placeholder="Type hotel name..."
                {...register("hotelName")}
              />
              {errors.hotelName && (
                <p className="text-red-500 text-sm mt-0.5">
                  {errors.hotelName.message}
                </p>
              )}
            </div>
            <div className="mb-4 ">
              <DatePickerField />
            </div>
            <div className="mb-4 ">
              <RoomStepper />
            </div>
            <div className="mb-4 ">
              <AdultsStepper />
            </div>
            <div className="mb-4 ">
              <ChildrenStepper />
            </div>
            <div className="mb-4 ">
              <CurrencySelect />
            </div>
            <div>
              <TaxToggle />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-accent w-fit mt-4 px-10"
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Submit"}
          </button>
        </form>
      </FormProvider>

      {isError && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          {hotelsError instanceof AxiosError &&
            hotelsError?.response?.data?.message}
        </div>
      )}

      {isLoading && !hotels && (
        <div className="mt-6 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {hotels && (
        <div className="mt-6">
          <h1 className="text-xl font-bold shadow-xl w-fit p-4 rounded-2xl mb-4">
            Results of Hotels
          </h1>

          <HotelResults hotels={hotels} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
};

export default SearchForm;
