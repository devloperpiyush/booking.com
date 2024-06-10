import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
  const { data: hotelData, isLoading, isError } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError || !hotelData) {
    return <span>No Hotels found</span>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">My Hotels</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hotel Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price per Night</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guests</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Star Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {hotelData.map((hotel) => (
              <tr key={hotel._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{hotel.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hotel.city}, {hotel.country}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hotel.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{hotel.pricePerNight}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hotel.adultCount} adults, {hotel.childCount} children</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hotel.starRating}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <img src={hotel.imageUrls[0]} alt={hotel.name} className="h-12 w-12 object-cover rounded" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    to={`/edit-hotel/${hotel._id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyHotels;
