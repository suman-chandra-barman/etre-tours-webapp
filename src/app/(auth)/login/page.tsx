"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import logo from "@/assets/logo.svg";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";
import { TUserRole } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type TLoginFormData = {
  email: string;
  password: string;
  role: TUserRole;
};

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TLoginFormData>();

  const onSubmit = (data: TLoginFormData) => {
    // Handle login logic
    setUser({
      id: "1",
      name: "User Name",
      email: data.email,
      role: data.role,
    });

    // Redirect based on role
    switch (data.role) {
      case "chief-admin":
        router.push("/chief-admin");
        break;
      case "direct-sales":
        router.push("/direct-sales");
        break;
      case "cruise-sales":
        router.push("/cruise-sales");
        break;
      case "partner-sales":
        router.push("/partner-sales");
        break;
    }
  };

  return (
    <main className="h-screen flex items-start xl:items-center justify-center mt-20 xl:mt-0 bg-gray-50">
      <section className="w-full max-w-md p-4 md:p-6 lg:p-8 bg-white rounded-xl">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src={logo}
            alt="Company Logo"
            width={70}
            height={60}
            className="object-contain"
          />
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h2 className=" text-xl md:text-2xl font-bold text-gray-900 mb-1">
            Welcome back!
          </h2>
          <p className="text-gray-500 text-sm">Login to your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
          <div>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail size={20} />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full pl-12 pr-12 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                <User size={20} />
              </div>
              <Controller
                name="role"
                control={control}
                rules={{ required: "Role is required" }}
                render={({ field }) => (
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full pl-12 pr-4 py-6 bg-gray-100 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-auto">
                      <SelectValue
                        placeholder="Select Your Role"
                        className="text-gray-400"
                      />
                    </SelectTrigger>
                    <SelectContent className="mt-12">
                      <SelectItem value="chief-admin">Chief Admin</SelectItem>
                      <SelectItem value="direct-sales">Direct Sales</SelectItem>
                      <SelectItem value="cruise-sales">Cruise Sales</SelectItem>
                      <SelectItem value="partner-sales">
                        Partner Sales
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {errors.role.message}
              </p>
            )}
          </div>

          {/*Forgot Password */}
          <div>
            <Link
              href="/forgot-password"
              className="text-sm text-blue-500 hover:underline transition-colors"
            >
              Forgot Password
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Login
          </button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
