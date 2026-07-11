
import React from "react";
import { Outlet } from 'react-router';
import { Player } from "@lottiefiles/react-lottie-player";
import groovyWalkAnimation from "../assets/Login.json";

const AuthLayout = () => {
    return (
        <div className="flex items-center justify-evenly min-h-screen bg-gray-100">
            <Outlet />
            <div>
                <Player
                    autoplay
                    loop
                    src={groovyWalkAnimation}
                    style={{ height: "350px", width: "350px" }}
                />
            </div>
        </div>
    );
};

export default AuthLayout;
