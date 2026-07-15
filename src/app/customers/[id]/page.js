"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ─── Data store matching customers/page.js ─────────────────────────────────────
const CUSTOMER_DB = {
  "C-001": {
    id: "C-001", custId: "CUST-1024", name: "John Doe", badge: "VIP", status: "Active",
    addedOn: "18 May 2025", source: "Website",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
    stats: { totalBookings: 8, totalSpent: "$12,450", lastBooking: "18 May 2025", nextTrip: "20 Jun 2025" },
    info: {
      fullName: "John Doe", email: "john@example.com", phone: "+62 812 3456 7890",
      altEmail: "john.doe@mail.com", dob: "12 Feb 1988", gender: "Male",
      customerType: "Individual", country: "Indonesia", countryFlag: "https://flagcdn.com/w40/id.png",
      city: "Jakarta", preferredLanguage: "English", customerSince: "18 May 2025", statusLabel: "Active",
    },
    billing: { line1: "Jl. Sudirman No. 45", line2: "Jakarta Selatan 12190", line3: "Indonesia" },
    comms: { email: true, sms: true, whatsapp: true },
    notes: [
      { text: "Prefers 4-star hotels and needs airport pickup.", by: "Sarah Johnson", date: "18 May 2025" },
      { text: "Enjoys beach destinations and cultural tours.", by: "Michael Lee", date: "10 Apr 2025" },
      { text: "Requested vegetarian meal for upcoming trip.", by: "Sarah Johnson", date: "15 Mar 2025" },
    ],
    bookings: [
      { id: "BK-1256", dest: "Bali, Indonesia", dates: "20 Jun 2025 - 25 Jun 2025", travelers: "2 Adults", amount: "$2,450", status: "Confirmed" },
      { id: "BK-1132", dest: "Dubai, UAE", dates: "15 Apr 2025 - 20 Apr 2025", travelers: "2 Adults", amount: "$3,280", status: "Completed" },
      { id: "BK-0987", dest: "Singapore", dates: "10 Mar 2025 - 13 Mar 2025", travelers: "1 Adult", amount: "$1,120", status: "Completed" },
      { id: "BK-0876", dest: "Phuket, Thailand", dates: "05 Feb 2025 - 09 Feb 2025", travelers: "2 Adults", amount: "$2,180", status: "Completed" },
      { id: "BK-0765", dest: "Maldives", dates: "12 Jan 2025 - 16 Jan 2025", travelers: "2 Adults", amount: "$3,420", status: "Completed" },
    ],
    activities: [
      { icon: "bi-journal-bookmark-fill", bg: "#E9F4EE", color: "#1E6C45", title: "Booking created", detail: "Booking #BK-1256 to Bali, Indonesia", time: "18 May 2025, 10:30 AM" },
      { icon: "bi-file-earmark-text-fill", bg: "#ECEFFE", color: "#5D59E1", title: "Quotation sent", detail: "Quotation #QT-1256 sent", time: "18 May 2025, 09:15 AM" },
      { icon: "bi-credit-card-fill", bg: "#FEF7ED", color: "#B97C2B", title: "Payment received", detail: "Payment of $2,450 received", time: "17 May 2025, 06:20 PM" },
      { icon: "bi-map-fill", bg: "#F0F4F2", color: "#677E75", title: "Itinerary shared", detail: "Itinerary for Bali trip shared", time: "17 May 2025, 02:10 PM" },
      { icon: "bi-file-earmark-arrow-up-fill", bg: "#FDF0F0", color: "#D05E5E", title: "Document uploaded", detail: "Passport copy uploaded", time: "16 May 2025, 11:45 AM" },
    ],
    summary: { totalBookings: 8, totalSpent: "$12,450", avgBookingValue: "$1,556", lastBooking: "18 May 2025", nextTrip: "20 Jun 2025" },
    tags: ["VIP", "Frequent Traveler", "Beach Lover", "Family Trips"],
  },
  "C-002": {
    id: "C-002", custId: "CUST-1025", name: "Emma Watson", badge: "Premium", status: "Active",
    addedOn: "20 May 2025", source: "Referral",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&auto=format&fit=crop&q=80",
    stats: { totalBookings: 12, totalSpent: "$28,650", lastBooking: "20 May 2025", nextTrip: "15 Jul 2025" },
    info: {
      fullName: "Emma Watson", email: "emma@example.com", phone: "+971 50 123 4567",
      altEmail: "emma.watson@mail.com", dob: "15 Mar 1990", gender: "Female",
      customerType: "Family", country: "UAE", countryFlag: "https://flagcdn.com/w40/ae.png",
      city: "Dubai", preferredLanguage: "English", customerSince: "20 May 2025", statusLabel: "Active",
    },
    billing: { line1: "Downtown Dubai, Burj Khalifa District", line2: "Dubai 00000", line3: "United Arab Emirates" },
    comms: { email: true, sms: false, whatsapp: true },
    notes: [
      { text: "Prefers luxury resorts with private pool.", by: "Michael Lee", date: "20 May 2025" },
      { text: "Has dietary restrictions - vegetarian.", by: "Sarah Johnson", date: "10 May 2025" },
    ],
    bookings: [
      { id: "BK-1278", dest: "Maldives", dates: "15 Jul 2025 - 22 Jul 2025", travelers: "2 Adults, 2 Children", amount: "$5,890", status: "Confirmed" },
      { id: "BK-1198", dest: "Bali, Indonesia", dates: "20 May 2025 - 28 May 2025", travelers: "2 Adults", amount: "$3,460", status: "Completed" },
      { id: "BK-1102", dest: "Singapore", dates: "10 Mar 2025 - 14 Mar 2025", travelers: "2 Adults", amount: "$1,980", status: "Completed" },
    ],
    activities: [
      { icon: "bi-journal-bookmark-fill", bg: "#E9F4EE", color: "#1E6C45", title: "Booking created", detail: "Booking #BK-1278 to Maldives", time: "20 May 2025, 11:30 AM" },
      { icon: "bi-credit-card-fill", bg: "#FEF7ED", color: "#B97C2B", title: "Payment received", detail: "Payment of $5,890 received", time: "19 May 2025, 02:15 PM" },
    ],
    summary: { totalBookings: 12, totalSpent: "$28,650", avgBookingValue: "$2,388", lastBooking: "20 May 2025", nextTrip: "15 Jul 2025" },
    tags: ["Premium", "Luxury Traveler", "Family"],
  },
};

