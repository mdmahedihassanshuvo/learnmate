import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { saveAuth } from "../../../auth/authStorage";

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [serverMessage, setServerMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleLogin = async (data) => {
        setIsSubmitting(true);
        setServerMessage("");

        try {
            const response = await axios.post("/api/v1/core/login/", data);
            saveAuth(response.data);
            navigate("/dashboard/", { replace: true });
        } catch (error) {
            setServerMessage(
                error.response?.data?.detail ||
                (error.response
                    ? "Login failed. Please check your email and password."
                    : "Could not connect to the server. Please try again.")
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-[400px]">
            <div className="card bg-base-100 shrink-0 shadow-2xl">
                {/* text center not work for h3 */}
                <h3 className="card-title w-full justify-center text-center mt-4 text-4xl font-bold">
                    Login
                </h3>
                <form onSubmit={handleSubmit(handleLogin)} className="card-body">
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className="input w-full"
                            placeholder="Email"
                        />
                        {errors.email && (
                            <p className="text-red-500" role="alert">{errors.email.message}</p>
                        )}
                        <label className="label">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", { required: "Password is required" })}
                                className="input w-full pr-10"
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500" role="alert">{errors.password.message}</p>
                        )}
                        <div>
                            <a className="link link-hover">Forgot password?</a>
                        </div>
                        {serverMessage && (
                            <p className="text-center text-red-500" role="alert">{serverMessage}</p>
                        )}
                        <button type="submit" className="btn btn-neutral mt-4" disabled={isSubmitting}>
                            {isSubmitting ? "Logging in..." : "Login"}
                        </button>
                    </fieldset>
                    <p className="text-center text-sm text-gray-500">
                        Don't have an account? <a href="/register/" className="link link-hover">Register</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
