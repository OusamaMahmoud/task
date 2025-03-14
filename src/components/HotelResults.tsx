import React from "react";
import { HotelApiResponse, Hotel, PaginationMetadata } from "../types/Hotel";

interface HotelResultsProps {
  hotels: HotelApiResponse;
  onPageChange: (page: number) => void;
}

const HotelResults: React.FC<HotelResultsProps> = ({
  hotels,
  onPageChange,
}) => {
  // Extract hotel data and pagination data from the response
  const hotelData: Hotel[] = hotels.filter(
    (item): item is Hotel => "hotelId" in item
  );

  // Find the pagination metadata (last item in the array)
  const paginationArray = hotels.find(
    (item): item is PaginationMetadata[] =>
      Array.isArray(item) && item.length > 0 && "totalHotelCount" in item[0]
  ) as PaginationMetadata[] | undefined;

  const pagination = paginationArray?.[0] as PaginationMetadata;

  const handlePrev = () => {
    if (pagination.currentPageNumber > 1) {
      onPageChange(pagination.currentPageNumber - 1);
    }
  };

  const handleNext = () => {
    if (pagination.currentPageNumber < pagination.totalpageCount) {
      onPageChange(pagination.currentPageNumber + 1);
    }
  };

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotelData.map((hotel) => (
          <div key={hotel.hotelId} className="card shadow-lg p-4">
            <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
              <span>No image</span>
            </div>
            <h2 className="text-lg font-bold mt-2">{hotel.name}</h2>
            <div className="flex items-center mt-1">
              <span className="text-yellow-500">★</span>
              <span className="ml-1">{hotel.reviews.rating}</span>
              <span className="text-gray-500 ml-2">
                ({hotel.reviews.count} reviews)
              </span>
            </div>
            <p className="text-gray-700 mt-2">
              Best price: {hotel.price1} via {hotel.vendor1}
            </p>
            {hotel.price2 && (
              <p className="text-gray-600 text-sm mt-1">
                Also on {hotel.vendor2}: {hotel.price2}
              </p>
            )}
            <p className="text-gray-500 text-sm mt-2">{hotel.telephone}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          className="btn btn-outline"
          onClick={handlePrev}
          disabled={pagination.currentPageNumber <= 1}
        >
          Prev
        </button>
        <span>
          Page {pagination.currentPageNumber} of {pagination.totalpageCount}
        </span>
        <button
          className="btn btn-outline"
          onClick={handleNext}
          disabled={pagination.currentPageNumber >= pagination.totalpageCount}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HotelResults;