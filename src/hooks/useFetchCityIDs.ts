import { useQuery } from "@tanstack/react-query";
import apiClint, { API_KEY } from "../services/api-Client";

interface MappingObject {
  type: string;
  title: string;
  document_id: string;
}

const getCityIds = async (hotelName: string) => {
  const params = {
    api_key: API_KEY,
    name: hotelName,
  };

  const res = await apiClint.get<MappingObject[]>("/mapping", { params });
  console.log(res.data);
  return res.data;
};

const useFetchCityIDs = (hotelName: string) => {
  return useQuery({
    queryKey: ["cityIDs", hotelName],
    queryFn: () => getCityIds(hotelName),
    retry: 1,
    staleTime: 0,
    refetchOnWindowFocus: false,
    enabled: !!hotelName,
  });
};

export default useFetchCityIDs;