// Fallback
const createFallback = (id) => ({
  id, custId: id, name: "Customer", badge: null, status: "Active",
  addedOn: "—", source: "Website",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
  stats: { totalBookings: 0, totalSpent: "$0", lastBooking: "—", nextTrip: "—" },
  info: { fullName: "—", email: "—", phone: "—", altEmail: "—", dob: "—", gender: "—", customerType: "—", country: "—", countryFlag: "", city: "—", preferredLanguage: "English", customerSince: "—", statusLabel: "Active" },
  billing: { line1: "—", line2: "—", line3: "—" },
  comms: { email: false, sms: false, whatsapp: false },
  notes: [], bookings: [], activities: [],
  summary: { totalBookings: 0, totalSpent: "$0", avgBookingValue: "$0", lastBooking: "—", nextTrip: "—" },
  tags: [],
});

const BOOKING_STATUS = {
  Confirmed: { bg: "#E9F4EE", color: "#1E6C45" },
  Completed: { bg: "#E6F0FF", color: "#0A58CA" },
  Pending: { bg: "#FEF7ED", color: "#B97C2B" },
  Cancelled: { bg: "#FCEAEA", color: "#D05E5E" },
};

const TABS = ["Overview", "Bookings", "Itineraries", "Transactions", "Documents", "Notes"];

