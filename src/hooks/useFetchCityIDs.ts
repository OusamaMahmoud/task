import { useQuery } from "@tanstack/react-query";
import apiClint from "../services/api-Client";
import useApiKeyStore from "../store/useApiKeyStore";

interface MappingObject {
  type: string;
  title: string;
  document_id: string;
}

const getCityIds = async (hotelName: string, apiKey: string) => {
  const params = {
    api_key: apiKey || "67d3889317d5897e140a9dce",
    name: hotelName,
  };
  const res = await apiClint.get<MappingObject[]>("/mapping", { params });
  console.log(res.data);
  return res.data;
};

const useFetchCityIDs = (hotelName: string, apiKey: string) => {
  return useQuery({
    queryKey: ["cityIDs", hotelName],
    queryFn: () => getCityIds(hotelName, apiKey),
    retry: 3,
    staleTime: 0,
    refetchOnWindowFocus: false,
    enabled: !!hotelName,
  });
};

export default useFetchCityIDs;
