import React, { useState } from "react";
import axios  from "axios";
import { useNavigate } from "react-router-dom";


export default function CreateLead(){
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [statuss, setStatus] = useState<string>("new");      
    const [sourcee, setSource] = useState<string>("website");   

    const navigate = useNavigate();
    const fields = [
        { id: "first_name", name: "first_name", type: "text", label: "First Name", placeholder: "Enter First Name" },
        { id: "email", name: "email", type: "email", label: "Email", placeholder: "Enter Email" },
        { id: "city", name: "city", type: "text", label: "City", placeholder: "Enter City" },
        { id: "company", name: "company", type: "text", label: "Company", placeholder: "Enter Company Name" },
        { id: "lead_value", name: "lead_value", type: "text", label: "Lead Value", placeholder: "Enter Lead Value" },
       
    ];

    const fields2 = [
        { id: "last_name", name: "last_name", type: "text", label: "Last Name", placeholder: "Enter Last Name" },
        { id: "phone", name: "phone", type: "text", label: "Phone no.", placeholder: "Enter Phone Number" },
        { id: "state", name: "state", type: "text", label: "State", placeholder: "Enter State" },
        { id: "score", name: "score", type: "text", label: "score", placeholder: "Enter Score" },
        { id: "last_activity_at", name: "last_activity_at", type: "date", label: "Last Activity at", placeholder: "Enter Last Activity At" },
    ];

    const CreateNewLead = async (e : React.FormEvent<HTMLFormElement>) =>{
            e.preventDefault();
            setIsLoading(true);
            setError("");
            

            const formData = new FormData(e.currentTarget);
            const first_name = formData.get("first_name") as string;
            const last_name = formData.get("last_name") as string;
            const email = formData.get("email") as string;
            const phone = formData.get("phone") as string;
            const city = formData.get("city") as string;
            const state = formData.get("state") as string;
            const company = formData.get("company") as string;
            const score = formData.get("score") as string;
            const lead_value = formData.get("lead_value") as string;
            const last_activity_at = formData.get("last_activity_at") as any;
            const status = statuss
            const source = sourcee

            try
            {
                const response = await axios.post("https://lead-managementbe.onrender.com/crud/leads", {
                    first_name,
                    last_name,
                    email,
                    phone: Number(phone),
                    city,
                    state,
                    company,
                    score: Number(score), 
                    lead_value: Number(lead_value),
                    last_activity_at: last_activity_at || null,
                    status,
                    source,
                    
                }, { withCredentials: true})
                setIsLoading(false)
                if(response){
                    navigate("/")
                }
            }
            catch(err){
                setIsLoading(false)
                console.log(err)
            }
    }

    return <div className="flex justify-center items-center w-screen min-h-screen bg-gray-200">
    <div className=" bg-white border border-2 border-[#E5E7EB] rounded-xl p-10 shadow-xl h-auto w-autp">
        <form onSubmit={CreateNewLead} className="space-y-5">
            <div> 
                <h1 className="flex justify-center items-center text-3xl pb-3">Create New Lead</h1>
                <div className="flex justify-between gap-10">
                <div >
                    {fields.map((field) => (
                        <div key={field.id}>
                            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-2 mt-2">
                                {field.label}
                            </label>
                            <input
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                minLength={2}
                                required
                                placeholder={field.placeholder}
                                className="w-full px-4 py-3 bg-gray-100 border border-gray-600 rounded-lg text-gray-900 placeholder-gray-400"
                            />
                        </div>
                    ))}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 mt-2">
                            Status
                        </label>
                        <select
                        value={statuss}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border py-2 px-4 rounded-lg"
                        >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="lost">Lost</option>
                        <option value="won">Won</option>
                        </select>
                </div>
                </div>
                <div >
                    {fields2.map((field) => (
                        <div key={field.id}>
                            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-2 mt-2">
                                {field.label}
                            </label>
                            <input
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                required
                                placeholder={field.placeholder}
                                className="w-full px-4 py-3 bg-gray-100 border border-gray-600 rounded-lg text-gray-900 placeholder-gray-400"
                            />
                        </div>
                    ))}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 mt-2">
                            Sources
                        </label>
                        <select
                        value={sourcee}
                        onChange={(e) => setSource(e.target.value)}
                        className="border py-2 px-4 rounded-lg"
                        >
                        <option value="website">Website</option>
                        <option value="facebook_ads">Facebook Ads</option>
                        <option value="google_ads">Google Ads</option>
                        <option value="referral">Referral</option>
                        <option value="events">Events</option>
                        <option value="other">Other</option> 
                        </select>
                </div>
                </div>

                </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2563EB] text-white cursor-pointer font-semibold py-3 px-4 rounded-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Creating Lead...
                </div>
              ) : (
                "Create Lead"
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