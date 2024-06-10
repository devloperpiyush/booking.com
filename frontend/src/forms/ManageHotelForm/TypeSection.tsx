import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { hotelTypes } from "../../config/hotel-option-config";
import '../TypeSection.css'; // Import CSS file for styling

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const typeWatch = watch("type");

  return (
    <div className="p-6 border border-gray-300 rounded-lg shadow-md bg-white space-y-4">
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {hotelTypes.map((type, index) => (
          <label
            key={index}
            className={`cursor-pointer text-sm rounded-full px-4 py-2 font-semibold text-center type-label ${
              typeWatch === type ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              value={type}
              {...register("type", {
                required: "This field is required",
              })}
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-bold">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default TypeSection;
