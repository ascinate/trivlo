"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

// ─── Data store matching leads/page.js ─────────────────────────────────────────
const LEAD_DB = {
  "L-001": {
    id: "L-001", leadId: "LEAD-1256", name: "David Miller", status: "New", priority: "Medium",
    addedOn: "21 May 2025", source: "Website", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
    scoreBreakdown: { profile: 26, engagement: 18, budget: 20, travel: 17, conversion: 10 },
    company: { name: "Miller Travels", logo: null },
    assignedTo: { name: "Sarah Johnson", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&auto=format&fit=crop&q=80" },
    info: {
      fullName: "David Miller", email: "david@example.com", phone: "+62 812 3456 7890",
      company: "Miller Travels", jobTitle: "Travel Manager", industry: "Travel & Tourism",
      leadSource: "Website", leadStatus: "New",
      country: "Indonesia", countryFlag: "https://flagcdn.com/w40/id.png",
      city: "Jakarta", altEmail: "david.miller@company.com",
      annualRevenue: "$5M - $10M",
      destination: "Bali, Indonesia", preferredTravelDate: "15 Jun 2025 - 20 Jun 2025",
      travelers: "2 Adults, 1 Child", budget: "$2,000 - $3,000",
      travelPurpose: "Leisure", hearAbout: "Google Search",
      specialRequirements: "Sea view hotel, Airport pickup",
      lastContact: "21 May 2025, 10:30 AM",
      assignedTo: "Sarah Johnson",
      createdOn: "21 May 2025, 10:30 AM",
    },
    notes: "David is looking for a 5-day trip to Bali for his family. Preferably 4-star hotel near the beach with breakfast included. Interested in private airport transfer and day tour packages.",
    quotations: [
      { type: "Quotation", refNo: "QT-1256", title: "Bali Family Package (5 Days)", amount: "$2,450.00", status: "Sent", date: "21 May 2025" },
    ],
    activities: [
      { icon: "bi-person-plus-fill", bg: "#E9F4EE", color: "#1E6C45", title: "Lead created", detail: "Lead David Miller created from Website", time: "21 May 2025, 10:30 AM" },
      { icon: "bi-telephone-fill", bg: "#FEF7ED", color: "#B97C2B", title: "Called to David Miller", detail: "Spoke with David regarding his Bali trip requirements.", time: "21 May 2025, 11:15 AM" },
      { icon: "bi-envelope-fill", bg: "#ECEFFE", color: "#5D59E1", title: "Email sent", detail: "Sent Bali packages and hotel options.", time: "21 May 2025, 01:20 PM" },
      { icon: "bi-sticky-fill", bg: "#FFF1F0", color: "#DC2626", title: "Note added", detail: "Customer interested in private tour and sea view room.", time: "21 May 2025, 02:45 PM" },
      { icon: "bi-check-circle-fill", bg: "#F0F4F2", color: "#677E75", title: "Task created", detail: "Follow up with David for confirmation.", time: "21 May 2025, 03:00 PM" },
    ],
  },
  "L-002": {
    id: "L-002", leadId: "LEAD-1257", name: "Emma Watson", status: "Contacted", priority: "High",
    addedOn: "21 May 2025", source: "Referral", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&auto=format&fit=crop&q=80",
    scoreBreakdown: { profile: 22, engagement: 20, budget: 18, travel: 15, conversion: 8 },
    company: { name: "Watson Holidays", logo: null },
    assignedTo: { name: "Michael Lee", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80" },
    info: {
      fullName: "Emma Watson", email: "emma@example.com", phone: "+971 50 123 4567",
      company: "Watson Holidays", jobTitle: "Director", industry: "Travel & Tourism",
      leadSource: "Referral", leadStatus: "Contacted",
      country: "UAE", countryFlag: "https://flagcdn.com/w40/ae.png",
      city: "Dubai", altEmail: "emma.watson@watson.com",
      annualRevenue: "$1M - $5M",
      destination: "Dubai, UAE", preferredTravelDate: "01 Jul 2025 - 08 Jul 2025",
      travelers: "2 Adults", budget: "$3,000 - $5,000",
      travelPurpose: "Luxury", hearAbout: "Friend / Colleague",
      specialRequirements: "Private villa, Yacht experience",
      lastContact: "21 May 2025, 02:00 PM",
      assignedTo: "Michael Lee",
      createdOn: "21 May 2025, 09:00 AM",
    },
    notes: "Emma is interested in a luxury Dubai experience for a milestone anniversary. She specifically wants a private villa with butler service and a yacht experience.",
    quotations: [],
    activities: [
      { icon: "bi-person-plus-fill", bg: "#E9F4EE", color: "#1E6C45", title: "Lead created", detail: "Lead Emma Watson received via referral", time: "21 May 2025, 09:00 AM" },
      { icon: "bi-telephone-fill", bg: "#FEF7ED", color: "#B97C2B", title: "Call made", detail: "Initial call to discuss requirements", time: "21 May 2025, 02:00 PM" },
    ],
  },
};

// Fallback
const createFallback = (id) => ({
  id, leadId: id, name: "Lead", status: "New", priority: "Medium",
  addedOn: "—", source: "Website", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
  scoreBreakdown: { profile: 10, engagement: 10, budget: 10, travel: 10, conversion: 5 },
  company: { name: "—" },
  assignedTo: { name: "—", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&auto=format&fit=crop&q=80" },
  info: { fullName: "—", email: "—", phone: "—", company: "—", jobTitle: "—", industry: "—", leadSource: "—", leadStatus: "—", country: "—", countryFlag: "", city: "—", altEmail: "—", annualRevenue: "—", destination: "—", preferredTravelDate: "—", travelers: "—", budget: "—", travelPurpose: "—", hearAbout: "—", specialRequirements: "—", lastContact: "—", assignedTo: "—", createdOn: "—" },
  notes: "—",
  quotations: [],
  activities: [],
});

const STATUS_STYLES = {
  New: { bg: "#F0F6FF", color: "#3B82F6" },
  Contacted: { bg: "#FFF7E6", color: "#D97706" },
  Qualified: { bg: "#ECFDF5", color: "#059669" },
  "Proposal Sent": { bg: "#F3F0FF", color: "#7C3AED" },
  Negotiation: { bg: "#FFF1F0", color: "#DC2626" },
  Lost: { bg: "#F3F4F6", color: "#6B7280" },
};

const TABS = ["Overview", "Notes", "Tasks", "Documents", "History"];

export default function LeadDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const lead = LEAD_DB[id] || createFallback(id);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const totalScore = Object.values(lead.scoreBreakdown).reduce((a, b) => a + b, 0);
  const scoreLabel = totalScore >= 80 ? "High Quality Lead" : totalScore >= 60 ? "Good Potential" : totalScore >= 40 ? "Moderate" : "Low Quality";
  const scoreColor = totalScore >= 80 ? "#1E6C45" : totalScore >= 60 ? "#B97C2B" : totalScore >= 40 ? "#3B82F6" : "#D05E5E";

  const scoreChartData = {
    datasets: [{
      data: [totalScore, 100 - totalScore],
      backgroundColor: [scoreColor, "#F0F0F0"],
      borderWidth: 0,
    }]
  };
  const scoreChartOptions = {
    cutout: "78%", responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } }
  };

  const st = STATUS_STYLES[lead.status] || { bg: "#F3F4F6", color: "#6B7280" };
  const priorityColor = lead.priority === "High" ? "#D05E5E" : lead.priority === "Medium" ? "#E8A856" : "#1E6C45";

  const newLeadButton = (
    <button
      className="btn text-white rounded-3 px-3 d-flex align-items-center gap-2"
      style={{ backgroundColor: "#112E24", height: "42px", fontWeight: "600" }}
      id="btn-new-lead-detail"
      onClick={() => router.push("/leads/add")}
    >
      <i className="bi bi-plus-lg fs-6"></i>
      <span>New Lead</span>
      <i className="bi bi-chevron-down ms-1" style={{ fontSize: "0.75rem" }}></i>
    </button>
  );

  return (
    <>
      <style>{`
        .lead-info-row { display: flex; gap: 0.5rem; padding: 0.4rem 0; font-size: 0.85rem; }
        .lead-info-label { flex-shrink: 0; min-width: 170px; color: var(--secondary); font-weight: 600; font-size: 0.82rem; }
        .lead-info-value { font-weight: 600; color: var(--dark); flex: 1; }
        .lead-stat-card { border: 1px solid var(--border); border-radius: 14px; background: #fff; padding: 1.5rem 1.75rem; }
        .lead-tab-btn { background: none; border: none; border-bottom: 2.5px solid transparent; padding: 0.6rem 1rem; font-size: 0.88rem; font-weight: 500; color: var(--secondary); cursor: pointer; white-space: nowrap; transition: color 0.15s; }
        .lead-tab-btn.active { color: #112E24; border-bottom-color: #112E24; }
        .lead-tab-btn:hover:not(.active) { color: var(--dark); }
        .lead-activity-wrap { position: relative; padding-left: 2.2rem; }
        .lead-activity-wrap::before { content: ''; position: absolute; left: 14px; top: 32px; bottom: -12px; width: 1.5px; background: var(--border); }
        .lead-activity-wrap:last-child::before { display: none; }
        @media (max-width: 767.98px) { .lead-info-label { min-width: 130px; } }
        @media (max-width: 575.98px) { .lead-info-row { flex-direction: column; gap: 0.1rem; } .lead-info-label { min-width: unset; } }
      `}</style>

      <div className="d-flex position-relative">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="app-container w-100 min-vh-100 d-flex flex-column justify-content-between">
          <Header
            toggleSidebar={toggleSidebar}
            title="Leads Details"
            subtitle="Home > CRM > Leads > Leads Details"
            forcePageHeaderLayout={true}
            searchPlaceholder="Search inquiries, customers, bookings..."
            actionButton={newLeadButton}
          />

          <main className="main-content d-flex flex-column gap-3 py-4">


            {/* Page title */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-start gap-3">
              <div>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <button
                    className="btn btn-light border border-light rounded-3 p-2 me-1"
                    style={{ width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center" }}
                    onClick={() => router.push("/leads")}
                    aria-label="Back"
                  >
                    <i className="bi bi-arrow-left" style={{ fontSize: "0.9rem" }}></i>
                  </button>
                  <h1 className="fw-800 text-dark m-0 fs-3">{lead.name}</h1>
                  <span className="badge rounded-2 px-2 py-1 fw-700" style={{ fontSize: "0.75rem", backgroundColor: "#F0F6FF", color: "#3B82F6" }}>New Lead</span>
                </div>
                <div className="d-flex align-items-center gap-2 mt-1 flex-wrap">
                  <span className="text-secondary fs-8 fw-600">Added on {lead.addedOn}</span>
                  <span className="text-secondary fs-9">•</span>
                  <span className="text-secondary fs-8 fw-600">Source: <a href="#" className="fw-700" style={{ color: "#1E6C45", textDecoration: "none" }} onClick={e => e.preventDefault()}>{lead.source}</a></span>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2 flex-wrap">
                <button className="btn btn-light border border-light rounded-3 px-3 py-2 fw-700 d-flex align-items-center gap-1" style={{ fontSize: "0.85rem" }}>
                  <i className="bi bi-pencil text-secondary"></i> Edit
                </button>
                <button className="btn btn-light border border-light rounded-3 px-3 py-2 fw-700 d-flex align-items-center gap-1" style={{ fontSize: "0.85rem" }}>
                  <i className="bi bi-person-check text-secondary"></i> Convert to Customer
                </button>
                <button className="btn btn-light border border-light rounded-3 px-3 py-2 fw-700 d-flex align-items-center gap-1" style={{ fontSize: "0.85rem" }}>
                  More Actions <i className="bi bi-chevron-down ms-1" style={{ fontSize: "0.7rem" }}></i>
                </button>
                <div className="btn-group border border-light rounded-3 bg-white shadow-sm" style={{ height: 38 }}>
                  <button className="btn btn-light bg-transparent border-0 text-secondary" style={{ width: 36 }} aria-label="Previous"><i className="bi bi-chevron-left"></i></button>
                  <div className="border-start border-light h-75 my-auto"></div>
                  <button className="btn btn-light bg-transparent border-0 text-secondary" style={{ width: 36 }} aria-label="Next"><i className="bi bi-chevron-right"></i></button>
                </div>
              </div>
            </div>

            {/* Hero stats row */}
            <div className="row g-3">
              {/* Lead Score */}
              <div className="col-12 col-sm-6 col-xl-3">
                <div className="lead-stat-card d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0" style={{ width: 52, height: 52, backgroundColor: "#E9F4EE" }}>
                    <i className="bi bi-person-fill" style={{ fontSize: "1.4rem", color: "#1E6C45" }}></i>
                  </div>
                  <div>
                    <span className="text-secondary fw-600 d-block" style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>Lead Score</span>
                    <span className="fw-800 text-dark d-block" style={{ fontSize: "1.3rem", lineHeight: 1.1 }}>{totalScore} / 100</span>
                    <span className="fw-700 d-block mt-1" style={{ fontSize: "0.72rem", color: scoreColor }}>{scoreLabel}</span>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="col-12 col-sm-6 col-xl-3">
                <div className="lead-stat-card d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0" style={{ width: 52, height: 52, backgroundColor: "#FEF7ED" }}>
                    <i className="bi bi-flag-fill" style={{ fontSize: "1.2rem", color: "#B97C2B" }}></i>
                  </div>
                  <div>
                    <span className="text-secondary fw-600 d-block" style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>Status</span>
                    <div className="d-flex align-items-center gap-2 mt-1">
                      <span className="rounded-circle" style={{ width: 8, height: 8, backgroundColor: st.color, display: "inline-block" }}></span>
                      <span className="fw-800 text-dark" style={{ fontSize: "1rem" }}>{lead.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company */}
              <div className="col-12 col-sm-6 col-xl-3">
                <div className="lead-stat-card d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0" style={{ width: 52, height: 52, backgroundColor: "#ECEFFE" }}>
                    <i className="bi bi-building-fill" style={{ fontSize: "1.2rem", color: "#5D59E1" }}></i>
                  </div>
                  <div>
                    <span className="text-secondary fw-600 d-block" style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>Company</span>
                    <span className="fw-800 text-dark d-block" style={{ fontSize: "1rem", lineHeight: 1.2 }}>{lead.company.name}</span>
                    <a href="#" className="section-card-link fw-700" style={{ fontSize: "0.72rem" }} onClick={e => e.preventDefault()}>View Company</a>
                  </div>
                </div>
              </div>

              {/* Assigned To */}
              <div className="col-12 col-sm-6 col-xl-3">
                <div className="lead-stat-card d-flex align-items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={lead.assignedTo.avatar} alt={lead.assignedTo.name} className="rounded-circle border flex-shrink-0" style={{ width: 52, height: 52, objectFit: "cover" }} />
                  <div>
                    <span className="text-secondary fw-600 d-block" style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>Assigned To</span>
                    <span className="fw-800 text-dark d-block" style={{ fontSize: "1rem", lineHeight: 1.2 }}>{lead.assignedTo.name}</span>
                    <a href="#" className="section-card-link fw-700" style={{ fontSize: "0.72rem" }} onClick={e => e.preventDefault()}>View Profile</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Main 2-column layout */}
            <div className="row g-3">

              {/* LEFT */}
              <div className="col-12 col-xl-8">
                <div className="d-flex flex-column gap-3">

                  {/* Tabs */}
                  <div className="section-card border border-light px-4 pt-2 pb-0">
                    <div className="d-flex overflow-x-auto" style={{ scrollbarWidth: "none", borderBottom: "1px solid var(--border)" }}>
                      {TABS.map(tab => (
                        <button
                          key={tab}
                          className={`lead-tab-btn ${activeTab === tab ? "active" : ""}`}
                          onClick={() => setActiveTab(tab)}
                        >
                          {tab}
                          {tab === "Notes" && <span className="badge bg-light text-secondary rounded-pill ms-1 fw-600" style={{ fontSize: "0.62rem" }}>2</span>}
                          {tab === "Tasks" && <span className="badge bg-light text-secondary rounded-pill ms-1 fw-600" style={{ fontSize: "0.62rem" }}>1</span>}
                          {tab === "Documents" && <span className="badge bg-light text-secondary rounded-pill ms-1 fw-600" style={{ fontSize: "0.62rem" }}>1</span>}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Overview tab */}
                  {activeTab === "Overview" && (
                    <>
                      {/* Lead Information */}
                      <div className="section-card border border-light p-4">
                        <h3 className="fw-800 text-dark fs-6 mb-3">Lead Information</h3>
                        <div className="row g-0">
                          <div className="col-12 col-md-6 pe-md-4">
                            {[
                              { label: "Full Name", value: lead.info.fullName },
                              { label: "Email", value: lead.info.email },
                              { label: "Phone", value: <><span>{lead.info.phone}</span> <i className="bi bi-whatsapp text-success ms-1"></i></> },
                              { label: "Company", value: lead.info.company },
                              { label: "Job Title", value: lead.info.jobTitle },
                              { label: "Lead Source", value: lead.info.leadSource },
                              { label: "Destination Interested", value: lead.info.destination },
                              { label: "Preferred Travel Date", value: lead.info.preferredTravelDate },
                              { label: "Number of Travelers", value: lead.info.travelers },
                              { label: "Budget Range", value: lead.info.budget },
                              { label: "Created On", value: lead.info.createdOn },
                            ].map(f => (
                              <div key={f.label} className="lead-info-row">
                                <span className="lead-info-label">{f.label}</span>
                                <span className="lead-info-value">{f.value}</span>
                              </div>
                            ))}
                          </div>
                          <div className="col-12 col-md-6 ps-md-4 mt-2 mt-md-0">
                            {[
                              { label: "Country", value: <><img src={lead.info.countryFlag} alt="" className="rounded-1 me-1" style={{ width: 18, height: 12, objectFit: "cover", verticalAlign: "middle" }} />{lead.info.country}</> },
                              { label: "City", value: lead.info.city },
                              { label: "Alternate Email", value: lead.info.altEmail },
                              { label: "Industry", value: lead.info.industry },
                              { label: "Annual Revenue", value: lead.info.annualRevenue },
                              { label: "Lead Status", value: <><span className="rounded-circle me-1" style={{ width: 8, height: 8, backgroundColor: st.color, display: "inline-block" }}></span><span className="fw-700" style={{ color: st.color }}>{lead.status}</span></> },
                              { label: "Travel Purpose", value: lead.info.travelPurpose },
                              { label: "How did you hear about us?", value: lead.info.hearAbout },
                              { label: "Special Requirements", value: lead.info.specialRequirements },
                              { label: "Last Contact", value: lead.info.lastContact },
                              { label: "Assigned To", value: <div className="d-flex align-items-center gap-2"><img src={lead.assignedTo.avatar} alt={lead.assignedTo.name} className="rounded-circle border" style={{ width: 20, height: 20, objectFit: "cover" }} /><span>{lead.info.assignedTo}</span></div> },
                            ].map(f => (
                              <div key={f.label} className="lead-info-row">
                                <span className="lead-info-label">{f.label}</span>
                                <span className="lead-info-value">{f.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Requirements / Notes */}
                      <div className="section-card border border-light p-4">
                        <h3 className="fw-800 text-dark fs-6 mb-3">Requirements / Notes</h3>
                        <p className="text-dark fw-600 mb-0" style={{ fontSize: "0.88rem", lineHeight: 1.8 }}>{lead.notes}</p>
                      </div>

                      {/* Related Inquiries & Quotations */}
                      <div className="section-card border border-light p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h3 className="fw-800 text-dark fs-6 m-0">Related Inquiries &amp; Quotations</h3>
                          <button className="btn btn-light border border-light rounded-2 px-2 py-1 fw-700 d-flex align-items-center gap-1" style={{ fontSize: "0.75rem" }}>
                            <i className="bi bi-plus-lg" style={{ fontSize: "0.7rem" }}></i> Add
                          </button>
                        </div>
                        {lead.quotations.length > 0 ? (
                          <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0" style={{ fontSize: "0.82rem" }}>
                              <thead>
                                <tr className="border-bottom border-light">
                                  {["Type", "Reference No.", "Title / Description", "Amount", "Status", "Date", "Actions"].map(h => (
                                    <th key={h} className="lablename pb-3" style={{ textTransform: "uppercase", whiteSpace: "nowrap", fontSize: "0.68rem" }}>{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {lead.quotations.map((q, i) => (
                                  <tr key={i} className="border-bottom border-light">
                                    <td style={{ padding: "0.75rem 0.5rem" }}>
                                      <span className="badge rounded-2 px-2 py-1 fw-700" style={{ fontSize: "0.68rem", backgroundColor: "#ECEFFE", color: "#5D59E1" }}>{q.type}</span>
                                    </td>
                                    <td className="fw-700" style={{ color: "#1E6C45", padding: "0.75rem 0.5rem" }}>{q.refNo}</td>
                                    <td className="fw-600 text-dark" style={{ padding: "0.75rem 0.5rem" }}>{q.title}</td>
                                    <td className="fw-700 text-dark" style={{ padding: "0.75rem 0.5rem" }}>{q.amount}</td>
                                    <td style={{ padding: "0.75rem 0.5rem" }}>
                                      <span className="badge rounded-2 px-2 py-1 fw-700" style={{ fontSize: "0.68rem", backgroundColor: "#E9F4EE", color: "#1E6C45" }}>{q.status}</span>
                                    </td>
                                    <td className="text-secondary fw-500" style={{ padding: "0.75rem 0.5rem" }}>{q.date}</td>
                                    <td style={{ padding: "0.75rem 0.5rem" }}>
                                      <div className="d-flex gap-1">
                                        <button className="btn btn-light border rounded-2 p-1 text-secondary" style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                          <i className="bi bi-eye" style={{ fontSize: "0.75rem" }}></i>
                                        </button>
                                        <button className="btn btn-light border rounded-2 p-1 text-secondary" style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                          <i className="bi bi-three-dots-vertical" style={{ fontSize: "0.75rem" }}></i>
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="text-center py-4 text-secondary">
                            <i className="bi bi-file-earmark-text fs-1 d-block mb-2 opacity-25"></i>
                            <span className="fw-600 d-block mb-2">No related quotations yet</span>
                            <button className="btn text-white rounded-3 px-3 py-2 fw-700 d-inline-flex align-items-center gap-1" style={{ backgroundColor: "#112E24", fontSize: "0.82rem" }}>
                              <i className="bi bi-plus-lg"></i> Create Quotation
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* Other tab placeholder */}
                  {activeTab !== "Overview" && (
                    <div className="section-card border border-light p-5 text-center text-secondary">
                      <i className="bi bi-tools fs-1 d-block mb-3 opacity-25"></i>
                      <h5 className="fw-700 text-dark">{activeTab}</h5>
                      <p className="mb-0">This section is coming soon.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT */}
              <div className="col-12 col-xl-4">
                <div className="d-flex flex-column gap-3">

                  {/* Lead Score Breakdown */}
                  <div className="section-card border border-light p-4">
                    <h3 className="section-card-title mb-3">Lead Score Breakdown</h3>
                    <div className="row align-items-center g-0">
                      <div className="col-5 d-flex justify-content-center align-items-center position-relative" style={{ height: 120 }}>
                        <div style={{ width: 120, height: 120 }}>
                          <Doughnut data={scoreChartData} options={scoreChartOptions} />
                        </div>
                        <div className="position-absolute text-center" style={{ pointerEvents: "none" }}>
                          <span className="fw-800 text-dark d-block" style={{ fontSize: "1.6rem", lineHeight: 1 }}>{totalScore}</span>
                          <span className="text-secondary fw-600" style={{ fontSize: "0.62rem" }}>/100</span>
                        </div>
                      </div>
                      <div className="col-7 ps-2">
                        <div className="d-flex flex-column gap-2" style={{ fontSize: "0.78rem" }}>
                          {[
                            { label: "Profile Completeness", score: lead.scoreBreakdown.profile, max: 30 },
                            { label: "Engagement", score: lead.scoreBreakdown.engagement, max: 20 },
                            { label: "Budget Fit", score: lead.scoreBreakdown.budget, max: 20 },
                            { label: "Travel Intent", score: lead.scoreBreakdown.travel, max: 20 },
                            { label: "Conversion Probability", score: lead.scoreBreakdown.conversion, max: 10 },
                          ].map(item => (
                            <div key={item.label} className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center gap-2">
                                <span className="rounded-circle" style={{ width: 7, height: 7, backgroundColor: scoreColor, display: "inline-block" }}></span>
                                <span className="text-secondary fw-500">{item.label}</span>
                              </div>
                              <span className="fw-700 text-dark">{item.score}/{item.max}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Activity Timeline */}
                  <div className="section-card border border-light p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h3 className="section-card-title">Activity Timeline</h3>
                      <a href="#" className="section-card-link" onClick={e => e.preventDefault()}>View All</a>
                    </div>
                    <div className="d-flex flex-column" style={{ gap: "1.1rem" }}>
                      {lead.activities.map((a, i) => (
                        <div key={i} className="lead-activity-wrap">
                          <div className="rounded-circle d-flex align-items-center justify-content-center position-absolute" style={{ left: 0, top: 0, width: 28, height: 28, backgroundColor: a.bg }}>
                            <i className={`bi ${a.icon}`} style={{ fontSize: "0.78rem", color: a.color }}></i>
                          </div>
                          <div>
                            <span className="fw-700 text-dark d-block" style={{ fontSize: "0.82rem" }}>{a.title}</span>
                            <span className="text-secondary fw-500 d-block" style={{ fontSize: "0.75rem" }}>{a.detail}</span>
                            <span className="text-secondary opacity-75" style={{ fontSize: "0.7rem" }}>{a.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="section-card border border-light p-4">
                    <h3 className="section-card-title mb-3">Quick Actions</h3>
                    <div className="d-flex flex-column gap-2">
                      {[
                        { icon: "bi-telephone-fill", label: "Log a Call", color: "#E9F4EE", iconColor: "#1E6C45" },
                        { icon: "bi-envelope-fill", label: "Send Email", color: "#ECEFFE", iconColor: "#5D59E1" },
                        { icon: "bi-calendar-plus-fill", label: "Schedule Follow-up", color: "#FEF7ED", iconColor: "#B97C2B" },
                        { icon: "bi-file-earmark-text-fill", label: "Create Quotation", color: "#F0F4F2", iconColor: "#677E75" },
                        { icon: "bi-person-check-fill", label: "Convert to Customer", color: "#FDF0F0", iconColor: "#D05E5E" },
                      ].map(action => (
                        <button
                          key={action.label}
                          className="btn btn-light border border-light rounded-3 px-3 py-2 fw-700 d-flex align-items-center gap-2 text-start"
                          style={{ fontSize: "0.82rem" }}
                          onClick={() => alert(action.label)}
                        >
                          <span className="rounded-2 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 28, height: 28, backgroundColor: action.color }}>
                            <i className={`bi ${action.icon}`} style={{ fontSize: "0.75rem", color: action.iconColor }}></i>
                          </span>
                          {action.label}
                        </button>
                      ))}
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
    </>
  );
}
