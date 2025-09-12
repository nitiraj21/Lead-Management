import { useState } from "react";
import Table from "../components/Table";
import { useEffect } from "react";


export default function Home(){

    useEffect
    return <>
    <div className=" bg-gray-100 w-full min-h-screen ">
        <div className="flex justify-center items-center pt-6 text-3xl ">
        <h1>Lead Management System</h1>
        </div>
        <div >
            <Table/>
        </div>
    </div>
    </>
}