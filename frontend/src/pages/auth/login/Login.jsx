import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-[400px]">
            <div className="card bg-base-100 shrink-0 shadow-2xl">
                {/* text center not work for h3 */}
                <h3 className="card-title w-full justify-center text-center mt-4 text-4xl font-bold">
                    Login
                </h3>
                <div className="card-body">
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" className="input w-full" placeholder="Email" />
                        <label className="label">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
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
                        <div>
                            <a className="link link-hover">Forgot password?</a>
                        </div>
                        <button className="btn btn-neutral mt-4">Login</button>
                    </fieldset>
                    <p className="text-center text-sm text-gray-500">
                        Don't have an account? <a href="/register/" className="link link-hover">Register</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
