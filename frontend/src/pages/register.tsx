import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Register(){
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleRegister = async (e : React.FormEvent<HTMLFormElement>) =>{
            e.preventDefault();
            setIsLoading(true);
            setError("");
            

            const formData = new FormData(e.currentTarget);
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            const confirmPassword = formData.get("confirmPassword") as string;

            if (password !== confirmPassword) {
                setError("Passwords don't match");
                setIsLoading(false);
                return;
            }
          
            if (password.length < 6) {
                setError("Password must be at least 6 characters");
                setIsLoading(false);
                return;
            }

            try
            {
                const response = await axios.post("https://lead-managementbe.onrender.com/auth/register", {
                    email,
                    password
                })

                if(response){
                    setIsLoading(false)
                    navigate("/signin")
                }
            }
            catch(err){

            }
    }

    return <div className="flex justify-center items-center w-screen min-h-screen bg-gray-200">
    <div className=" bg-white border border-2 border-[#E5E7EB] rounded-xl p-10 shadow-xl">
        <form onSubmit={handleRegister} className="space-y-5">
            <div> 
                <h1 className="flex justify-center items-center text-3xl pb-3">Register</h1>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-600 rounded-lg text-gray-900 placeholder-gray-400 "
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Create a password"
                minLength={6}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-600 rounded-lg text-gray-900 placeholder-gray-400 "
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                placeholder="Confirm your password"
                minLength={6}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-600 rounded-lg text-gray-700 placeholder-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2563EB] text-white cursor-pointer font-semibold py-3 px-4 rounded-lg hover:from-gray-600 hover:to-gray-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
        </form>
        {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
    </div>
    </div>
}