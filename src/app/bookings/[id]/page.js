"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BookingConfirmedPage() {
  const router = useRouter();
  const params = useParams();
  const bookingId = params.id || "BK-1256";

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Booking Overview");
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Mock booking data matching the design screenshot
  const booking = {
    id: bookingId,
    status: "Confirmed",
    createdOn: "18 May 2025, 10:30 AM",
    tripType: "Leisure Trip",
    destination: "Bali, Indonesia",
    travelDates: "20 Jun 2025 - 25 Jun 2025",
    duration: "5 Days / 4 Nights",
    travelers: "2 Adults",
    class: "Economy",
    salesExecutive: "Sarah Johnson",
    bookingStatus: "Confirmed",
    baseAmount: 12450.00,
    discount: 500.00,
    tax: 0.00,
    totalAmount: 11950.00,
    amountPaid: 11950.00,
    balance: 0.00,
    customer: {
      name: "John Doe",
      initials: "JD",
      email: "john.doe@gmail.com",
      phone: "+62 812 3456 7890",
      location: "Indonesia",
    },
    payment: {
      method: "Bank Transfer",
      status: "Paid",
      amountPaid: 11950.00,
      paidOn: "18 May 2025, 11:15 AM",
      transactionId: "TRX-54879-2025",
    },
    travelersList: [
      {
        id: 1,
        title: "Mr.",
        firstName: "John",
        lastName: "Doe",
        isLead: true,
        passport: "C1234567",
        nationality: "Indonesia",
        email: "john.doe@gmail.com",
        phone: "+62 812 3456 7890",
      },
      {
        id: 2,
        title: "Mrs.",
        firstName: "Jane",
        lastName: "Doe",
        isLead: false,
        passport: "C7654321",
        nationality: "Indonesia",
        email: "jane.doe@gmail.com",
        phone: "+62 812 9876 5432",
      },
    ],
    services: [
      {
        type: "Flights",
        icon: "bi-airplane-fill",
        description: "DPS (Bali) ✈ DXB (Dubai)",
        details: "20 Jun 2025 - 25 Jun 2025 | 2 Adults, Economy",
        amount: 2430.00,
      },
      {
        type: "Hotels",
        icon: "bi-house-door-fill",
        description: "Deluxe Sea View | 1 Room, 4 Nights",
        details: "20 Jun 2025 - 24 Jun 2025",
        amount: 820.00,
      },
      {
        type: "Transfers",
        icon: "bi-car-front-fill",
        description: "Airport Transfer (DXB) - Private",
        details: "25 Jun 2025",
        amount: 120.00,
      },
    ],
    specialRequests: "Sea view room preferred, near beach location.",
    bookingNotes: "Customer prefers luxury resorts and private transfers.",
    tags: ["VIP", "Frequent Traveler", "Family Trip"],
  };

  const tabs = ["Booking Overview", "Itinerary", "Documents", "Payments", "History", "Notes"];

  const actionButton = (
    <button
      className="btn text-white rounded-3 px-3 d-flex align-items-center gap-2"
      style={{ backgroundColor: "#112E24", height: "42px", fontWeight: "400" }}
      onClick={() => router.push("/bookings/new")}
    >
      <i className="bi bi-plus-lg fs-6"></i>
      <span>New Booking</span>
      <i className="bi bi-chevron-down ms-1" style={{ fontSize: "0.75rem" }}></i>
    </button>
  );

  return (
    <>
      <style>{`
        /* Booking Confirmed Page Styles */
        .confirmed-header { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .confirmed-checkmark { width: 36px; height: 36px; border-radius: 50%; background-color: #E9F4EE; color: #1E6C45; display: flex; align-items: center; justify-content: center; font-size: 1.15rem; flex-shrink: 0; }
        .confirmed-badge { background-color: #E9F4EE; color: #1E6C45; font-size: 0.72rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 6px; }
        .confirmed-meta { font-size: 0.78rem; color: var(--secondary); font-weight: 500; }
        .confirmed-meta strong { font-weight: 600; color: var(--dark); }

        .booking-detail-tab { background: none; border: none; border-bottom: 2.5px solid transparent; padding: 0.6rem 1rem; font-size: 0.88rem; font-weight: 700; color: var(--secondary); cursor: pointer; white-space: nowrap; transition: color 0.15s; }
        .booking-detail-tab.active { color: #112E24; border-bottom-color: #112E24; }
        .booking-detail-tab:hover:not(.active) { color: var(--dark); }

        .detail-section-icon { width: 36px; height: 36px; border-radius: 50%; background-color: #E9F4EE; color: #1E6C45; display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }
        .detail-section-title { display: flex; align-items: center; gap: 0.75rem; font-size: 1rem; font-weight: 700; color: var(--dark); margin: 0; }

        .detail-info-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1.25rem 2rem; }
        .detail-info-item label { font-size: 0.72rem; font-weight: 600; color: var(--secondary); display: block; margin-bottom: 3px; }
        .detail-info-item span { font-size: 0.88rem; font-weight: 600; color: var(--dark); }

        .price-row { display: flex; justify-content: space-between; font-size: 0.88rem; color: var(--secondary); margin-bottom: 0.5rem; }
        .price-row.total-row { font-size: 1.15rem; font-weight: 700; color: var(--dark); border-top: 1px dashed var(--border); padding-top: 0.75rem; margin-top: 0.75rem; }

        .service-booked-row { display: flex; align-items: center; justify-content: space-between; padding: 1rem 0; border-bottom: 1px solid var(--border); cursor: pointer; transition: background-color 0.15s; }
        .service-booked-row:last-child { border-bottom: none; padding-bottom: 0; }
        .service-booked-row:first-child { padding-top: 0; }
        .service-booked-icon { width: 36px; height: 36px; border-radius: 10px; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; color: var(--secondary); font-size: 1rem; flex-shrink: 0; }

        .traveler-card { border: 1px solid var(--border); border-radius: 14px; padding: 1.25rem; background-color: #fff; }
        .traveler-number { width: 24px; height: 24px; border-radius: 50%; background-color: #112E24; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; flex-shrink: 0; }
        .traveler-info-row { display: flex; align-items: center; gap: 0.75rem; font-size: 0.85rem; color: var(--secondary); margin-bottom: 0.5rem; }
        .traveler-info-row:last-child { margin-bottom: 0; }
        .traveler-info-row i { font-size: 0.95rem; color: var(--secondary); opacity: 0.8; width: 16px; text-align: center; }

        .sidebar-info-item { display: flex; align-items: center; gap: 0.75rem; font-size: 0.85rem; color: var(--secondary); margin-bottom: 0.75rem; }
        .sidebar-info-item:last-child { margin-bottom: 0; }
        .sidebar-info-item i { font-size: 0.95rem; color: var(--secondary); width: 16px; text-align: center; }

        .action-item { display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0; font-size: 0.85rem; font-weight: 600; color: var(--dark); cursor: pointer; transition: color 0.15s; }
        .action-item:hover { color: #1E6C45; }
        .action-item i.action-icon { font-size: 0.95rem; color: var(--secondary); margin-right: 0.6rem; }
        .action-item.danger { color: var(--danger); }
        .action-item.danger:hover { color: #b33c3c; }
        .action-item.danger i.action-icon { color: var(--danger); }

        .info-banner { background-color: #F8F5EE; border: 1px solid var(--border); border-radius: 12px; padding: 0.85rem 1.25rem; font-size: 0.82rem; color: var(--secondary); font-weight: 500; text-align: center; }

        .tag-pill { background-color: #F3F4F6; color: var(--dark); font-size: 0.78rem; font-weight: 600; padding: 0.3rem 0.75rem; border-radius: 6px; display: inline-block; }
        .tag-add-btn { background: none; border: 1px dashed var(--border); color: var(--secondary); font-size: 0.78rem; font-weight: 600; padding: 0.3rem 0.75rem; border-radius: 6px; cursor: pointer; transition: all 0.15s; }
        .tag-add-btn:hover { border-color: var(--secondary); color: var(--dark); }
      `}</style>

      <div className="d-flex position-relative">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="app-container w-100 min-vh-100 d-flex flex-column justify-content-between">
          <Header
            toggleSidebar={toggleSidebar}
            title={`Booking Confirmed`}
            subtitle={`Home > Bookings > ${bookingId}`}
            forcePageHeaderLayout={true}
            searchPlaceholder="Search inquiries, customers, bookings, quotations..."
            actionButton={actionButton}
          />

          <main className="main-content d-flex flex-column gap-4 py-4">

            {/* Confirmed Header Row */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
              <div className="confirmed-header">
                <div className="confirmed-checkmark">
                  <i className="bi bi-check-lg"></i>
                </div>
                <div>
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <h2 className="fw-800 text-dark m-0" style={{ fontSize: "1.5rem" }}>Booking Confirmed</h2>
                    <span className="confirmed-badge">Confirmed</span>
                  </div>
                  <span className="confirmed-meta d-block mt-1">
                    Booking ID: <strong>{bookingId}</strong> • Created on {booking.createdOn}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <button className="btn btn-outline-secondary bg-white border rounded-3 d-flex align-items-center gap-2 fw-600" style={{ height: "40px", fontSize: "0.82rem" }}>
                  <i className="bi bi-send" style={{ fontSize: "0.85rem" }}></i>
                  <span>Send Itinerary</span>
                </button>
                <button className="btn btn-outline-secondary bg-white border rounded-3 d-flex align-items-center gap-2 fw-600" style={{ height: "40px", fontSize: "0.82rem" }}>
                  <i className="bi bi-download" style={{ fontSize: "0.85rem" }}></i>
                  <span>Download Invoice</span>
                </button>
                <button className="btn btn-outline-secondary bg-white border rounded-3 d-flex align-items-center gap-2 fw-600" style={{ height: "40px", fontSize: "0.82rem" }}>
                  <i className="bi bi-three-dots" style={{ fontSize: "0.85rem" }}></i>
                  <span>More Actions</span>
                  <i className="bi bi-chevron-down" style={{ fontSize: "0.65rem" }}></i>
                </button>
              </div>
            </div>

            {/* Detail Tabs */}
            <div className="d-flex border-bottom border-light overflow-auto" style={{ gap: 0 }}>
              {tabs.map(tab => (
                <button
                  key={tab}
                  className={`booking-detail-tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Main Content: 3-column layout */}
            {activeTab === "Booking Overview" && (
              <div className="row g-3">

                {/* Left Column - Trip Summary + Price Summary */}
                <div className="col-12 col-lg-5">
                  <div className="d-flex flex-column gap-3">

                    {/* Trip Summary */}
                    <div className="section-card border border-light p-4">
                      <h4 className="detail-section-title mb-3">
                        <div className="detail-section-icon">
                          <i className="bi bi-send-fill"></i>
                        </div>
                        <span>Trip Summary</span>
                      </h4>

                      <div className="detail-info-grid">
                        <div className="detail-info-item">
                          <label>Trip Type</label>
                          <span>{booking.tripType}</span>
                        </div>
                        <div className="detail-info-item">
                          <label>Travelers</label>
                          <span>{booking.travelers}</span>
                        </div>
                        <div className="detail-info-item">
                          <label>Destination</label>
                          <span>{booking.destination}</span>
                        </div>
                        <div className="detail-info-item">
                          <label>Class</label>
                          <span>{booking.class}</span>
                        </div>
                        <div className="detail-info-item">
                          <label>Travel Dates</label>
                          <span>{booking.travelDates}</span>
                        </div>
                        <div className="detail-info-item">
                          <label>Sales Executive</label>
                          <span>{booking.salesExecutive}</span>
                        </div>
                        <div className="detail-info-item">
                          <label>Duration</label>
                          <span>{booking.duration}</span>
                        </div>
                        <div className="detail-info-item">
                          <label>Booking Status</label>
                          <span className="confirmed-badge d-inline-block mt-1">{booking.bookingStatus}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price Summary */}
                    <div className="section-card border border-light p-4">
                      <h4 className="detail-section-title mb-3">
                        <div className="detail-section-icon">
                          <i className="bi bi-currency-dollar"></i>
                        </div>
                        <span>Price Summary</span>
                      </h4>

                      <div className="d-flex flex-column">
                        <div className="price-row">
                          <span>Base Amount</span>
                          <span className="text-dark fw-600">${booking.baseAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                        </div>
                        <div className="price-row">
                          <span>Discount</span>
                          <span className="text-success fw-700">-${booking.discount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                        </div>
                        <div className="price-row">
                          <span>Tax</span>
                          <span className="text-dark fw-600">${booking.tax.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                        </div>
                        <div className="price-row total-row">
                          <span>Total Amount</span>
                          <span>${booking.totalAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                        </div>
                        <div className="price-row mt-2" style={{ fontSize: "0.82rem" }}>
                          <span>Amount Paid</span>
                          <span className="text-success fw-700">${booking.amountPaid.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                        </div>
                        <div className="price-row" style={{ fontSize: "0.82rem" }}>
                          <span>Balance</span>
                          <span className={`fw-700 ${booking.balance === 0 ? "text-success" : "text-danger"}`}>
                            ${booking.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Services Booked */}
                    <div className="section-card border border-light p-4">
                      <h4 className="detail-section-title mb-3">
                        <div className="detail-section-icon">
                          <i className="bi bi-calendar-check-fill"></i>
                        </div>
                        <span>Services Booked</span>
                      </h4>

                      <div className="d-flex flex-column">
                        {booking.services.map((service, idx) => (
                          <div className="service-booked-row" key={idx}>
                            <div className="d-flex align-items-center gap-3">
                              <div className="service-booked-icon">
                                <i className={`bi ${service.icon} text-dark`}></i>
                              </div>
                              <div>
                                <span className="fw-700 text-dark d-block" style={{ fontSize: "0.88rem", lineHeight: "1.2" }}>{service.type}</span>
                                <span className="text-secondary d-block fw-500 mt-1" style={{ fontSize: "0.82rem" }}>{service.description}</span>
                                <span className="text-secondary d-block" style={{ fontSize: "0.68rem", opacity: 0.8 }}>{service.details}</span>
                              </div>
                            </div>
                            <div className="d-flex align-items-center gap-3">
                              <span className="fw-700 text-dark" style={{ fontSize: "0.88rem" }}>${service.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                              <i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.85rem" }}></i>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div className="section-card border border-light p-4">
                      <h4 className="detail-section-title mb-3">
                        <div className="detail-section-icon" style={{ backgroundColor: "#FEF7ED", color: "#B97C2B" }}>
                          <i className="bi bi-star-fill"></i>
                        </div>
                        <span>Special Requests</span>
                      </h4>
                      <p className="text-secondary fw-500 mb-0" style={{ fontSize: "0.85rem" }}>{booking.specialRequests}</p>
                    </div>

                    {/* Tags */}
                    <div className="section-card border border-light p-4">
                      <h4 className="detail-section-title mb-3">
                        <div className="detail-section-icon" style={{ backgroundColor: "#ECEFFE", color: "#5D59E1" }}>
                          <i className="bi bi-tags-fill"></i>
                        </div>
                        <span>Tags</span>
                      </h4>
                      <div className="d-flex flex-wrap gap-2">
                        {booking.tags.map(tag => (
                          <span key={tag} className="tag-pill">{tag}</span>
                        ))}
                        <button className="tag-add-btn">+ Add Tag</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle Column - Travelers + Notes */}
                <div className="col-12 col-lg-4">
                  <div className="d-flex flex-column gap-3">

                    {/* Travelers */}
                    <div className="section-card border border-light p-4">
                      <h4 className="detail-section-title mb-3">
                        <div className="detail-section-icon">
                          <i className="bi bi-people-fill"></i>
                        </div>
                        <span>Travelers ({booking.travelers})</span>
                      </h4>

                      <div className="d-flex flex-column gap-3">
                        {booking.travelersList.map((t, idx) => (
                          <div className="traveler-card" key={t.id}>
                            <div className="d-flex align-items-center gap-2 mb-3">
                              <div className="traveler-number">{idx + 1}</div>
                              <span className="fw-700 text-dark" style={{ fontSize: "0.9rem" }}>
                                {t.title} {t.firstName} {t.lastName}
                              </span>
                              {t.isLead && (
                                <span className="badge px-2 py-1 rounded-1 fw-700" style={{ fontSize: "0.62rem", backgroundColor: "#FEF7ED", color: "#B97C2B" }}>Lead Traveler</span>
                              )}
                            </div>

                            <div className="traveler-info-row">
                              <i className="bi bi-card-heading"></i>
                              <span>Passport: {t.passport}</span>
                            </div>
                            <div className="traveler-info-row">
                              <i className="bi bi-globe"></i>
                              <span>Nationality: {t.nationality}</span>
                            </div>
                            <div className="traveler-info-row">
                              <i className="bi bi-envelope"></i>
                              <span>Email: {t.email}</span>
                            </div>
                            <div className="traveler-info-row">
                              <i className="bi bi-telephone"></i>
                              <span>Phone: {t.phone}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Booking Notes */}
                    <div className="section-card border border-light p-4">
                      <h4 className="detail-section-title mb-3">
                        <div className="detail-section-icon" style={{ backgroundColor: "#FEF7ED", color: "#B97C2B" }}>
                          <i className="bi bi-journal-text"></i>
                        </div>
                        <span>Booking Notes</span>
                      </h4>
                      <p className="text-secondary fw-500 mb-0" style={{ fontSize: "0.85rem" }}>{booking.bookingNotes}</p>
                    </div>

                    {/* Info Banner */}
                    <div className="info-banner">
                      <i className="bi bi-info-circle me-1"></i>
                      You can manage this booking, send itinerary, download documents and track all activities from this page.
                    </div>
                  </div>
                </div>

                {/* Right Column - Customer, Payment, Actions */}
                <div className="col-12 col-lg-3">
                  <div className="d-flex flex-column gap-3">

                    {/* Customer Information */}
                    <div className="section-card border border-light p-4">
                      <h4 className="text-secondary uppercase mb-3 text-uppercase font-monospace" style={{ fontSize: "0.72rem", letterSpacing: "0.7px", fontWeight: "700" }}>Customer Information</h4>

                      <div className="d-flex align-items-start gap-3">
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center fw-700"
                          style={{ width: "48px", height: "48px", backgroundColor: "#E9F4EE", color: "#1E6C45", fontSize: "1.05rem", flexShrink: 0 }}
                        >
                          {booking.customer.initials}
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center gap-2">
                            <span className="fw-700 text-dark fs-6">{booking.customer.name}</span>
                            <span className="badge rounded-pill text-success bg-light border border-success-subtle fw-700" style={{ fontSize: "0.65rem", padding: "0.15rem 0.4rem" }}>Active</span>
                          </div>

                          <div className="mt-2">
                            <div className="sidebar-info-item">
                              <i className="bi bi-envelope"></i>
                              <span>{booking.customer.email}</span>
                            </div>
                            <div className="sidebar-info-item">
                              <i className="bi bi-telephone"></i>
                              <span className="d-flex align-items-center gap-1">
                                <span>{booking.customer.phone}</span>
                                <i className="bi bi-whatsapp text-success" style={{ fontSize: "0.85rem", cursor: "pointer" }}></i>
                              </span>
                            </div>
                            <div className="sidebar-info-item">
                              <i className="bi bi-geo-alt"></i>
                              <span>{booking.customer.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        className="btn btn-outline-secondary bg-white border rounded-3 w-100 mt-3 fw-600 d-flex align-items-center justify-content-center gap-2"
                        style={{ height: "38px", fontSize: "0.82rem" }}
                        onClick={() => router.push("/customers")}
                      >
                        View Customer Profile
                      </button>
                    </div>

                    {/* Payment Information */}
                    <div className="section-card border border-light p-4">
                      <h4 className="text-secondary uppercase mb-3 text-uppercase font-monospace d-flex align-items-center gap-2" style={{ fontSize: "0.72rem", letterSpacing: "0.7px", fontWeight: "700" }}>
                        <div className="detail-section-icon" style={{ width: "28px", height: "28px", fontSize: "0.8rem" }}>
                          <i className="bi bi-credit-card-fill"></i>
                        </div>
                        Payment Information
                      </h4>

                      <div className="d-flex flex-column gap-2">
                        <div className="d-flex justify-content-between" style={{ fontSize: "0.82rem" }}>
                          <span className="text-secondary fw-500">Payment Method</span>
                          <span className="text-dark fw-600">{booking.payment.method}</span>
                        </div>
                        <div className="d-flex justify-content-between" style={{ fontSize: "0.82rem" }}>
                          <span className="text-secondary fw-500">Payment Status</span>
                          <span className="confirmed-badge">{booking.payment.status}</span>
                        </div>
                        <div className="d-flex justify-content-between" style={{ fontSize: "0.82rem" }}>
                          <span className="text-secondary fw-500">Amount Paid</span>
                          <span className="text-dark fw-700">${booking.payment.amountPaid.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                        </div>
                        <div className="d-flex justify-content-between" style={{ fontSize: "0.82rem" }}>
                          <span className="text-secondary fw-500">Paid On</span>
                          <span className="text-dark fw-600">{booking.payment.paidOn}</span>
                        </div>
                        <div className="d-flex justify-content-between" style={{ fontSize: "0.82rem" }}>
                          <span className="text-secondary fw-500">Transaction ID</span>
                          <span className="text-dark fw-600">{booking.payment.transactionId}</span>
                        </div>
                      </div>

                      <button
                        className="btn btn-outline-secondary bg-white border rounded-3 w-100 mt-3 fw-600 d-flex align-items-center justify-content-center gap-2"
                        style={{ height: "38px", fontSize: "0.82rem" }}
                      >
                        View Payment Details
                      </button>
                    </div>

                    {/* Booking Actions */}
                    <div className="section-card border border-light p-4">
                      <h4 className="text-secondary uppercase mb-3 text-uppercase font-monospace d-flex align-items-center gap-2" style={{ fontSize: "0.72rem", letterSpacing: "0.7px", fontWeight: "700" }}>
                        <i className="bi bi-lightning-fill" style={{ fontSize: "0.85rem" }}></i>
                        Booking Actions
                      </h4>

                      <div className="d-flex flex-column">
                        <div className="action-item" onClick={() => router.push("/bookings/new")}>
                          <span><i className="bi bi-pencil action-icon"></i> Edit Booking</span>
                          <i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.7rem" }}></i>
                        </div>
                        <div className="action-item">
                          <span><i className="bi bi-calendar-plus action-icon"></i> Add Follow Up</span>
                          <i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.7rem" }}></i>
                        </div>
                        <div className="action-item">
                          <span><i className="bi bi-copy action-icon"></i> Duplicate Booking</span>
                          <i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.7rem" }}></i>
                        </div>
                        <div className="action-item">
                          <span><i className="bi bi-x-circle action-icon"></i> Cancel Booking</span>
                          <i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.7rem" }}></i>
                        </div>
                        <div className="action-item danger">
                          <span><i className="bi bi-trash action-icon"></i> Delete Booking</span>
                          <i className="bi bi-chevron-right" style={{ fontSize: "0.7rem" }}></i>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {/* Placeholder for other tabs */}
            {activeTab !== "Booking Overview" && (
              <div className="section-card border border-light p-5 text-center">
                <i className="bi bi-journal-text text-secondary d-block mb-2" style={{ fontSize: "2rem" }}></i>
                <h5 className="text-dark fw-700 mb-1">{activeTab}</h5>
                <p className="text-secondary mb-0" style={{ fontSize: "0.85rem" }}>
                  This section will display {activeTab.toLowerCase()} details for booking {bookingId}.
                </p>
              </div>
            )}

          </main>
          <Footer />
        </div>

        {/* Overlay to click-close sidebar on mobile */}
        {sidebarOpen && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-lg-none"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)", zIndex: 995 }}
            onClick={toggleSidebar}
          ></div>
        )}
      </div>
    </>
  );
}
