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
      .get("http://localhost:3001/crud/leads", {withCredentials : true})
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
    
      
  }, []);

  return (
    <div className="ag-theme-alpine px-6 py-6 mt-5" style={{ width: "full", height: "700px" }}>
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
