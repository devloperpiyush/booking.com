import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const HotelDetailsSection = () => {
  const { register, formState: { errors } } = useFormContext<HotelFormData>();

  return (
    <div className="p-6 border border-gray-300 rounded-lg shadow-md bg-white space-y-6">
      <h1 className="text-3xl font-bold mb-4">Add Hotel</h1>

      <div className="space-y-4">
        <label className="block text-gray-700 text-sm font-bold">
          Name
          <input
            className="mt-1 border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
            {...register("name", { required: "This field is required" })}
          />
          {errors.name && (
            <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>
          )}
        </label>

        <div className="flex gap-4">
          <label className="block text-gray-700 text-sm font-bold w-full">
            City
            <input
              className="mt-1 border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
              {...register("city", { required: "This field is required" })}
            />
            {errors.city && (
              <span className="text-red-500 text-xs mt-1">{errors.city.message}</span>
            )}
          </label>
          <label className="block text-gray-700 text-sm font-bold w-full">
            Country
            <input
              className="mt-1 border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
              {...register("country", { required: "This field is required" })}
            />
            {errors.country && (
              <span className="text-red-500 text-xs mt-1">{errors.country.message}</span>
            )}
          </label>
        </div>

        <label className="block text-gray-700 text-sm font-bold">
          Description
          <textarea
            rows={5}
            className="mt-1 border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
            {...register("description", { required: "This field is required" })}
          ></textarea>
          {errors.description && (
            <span className="text-red-500 text-xs mt-1">{errors.description.message}</span>
          )}
        </label>

        <div className="flex gap-4">
          <label className="block text-gray-700 text-sm font-bold w-full">
            Price Per Night
            <input
              type="number"
              className="mt-1 border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
              {...register("pricePerNight", { required: "This field is required" })}
            />
            {errors.pricePerNight && (
              <span className="text-red-500 text-xs mt-1">{errors.pricePerNight.message}</span>
            )}
          </label>
          <label className="block text-gray-700 text-sm font-bold w-full">
            Star Rating
            <select
              className="mt-1 border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
              {...register('starRating', { required: "This field is required" })}
            >
              <option value="">Select a Rating</option>
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            {errors.starRating && (
              <span className="text-red-500 text-xs mt-1">{errors.starRating.message}</span>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsSection;
