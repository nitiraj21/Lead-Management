import { useState } from "react";
import Table from "../components/Table";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Home(){
    const navigate = useNavigate()
    
    const handleLogout = async () => {
        try {
          await axios.post("http://localhost:3001/auth/logout", {}, { withCredentials: true });
          navigate("/signin");
        } catch (err) {
          console.error(err);
        }
      };
    return <>
    <div className=" bg-gray-100 w-full min-h-screen ">
        <div className="flex justify-center items-center pt-6 text-3xl ">
        <h1>Lead Management System</h1>
        </div>
        <div className="flex justify-end items-center text-md">
        <button
            onClick={()=>{navigate("/create-lead")}}
            className="bg-[#2563EB] text-white cursor-pointer font-semibold py-2 px-3 rounded-lg mr-3"
            >
            Create new Lead
        </button>
        <button
            onClick={handleLogout}
            className="bg-[#2563EB] text-white cursor-pointer font-semibold py-2 px-3 rounded-lg mr-4"
            >
            Logout
        </button>
        </div>

        <div >
            <Table/>
        </div>
    </div>
    </>
}