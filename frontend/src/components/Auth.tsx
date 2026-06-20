import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import type { SignupInput } from "@prince-kakadiya/medium-common";
import { InputBox } from "./InputBox";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    });

    async function sendInput() {
        try {
            const response = await fetch(`${BACKEND_URL}/api/v1/user/${type}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postInputs)
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", "Bearer " + data.token); // Save the token here
                navigate('/blogs');
            } else {
                alert(data.message || "Authentication failed. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("An unexpected error occurred while connecting to the server.");
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold">
                            {type === "signup" ? "Create an account" : "Log into account"}
                        </div>
                        <div className="text-slate-500 mt-2">
                            {type === "signup" ? "Already have an account?" : "Don't have an account?"}
                            <Link className="pl-1 underline hover:text-slate-800" to={type === "signup" ? "/signin" : "/signup"}>
                                {type === "signup" ? "Login" : "Sign up"}
                            </Link>
                        </div>
                    </div>
                    <div className="pt-8">
                        {type === 'signup' ? <InputBox label="name" placeholder="John Doe" onChange={(e) => {
                            setPostInputs({ ...postInputs, name: e.target.value })
                        }} />: undefined}
                        <InputBox label="Email" placeholder="john@example.com" onChange={(e) => {
                            setPostInputs({ ...postInputs, email: e.target.value })
                        }} />
                        <InputBox label="Password" type="password" placeholder="••••••••" onChange={(e) => {
                            setPostInputs({ ...postInputs, password: e.target.value })
                        }} />

                        <button
                            onClick={sendInput}
                            type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">
                            {type === "signup" ? "Sign up" : "Sign in"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}