'use client';
import { useEffect, useState } from "react";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UpdateLead from "./UpdateLead";

ModuleRegistry.registerModules([AllCommunityModule]);

interface IRow {
  _id?: string;
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
  const [page, setPage] = useState(1);       
  const [limit, setLimit] = useState(20);    
  const [total, setTotal] = useState(0);    

  const [filterStatus, setFilterStatus] = useState("");
  const [filterCompany, setFilterCompany] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterSource, setFilterSource] = useState("");
  const [minScore, setMinScore] = useState<number>();
  const [maxScore, setMaxScore] = useState<number>();
  const [createdFrom, setCreatedFrom] = useState<string | undefined>(undefined);
  const [createdTo, setCreatedTo] = useState<string | undefined>(undefined);
  const [filterQualified, setFilterQualified] = useState<boolean | undefined>();

  const [id, setId] = useState<string>();
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

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
    {
      headerName: "Update Lead",
      //@ts-ignore
      field: "update",
      width: 120,
      cellRenderer: (params: any) => {
        return (
          <button
            onClick={() => {
              setModal(true);
              setId(params.data._id);
            }}
            className="bg-blue-600 text-white px-2 py-1"
          >
            Update
          </button>
        );
      },
    },
    {
      headerName: "Delete",
      //@ts-ignore
      field: "delete",
      width: 100,
      cellRenderer: (params: any) => {
        return (
          <button
            onClick={() => handleDelete(params.data)}
            className="bg-red-500 text-white px-2 py-1 "
          >
            Delete
          </button>
        );
      },
    },
  ]);

  const defaultColDef: ColDef = {
    flex: 1,
  };

  const handleDelete = (lead: IRow & { _id: string }) => {
    axios
      .delete(`https://lead-managementbe.onrender.com/crud/leads/${lead._id}`, {
        withCredentials: true,
      })
      .then(() => {
        setRowData((prev) => prev.filter((r) => r._id !== lead._id));
        // Refetch to get updated total count
        fetchLeads();
      })
      .catch((err) => console.error(err));
  };

  const fetchLeads = () => {
    axios
      .get("https://lead-managementbe.onrender.com/crud/leads", {
        withCredentials: true,
        params: {
          page,
          limit,
          email_contain: filterEmail || undefined,
          company_contain: filterCompany || undefined,
          city_contain: filterCity || undefined,
          status: filterStatus || undefined,
          source: filterSource || undefined,
          score_between:
            minScore && maxScore ? `${minScore},${maxScore}` : undefined,
          created_between:
            createdFrom && createdTo ? `${createdFrom},${createdTo}` : undefined,
          is_qualified: filterQualified ? "true" : undefined,
        },
      })
      .then((res) => {
        const leads = res.data.data.map((lead: any) => ({
          _id: lead._id,
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
        setPage(res.data.page);   
        setLimit(res.data.limit); 
        setTotal(res.data.total);
      })
      .catch((err) => {
        console.error(err);
        navigate("/signin");
      });
  };

  useEffect(() => {

    if (page !== 1) {
      setPage(1);
    } else {
      fetchLeads();
    }
  }, [
    filterCompany,
    filterStatus,
    filterCity,
    filterEmail,
    filterSource,
    minScore,
    maxScore,
    filterQualified,
    createdFrom,
    createdTo,
  ]);

  useEffect(() => {
    fetchLeads();
  }, [page, limit]);

  useEffect(() => {
    if (id) {
      fetchLeads(); 
    }
  }, [id]);

  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  return (
    <div className="ag-theme-alpine px-6 py-6 mt-5" style={{ width: "100%", height: "700px" }}>
      {modal && id && (
        <div className="z-50 fixed">
          <UpdateLead
            _id={id}
            onClose={() => {
              setModal(false);
              setId(undefined);
            }}
          />
        </div>
      )}

      <div className="mb-4">
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
          value={minScore || ""}
          onChange={(e) => setMinScore(e.target.value ? Number(e.target.value) : undefined)}
          className="border p-2 m-2"
        />
        <input
          type="number"
          placeholder="Max Score"
          value={maxScore || ""}
          onChange={(e) => setMaxScore(e.target.value ? Number(e.target.value) : undefined)}
          className="border p-2 m-2"
        />

        <input
          type="date"
          value={createdFrom || ""}
          onChange={(e) => setCreatedFrom(e.target.value || undefined)}
          className="border p-2 m-2"
          placeholder="From Date"
        />
        <input
          type="date"
          value={createdTo || ""}
          onChange={(e) => setCreatedTo(e.target.value || undefined)}
          className="border p-2 m-2"
          placeholder="To Date"
        />

        <label className="border rounded-lg px-2 py-2 ml-2">
          <input
            type="checkbox"
            checked={filterQualified || false}
            onChange={(e) => setFilterQualified(e.target.checked || undefined)}
            className="mr-2"
          />
          Qualified Only
        </label>
      </div>

      <AgGridReact<IRow>
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination={false} 
        suppressPaginationPanel={true} 
      />

      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <label>Rows per page:</label>
          <select
            value={limit}
            onChange={(e) => handleLimitChange(Number(e.target.value))}
            className="border p-1"
          >
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(1)}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            First
          </button>
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <span className="px-4 py-1">
            Page {page} of {totalPages}
          </span>
          
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Last
          </button>
        </div>

        <div className="text-sm text-gray-600">
          Showing {((page - 1) * limit) + 1}-{Math.min(page * limit, total)} of {total} leads
        </div>
      </div>
    </div>
  );
}