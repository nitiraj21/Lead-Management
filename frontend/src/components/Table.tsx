'use client';
import  { useEffect, useState } from "react";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";

ModuleRegistry.registerModules([AllCommunityModule]);

// Row Data Interface
interface IRow {
  make: string;
  model: string;
  price: number;
  electric: boolean;
  "First Name": string;
  "Last Name": string;
  Email: string;
  Company: string;
  City: string;
  State: string;
  Source: string;
  Status: string;
  Score: number;
  "Lead Value": number;
  "Last Activity": string;
  "Qualified?": boolean;
  "Created At": string;
  "Updated At": string;
}

export default function Table() {
  const [rowData, setRowData] = useState<IRow[]>([]);
  const [pages, setPages] = useState(20)
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [filterStatus, setFilterStatus] = useState("")
  const [filterCompany, setFilterCompany]  = useState("")
  const [filterEmail, setFilterEmail] =  useState("")
  const [filterCity, setFilterCity] =  useState("")
  const [filterSource, setFilterSource] = useState("")
  const [minScore, setMinScore] = useState<number>()
  const [maxScore, setMaxScore] = useState<number>()
  const [createdFrom, setCreatedFrom] = useState<string | undefined>(undefined);
  const [createdTo, setCreatedTo] = useState<string | undefined>(undefined);
  const [filterQualified, setFilterQualified] = useState<boolean | undefined>()

  const [colDefs] = useState<ColDef<IRow>[]>([
    { field: "First Name" },
    { field: "Last Name" },
    { field: "Email" },
    { field: "Company" },
    { field: "City" },
    { field: "State" },
    { field: "Source" },
    { field: "Status" },
    { field: "Score" },
    { field: "Lead Value" },
    { field: "Last Activity" },
    { field: "Qualified?" },
    { field: "Created At" },
    { field: "Updated At" },
  ]);

  const defaultColDef: ColDef = {
    flex: 1,
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/crud/leads", {withCredentials : true, params: {
        pages,
        limit,
        email_contain : filterEmail || undefined,
        company_contain: filterCompany || undefined,
        city_contain : filterCity || undefined,
        status: filterStatus || undefined,
        source : filterSource || undefined,
        score_between: minScore && maxScore ? `${minScore},${maxScore}` : undefined,
        created_between: createdFrom && createdTo ? `${createdFrom},${createdTo}` : undefined,
        is_qualified: filterQualified ? "true" : undefined
      }, })
      .then((res) => {
        const leads = res.data.data.map((lead: any) => ({
          "First Name": lead.first_name,
          "Last Name": lead.last_name,
          Email: lead.email,
          Company: lead.company,
          City: lead.city,
          State: lead.state,
          Source: lead.source,
          Status: lead.status,
          Score: lead.score,
          "Lead Value": lead.lead_value,
          "Last Activity": lead.last_activity_at,
          "Qualified?": lead.is_qualified,
          "Created At": lead.createdAt,
          "Updated At": lead.updatedAt,
        }));
        setRowData(leads);
        setPages(res.data.pages)
        setLimit(res.data.limit)
        setTotal(res.data.total)
      }).then(()=>{console.log(rowData)})
      .catch((err) => console.error("Error fetching users:", err));
    
      
  }, [filterCompany, filterStatus, filterCity, filterEmail, filterSource, minScore, maxScore, filterQualified, createdFrom, createdTo]);

  return (
    <div className="ag-theme-alpine px-6 py-6 mt-5" style={{ width: "full", height: "700px" }}>
        <div>
            <input
                type="text"
                placeholder="Filter by email..."
                value={filterEmail}
                onChange={(e) => setFilterEmail(e.target.value)}
                className="border p-2 m-2"
            />
            <input
                type="text"
                placeholder="Filter by company..."
                value={filterCompany}
                onChange={(e) => setFilterCompany(e.target.value)}
                className="border p-2 m-2"
            />
            <input
                type="text"
                placeholder="Filter by city..."
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className="border p-2 m-2"
            />
            <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border p-2 m-2"
            >
                <option value="">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="lost">Lost</option>
                <option value="won">Won</option>
            </select>

            <select
                value={filterSource}
                onChange={(e) => setFilterSource(e.target.value)}
                className="border p-2 m-2"
            >
                <option value="">All Sources</option>
                <option value="website">Website</option>
                <option value="facebook_ads">Facebook Ads</option>
                <option value="google_ads">Google Ads</option>
                <option value="referral">Referral</option>
                <option value="events">Events</option>
                <option value="other">Other</option> 
            </select>

            <input
                type="number"
                placeholder="Min Score"
                value={minScore}
                onChange={(e) => setMinScore(e.target.value as unknown as number)}
                className="border p-2 m-2"
            />
            <input
                type="number"
                placeholder="Max Score"
                value={maxScore}
                onChange={(e) => setMaxScore(e.target.value as unknown as number)}
                className="border p-2 m-2"
            />

            <input
                type="date"
                value={createdFrom}
                onChange={(e) => setCreatedFrom(e.target.value)}
                className="border p-2 m-2"
            />
            <input
                type="date"
                value={createdTo}
                onChange={(e) => setCreatedTo(e.target.value)}
                className="border p-2 m-2"
            />

            <label className="border border-2 rounded-lg px-2 py-2">
                <input
                    type="checkbox"
                    checked={filterQualified}
                    onChange={(e) => setFilterQualified(e.target.checked)}
                    className="mr-2"
                />
                Qualified Only
            </label>
      </div>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination = {true}
        paginationPageSize={pages}
        onPaginationChanged={(params) => {
            if (params.api) {
              const currentPage = params.api.paginationGetCurrentPage() + 1;
              console.log("Page changed:", currentPage);
            }
        }}
      />
    </div>
  );
}
