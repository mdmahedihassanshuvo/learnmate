import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [serverMessage, setServerMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
        setError
    } = useForm()

    const handleRegistration = async (data) => {
        setIsSubmitting(true);
        setServerMessage("");

        try {
            await axios.post("/api/v1/core/signup/", data);
            navigate("/login/", { replace: true });
        } catch (error) {
            const responseData = error.response?.data;

            if (responseData && typeof responseData === "object") {
                Object.entries(responseData).forEach(([field, messages]) => {
                    if (["username", "email", "phone", "password"].includes(field)) {
                        setError(field, {
                            type: "server",
                            message: Array.isArray(messages) ? messages.join(" ") : String(messages),
                        });
                    }
                });
            }

            setServerMessage(
                responseData?.detail ||
                (error.response
                    ? "Registration failed. Please check the form."
                    : "Could not connect to the server. Please try again.")
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="w-[400px]">
            <div className="card bg-base-100 shrink-0 shadow-2xl">
                {/* text center not work for h3 */}
                <h3 className="card-title w-full justify-center text-center mt-4 text-4xl font-bold">
                    Register
                </h3>
                <form onSubmit={handleSubmit(handleRegistration)} className="card-body">
                    <div className="card-body mb-0">
                        <fieldset className="fieldset">
                            <label className="label">Username</label>
                            <input type="text" {...register("username", { required: true })} className="input w-full" placeholder="Username" />
                            {errors.username?.type === "required" && (
                                <p className="text-red-500" role="alert">Username is required</p>
                            )}
                            {errors.username?.type === "server" && (
                                <p className="text-red-500" role="alert">{errors.username.message}</p>
                            )}
                            <label className="label">Email</label>
                            <input type="email" {...register("email", { required: true })} className="input w-full" placeholder="Email" />
                            {errors.email?.type === "required" && (
                                <p className="text-red-500" role="alert">Email is required</p>
                            )}
                            {errors.email?.type === "server" && (
                                <p className="text-red-500" role="alert">{errors.email.message}</p>
                            )}
                            <label className="label">Phone</label>
                            <input type="tel" {...register("phone", { required: true })} className="input w-full" placeholder="Phone" />
                            {errors.phone?.type === "required" && (
                                <p className="text-red-500" role="alert">Phone is required</p>
                            )}
                            {errors.phone?.type === "server" && (
                                <p className="text-red-500" role="alert">{errors.phone.message}</p>
                            )}
                            <label className="label">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", { required: true, minLength: 6 })}
                                    className="input w-full pr-10"
                                    placeholder="Password"
                                />
                                {errors.password?.type === "required" && (
                                    <p className="text-red-500" role="alert">Password is required</p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p className="text-red-500" role="alert">Password must be at least 6 characters</p>
                                )}
                                {errors.password?.type === "server" && (
                                    <p className="text-red-500" role="alert">{errors.password.message}</p>
                                )}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <div>
                                <a className="link link-hover">Forgot password?</a>
                            </div>
                            {serverMessage && (
                                <p className="text-center" role="status">{serverMessage}</p>
                            )}
                            <button type="submit" className="btn btn-neutral mt-4" disabled={isSubmitting}>
                                {isSubmitting ? "Registering..." : "Register"}
                            </button>
                        </fieldset>
                        <p className="text-center text-sm text-gray-500">
                            Already have an account? <a href="/login/" className="link link-hover">Login</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
