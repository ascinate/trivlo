"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const FLAG_URLS = {
  Indonesia: "https://flagcdn.com/w40/id.png",
  UAE: "https://flagcdn.com/w40/ae.png",
  Switzerland: "https://flagcdn.com/w40/ch.png",
  Thailand: "https://flagcdn.com/w40/th.png",
  Australia: "https://flagcdn.com/w40/au.png",
  Singapore: "https://flagcdn.com/w40/sg.png",
  Maldives: "https://flagcdn.com/w40/mv.png",
  Turkey: "https://flagcdn.com/w40/tr.png",
  France: "https://flagcdn.com/w40/fr.png",
  UK: "https://flagcdn.com/w40/gb.png",
};

const AVATAR_URLS = {
  "David Miller": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80",
  "Emma Watson": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&auto=format&fit=crop&q=80",
  "John Doe": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
  "Olivia Martinez": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=80",
  "Liam Anderson": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
  "Sophia Clark": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80",
  "Lucas Thomas": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=80",
  "Ava Wilson": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
  "Noah Taylor": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&auto=format&fit=crop&q=80",
  "Isabella White": "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&auto=format&fit=crop&q=80",
};

const AGENT_AVATARS = {
  "Sarah Johnson": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&auto=format&fit=crop&q=80",
  "Michael Lee": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80",
  "David Brown": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
};

const baseLeads = [
  { id: "L-001", name: "David Miller", email: "david@example.com", company: "Miller Travels", source: "Website", destination: "Bali, Indonesia", destCountry: "Indonesia", status: "New", assignedTo: "Sarah Johnson", createdOn: "21 May 2025", lastContact: "21 May 2025" },
  { id: "L-002", name: "Emma Watson", email: "emma@example.com", company: "Watson Holidays", source: "Referral", destination: "Dubai, UAE", destCountry: "UAE", status: "Contacted", assignedTo: "Michael Lee", createdOn: "21 May 2025", lastContact: "21 May 2025" },
  { id: "L-003", name: "John Doe", email: "john@example.com", company: "Doe Enterprises", source: "Walk In", destination: "Switzerland", destCountry: "Switzerland", status: "Qualified", assignedTo: "David Brown", createdOn: "20 May 2025", lastContact: "20 May 2025" },
  { id: "L-004", name: "Olivia Martinez", email: "olivia@example.com", company: "Martinez Co.", source: "Social Media", destination: "Bangkok, Thailand", destCountry: "Thailand", status: "Proposal Sent", assignedTo: "Sarah Johnson", createdOn: "20 May 2025", lastContact: "19 May 2025" },
  { id: "L-005", name: "Liam Anderson", email: "liam@example.com", company: "Anderson Global", source: "Email Campaign", destination: "Singapore", destCountry: "Singapore", status: "Negotiation", assignedTo: "Michael Lee", createdOn: "19 May 2025", lastContact: "19 May 2025" },
  { id: "L-006", name: "Sophia Clark", email: "sophia@example.com", company: "Clark Agency", source: "Website", destination: "Sydney, Australia", destCountry: "Australia", status: "New", assignedTo: "Sarah Johnson", createdOn: "18 May 2025", lastContact: "18 May 2025" },
  { id: "L-007", name: "Lucas Thomas", email: "lucas@example.com", company: "Thomas & Co.", source: "Referral", destination: "Maldives", destCountry: "Maldives", status: "Contacted", assignedTo: "David Brown", createdOn: "18 May 2025", lastContact: "18 May 2025" },
  { id: "L-008", name: "Ava Wilson", email: "ava@example.com", company: "Wilson Travels", source: "Walk In", destination: "Istanbul, Turkey", destCountry: "Turkey", status: "Qualified", assignedTo: "Sarah Johnson", createdOn: "17 May 2025", lastContact: "17 May 2025" },
  { id: "L-009", name: "Noah Taylor", email: "noah@example.com", company: "Taylor Solutions", source: "Google Ads", destination: "Paris, France", destCountry: "France", status: "Lost", assignedTo: "Michael Lee", createdOn: "16 May 2025", lastContact: "16 May 2025" },
  { id: "L-010", name: "Isabella White", email: "isabella@example.com", company: "White Ventures", source: "Social Media", destination: "London, UK", destCountry: "UK", status: "Proposal Sent", assignedTo: "David Brown", createdOn: "15 May 2025", lastContact: "15 May 2025" },
];

