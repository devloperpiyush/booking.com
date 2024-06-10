import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      showToast({ message: "Registration successful", type: "SUCCESS" });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="max-w-lg mx-auto my-10 p-8 bg-white shadow-md rounded-lg" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <label className="text-gray-700 text-sm font-medium flex-1">
          First Name
          <input
            className="border border-gray-300 rounded-lg w-full py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("firstName", { required: "This field is required" })}
          />
          {errors.firstName && (
            <span className="text-red-500 text-xs mt-1">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-medium flex-1">
          Last Name
          <input
            className="border border-gray-300 rounded-lg w-full py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("lastName", { required: "This field is required" })}
          />
          {errors.lastName && (
            <span className="text-red-500 text-xs mt-1">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-medium mt-4">
        Email
        <input
          type="email"
          className="border border-gray-300 rounded-lg w-full py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-medium mt-4">
        Password
        <input
          type="password"
          className="border border-gray-300 rounded-lg w-full py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-medium mt-4">
        Confirm Password
        <input
          type="password"
          className="border border-gray-300 rounded-lg w-full py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords do not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</span>
        )}
      </label>
      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Create Account
        </button>
      </div>
    </form>
  );
};

export default Register;
