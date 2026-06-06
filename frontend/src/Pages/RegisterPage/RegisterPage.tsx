import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../Context/useAuth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type RegisterFormsInputs = {
  email: string;
  userName: string;
  password: string;
};

const validation = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  userName: Yup.string()
    .required("Username is required"),

  password: Yup.string()
    .required("Password is required")
    .min(
      12,
      "Password must contain at least 12 characters"
    ),
});

const RegisterPage = () => {
  const { registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormsInputs>({
    resolver: yupResolver(validation),
  });

  const handleRegister = async (
    form: RegisterFormsInputs
  ) => {
    await registerUser(
      form.email,
      form.userName,
      form.password
    );
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mb-20 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create account
            </h1>

            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(handleRegister)}
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                />

                {errors.email && (
                  <p className="text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Username
                </label>

                <input
                  type="text"
                  placeholder="Username"
                  {...register("userName")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                />

                {errors.userName && (
                  <p className="text-red-500">
                    {errors.userName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                />

                {errors.password && (
                  <p className="text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full text-white bg-lightGreen rounded-lg text-sm px-5 py-2.5"
              >
                Register
              </button>

              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;