const STATUS_STYLES = {
  New: { bg: "#F0F6FF", color: "#3B82F6" },
  Contacted: { bg: "#FFF7E6", color: "#D97706" },
  Qualified: { bg: "#ECFDF5", color: "#059669" },
  "Proposal Sent": { bg: "#F3F0FF", color: "#7C3AED" },
  Negotiation: { bg: "#FFF1F0", color: "#DC2626" },
  Lost: { bg: "#F3F4F6", color: "#6B7280" },
};

export default function LeadsPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [leads] = useState(baseLeads);
  const [sourceFilter, setSourceFilter] = useState("All Sources");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [assignedFilter, setAssignedFilter] = useState("All Assigned To");
  const [countryFilter, setCountryFilter] = useState("All Countries");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const rowsPerPage = 10;

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const filtered = useMemo(() => {
    return leads.filter(l => {
      if (sourceFilter !== "All Sources" && l.source !== sourceFilter) return false;
      if (statusFilter !== "All Status" && l.status !== statusFilter) return false;
      if (assignedFilter !== "All Assigned To" && l.assignedTo !== assignedFilter) return false;
      if (countryFilter !== "All Countries" && l.destCountry !== countryFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || l.company.toLowerCase().includes(q);
      }
      return true;
    });
  }, [leads, sourceFilter, statusFilter, assignedFilter, countryFilter, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const paged = filtered.slice((safePage - 1) * rowsPerPage, safePage * rowsPerPage);

  const handleSelectAll = () => {
    const ids = paged.map(l => l.id);
    const allSel = ids.every(id => selectedIds.includes(id));
    setSelectedIds(allSel ? selectedIds.filter(id => !ids.includes(id)) : [...new Set([...selectedIds, ...ids])]);
  };

  const doughnutData = {
    labels: ["New", "Contacted", "Qualified", "Proposal Sent", "Negotiation", "Lost"],
    datasets: [{
      data: [356, 256, 216, 186, 156, 32],
      backgroundColor: ["#3B82F6", "#D97706", "#059669", "#7C3AED", "#DC2626", "#9CA3AF"],
      borderWidth: 2,
      borderColor: "#fff",
      hoverOffset: 4,
    }]
  };

  const doughnutOptions = {
    cutout: "70%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: true } }
  };

  const topSources = [
    { label: "Website", count: 612, pct: 100 },
    { label: "Referral", count: 342, pct: 55.9 },
    { label: "Walk In", count: 168, pct: 27.5 },
    { label: "Social Media", count: 112, pct: 18.3 },
    { label: "Email Campaign", count: 64, pct: 10.5 },
    { label: "Others", count: 58, pct: 9.5 },
  ];

  const recentActivities = [
    { text: "New lead David Miller added", time: "10 min ago", type: "add" },
    { text: "Called to Emma Watson", time: "25 min ago", type: "call" },
    { text: "Proposal sent to John Doe", time: "40 min ago", type: "proposal" },
    { text: "Follow up scheduled with Olivia Martinez", time: "1 hour ago", type: "followup" },
    { text: "Lead Liam Anderson moved to Negotiation", time: "2 hours ago", type: "update" },
  ];

  const activityIcon = (type) => {
    switch (type) {
      case "add": return { icon: "bi-plus-circle-fill", color: "#1E6C45", bg: "#E9F4EE" };
      case "call": return { icon: "bi-telephone-fill", color: "#B97C2B", bg: "#FEF7ED" };
      case "proposal": return { icon: "bi-file-earmark-text-fill", color: "#5D59E1", bg: "#ECEFFE" };
      case "followup": return { icon: "bi-calendar-check-fill", color: "#677E75", bg: "#F0F4F2" };
      case "update": return { icon: "bi-arrow-repeat", color: "#D05E5E", bg: "#FCEAEA" };
      default: return { icon: "bi-circle-fill", color: "#677E75", bg: "#F0F4F2" };
    }
  };

  const newLeadButton = (
    <button
      className="btn text-white rounded-3 px-3 d-flex align-items-center gap-2"
      style={{ backgroundColor: "#112E24", height: "42px", fontWeight: "600" }}
      onClick={() => router.push("/leads/add")}
      id="btn-new-lead"
    >
      <i className="bi bi-plus-lg fs-6"></i>
      <span>New Lead</span>
      <i className="bi bi-chevron-down ms-1" style={{ fontSize: "0.75rem" }}></i>
    </button>
  );

  return (
    <div className="d-flex position-relative">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="app-container w-100 min-vh-100 d-flex flex-column justify-content-between">
        <Header
          toggleSidebar={toggleSidebar}
          hideWelcome={true}
          forcePageHeaderLayout={true}
          searchPlaceholder="Search inquiries, customers, bookings, quotations..."
          actionButton={newLeadButton}
        />

        <main className="main-content d-flex flex-column gap-4 py-4">

          {/* Page header row */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-2">
            <div>
              <span className="text-secondary fs-7 fw-500">Home &gt; CRM &gt; Leads</span>
              <h1 className="fs-3 fw-800 text-dark m-0 mt-1">Leads</h1>
              <p className="text-secondary fs-7 mt-1 mb-0">Manage and track your leads from various sources.</p>
            </div>
            <div className="d-flex align-items-center gap-2 border rounded-3 border-light bg-white px-3 py-2 shadow-sm" style={{ fontSize: "0.82rem", fontWeight: 600, color: "#495057" }}>
              <i className="bi bi-calendar3 text-secondary"></i>
              <span>01 May 2025 – 31 May 2025</span>
              <i className="bi bi-chevron-down text-secondary" style={{ fontSize: "0.7rem" }}></i>
            </div>
          </div>

          {/* Filter bar */}
          <div className="section-card border border-light p-3">
            <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
              <div className="d-flex flex-wrap gap-2">
                {[
                  { val: sourceFilter, set: setSourceFilter, def: "All Sources", opts: ["Website", "Referral", "Walk In", "Social Media", "Email Campaign", "Google Ads"] },
                  { val: statusFilter, set: setStatusFilter, def: "All Status", opts: ["New", "Contacted", "Qualified", "Proposal Sent", "Negotiation", "Lost"] },
                  { val: assignedFilter, set: setAssignedFilter, def: "All Assigned To", opts: ["Sarah Johnson", "Michael Lee", "David Brown"] },
                  { val: countryFilter, set: setCountryFilter, def: "All Countries", opts: ["Indonesia", "UAE", "Switzerland", "Thailand", "Australia", "Singapore", "Maldives", "Turkey", "France", "UK"] },
                ].map(({ val, set, def, opts }) => (
                  <select
                    key={def}
                    className="form-select rounded-3 border-light shadow-sm text-dark bg-white fw-600"
                    style={{ width: "auto", minWidth: "145px", height: "42px", fontSize: "0.85rem" }}
                    value={val}
                    onChange={e => { set(e.target.value); setCurrentPage(1); }}
                  >
                    <option value={def}>{def}</option>
                    {opts.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ))}
                <button className="btn btn-outline-secondary bg-white border border-light shadow-sm rounded-3 d-flex align-items-center gap-1 fw-600" style={{ height: "42px", fontSize: "0.85rem" }}>
                  <i className="bi bi-funnel"></i> More Filters
                </button>
              </div>
              <div className="d-flex align-items-center gap-2">
                <div className="position-relative">
                  <i className="bi bi-search text-secondary position-absolute" style={{ left: 12, top: "50%", transform: "translateY(-50%)" }}></i>
                  <input
                    type="text"
                    className="form-control rounded-3 border-light shadow-sm ps-4"
                    style={{ height: "42px", width: "200px", fontSize: "0.85rem" }}
                    placeholder="Search leads..."
                    value={searchQuery}
                    onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  />
                </div>
                <button className="btn btn-light border border-light shadow-sm rounded-3 fw-600 d-flex align-items-center gap-1" style={{ height: "42px", fontSize: "0.85rem" }}>
                  <i className="bi bi-arrow-counterclockwise"></i> Reset
                </button>
                <button className="btn text-white rounded-3 px-3 fw-600 d-flex align-items-center gap-1" style={{ backgroundColor: "#112E24", height: "42px", fontSize: "0.85rem" }}>
                  <i className="bi bi-download"></i> Export
                </button>
              </div>
            </div>
          </div>

          {/* Main grid */}
          <div className="row g-3">

            {/* Left: Table */}
            <div className="col-12 col-xl-8">
              <div className="section-card border border-light p-4">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead>
                      <tr className="border-bottom border-light">
                        <th className="pb-3" style={{ width: 40 }}>
                          <input type="checkbox" className="form-check-input shadow-none"
                            checked={paged.length > 0 && paged.every(l => selectedIds.includes(l.id))}
                            onChange={handleSelectAll} />
                        </th>
                        {["Lead Name", "Company", "Source", "Destination", "Status", "Assigned To", "Created On", "Last Contact", "Actions"].map(h => (
                          <th key={h} className="lablename pb-3" style={{ whiteSpace: "nowrap", textTransform: "uppercase" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {paged.map(lead => {
                        const st = STATUS_STYLES[lead.status] || { bg: "#F3F4F6", color: "#6B7280" };
                        const flag = FLAG_URLS[lead.destCountry];
                        const avatar = AVATAR_URLS[lead.name];
                        const agentAvatar = AGENT_AVATARS[lead.assignedTo];
                        return (
                          <tr
                              key={lead.id}
                              className="border-bottom border-light"
                              style={{ cursor: "pointer" }}
                              onClick={() => router.push(`/leads/${lead.id}`)}
                            >
                            <td style={{ padding: "1rem 0.5rem" }} onClick={e => e.stopPropagation()}>
                              <input type="checkbox" className="form-check-input shadow-none"
                                checked={selectedIds.includes(lead.id)}
                                onChange={() => setSelectedIds(prev => prev.includes(lead.id) ? prev.filter(x => x !== lead.id) : [...prev, lead.id])} />
                            </td>
                            <td style={{ padding: "1rem 0.5rem" }}>
                              <div className="d-flex align-items-center gap-2">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={avatar} alt={lead.name} className="rounded-circle border" style={{ width: 36, height: 36, objectFit: "cover" }} />
                                <div>
                                  <span className="fw-700 text-dark d-block bd-labe" style={{ lineHeight: 1.2 }}>{lead.name}</span>
                                  <span className="text-secondary fs-9">{lead.email}</span>
                                </div>
                              </div>
                            </td>
                            <td className="fw-600 bd-labe text-secondary" style={{ padding: "1rem 0.5rem", fontSize: "0.85rem" }}>{lead.company}</td>
                            <td className="fw-600 bd-labe text-dark" style={{ padding: "1rem 0.5rem", fontSize: "0.85rem" }}>{lead.source}</td>
                            <td style={{ padding: "1rem 0.5rem" }}>
                              <div className="d-flex align-items-center gap-1">
                                {flag && <img src={flag} alt={lead.destCountry} className="rounded-1" style={{ width: 18, height: 12, objectFit: "cover" }} />}
                                <span className="fw-600 text-dark" style={{ fontSize: "0.82rem" }}>{lead.destination}</span>
                              </div>
                            </td>
                            <td style={{ padding: "1rem 0.5rem" }}>
                              <span className="badge px-3 py-2 rounded-2 fw-700 fs-8" style={{ backgroundColor: st.bg, color: st.color }}>{lead.status}</span>
                            </td>
                            <td style={{ padding: "1rem 0.5rem" }}>
                              <div className="d-flex align-items-center gap-2">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={agentAvatar} alt={lead.assignedTo} className="rounded-circle border" style={{ width: 28, height: 28, objectFit: "cover" }} />
                                <span className="fw-600 text-dark" style={{ fontSize: "0.82rem" }}>{lead.assignedTo}</span>
                              </div>
                            </td>
                            <td className="fw-600 text-secondary" style={{ padding: "1rem 0.5rem", fontSize: "0.82rem", whiteSpace: "nowrap" }}>{lead.createdOn}</td>
                            <td className="fw-600 text-secondary" style={{ padding: "1rem 0.5rem", fontSize: "0.82rem", whiteSpace: "nowrap" }}>{lead.lastContact}</td>
                            <td style={{ padding: "1rem 0.5rem" }}>
                              <div className="d-inline-flex gap-1">
                                <button className="btn btn-outline-light border rounded-3 p-1 text-secondary" style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="Call">
                                  <i className="bi bi-telephone" style={{ fontSize: "0.8rem" }}></i>
                                </button>
                                <button className="btn btn-outline-light border rounded-3 p-1 text-secondary" style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="Email">
                                  <i className="bi bi-envelope" style={{ fontSize: "0.8rem" }}></i>
                                </button>
                                <button className="btn btn-outline-light border rounded-3 p-1 text-secondary" style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="More">
                                  <i className="bi bi-three-dots-vertical" style={{ fontSize: "0.8rem" }}></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      {paged.length === 0 && (
                        <tr><td colSpan={10} className="text-center py-5 text-secondary"><i className="bi bi-inbox fs-1 d-block mb-2"></i>No leads found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-4 pt-3 border-top border-light gap-3 inq-pagination">
                  <span className="text-secondary fs-8 fw-500">
                    Showing {filtered.length === 0 ? 0 : (safePage - 1) * rowsPerPage + 1} to {Math.min(safePage * rowsPerPage, filtered.length)} of {filtered.length.toLocaleString()} leads
                  </span>
                  <nav>
                    <ul className="pagination pagination-sm m-0">
                      <li className={`page-item ${safePage === 1 ? "disabled" : ""}`}>
                        <button className="page-link border-0 text-secondary bg-transparent rounded-2" onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>
                          <i className="bi bi-chevron-left"></i>
                        </button>
                      </li>
                      {[1, 2, 3, "...", totalPages].filter((v, i, a) => a.indexOf(v) === i).map((item, idx) =>
                        item === "..." ? (
                          <li key={idx} className="page-item disabled"><span className="page-link border-0 bg-transparent">…</span></li>
                        ) : (
                          <li key={item} className="page-item">
                            <button
                              className="page-link border-0 rounded-2 mx-1 fw-600"
                              style={safePage === item ? { backgroundColor: "#112E24", color: "#fff" } : { backgroundColor: "transparent", color: "var(--dark)" }}
                              onClick={() => setCurrentPage(item)}
                            >{item}</button>
                          </li>
                        )
                      )}
                      <li className={`page-item ${safePage === totalPages ? "disabled" : ""}`}>
                        <button className="page-link border-0 text-secondary bg-transparent rounded-2" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}>
                          <i className="bi bi-chevron-right"></i>
                        </button>
                      </li>
                    </ul>
                  </nav>
                  <select className="form-select form-select-sm border rounded-2" style={{ width: "100px", height: "30px", fontSize: "0.78rem" }}>
                    <option>10 / page</option>
                    <option>25 / page</option>
                    <option>50 / page</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right: Widgets */}
            <div className="col-12 col-xl-4">
              <div className="d-flex flex-column gap-3">

                {/* Doughnut */}
                <div className="section-card border border-light p-4">
                  <h3 className="section-card-title mb-4">Leads by Status</h3>
                  <div className="row align-items-center">
                    <div className="col-5 d-flex justify-content-center align-items-center position-relative" style={{ height: 130 }}>
                      <div style={{ width: 130, height: 130 }}>
                        <Doughnut data={doughnutData} options={doughnutOptions} />
                      </div>
                      <div className="position-absolute text-center" style={{ pointerEvents: "none" }}>
                        <span className="fw-800 text-dark d-block" style={{ fontSize: "1.3rem", lineHeight: 1.1 }}>1,356</span>
                        <span className="text-secondary fw-600" style={{ fontSize: "0.62rem", letterSpacing: "0.5px" }}>TOTAL</span>
                      </div>
                    </div>
                    <div className="col-7">
                      <div className="d-flex flex-column gap-2" style={{ fontSize: "0.78rem" }}>
                        {[
                          { label: "New", count: 356, pct: "26.3%", color: "#3B82F6" },
                          { label: "Contacted", count: 256, pct: "18.9%", color: "#D97706" },
                          { label: "Qualified", count: 216, pct: "15.9%", color: "#059669" },
                          { label: "Proposal Sent", count: 186, pct: "13.7%", color: "#7C3AED" },
                          { label: "Negotiation", count: 156, pct: "11.5%", color: "#DC2626" },
                          { label: "Lost", count: 32, pct: "2.3%", color: "#9CA3AF" },
                        ].map(item => (
                          <div key={item.label} className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center gap-2">
                              <span className="rounded-circle d-inline-block" style={{ width: 8, height: 8, backgroundColor: item.color }}></span>
                              <span className="text-secondary fw-500">{item.label}</span>
                            </div>
                            <span className="fw-700 text-dark">{item.count} <span className="text-secondary fw-500">({item.pct})</span></span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Lead Sources */}
                <div className="section-card border border-light p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="section-card-title">Top Lead Sources</h3>
                    <a href="#" className="section-card-link" onClick={e => e.preventDefault()}>View All</a>
                  </div>
                  <div className="d-flex flex-column gap-3">
                    {topSources.map(s => (
                      <div key={s.label}>
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <span className="fw-700 text-dark" style={{ fontSize: "0.85rem" }}>{s.label}</span>
                          <span className="fw-800 text-dark" style={{ fontSize: "0.85rem" }}>{s.count}</span>
                        </div>
                        <div className="progress rounded-pill bg-light" style={{ height: 6 }}>
                          <div className="progress-bar rounded-pill" style={{ width: `${s.pct}%`, backgroundColor: "#1C3F35" }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activities */}
                <div className="section-card border border-light p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="section-card-title">Recent Activities</h3>
                    <a href="#" className="section-card-link" onClick={e => e.preventDefault()}>View All</a>
                  </div>
                  <div className="d-flex flex-column gap-3">
                    {recentActivities.map((act, i) => {
                      const { icon, color, bg } = activityIcon(act.type);
                      return (
                        <div key={i} className="d-flex align-items-start gap-2 fs-8">
                          <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 24, height: 24, backgroundColor: bg }}>
                            <i className={`bi ${icon}`} style={{ fontSize: "0.68rem", color }}></i>
                          </div>
                          <p className="m-0 text-dark fw-500 flex-grow-1">{act.text}</p>
                          <span className="text-secondary opacity-75 fs-9" style={{ whiteSpace: "nowrap" }}>{act.time}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </main>

        <Footer />
      </div>

      {sidebarOpen && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-lg-none" style={{ backgroundColor: "rgba(0,0,0,0.4)", zIndex: 995 }} onClick={toggleSidebar}></div>
      )}
    </div>
  );
}
