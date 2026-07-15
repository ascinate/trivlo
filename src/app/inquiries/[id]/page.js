"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ─── Shared data store (mirrors inquiries/page.js) ────────────────────────────
const INQUIRY_DB = {
  "INQ-1025": {
    id: "INQ-1025",
    status: "New",
    createdOn: "18 Jun 2025",
    timeAgo: "2 min ago",
    customer: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+62 812 3456 7890",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
      leadScore: 4,
    },
    destination: { name: "Bali, Indonesia", flag: "https://flagcdn.com/w40/id.png", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&auto=format&fit=crop&q=80", isPrimary: true },
    travelDate: "18 Jun 2025",
    priority: "Medium",
    pax: "2 Adults",
    assignedTo: {
      name: "Sarah Johnson",
      email: "sarah.j@trivlo.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    },
    source: "Website",
    lastActivity: "2 min ago",
    tags: ["Leisure Travel", "Beach Holiday", "Couple"],
    requirements: {
      tripType: "Leisure",
      budget: "$1,000 - $2,000",
      preferredStay: "4 Star Hotel",
      mealPreference: "Breakfast Included",
      specialRequests: "Honeymoon setup, Ocean view room",
      additionalNotes: "Looking for romantic places and water activities.",
    },
    travelers: [
      { no: 1, name: "John Doe", role: "Lead Traveler", gender: "Male", age: "32 Years", passport: "A1234567", email: "john.doe@email.com" },
      { no: 2, name: "Jane Doe", role: null, gender: "Female", age: "29 Years", passport: "B7654321", email: "jane.doe@email.com" },
    ],
    itineraryIdeas: [
      { id: "IT-01", title: "Bali Romantic Getaway", badge: "Recommended", days: 5, nights: 4, adults: 2, price: "$1,450", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=240&auto=format&fit=crop&q=80" },
      { id: "IT-02", title: "Discover Bali Paradise", badge: null, days: 6, nights: 5, adults: 2, price: "$1,780", image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=240&auto=format&fit=crop&q=80" },
    ],
    activities: [
      { type: "inquiry", icon: "bi-envelope-fill", color: "#5D59E1", bg: "#ECEFFE", text: "New inquiry received from website", by: "System", time: "2 min ago", note: null },
      { type: "assign", icon: "bi-person-check-fill", color: "#1E6C45", bg: "#E9F4EE", text: "Assigned to Sarah Johnson", by: "John Smith", time: "2 min ago", note: null },
      { type: "note", icon: "bi-sticky-fill", color: "#B97C2B", bg: "#FEF7ED", text: "Note added", by: "Sarah Johnson", time: "15 min ago", note: "Customer is interested in a romantic trip to Bali. Prefers beach resort with private pool." },
      { type: "followup", icon: "bi-telephone-fill", color: "#677E75", bg: "#F0F4F2", text: "Follow up call done", by: "Sarah Johnson", time: "1 hour ago", note: null },
    ],
    summary: { totalInquiries: 1, totalQuotesSent: 0, totalBookings: 0, totalSpent: "$0", lastBooking: "—", customerSince: "Jun 2025" },
  },
  "INQ-1024": {
    id: "INQ-1024",
    status: "In Progress",
    createdOn: "15 May 2025",
    timeAgo: "5 days ago",
    customer: {
      name: "Emma Watson",
      email: "emma@email.com",
      phone: "+44 7700 900123",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
      leadScore: 5,
    },
    destination: { name: "Bali, Indonesia", flag: "https://flagcdn.com/w40/id.png", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&auto=format&fit=crop&q=80", isPrimary: true },
    travelDate: "15 Jun 2025",
    priority: "High",
    pax: "2 Adults",
    assignedTo: {
      name: "Michael Lee",
      email: "michael.l@trivlo.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    },
    source: "Referral",
    lastActivity: "1 hour ago",
    tags: ["Family", "Beach Holiday"],
    requirements: {
      tripType: "Leisure",
      budget: "$1,500 - $3,000",
      preferredStay: "5 Star Resort",
      mealPreference: "All Inclusive",
      specialRequests: "Pool villa preferred",
      additionalNotes: "Prefers quiet resort areas away from crowds.",
    },
    travelers: [
      { no: 1, name: "Emma Watson", role: "Lead Traveler", gender: "Female", age: "30 Years", passport: "C9876543", email: "emma@email.com" },
      { no: 2, name: "James Watson", role: null, gender: "Male", age: "34 Years", passport: "D1234876", email: "james@email.com" },
    ],
    itineraryIdeas: [
      { id: "IT-03", title: "Bali Luxury Escape", badge: "Recommended", days: 7, nights: 6, adults: 2, price: "$2,340", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=240&auto=format&fit=crop&q=80" },
    ],
    activities: [
      { type: "inquiry", icon: "bi-envelope-fill", color: "#5D59E1", bg: "#ECEFFE", text: "New inquiry received via referral", by: "System", time: "5 days ago", note: null },
      { type: "assign", icon: "bi-person-check-fill", color: "#1E6C45", bg: "#E9F4EE", text: "Assigned to Michael Lee", by: "Admin", time: "5 days ago", note: null },
      { type: "note", icon: "bi-sticky-fill", color: "#B97C2B", bg: "#FEF7ED", text: "Note added", by: "Michael Lee", time: "3 days ago", note: "Customer is very particular about privacy. Prefers exclusive villas." },
    ],
    summary: { totalInquiries: 1, totalQuotesSent: 1, totalBookings: 0, totalSpent: "$0", lastBooking: "—", customerSince: "May 2025" },
  },
  "INQ-1023": {
    id: "INQ-1023",
    status: "In Progress",
    createdOn: "14 May 2025",
    timeAgo: "6 days ago",
    customer: {
      name: "Michael Lee",
      email: "michael@email.com",
      phone: "+65 9123 4567",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      leadScore: 3,
    },
    destination: { name: "Bangkok, Thailand", flag: "https://flagcdn.com/w40/th.png", image: "https://images.unsplash.com/photo-1528181304800-2f5333a2028f?w=400&auto=format&fit=crop&q=80", isPrimary: true },
    travelDate: "10 Jul 2025",
    priority: "Medium",
    pax: "4 Adults, 1 Child",
    assignedTo: {
      name: "Sarah Johnson",
      email: "sarah.j@trivlo.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    },
    source: "Walk In",
    lastActivity: "2 hours ago",
    tags: ["Family Trip", "Adventure"],
    requirements: {
      tripType: "Family",
      budget: "$3,000 - $5,000",
      preferredStay: "4 Star Hotel",
      mealPreference: "Breakfast Included",
      specialRequests: "Child-friendly activities required",
      additionalNotes: "Family with young child. Need safe and comfortable arrangements.",
    },
    travelers: [
      { no: 1, name: "Michael Lee", role: "Lead Traveler", gender: "Male", age: "38 Years", passport: "SG1234567", email: "michael@email.com" },
      { no: 2, name: "Clara Lee", role: null, gender: "Female", age: "35 Years", passport: "SG7654321", email: "clara@email.com" },
    ],
    itineraryIdeas: [],
    activities: [
      { type: "inquiry", icon: "bi-envelope-fill", color: "#5D59E1", bg: "#ECEFFE", text: "New walk-in inquiry received", by: "System", time: "6 days ago", note: null },
      { type: "assign", icon: "bi-person-check-fill", color: "#1E6C45", bg: "#E9F4EE", text: "Assigned to Sarah Johnson", by: "Admin", time: "6 days ago", note: null },
    ],
    summary: { totalInquiries: 1, totalQuotesSent: 0, totalBookings: 0, totalSpent: "$0", lastBooking: "—", customerSince: "May 2025" },
  },
};

// Fallback for unknown IDs
const createFallback = (id) => ({
  id,
  status: "New",
  createdOn: "20 May 2025",
  timeAgo: "Just now",
  customer: { name: "Unknown Customer", email: "customer@email.com", phone: "+1 000 000 0000", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80", leadScore: 3 },
  destination: { name: "TBD", flag: "https://flagcdn.com/w40/un.png", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&auto=format&fit=crop&q=80", isPrimary: true },
  travelDate: "TBD",
  priority: "Medium",
  pax: "2 Adults",
  assignedTo: { name: "Sarah Johnson", email: "sarah.j@trivlo.com", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80" },
  source: "Website",
  lastActivity: "Just now",
  tags: [],
  requirements: { tripType: "Leisure", budget: "TBD", preferredStay: "TBD", mealPreference: "TBD", specialRequests: "—", additionalNotes: "—" },
  travelers: [],
  itineraryIdeas: [],
  activities: [{ type: "inquiry", icon: "bi-envelope-fill", color: "#5D59E1", bg: "#ECEFFE", text: "Inquiry created", by: "System", time: "Just now", note: null }],
  summary: { totalInquiries: 1, totalQuotesSent: 0, totalBookings: 0, totalSpent: "$0", lastBooking: "—", customerSince: "2025" },
});

const STATUS_STYLES = {
  "New": { bg: "#ECEFFE", color: "#5D59E1" },
  "In Progress": { bg: "#E6F0FF", color: "#0A58CA" },
  "Quotation Sent": { bg: "#FEF7ED", color: "#B97C2B" },
  "Converted": { bg: "#E9F4EE", color: "#1E6C45" },
  "Lost": { bg: "#FCEAEA", color: "#D05E5E" },
};

const PIPELINE_STAGES = ["New Inquiries", "In Progress", "Quotation Sent", "Converted", "Lost"];

export default function InquiryDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [inquiry, setInquiry] = useState(() => INQUIRY_DB[id] || createFallback(id));
  const [currentStatus, setCurrentStatus] = useState(inquiry.status);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const st = STATUS_STYLES[currentStatus] || { bg: "#F3F4F6", color: "#6B7280" };

  const pipelineIdx = PIPELINE_STAGES.findIndex(s => {
    if (currentStatus === "New") return s === "New Inquiries";
    if (currentStatus === "In Progress") return s === "In Progress";
    if (currentStatus === "Quotation Sent") return s === "Quotation Sent";
    if (currentStatus === "Converted") return s === "Converted";
    if (currentStatus === "Lost") return s === "Lost";
    return false;
  });

  const tabs = [
    { name: "Overview", icon: "bi-grid" },
    { name: "Requirements", icon: "bi-list-check" },
    { name: "Itinerary Ideas", icon: "bi-map", count: inquiry.itineraryIdeas.length },
    { name: "Notes", icon: "bi-sticky", count: 3 },
    { name: "Follow Ups", icon: "bi-telephone", count: 2 },
    { name: "Activity", icon: "bi-activity" },
    { name: "Documents", icon: "bi-file-earmark", count: 4 },
  ];

  const renderStars = (score) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <i key={i} className={`bi ${i < score ? "bi-star-fill text-warning" : "bi-star text-secondary opacity-25"}`} style={{ fontSize: "0.9rem" }}></i>
    ));
  };

  const priorityColor = inquiry.priority === "High" ? "#D05E5E" : inquiry.priority === "Medium" ? "#E8A856" : "#1E6C45";

  const newInquiryButton = (
    <button
      className="btn text-white rounded-3 px-3 d-flex align-items-center gap-2"
      style={{ backgroundColor: "#112E24", height: "42px", fontWeight: "600" }}
      onClick={() => alert("New Inquiry")}
    >
      <i className="bi bi-plus-lg fs-6"></i>
      <span>New Inquiry</span>
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
          searchPlaceholder="Search inquiries, customers, bookings..."
          actionButton={newInquiryButton}
        />

        <main className="main-content d-flex flex-column gap-3 py-4">

          {/* Breadcrumb */}
          <div>
            <span className="text-secondary fs-7 fw-500">
              Home &gt; CRM &gt; Inquiries &gt; {inquiry.id}
            </span>
          </div>

          {/* Main 2-column layout */}
          <div className="row g-3">

            {/* ── LEFT (col-8 on xl) ──────────────────────────────────────────── */}
            <div className="col-12 col-xl-8">
              <div className="d-flex flex-column gap-3">

                {/* Page title card */}
                <div className="section-card border border-light p-4">
                  {/* Headline row */}
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-start gap-3 mb-4">
                    <div className="d-flex align-items-center gap-3">
                      <button
                        className="btn btn-light border border-light rounded-3 p-2"
                        style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}
                        onClick={() => router.push("/inquiries")}
                        aria-label="Back"
                      >
                        <i className="bi bi-arrow-left"></i>
                      </button>
                      <div>
                        <div className="d-flex align-items-center gap-2 flex-wrap">
                          <h1 className="fw-800 text-dark m-0 fs-4">Inquiry Details</h1>
                          <span className="badge rounded-2 px-2 py-1 fw-700 fs-9" style={{ backgroundColor: st.bg, color: st.color }}>{currentStatus}</span>
                        </div>
                        <span className="text-secondary fs-8 fw-500 mt-1 d-block">
                          Created on {inquiry.createdOn} &bull; {inquiry.timeAgo}
                        </span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <button className="btn btn-light border border-light rounded-3 px-3 py-2 fw-700 d-flex align-items-center gap-1" style={{ fontSize: "0.85rem", height: 38 }}>
                        <i className="bi bi-pencil text-secondary"></i>
                        <span>Edit</span>
                      </button>
                      <div className="btn-group">
                        <button className="btn btn-light border border-light rounded-start-3 px-3 py-2 fw-700 d-flex align-items-center gap-1" style={{ fontSize: "0.85rem", height: 38 }}>
                          More Actions
                          <i className="bi bi-chevron-down ms-1" style={{ fontSize: "0.7rem" }}></i>
                        </button>
                      </div>
                      <div className="btn-group border border-light rounded-3 bg-white shadow-sm" style={{ height: 38 }}>
                        <button className="btn btn-light bg-transparent border-0 text-secondary" style={{ width: 36 }} aria-label="Previous">
                          <i className="bi bi-chevron-left"></i>
                        </button>
                        <div className="border-start border-light h-75 my-auto"></div>
                        <button className="btn btn-light bg-transparent border-0 text-secondary" style={{ width: 36 }} aria-label="Next">
                          <i className="bi bi-chevron-right"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Inquiry meta grid */}
                  <div className="row g-3 border-bottom border-light pb-4 mb-4">
                    {/* Inquiry ID */}
                    <div className="col-6 col-md-3">
                      <span className="text-secondary fw-600 d-block" style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>Inquiry ID</span>
                      <span className="fw-800 text-dark d-block mt-1" style={{ fontSize: "1.1rem" }}>{inquiry.id}</span>
                      <span className="text-secondary fs-8 fw-500">Source: {inquiry.source}</span>
                      <div className="d-flex align-items-center gap-1 mt-1">
                        <i className="bi bi-globe2 text-secondary" style={{ fontSize: "0.8rem" }}></i>
                        <span className="fw-600 text-dark" style={{ fontSize: "0.82rem" }}>{inquiry.source}</span>
                      </div>
                      <div className="d-flex align-items-center gap-1 mt-2">
                        {renderStars(inquiry.customer.leadScore)}
                        <span className="text-secondary fw-600 ms-1" style={{ fontSize: "0.75rem" }}>({inquiry.customer.leadScore}/5)</span>
                      </div>
                    </div>

                    {/* Customer */}
                    <div className="col-6 col-md-3">
                      <span className="text-secondary fw-600 d-block" style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>Customer</span>
                      <div className="d-flex align-items-center gap-2 mt-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={inquiry.customer.avatar} alt={inquiry.customer.name} className="rounded-circle border" style={{ width: 36, height: 36, objectFit: "cover" }} />
                        <div>
                          <span className="fw-800 text-dark d-block" style={{ fontSize: "0.9rem", lineHeight: 1.2 }}>{inquiry.customer.name}</span>
                          <span className="text-secondary" style={{ fontSize: "0.75rem" }}>{inquiry.customer.email}</span>
                          <span className="text-secondary d-block" style={{ fontSize: "0.75rem" }}>{inquiry.customer.phone}</span>
                        </div>
                      </div>
                      <button className="btn btn-light border border-light rounded-3 px-3 py-1 mt-2 fw-700 d-flex align-items-center gap-1" style={{ fontSize: "0.78rem" }} onClick={() => alert("Customer profile")}>
                        <span>View Customer Profile</span>
                        <i className="bi bi-box-arrow-up-right ms-1" style={{ fontSize: "0.7rem" }}></i>
                      </button>
                    </div>

                    {/* Destination */}
                    <div className="col-6 col-md-3">
                      <span className="text-secondary fw-600 d-block" style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>Destination</span>
                      <div className="d-flex align-items-center gap-2 mt-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={inquiry.destination.flag} alt="" className="rounded-1 border" style={{ width: 22, height: 14, objectFit: "cover" }} />
                        <span className="fw-800 text-dark" style={{ fontSize: "0.9rem" }}>{inquiry.destination.name}</span>
                      </div>
                      <div className="mt-2">
                        <span className="text-secondary fw-600 d-block" style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>Travel Date</span>
                        <div className="d-flex align-items-center gap-1 mt-1">
                          <i className="bi bi-calendar3 text-secondary" style={{ fontSize: "0.8rem" }}></i>
                          <span className="fw-700 text-dark" style={{ fontSize: "0.85rem" }}>{inquiry.travelDate}</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-secondary fw-600 d-block" style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>Priority</span>
                        <div className="d-flex align-items-center gap-1 mt-1">
                          <span className="rounded-circle" style={{ width: 8, height: 8, backgroundColor: priorityColor, display: "inline-block" }}></span>
                          <span className="fw-700 text-dark" style={{ fontSize: "0.85rem" }}>{inquiry.priority}</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-secondary fw-600 d-block" style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>Pax</span>
                        <div className="d-flex align-items-center gap-1 mt-1">
                          <i className="bi bi-people text-secondary" style={{ fontSize: "0.8rem" }}></i>
                          <span className="fw-700 text-dark" style={{ fontSize: "0.85rem" }}>{inquiry.pax}</span>
                        </div>
                      </div>
                    </div>

                    {/* Assigned To */}
                    <div className="col-6 col-md-3">
                      <span className="text-secondary fw-600 d-block" style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>Assigned To</span>
                      <div className="d-flex align-items-center gap-2 mt-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={inquiry.assignedTo.avatar} alt={inquiry.assignedTo.name} className="rounded-circle border" style={{ width: 36, height: 36, objectFit: "cover" }} />
                        <div>
                          <span className="fw-800 text-dark d-block" style={{ fontSize: "0.9rem", lineHeight: 1.2 }}>{inquiry.assignedTo.name}</span>
                          <span className="text-secondary" style={{ fontSize: "0.75rem" }}>{inquiry.assignedTo.email}</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-secondary fw-600 d-block" style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>Last Activity</span>
                        <span className="fw-700 text-dark d-block mt-1" style={{ fontSize: "0.85rem" }}>{inquiry.lastActivity}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tab navigation */}
                  <div className="border-bottom border-light d-flex flex-wrap gap-0 mb-0" style={{ marginBottom: "-1px" }}>
                    {tabs.map(tab => {
                      const isActive = activeTab === tab.name;
                      return (
                        <button
                          key={tab.name}
                          className="btn border-0 rounded-0 py-2 px-3 fw-700 d-flex align-items-center gap-1"
                          style={{
                            fontSize: "0.85rem",
                            color: isActive ? "#112E24" : "#677E75",
                            borderBottom: isActive ? "2.5px solid #112E24" : "none",
                            whiteSpace: "nowrap",
                          }}
                          onClick={() => setActiveTab(tab.name)}
                        >
                          <i className={`bi ${tab.icon}`} style={{ fontSize: "0.8rem" }}></i>
                          <span>{tab.name}</span>
                          {tab.count !== undefined && tab.count > 0 && (
                            <span className="badge bg-light text-secondary rounded-pill ms-1 fw-600" style={{ fontSize: "0.68rem" }}>{tab.count}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tab Content */}
                {activeTab === "Overview" && (
                  <div className="d-flex flex-column gap-3">

                    {/* Requirements + Traveler Details */}
                    <div className="row g-3">
                      {/* Inquiry Requirements */}
                      <div className="col-12 col-md-5">
                        <div className="section-card border border-light p-4 h-100">
                          <h3 className="fw-800 text-dark fs-6 mb-3">Inquiry Requirements</h3>
                          <div className="d-flex flex-column gap-2" style={{ fontSize: "0.85rem" }}>
                            {[
                              { label: "Trip Type", value: inquiry.requirements.tripType },
                              { label: "Budget", value: inquiry.requirements.budget },
                              { label: "Preferred Stay", value: inquiry.requirements.preferredStay },
                              { label: "Meal Preference", value: inquiry.requirements.mealPreference },
                              { label: "Special Requests", value: inquiry.requirements.specialRequests },
                              { label: "Additional Notes", value: inquiry.requirements.additionalNotes },
                            ].map(item => (
                              <div key={item.label}>
                                <span className="text-secondary fw-600 d-block" style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.4px" }}>{item.label}</span>
                                <span className="text-dark fw-600 d-block mt-1">{item.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Traveler Details + Destinations */}
                      <div className="col-12 col-md-7">
                        <div className="d-flex flex-column gap-3">

                          {/* Traveler Details */}
                          <div className="section-card border border-light p-4">
                            <h3 className="fw-800 text-dark fs-6 mb-3">Traveler Details</h3>
                            <div className="d-flex flex-column gap-3">
                              {inquiry.travelers.map(t => (
                                <div key={t.no} className="border border-light rounded-3 p-3 bg-light-subtle">
                                  <div className="d-flex align-items-center justify-content-between mb-2">
                                    <div className="d-flex align-items-center gap-2">
                                      <span className="rounded-circle d-flex align-items-center justify-content-center fw-800 text-white" style={{ width: 24, height: 24, backgroundColor: "#112E24", fontSize: "0.72rem" }}>{t.no}</span>
                                      <span className="fw-800 text-dark" style={{ fontSize: "0.88rem" }}>{t.name}</span>
                                      {t.role && <span className="badge rounded-2 px-2 py-1 fw-700" style={{ fontSize: "0.65rem", backgroundColor: "#E9F4EE", color: "#1E6C45" }}>{t.role}</span>}
                                    </div>
                                  </div>
                                  <div className="row g-2" style={{ fontSize: "0.78rem" }}>
                                    <div className="col-auto d-flex align-items-center gap-1 text-secondary fw-600">
                                      <i className="bi bi-gender-ambiguous"></i>
                                      <span>{t.gender}</span>
                                    </div>
                                    <div className="col-auto d-flex align-items-center gap-1 text-secondary fw-600">
                                      <i className="bi bi-calendar3"></i>
                                      <span>{t.age}</span>
                                    </div>
                                    <div className="col-auto d-flex align-items-center gap-1 text-secondary fw-600">
                                      <i className="bi bi-credit-card-2-front"></i>
                                      <span>Passport: {t.passport}</span>
                                    </div>
                                    <div className="col-auto d-flex align-items-center gap-1 text-secondary fw-600">
                                      <i className="bi bi-envelope"></i>
                                      <span>{t.email}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Preferred Destinations */}
                          <div className="section-card border border-light p-4">
                            <h3 className="fw-800 text-dark fs-6 mb-3">Preferred Destinations</h3>
                            <div className="d-flex flex-wrap gap-3 align-items-end">
                              <div className="position-relative rounded-3 overflow-hidden border" style={{ width: 120 }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={inquiry.destination.image} alt={inquiry.destination.name} style={{ width: "100%", height: 80, objectFit: "cover" }} />
                                <div className="p-2 bg-white">
                                  <span className="fw-700 text-dark d-block" style={{ fontSize: "0.78rem" }}>{inquiry.destination.name}</span>
                                  {inquiry.destination.isPrimary && (
                                    <span className="badge rounded-1 px-2 py-1 fw-700" style={{ fontSize: "0.62rem", backgroundColor: "#E9F4EE", color: "#1E6C45" }}>Primary Destination</span>
                                  )}
                                </div>
                              </div>
                              <button className="btn btn-light border border-light rounded-3 px-3 py-2 fw-700 d-flex align-items-center gap-1" style={{ fontSize: "0.82rem" }} onClick={() => alert("Add destination")}>
                                <i className="bi bi-plus-lg"></i>
                                <span>Add Destination</span>
                              </button>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                    {/* Itinerary Ideas */}
                    {inquiry.itineraryIdeas.length > 0 && (
                      <div className="section-card border border-light p-4">
                        <h3 className="fw-800 text-dark fs-6 mb-3">Itinerary Ideas ({inquiry.itineraryIdeas.length})</h3>
                        <div className="d-flex flex-wrap gap-3 align-items-end">
                          {inquiry.itineraryIdeas.map(it => (
                            <div key={it.id} className="border border-light rounded-3 overflow-hidden bg-white shadow-sm" style={{ width: 200 }}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={it.image} alt={it.title} style={{ width: "100%", height: 100, objectFit: "cover" }} />
                              <div className="p-3">
                                <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
                                  <span className="fw-800 text-dark" style={{ fontSize: "0.85rem" }}>{it.title}</span>
                                  {it.badge && (
                                    <span className="badge rounded-1 px-2 py-1 fw-700" style={{ fontSize: "0.6rem", backgroundColor: "#E9F4EE", color: "#1E6C45" }}>{it.badge}</span>
                                  )}
                                </div>
                                <span className="text-secondary fw-500 d-block" style={{ fontSize: "0.72rem" }}>{it.days} Days / {it.nights} Nights • {it.adults} Adults</span>
                                <span className="fw-800 text-dark d-block mt-1" style={{ fontSize: "1rem" }}>{it.price}</span>
                                <div className="d-flex gap-2 mt-2">
                                  <button className="btn btn-light border rounded-2 px-2 py-1 fw-700 flex-grow-1" style={{ fontSize: "0.75rem" }} onClick={() => router.push("/itineraries")}>
                                    View Itinerary
                                  </button>
                                  <button className="btn btn-light border rounded-2 px-2 py-1 text-secondary" style={{ fontSize: "0.75rem" }} aria-label="Preview">
                                    <i className="bi bi-eye"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                          <button className="btn btn-light border border-light rounded-3 px-4 py-3 fw-700 d-flex flex-column align-items-center gap-1" style={{ fontSize: "0.82rem", minWidth: 140, height: 160 }} onClick={() => alert("Create new itinerary")}>
                            <i className="bi bi-plus-circle fs-4 text-secondary"></i>
                            <span>Create New Itinerary</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {inquiry.itineraryIdeas.length === 0 && (
                      <div className="section-card border border-light p-4">
                        <h3 className="fw-800 text-dark fs-6 mb-3">Itinerary Ideas</h3>
                        <div className="text-center py-4 text-secondary">
                          <i className="bi bi-map fs-1 d-block mb-2 opacity-25"></i>
                          <span className="fw-600 d-block mb-3">No itinerary ideas yet</span>
                          <button className="btn text-white rounded-3 px-4 py-2 fw-700 d-inline-flex align-items-center gap-2" style={{ backgroundColor: "#112E24", fontSize: "0.85rem" }} onClick={() => alert("Create itinerary")}>
                            <i className="bi bi-plus-lg"></i>
                            Create New Itinerary
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                )}

                {/* Other tabs — placeholder content */}
                {activeTab !== "Overview" && (
                  <div className="section-card border border-light p-5 text-center text-secondary">
                    <i className="bi bi-tools fs-1 d-block mb-3 opacity-25"></i>
                    <h5 className="fw-700 text-dark">{activeTab} Section</h5>
                    <p className="mb-0">This section is under construction and will be available soon.</p>
                  </div>
                )}

                {/* Page Footer Action Bar */}
                <div className="section-card border border-light p-3 d-flex justify-content-between align-items-center gap-3 flex-wrap sticky-bottom">
                  <button
                    className="btn btn-light border border-light rounded-3 px-4 py-2 fw-700"
                    style={{ fontSize: "0.9rem" }}
                    onClick={() => router.push("/inquiries")}
                    id="btn-close-inquiry"
                  >
                    Close
                  </button>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-light border border-light rounded-3 px-4 py-2 fw-700 d-flex align-items-center gap-2"
                      style={{ fontSize: "0.9rem" }}
                      onClick={() => alert("Converted to Quote")}
                      id="btn-convert-to-quote"
                    >
                      <i className="bi bi-file-earmark-text"></i>
                      Convert to Quote
                    </button>
                    <button
                      className="btn text-white rounded-3 px-4 py-2 fw-700 d-flex align-items-center gap-2"
                      style={{ backgroundColor: "#112E24", fontSize: "0.9rem" }}
                      onClick={() => alert("Edit Inquiry")}
                      id="btn-edit-inquiry"
                    >
                      <i className="bi bi-pencil-fill"></i>
                      Edit Inquiry
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* ── RIGHT (col-4 on xl) ─────────────────────────────────────────── */}
            <div className="col-12 col-xl-4">
              <div className="d-flex flex-column gap-3">

                {/* Status card */}
                <div className="section-card border border-light p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="section-card-title">Status</h3>
                    <div className="d-flex align-items-center gap-2 border border-light rounded-3 px-2 bg-white" style={{ height: 34 }}>
                      <span className="rounded-circle" style={{ width: 8, height: 8, backgroundColor: st.color }}></span>
                      <select
                        className="form-select border-0 bg-transparent p-0 shadow-none fw-700 text-dark"
                        style={{ height: "auto", fontSize: "0.85rem", minWidth: 90 }}
                        value={currentStatus}
                        onChange={e => setCurrentStatus(e.target.value)}
                      >
                        {Object.keys(STATUS_STYLES).map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Pipeline Stage */}
                  <div className="mb-3">
                    <span className="text-secondary fw-600 d-block mb-2" style={{ fontSize: "0.78rem" }}>Pipeline Stage</span>
                    <div className="border border-light rounded-3 px-3 py-2 d-flex align-items-center justify-content-between bg-white" style={{ fontSize: "0.82rem", fontWeight: 600 }}>
                      <span className="text-dark">New Inquiries</span>
                      <i className="bi bi-chevron-down text-secondary" style={{ fontSize: "0.7rem" }}></i>
                    </div>
                  </div>

                  {/* Visual pipeline track */}
                  <div className="position-relative mt-3">
                    {/* Line */}
                    <div className="position-absolute" style={{ top: "10px", left: "10px", right: "10px", height: "2px", backgroundColor: "#E5E7EB", zIndex: 0 }}>
                      <div style={{ width: `${(pipelineIdx / (PIPELINE_STAGES.length - 1)) * 100}%`, height: "100%", backgroundColor: "#112E24" }}></div>
                    </div>
                    {/* Dots */}
                    <div className="d-flex justify-content-between position-relative" style={{ zIndex: 1 }}>
                      {PIPELINE_STAGES.map((stage, idx) => {
                        const isActive = idx === pipelineIdx;
                        const isPast = idx < pipelineIdx;
                        return (
                          <div key={stage} className="d-flex flex-column align-items-center" style={{ maxWidth: 60 }}>
                            <div className="rounded-circle border-2" style={{
                              width: 18, height: 18,
                              backgroundColor: isPast || isActive ? "#112E24" : "#E5E7EB",
                              border: isActive ? "3px solid #112E24" : "2px solid #E5E7EB",
                            }}></div>
                            <span className="text-center mt-1 fw-600" style={{ fontSize: "0.58rem", color: isActive ? "#112E24" : "#9CA3AF", lineHeight: 1.2 }}>
                              {stage}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="section-card border border-light p-4">
                  <h3 className="section-card-title mb-3">Tags</h3>
                  <div className="d-flex flex-wrap gap-2">
                    {inquiry.tags.map(tag => (
                      <span key={tag} className="badge rounded-2 px-3 py-2 fw-700" style={{ fontSize: "0.78rem", backgroundColor: "#F0F4F2", color: "#112E24" }}>
                        {tag}
                      </span>
                    ))}
                    {inquiry.tags.length === 0 && <span className="text-secondary fs-8">No tags added</span>}
                    <button className="btn btn-light border border-light rounded-2 px-2 py-1 text-secondary fw-700" style={{ fontSize: "0.75rem" }} onClick={() => alert("Add tag")}>
                      <i className="bi bi-plus-lg me-1"></i>Add
                    </button>
                  </div>
                </div>

                {/* Activity Timeline */}
                <div className="section-card border border-light p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="section-card-title">Activity Timeline</h3>
                  </div>

                  <div className="d-flex flex-column gap-3">
                    {inquiry.activities.map((act, i) => (
                      <div key={i} className="d-flex gap-3">
                        <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 28, height: 28, backgroundColor: act.bg }}>
                          <i className={`bi ${act.icon}`} style={{ fontSize: "0.78rem", color: act.color }}></i>
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-start gap-1">
                            <span className="fw-700 text-dark" style={{ fontSize: "0.82rem" }}>{act.text}</span>
                            <span className="text-secondary fw-500 flex-shrink-0" style={{ fontSize: "0.7rem" }}>{act.time}</span>
                          </div>
                          <span className="text-secondary fw-500 d-block" style={{ fontSize: "0.75rem" }}>by {act.by}</span>
                          {act.note && (
                            <div className="mt-2 p-2 rounded-2 border border-light bg-light-subtle" style={{ fontSize: "0.78rem", color: "#495057" }}>
                              {act.note}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="btn btn-light border border-light rounded-3 w-100 mt-3 py-2 fw-700 text-secondary" style={{ fontSize: "0.82rem" }} onClick={() => alert("View all activities")}>
                    View all activities
                  </button>
                </div>

                {/* Quick Summary */}
                <div className="section-card border border-light p-4">
                  <h3 className="section-card-title mb-3">Quick Summary</h3>
                  <div className="row g-2">
                    {[
                      { label: "Total Inquiries", value: inquiry.summary.totalInquiries },
                      { label: "Total Spent", value: inquiry.summary.totalSpent },
                      { label: "Total Quotes Sent", value: inquiry.summary.totalQuotesSent },
                      { label: "Last Booking", value: inquiry.summary.lastBooking },
                      { label: "Total Bookings", value: inquiry.summary.totalBookings },
                      { label: "Customer Since", value: inquiry.summary.customerSince },
                    ].map(item => (
                      <div key={item.label} className="col-6">
                        <span className="text-secondary fw-600 d-block" style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.4px" }}>{item.label}</span>
                        <span className="fw-800 text-dark d-block mt-1" style={{ fontSize: "0.9rem" }}>{item.value}</span>
                      </div>
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
  );
}
