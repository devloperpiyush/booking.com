import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { register, formState: { errors }, handleSubmit } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Login successful", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: async (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="max-w-lg mx-auto my-10 p-8 bg-white shadow-md rounded-lg" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign In</h2>
      <label className="text-gray-700 text-sm font-medium mb-4 block">
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
      <label className="text-gray-700 text-sm font-medium mb-4 block">
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
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

export default SignIn;
