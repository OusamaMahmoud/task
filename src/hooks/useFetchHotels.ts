import { useQuery } from "@tanstack/react-query";
import apiClint from "../services/api-Client";
import { HotelApiResponse } from "../types/Hotel";

export interface HotelSearchParams {
  cityid: string;
  api_key: string;
  pagination: number;
  cur: string;
  rooms: number;
  adults: number;
  checkin: string;
  checkout: string;
  childrens: number;
  tax: boolean;
}

const fetchHotels = async (params: HotelSearchParams) => {
  // Replace with your actual API URL and parameters.

  if (!params.api_key) {
    params.api_key = "67d3889317d5897e140a9dce";
  }
  const response = await apiClint.get<HotelApiResponse>("/city", { params });
  console.log(response.data);
  return response.data;
};

const useFetchHotels = (params: HotelSearchParams | null) => {
  return useQuery({
    queryKey: ["hotels", params],
    queryFn: () => fetchHotels(params as HotelSearchParams),
    enabled: !!params, // Only run if params is not null
    retry: 3,
    staleTime: 0, // 1 minute for example
    refetchOnWindowFocus: false,
  });
};

export default useFetchHotels;
