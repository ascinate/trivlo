"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { agencyApi } from "@/lib/api";
import COUNTRY_CODES from "@/lib/countryCodes";

function getFlagUrl(countryName) {
  if (!countryName) return null;
  const found = COUNTRY_CODES.find(c => c.country.toLowerCase() === countryName.toLowerCase());
  return found ? `https://flagcdn.com/w40/${found.iso}.png` : null;
}

const TABS = ["Overview", "Bookings", "Itineraries", "Transactions", "Documents", "Notes"];

export default function CustomerDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const fetchCustomer = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await agencyApi.customers.get(id);
      setApiData(res.data || null);
    } catch (err) {
      console.error("Failed to fetch customer details:", err);
      setError("Customer profile not found.");
      setApiData(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCustomer();
  }, [fetchCustomer]);

  const customer = useMemo(() => {
    if (!apiData) return null;

    const flagUrl = getFlagUrl(apiData.country);
    const formattedPhone = apiData.phone_code ? `${apiData.phone_code} ${apiData.phone}` : apiData.phone;
    const createdDate = apiData.created_at ? new Date(apiData.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
    const dobFormatted = apiData.date_of_birth ? new Date(apiData.date_of_birth).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
    const sinceFormatted = apiData.customer_since ? new Date(apiData.customer_since).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : createdDate;

    return {
      id: apiData.id,
      code: apiData.customer_code || `C-${apiData.id}`,
      name: apiData.full_name,
      email: apiData.email,
      phone: formattedPhone,
      altEmail: apiData.alt_email || "—",
      badge: apiData.badge || null,
      status: apiData.status ? (apiData.status.charAt(0).toUpperCase() + apiData.status.slice(1)) : "Active",
      addedOn: createdDate,
      source: apiData.source || "Website",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
      gender: apiData.gender ? (apiData.gender.charAt(0).toUpperCase() + apiData.gender.slice(1)) : "—",
      dob: dobFormatted,
      customerType: apiData.customer_type || "Individual",
      country: apiData.country || "—",
      countryFlag: flagUrl,
      city: apiData.city || "—",
      address: apiData.address || "—",
      postalCode: apiData.postal_code || "—",
      preferredLanguage: apiData.preferred_language || "English",
      customerSince: sinceFormatted,
      referredBy: apiData.referred_by || "—",
      comms: {
        email: !!apiData.email_notifications,
        sms: !!apiData.sms_notifications,
        whatsapp: !!apiData.whatsapp_notifications,
      },
      notes: apiData.notes ? [
        { text: apiData.notes, by: apiData.creator?.name || "System User", date: createdDate }
      ] : [],
      travelType: apiData.travel_type || "—",
      budgetRange: apiData.budget_range || "—",
      specialRequests: apiData.special_requests || "—",
      tags: Array.isArray(apiData.tags) ? apiData.tags : [],
      bookings: [],
      activities: [
        { icon: "bi-person-plus-fill", bg: "#E9F4EE", color: "#1E6C45", title: "Customer created", detail: `Profile created by ${apiData.creator?.name || 'System'}`, time: createdDate }
      ],
      stats: {
        totalBookings: 0,
        totalSpent: "$0",
        lastBooking: "—",
        nextTrip: "—"
      }
    };
  }, [apiData]);

  const badgeStyle = customer?.badge === "VIP"
    ? { bg: "#112E24", color: "#fff" }
    : customer?.badge === "Premium"
      ? { bg: "#7C3AED", color: "#fff" }
      : null;

  const newCustomerButton = (
    <button
      className="btn text-white rounded-3 px-3 d-flex align-items-center gap-2"
      style={{ backgroundColor: "#112E24", height: "42px", fontWeight: "400" }}
      onClick={() => router.push("/customers/new")}
    >
      <i className="bi bi-plus-lg fs-6"></i>
      <span>New Customer</span>
    </button>
  );

  return (
    <ProtectedRoute>
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
            title="Customers Details"
            subtitle="Home > CRM > Customers > Customers Details"
            forcePageHeaderLayout={true}
            searchPlaceholder="Search inquiries, customers, bookings..."
            actionButton={newCustomerButton}
          />

          <main className="main-content d-flex flex-column gap-3 py-4 p-3 p-lg-4 flex-grow-1">

            {loading ? (
              <div className="text-center py-5 my-5">
                <div className="spinner-border text-success" role="status" style={{ width: "2.5rem", height: "2.5rem" }}>
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="text-secondary fs-8 mt-3 fw-500">Loading customer profile...</div>
              </div>
            ) : error || !customer ? (
              <div className="text-center py-5 my-5 bg-white border rounded-4 p-5">
                <i className="bi bi-exclamation-circle text-danger fs-1 d-block mb-3"></i>
                <h3 className="fw-800 text-dark fs-5">{error || "Customer Not Found"}</h3>
                <p className="text-secondary fs-8 mb-4">The customer profile you are looking for does not exist or was removed.</p>
                <button className="btn text-white rounded-3 px-4 fw-600" style={{ backgroundColor: "#112E24" }} onClick={() => router.push("/customers")}>
                  Back to Customers List
                </button>
              </div>
            ) : (
              <>
                {/* Breadcrumb */}
                <div>
                  <span className="text-secondary fs-7 fw-500">Home &gt; CRM &gt; Customers &gt; {customer.code}</span>
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
                      <span className="text-secondary fs-8 fw-600">Customer Code: {customer.code}</span>
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
                  </div>
                </div>

                {/* Stats row */}
                <div className="row g-3">
                  {[
                    { label: "Total Bookings", value: customer.stats.totalBookings, icon: "bi-suitcase-lg", iconBg: "#ECEFFE", iconColor: "#5D59E1" },
                    { label: "Total Spent", value: customer.stats.totalSpent, icon: "bi-currency-dollar", iconBg: "#E9F4EE", iconColor: "#1E6C45" },
                    { label: "Last Booking", value: customer.stats.lastBooking, icon: "bi-calendar-check", iconBg: "#FEF7ED", iconColor: "#B97C2B" },
                    { label: "Next Trip", value: customer.stats.nextTrip, icon: "bi-airplane", iconBg: "#FFF1F0", iconColor: "#DC2626" },
                  ].map(s => (
                    <div key={s.label} className="col-6 col-lg-3">
                      <div className="cust-detail-stat">
                        <div className="cust-detail-stat-icon" style={{ backgroundColor: s.iconBg, color: s.iconColor }}>
                          <i className={`bi ${s.icon}`}></i>
                        </div>
                        <div>
                          <span className="text-secondary fw-600 d-block" style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>{s.label}</span>
                          <span className="fw-800 text-dark d-block" style={{ fontSize: "1.05rem", lineHeight: 1.2 }}>{s.value}</span>
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
                              {tab === "Bookings" && <span className="badge bg-light text-secondary rounded-pill ms-1 fw-600" style={{ fontSize: "0.62rem" }}>0</span>}
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
                                    { label: "Full Name", value: customer.name },
                                    { label: "Email", value: customer.email },
                                    { label: "Phone", value: <><span>{customer.phone}</span> <i className="bi bi-whatsapp text-success ms-1"></i></> },
                                    { label: "Alternate Email", value: customer.altEmail },
                                    { label: "Date of Birth", value: customer.dob },
                                    { label: "Gender", value: customer.gender },
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
                                    { label: "Customer Type", value: customer.customerType },
                                    { label: "Country", value: <>{customer.countryFlag && <img src={customer.countryFlag} alt="" className="rounded-1 me-1" style={{ width: 18, height: 12, objectFit: "cover", verticalAlign: "middle" }} />}{customer.country}</> },
                                    { label: "City", value: customer.city },
                                    { label: "Preferred Language", value: customer.preferredLanguage },
                                    { label: "Customer Since", value: customer.customerSince },
                                    { label: "Status", value: <span className="badge rounded-2 px-2 py-1 fw-700" style={{ fontSize: "0.72rem", backgroundColor: "#E9F4EE", color: "#1E6C45" }}>{customer.status}</span> },
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

                          {/* Address + Comms Preferences */}
                          <div className="row g-3">
                            <div className="col-12 col-md-6">
                              <div className="section-card border border-light p-4 h-100">
                                <h3 className="fw-800 text-dark fs-6 mb-3">Address & Location</h3>
                                <p className="text-dark fw-600 mb-0" style={{ fontSize: "0.88rem", lineHeight: 2 }}>
                                  {customer.address}<br />
                                  {customer.city} {customer.postalCode}<br />
                                  {customer.country}
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

                          {/* Travel Preferences */}
                          <div className="section-card border border-light p-4">
                            <h3 className="fw-800 text-dark fs-6 mb-3">Travel Preferences & Notes</h3>
                            <div className="row g-3" style={{ fontSize: "0.85rem" }}>
                              <div className="col-12 col-md-4">
                                <span className="text-secondary fw-600 d-block fs-8 mb-1">TRAVEL TYPE</span>
                                <span className="fw-700 text-dark">{customer.travelType}</span>
                              </div>
                              <div className="col-12 col-md-4">
                                <span className="text-secondary fw-600 d-block fs-8 mb-1">BUDGET RANGE</span>
                                <span className="fw-700 text-dark">{customer.budgetRange}</span>
                              </div>
                              <div className="col-12 col-md-4">
                                <span className="text-secondary fw-600 d-block fs-8 mb-1">REFERRED BY</span>
                                <span className="fw-700 text-dark">{customer.referredBy}</span>
                              </div>
                              {customer.specialRequests !== "—" && (
                                <div className="col-12 mt-3">
                                  <span className="text-secondary fw-600 d-block fs-8 mb-1">SPECIAL REQUESTS</span>
                                  <p className="fw-500 text-dark mb-0 bg-light p-3 rounded-3">{customer.specialRequests}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      )}

                      {activeTab !== "Overview" && (
                        <div className="section-card border border-light p-5 text-center text-secondary">
                          <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                          <div className="fw-600">No {activeTab.toLowerCase()} records yet for this customer.</div>
                        </div>
                      )}

                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="col-12 col-xl-4 cust-detail-right">
                    <div className="d-flex flex-column gap-3">

                      {/* Customer Card */}
                      <div className="section-card border border-light p-4 text-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={customer.avatar} alt={customer.name} className="rounded-circle border mb-3" style={{ width: 80, height: 80, objectFit: "cover" }} />
                        <h2 className="fw-800 text-dark fs-5 m-0">{customer.name}</h2>
                        <span className="text-secondary fs-8 fw-500 d-block mt-1">{customer.email}</span>

                        {customer.tags.length > 0 && (
                          <div className="d-flex flex-wrap gap-1 justify-content-center mt-3">
                            {customer.tags.map(t => (
                              <span key={t} className="badge bg-light text-dark border px-2 py-1 rounded-2 fw-600" style={{ fontSize: "0.72rem" }}>{t}</span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Recent Activity */}
                      <div className="section-card border border-light p-4">
                        <h3 className="fw-800 text-dark fs-6 mb-3">Activity Log</h3>
                        <div className="d-flex flex-column gap-3">
                          {customer.activities.map((act, idx) => (
                            <div key={idx} className="cust-activity-line">
                              <div className="d-flex align-items-center gap-2 mb-1">
                                <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 26, height: 26, backgroundColor: act.bg, position: "absolute", left: 0 }}>
                                  <i className={`bi ${act.icon}`} style={{ fontSize: "0.72rem", color: act.color }}></i>
                                </div>
                                <span className="fw-700 text-dark fs-8">{act.title}</span>
                              </div>
                              <p className="m-0 text-secondary fs-8 fw-500">{act.detail}</p>
                              <span className="text-secondary opacity-75 fs-9">{act.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </>
            )}

          </main>

          <Footer />
        </div>

        {sidebarOpen && (
          <div className="position-fixed top-0 start-0 w-100 h-100 d-lg-none" style={{ backgroundColor: "rgba(0,0,0,0.4)", zIndex: 995 }} onClick={toggleSidebar}></div>
        )}
      </div>
    </ProtectedRoute>
  );
}
