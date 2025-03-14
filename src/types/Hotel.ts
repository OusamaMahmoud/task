// Main response type
export type HotelApiResponse = (Hotel | PaginationMetadata[])[];

// Hotel information
export interface Hotel {
  geocode: {
    latitude: number;
    longitude: number;
  };
  telephone: string;
  name: string;
  hotelId: number;
  reviews: {
    rating: number;
    count: number;
  };
  vendor1: string;
  price1: string;
  vendor2?: string;
  price2?: string;
  vendor3?: string;
  price3?: string;
  vendor4?: string;
  price4?: string;
}

// Pagination metadata (appears at the end of the array)
export interface PaginationMetadata {
  totalHotelCount: number;
  totalpageCount: number;
  currentPageHotelsCount: number;
  currentPageNumber: number;
}