export default function CustomerDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const customer = CUSTOMER_DB[id] || createFallback(id);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const badgeStyle = customer.badge === "VIP"
    ? { bg: "#112E24", color: "#fff" }
    : customer.badge === "Premium"
      ? { bg: "#7C3AED", color: "#fff" }
      : null;

  const newCustomerButton = (
    <button
      className="btn text-white rounded-3 px-3 d-flex align-items-center gap-2"
      style={{ backgroundColor: "#112E24", height: "42px", fontWeight: "600" }}
      id="btn-new-customer-detail"
    >
      <i className="bi bi-plus-lg fs-6"></i>
      <span>New Customer</span>
      <i className="bi bi-chevron-down ms-1" style={{ fontSize: "0.75rem" }}></i>
    </button>
  );

  return (
    <>
      <style>{`
        .cust-detail-stat { border: 1px solid var(--border); border-radius: 14px; background: #fff; padding: 1.25rem 1.5rem; display: flex; align-items: center; gap: 1rem; }
        .cust-detail-stat-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; }
        .cust-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem 2rem; }
        .cust-info-item label { font-size: 0.72rem; font-weight: 700; color: var(--secondary); text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 3px; }
        .cust-info-item span { font-size: 0.88rem; font-weight: 600; color: var(--dark); }
        .cust-tab-btn { background: none; border: none; border-bottom: 2.5px solid transparent; padding: 0.6rem 1rem; font-size: 0.88rem; font-weight: 700; color: var(--secondary); cursor: pointer; white-space: nowrap; transition: color 0.15s; }
        .cust-tab-btn.active { color: #112E24; border-bottom-color: #112E24; }
        .cust-tab-btn:hover:not(.active) { color: var(--dark); }
        .cust-activity-line { position: relative; padding-left: 2.2rem; }
        .cust-activity-line::before { content: ''; position: absolute; left: 14px; top: 32px; bottom: -12px; width: 1.5px; background: var(--border); }
        .cust-activity-line:last-child::before { display: none; }
        @media (max-width: 767.98px) { .cust-info-grid { grid-template-columns: 1fr; } }
        @media (max-width: 991.98px) { .cust-detail-right { margin-top: 1rem; } }
      `}</style>

      <div className="d-flex position-relative">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="app-container w-100 min-vh-100 d-flex flex-column justify-content-between">
          <Header
            toggleSidebar={toggleSidebar}
            hideWelcome={true}
            forcePageHeaderLayout={true}
            searchPlaceholder="Search inquiries, customers, bookings, quotations..."
            actionButton={newCustomerButton}
          />

          <main className="main-content d-flex flex-column gap-3 py-4">

            {/* Breadcrumb */}
            <div>
              <span className="text-secondary fs-7 fw-500">Home &gt; CRM &gt; Customers &gt; {customer.custId}</span>
            </div>

            {/* Page title + action buttons */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-start gap-3">
              <div>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <button
                    className="btn btn-light border border-light rounded-3 p-2 me-1"
                    style={{ width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center" }}
                    onClick={() => router.push("/customers")}
                    aria-label="Back"
                  >
                    <i className="bi bi-arrow-left" style={{ fontSize: "0.9rem" }}></i>
                  </button>
                  <h1 className="fw-800 text-dark m-0 fs-3">{customer.name}</h1>
                  <span className="badge rounded-2 px-2 py-1 fw-700" style={{ fontSize: "0.75rem", backgroundColor: "#E9F4EE", color: "#1E6C45" }}>
                    {customer.status}
                  </span>
                  {badgeStyle && (
                    <span className="badge rounded-2 px-2 py-1 fw-700" style={{ fontSize: "0.72rem", backgroundColor: badgeStyle.bg, color: badgeStyle.color }}>
                      {customer.badge}
                    </span>
                  )}
                </div>
                <div className="d-flex align-items-center gap-2 mt-1 flex-wrap">
                  <span className="text-secondary fs-8 fw-600">Customer ID: {customer.custId}</span>
                  <span className="text-secondary fs-9">•</span>
                  <span className="text-secondary fs-8 fw-600">Added on {customer.addedOn}</span>
                  <span className="text-secondary fs-9">•</span>
                  <span className="text-secondary fs-8 fw-600">Source: {customer.source}</span>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <button className="btn btn-light border border-light rounded-3 px-3 py-2 fw-700 d-flex align-items-center gap-1" style={{ fontSize: "0.85rem" }}>
                  <i className="bi bi-pencil text-secondary"></i> Edit
                </button>
                <button className="btn btn-light border border-light rounded-3 px-3 py-2 fw-700 d-flex align-items-center gap-1" style={{ fontSize: "0.85rem" }}>
                  More Actions <i className="bi bi-chevron-down ms-1" style={{ fontSize: "0.7rem" }}></i>
                </button>
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

            {/* Stats row */}
            <div className="row g-3">
              {[
                { label: "Total Bookings", value: customer.stats.totalBookings, icon: "bi-suitcase-lg", iconBg: "#ECEFFE", iconColor: "#5D59E1", link: "View Bookings" },
                { label: "Total Spent", value: customer.stats.totalSpent, icon: "bi-currency-dollar", iconBg: "#E9F4EE", iconColor: "#1E6C45", link: "View Transactions" },
                { label: "Last Booking", value: customer.stats.lastBooking, icon: "bi-calendar-check", iconBg: "#FEF7ED", iconColor: "#B97C2B", link: "View Booking" },
                { label: "Next Trip", value: customer.stats.nextTrip, icon: "bi-airplane", iconBg: "#FFF1F0", iconColor: "#DC2626", link: "View Itinerary" },
              ].map(s => (
                <div key={s.label} className="col-6 col-lg-3">
                  <div className="cust-detail-stat">
                    <div className="cust-detail-stat-icon" style={{ backgroundColor: s.iconBg, color: s.iconColor }}>
                      <i className={`bi ${s.icon}`}></i>
                    </div>
                    <div>
                      <span className="text-secondary fw-600 d-block" style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>{s.label}</span>
                      <span className="fw-800 text-dark d-block" style={{ fontSize: "1.05rem", lineHeight: 1.2 }}>{s.value}</span>
                      <a href="#" className="section-card-link fw-700" style={{ fontSize: "0.72rem" }} onClick={e => e.preventDefault()}>{s.link}</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Main 2-column layout */}
            <div className="row g-3">

              {/* LEFT */}
              <div className="col-12 col-xl-8">
                <div className="d-flex flex-column gap-3">

                  {/* Tab header */}
                  <div className="section-card border border-light px-4 pt-2 pb-0">
                    <div className="d-flex overflow-x-auto" style={{ scrollbarWidth: "none", borderBottom: "1px solid var(--border)", gap: 0 }}>
                      {TABS.map(tab => (
                        <button
                          key={tab}
                          className={`cust-tab-btn ${activeTab === tab ? "active" : ""}`}
                          onClick={() => setActiveTab(tab)}
                        >
                          {tab}
                          {tab === "Bookings" && <span className="badge bg-light text-secondary rounded-pill ms-1 fw-600" style={{ fontSize: "0.62rem" }}>{customer.stats.totalBookings}</span>}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Overview Tab */}
                  {activeTab === "Overview" && (
                    <>
                      {/* Customer Information */}
                      <div className="section-card border border-light p-4">
                        <h3 className="fw-800 text-dark fs-6 mb-4">Customer Information</h3>
                        <div className="row g-0">
                          <div className="col-12 col-md-6 pe-md-4 border-end-md">
                            <div className="d-flex flex-column gap-3" style={{ fontSize: "0.85rem" }}>
                              {[
                                { label: "Full Name", value: customer.info.fullName },
                                { label: "Email", value: customer.info.email },
                                { label: "Phone", value: <><span>{customer.info.phone}</span> <i className="bi bi-whatsapp text-success ms-1"></i></> },
                                { label: "Alternate Email", value: customer.info.altEmail },
                                { label: "Date of Birth", value: customer.info.dob },
                                { label: "Gender", value: customer.info.gender },
                              ].map(f => (
                                <div key={f.label} className="d-flex gap-2">
                                  <span className="text-secondary fw-600 flex-shrink-0" style={{ minWidth: 130, fontSize: "0.82rem" }}>{f.label}</span>
                                  <span className="fw-600 text-dark">{f.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="col-12 col-md-6 ps-md-4 mt-3 mt-md-0">
                            <div className="d-flex flex-column gap-3" style={{ fontSize: "0.85rem" }}>
                              {[
                                { label: "Customer Type", value: customer.info.customerType },
                                { label: "Country", value: <><img src={customer.info.countryFlag} alt="" className="rounded-1 me-1" style={{ width: 18, height: 12, objectFit: "cover", verticalAlign: "middle" }} />{customer.info.country}</> },
                                { label: "City", value: customer.info.city },
                                { label: "Preferred Language", value: customer.info.preferredLanguage },
                                { label: "Customer Since", value: customer.info.customerSince },
                                { label: "Status", value: <span className="badge rounded-2 px-2 py-1 fw-700" style={{ fontSize: "0.72rem", backgroundColor: "#E9F4EE", color: "#1E6C45" }}>{customer.info.statusLabel}</span> },
                              ].map(f => (
                                <div key={f.label} className="d-flex gap-2">
                                  <span className="text-secondary fw-600 flex-shrink-0" style={{ minWidth: 130, fontSize: "0.82rem" }}>{f.label}</span>
                                  <span className="fw-600 text-dark">{f.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Billing Address + Comms Preferences */}
                      <div className="row g-3">
                        <div className="col-12 col-md-6">
                          <div className="section-card border border-light p-4 h-100">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <h3 className="fw-800 text-dark fs-6 m-0">Billing Address</h3>
                              <button className="btn btn-light border border-light rounded-2 px-2 py-1 fw-700 d-flex align-items-center gap-1" style={{ fontSize: "0.75rem" }}>
                                <i className="bi bi-pencil" style={{ fontSize: "0.7rem" }}></i> Edit
                              </button>
                            </div>
                            <p className="text-dark fw-600 mb-0" style={{ fontSize: "0.88rem", lineHeight: 2 }}>
                              {customer.billing.line1}<br />
                              {customer.billing.line2}<br />
                              {customer.billing.line3}
                            </p>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="section-card border border-light p-4 h-100">
                            <h3 className="fw-800 text-dark fs-6 mb-3">Communication Preferences</h3>
                            <div className="d-flex flex-column gap-2" style={{ fontSize: "0.85rem" }}>
                              {[
                                { label: "Email Notifications", enabled: customer.comms.email },
                                { label: "SMS Notifications", enabled: customer.comms.sms },
                                { label: "WhatsApp Notifications", enabled: customer.comms.whatsapp },
                              ].map(c => (
                                <div key={c.label} className="d-flex justify-content-between align-items-center">
                                  <span className="text-secondary fw-600">{c.label}</span>
                                  <span className="fw-700" style={{ color: c.enabled ? "#1E6C45" : "#D05E5E" }}>{c.enabled ? "Yes" : "No"}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Recent Bookings */}
                      <div className="section-card border border-light p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h3 className="fw-800 text-dark fs-6 m-0">Recent Bookings</h3>
                          <a href="#" className="section-card-link fw-700" style={{ fontSize: "0.82rem" }} onClick={e => { e.preventDefault(); setActiveTab("Bookings"); }}>View All Bookings</a>
                        </div>
                        <div className="table-responsive">
                          <table className="table table-hover align-middle mb-0" style={{ fontSize: "0.82rem" }}>
                            <thead>
                              <tr className="border-bottom border-light">
                                {["Booking ID", "Destination", "Travel Dates", "Travelers", "Amount", "Status"].map(h => (
                                  <th key={h} className="lablename pb-3" style={{ textTransform: "uppercase", whiteSpace: "nowrap", fontSize: "0.68rem" }}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {customer.bookings.slice(0, 5).map(b => {
                                const bs = BOOKING_STATUS[b.status] || { bg: "#F3F4F6", color: "#6B7280" };
                                return (
                                  <tr key={b.id} className="border-bottom border-light">
                                    <td className="fw-700" style={{ color: "#1E6C45", padding: "0.75rem 0.5rem" }}>{b.id}</td>
                                    <td className="fw-600 text-dark" style={{ padding: "0.75rem 0.5rem" }}>{b.dest}</td>
                                    <td className="text-secondary fw-500" style={{ padding: "0.75rem 0.5rem", whiteSpace: "nowrap" }}>{b.dates}</td>
                                    <td className="text-secondary fw-500" style={{ padding: "0.75rem 0.5rem" }}>{b.travelers}</td>
                                    <td className="fw-700 text-dark" style={{ padding: "0.75rem 0.5rem" }}>{b.amount}</td>
                                    <td style={{ padding: "0.75rem 0.5rem" }}>
                                      <span className="badge rounded-2 px-2 py-1 fw-700" style={{ fontSize: "0.72rem", backgroundColor: bs.bg, color: bs.color }}>{b.status}</span>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                        <div className="text-center mt-3">
                          <button className="btn btn-light border border-light rounded-3 px-4 py-2 fw-700 d-inline-flex align-items-center gap-1" style={{ fontSize: "0.82rem" }} onClick={() => setActiveTab("Bookings")}>
                            View All Bookings <i className="bi bi-arrow-right"></i>
                          </button>
                        </div>
                      </div>

                      {/* Customer Notes */}
                      <div className="section-card border border-light p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h3 className="fw-800 text-dark fs-6 m-0">Customer Notes</h3>
                          <button className="btn btn-light border border-light rounded-2 px-2 py-1 fw-700 d-flex align-items-center gap-1" style={{ fontSize: "0.75rem" }}>
                            <i className="bi bi-plus-lg" style={{ fontSize: "0.7rem" }}></i> Add Note
                          </button>
                        </div>
                        <div className="d-flex flex-column gap-3">
                          {customer.notes.map((n, i) => (
                            <div key={i} className="p-3 rounded-3 border border-light bg-light-subtle">
                              <p className="fw-600 text-dark mb-1" style={{ fontSize: "0.85rem" }}>{n.text}</p>
                              <span className="text-secondary fw-500" style={{ fontSize: "0.72rem" }}>Added by {n.by} on {n.date}</span>
                            </div>
                          ))}
                        </div>
                        <div className="text-center mt-3">
                          <button className="btn btn-light border border-light rounded-3 px-4 py-2 fw-700" style={{ fontSize: "0.82rem" }}>View All Notes</button>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Other tabs placeholder */}
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
              <div className="col-12 col-xl-4 cust-detail-right">
                <div className="d-flex flex-column gap-3">

                  {/* Activity Timeline */}
                  <div className="section-card border border-light p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h3 className="section-card-title">Activity Timeline</h3>
                      <a href="#" className="section-card-link" onClick={e => e.preventDefault()}>View All</a>
                    </div>
                    <div className="d-flex flex-column" style={{ gap: "1.1rem" }}>
                      {customer.activities.map((a, i) => (
                        <div key={i} className="cust-activity-line d-flex gap-2">
                          <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 position-absolute" style={{ left: 0, top: 0, width: 28, height: 28, backgroundColor: a.bg }}>
                            <i className={`bi ${a.icon}`} style={{ fontSize: "0.75rem", color: a.color }}></i>
                          </div>
                          <div>
                            <span className="fw-700 text-dark d-block" style={{ fontSize: "0.82rem" }}>{a.title}</span>
                            <span className="text-secondary fw-500 d-block" style={{ fontSize: "0.75rem" }}>{a.detail}</span>
                            <span className="text-secondary opacity-75 fw-500" style={{ fontSize: "0.7rem" }}>{a.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer Summary */}
                  <div className="section-card border border-light p-4">
                    <h3 className="section-card-title mb-3">Customer Summary</h3>
                    <div className="d-flex flex-column gap-2" style={{ fontSize: "0.82rem" }}>
                      {[
                        { icon: "bi-suitcase-lg", label: "Total Bookings", value: customer.summary.totalBookings },
                        { icon: "bi-currency-dollar", label: "Total Spent", value: customer.summary.totalSpent },
                        { icon: "bi-graph-up", label: "Average Booking Value", value: customer.summary.avgBookingValue },
                        { icon: "bi-calendar-check", label: "Last Booking", value: customer.summary.lastBooking },
                        { icon: "bi-airplane", label: "Next Trip", value: customer.summary.nextTrip },
                      ].map(s => (
                        <div key={s.label} className="d-flex align-items-center justify-content-between py-1 border-bottom border-light">
                          <div className="d-flex align-items-center gap-2 text-secondary">
                            <i className={`bi ${s.icon}`} style={{ fontSize: "0.82rem", width: 16 }}></i>
                            <span className="fw-600">{s.label}</span>
                          </div>
                          <span className="fw-700 text-dark">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="section-card border border-light p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h3 className="section-card-title">Tags</h3>
                      <a href="#" className="section-card-link" onClick={e => e.preventDefault()}>Edit</a>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      {customer.tags.map((tag, i) => {
                        const colors = ["#E9F4EE:#1E6C45", "#ECEFFE:#5D59E1", "#FEF7ED:#B97C2B", "#FDF0F0:#D05E5E"];
                        const [bg, color] = colors[i % colors.length].split(":");
                        return (
                          <span key={tag} className="badge rounded-2 px-3 py-2 fw-700" style={{ fontSize: "0.78rem", backgroundColor: bg, color }}>{tag}</span>
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
    </>
  );
}
