"use client";

import { useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BookingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const bookingId = params.id || "BK-1256";

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Booking Overview");
  const [historyPage, setHistoryPage] = useState(1);
  const [paymentsPage, setPaymentsPage] = useState(1);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // ─── Booking Data ───
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
    amountPaid: 5450.00,
    balance: 6500.00,
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
      { id: 1, title: "Mr.", firstName: "John", lastName: "Doe", isLead: true, passport: "C1234567", nationality: "Indonesia", email: "john.doe@gmail.com", phone: "+62 812 3456 7890" },
      { id: 2, title: "Mrs.", firstName: "Jane", lastName: "Doe", isLead: false, passport: "C7654321", nationality: "Indonesia", email: "jane.doe@gmail.com", phone: "+62 812 9876 5432" },
    ],
    services: [
      { type: "Flights", icon: "bi-airplane-fill", description: "DPS (Bali) ✈ DXB (Dubai)", details: "20 Jun 2025 - 25 Jun 2025 | 2 Adults, Economy", amount: 2430.00 },
      { type: "Hotels", icon: "bi-house-door-fill", description: "Deluxe Sea View | 1 Room, 4 Nights", details: "20 Jun 2025 - 24 Jun 2025", amount: 820.00 },
      { type: "Transfers", icon: "bi-car-front-fill", description: "Airport Transfer (DXB) - Private", details: "25 Jun 2025", amount: 120.00 },
    ],
    specialRequests: "Sea view room preferred, near beach location.",
    bookingNotes: "Customer prefers luxury resorts and private transfers.",
    tags: ["VIP", "Frequent Traveler", "Family Trip"],
  };

  // ─── Itinerary Data ───
  const itineraryItems = [
    {
      day: 1, date: "20 JUN", dayName: "FRI", type: "Flight", status: "Confirmed",
      flight: { from: "DPS", fromCity: "Bali (Denpasar)", depTime: "09:15", to: "DXB", toCity: "Dubai", arrTime: "16:50", duration: "09h 35m", stops: "1 Stop", carrier: "Emirates", code: "EK 368", carrierBg: "#D71921", classType: "Economy", passengers: "2 Adults" }
    },
    {
      day: 2, date: "21 JUN", dayName: "SAT", type: "Hotel", status: "Confirmed",
      hotel: { name: "Deluxe Sea View", stars: 5, location: "Kuta, Bali, Indonesia", checkIn: "20 Jun 2025", checkOut: "24 Jun 2025", nights: 4, rooms: "1 Room" }
    },
    {
      day: 3, date: "22 JUN", dayName: "SUN", type: "Activity", status: "Confirmed",
      activity: { name: "Uluwatu Temple & Sunset Tour", time: "04:00 PM - 09:00 PM", passengers: "2 Adults" }
    },
    {
      day: 4, date: "23 JUN", dayName: "WED", type: "Flight", status: "Confirmed",
      flight: { from: "DXB", fromCity: "Dubai", depTime: "23:15", to: "DPS", toCity: "Bali (Denpasar)", arrTime: "15:25", plusOne: true, duration: "09h 10m", stops: "1 Stop", carrier: "Emirates", code: "EK 367", carrierBg: "#D71921", classType: "Economy", passengers: "2 Adults" }
    },
    {
      day: 5, date: "25 JUN", dayName: "WED", type: "Transfer", status: "Confirmed",
      transfer: { name: "Airport Transfer (DPS) → Hotel", subType: "Private Transfer", pickupTime: "03:45 PM", vehicleType: "Toyota Innova (Private)" }
    },
  ];

  // ─── History Data ───
  const historyActivities = [
    { icon: "bi-journal-plus", iconBg: "#E9F4EE", iconColor: "#1E6C45", activity: "Booking Created", desc: "Booking BK-1256 was created", details: "Customer: John Doe\nDestination: Bali, Indonesia\nTravel Dates: 20 Jun - 25 Jun 2025", performedBy: "Sarah Johnson", role: "Sales Executive", date: "18 May 2025", time: "10:15 AM", ip: "103.21.45.67" },
    { icon: "bi-pencil-fill", iconBg: "#FEF7ED", iconColor: "#B97C2B", activity: "Booking Updated", desc: "Travel dates were updated", details: "Travel Dates changed from\n18 Jun - 23 Jun 2025 to\n20 Jun - 25 Jun 2025", performedBy: "Sarah Johnson", role: "Sales Executive", date: "18 May 2025", time: "11:02 AM", ip: "103.21.45.67" },
    { icon: "bi-people-fill", iconBg: "#ECEFFE", iconColor: "#5D59E1", activity: "Travelers Added", desc: "2 travelers were added", details: "Mr. John Doe\nMrs. Jane Doe", performedBy: "Sarah Johnson", role: "Sales Executive", date: "18 May 2025", time: "11:10 AM", ip: "103.21.45.67" },
    { icon: "bi-airplane-fill", iconBg: "#E9F4EE", iconColor: "#1E6C45", activity: "Flight Booked", desc: "Flight reservation confirmed", details: "DPS (Bali) ⇌ DXB (Dubai)\nEmirates EK 368", performedBy: "Sarah Johnson", role: "Sales Executive", date: "18 May 2025", time: "11:25 AM", ip: "103.21.45.67" },
    { icon: "bi-house-door-fill", iconBg: "#FEF7ED", iconColor: "#B97C2B", activity: "Hotel Booked", desc: "Hotel reservation confirmed", details: "Deluxe Sea View\n20 Jun - 24 Jun 2025, 4 Nights", performedBy: "Sarah Johnson", role: "Sales Executive", date: "18 May 2025", time: "11:40 AM", ip: "103.21.45.67" },
    { icon: "bi-file-earmark-arrow-up-fill", iconBg: "#ECEFFE", iconColor: "#5D59E1", activity: "Document Uploaded", desc: "Passport - John Doe uploaded", details: "Document Type: Passport\nFile Name: john_doe_passport.pdf", performedBy: "John Smith", role: "Super Admin", date: "18 May 2025", time: "01:15 PM", ip: "103.21.45.67" },
    { icon: "bi-credit-card-fill", iconBg: "#E9F4EE", iconColor: "#1E6C45", activity: "Payment Received", desc: "Payment of $2,000 received", details: "Payment Method: Bank Transfer\nPayment ID: PAY-0001", performedBy: "John Smith", role: "Super Admin", date: "18 May 2025", time: "02:10 PM", ip: "103.21.45.67" },
    { icon: "bi-sticky-fill", iconBg: "#FEF7ED", iconColor: "#B97C2B", activity: "Note Added", desc: "Internal note was added", details: "Note: Customer prefers ocean view rooms\nand private airport transfer.", performedBy: "Sarah Johnson", role: "Sales Executive", date: "18 May 2025", time: "02:30 PM", ip: "103.21.45.67" },
    { icon: "bi-send-fill", iconBg: "#ECEFFE", iconColor: "#5D59E1", activity: "Itinerary Sent", desc: "Itinerary sent to customer", details: "Sent to: john.doe@gmail.com\nEmail Subject: Your Bali Trip Itinerary", performedBy: "Sarah Johnson", role: "Sales Executive", date: "18 May 2025", time: "03:05 PM", ip: "103.21.45.67" },
    { icon: "bi-check-circle-fill", iconBg: "#E9F4EE", iconColor: "#1E6C45", activity: "Booking Confirmed", desc: "Booking status changed to Confirmed", details: "All services confirmed and\nbooking marked as confirmed.", performedBy: "John Smith", role: "Super Admin", date: "18 May 2025", time: "03:20 PM", ip: "103.21.45.67" },
  ];

  const historyPerPage = 10;
  const historyTotalPages = Math.ceil(historyActivities.length / historyPerPage);
  const pagedHistory = historyActivities.slice((historyPage - 1) * historyPerPage, historyPage * historyPerPage);

  // ─── Payments Data ───
  const paymentSummary = { total: 11950.00, paid: 5450.00, balance: 6500.00, nextDueAmount: 3000.00, nextDueDate: "25 May 2025", paidPercent: 45.61 };

  const paymentTransactions = [
    { date: "18 May 2025", time: "11:15 AM", id: "PAY-0001", method: "Bank Transfer", methodSub: "HDFC Bank", methodIcon: "bi-bank", methodBg: "#ECEFFE", methodColor: "#5D59E1", description: "Initial Deposit", descSub: "Booking Amount", amount: 2000.00, status: "Paid" },
    { date: "25 May 2025", time: "02:20 PM", id: "PAY-0002", method: "Visa Card", methodSub: "**** 4242", methodIcon: "bi-credit-card-fill", methodBg: "#E6F0FF", methodColor: "#0A58CA", description: "Flight Payment", descSub: "Emirates EK 368", amount: 2250.00, status: "Paid" },
    { date: "05 Jun 2025", time: "09:40 AM", id: "PAY-0003", method: "Mastercard", methodSub: "**** 8888", methodIcon: "bi-credit-card-2-back-fill", methodBg: "#FEF7ED", methodColor: "#B97C2B", description: "Hotel Payment", descSub: "Deluxe Sea View", amount: 1200.00, status: "Paid" },
    { date: "25 May 2025", time: "", id: "INV-0001", method: "Invoice", methodSub: "", methodIcon: "bi-receipt", methodBg: "#F3F4F6", methodColor: "#6B7280", description: "Invoice for Flight", descSub: "EK 368", amount: 3000.00, status: "Pending" },
    { date: "10 Jun 2025", time: "", id: "INV-0002", method: "Invoice", methodSub: "", methodIcon: "bi-receipt", methodBg: "#F3F4F6", methodColor: "#6B7280", description: "Hotel & Transfer", descSub: "Remaining Amount", amount: 1500.00, status: "Pending" },
    { date: "15 Jun 2025", time: "", id: "INV-0003", method: "Invoice", methodSub: "", methodIcon: "bi-receipt", methodBg: "#F3F4F6", methodColor: "#6B7280", description: "Balance Payment", descSub: "Before Departure", amount: 2000.00, status: "Upcoming" },
  ];

  const payPerPage = 10;
  const payTotalPages = Math.ceil(paymentTransactions.length / payPerPage);
  const pagedPayments = paymentTransactions.slice((paymentsPage - 1) * payPerPage, paymentsPage * payPerPage);

  // ─── Dynamic title / subtitle / action buttons per tab ───
  const tabTitles = {
    "Booking Overview": "Booking Confirmed",
    "Itinerary": "Itinerary",
    "Payments": "Booking Payments",
    "History": "Booking History",
    "Documents": "Documents",
    "Notes": "Notes",
  };

  const tabSubtitles = {
    "Booking Overview": `Home > Bookings > ${bookingId}`,
    "Itinerary": `Home > Bookings > ${bookingId} > Itinerary`,
    "Payments": `Home > Bookings > ${bookingId} > Payments`,
    "History": `Home > Bookings > ${bookingId} > History`,
    "Documents": `Home > Bookings > ${bookingId} > Documents`,
    "Notes": `Home > Bookings > ${bookingId} > Notes`,
  };

  const actionButton = (
    <button className="btn text-white rounded-3 px-3 d-flex align-items-center gap-2" style={{ backgroundColor: "#112E24", height: "42px", fontWeight: "400" }} onClick={() => router.push("/bookings/new")}>
      <i className="bi bi-plus-lg fs-6"></i>
      <span>New Booking</span>
      <i className="bi bi-chevron-down ms-1" style={{ fontSize: "0.75rem" }}></i>
    </button>
  );

  const tabs = ["Booking Overview", "Itinerary", "Documents", "Payments", "History", "Notes"];
  const STATUS_COLORS = { Paid: { bg: "#E9F4EE", color: "#1E6C45" }, Pending: { bg: "#FEF7ED", color: "#B97C2B" }, Upcoming: { bg: "#E6F0FF", color: "#0A58CA" } };

  // ─── Right Sidebar (shared across most tabs) ───
  const renderRightSidebar = () => (
    <div className="col-12 col-xl-3">
      <div className="d-flex flex-column gap-3">
        {/* Customer Information */}
        <div className="section-card border border-light p-4">
          <h4 className="text-secondary uppercase mb-3 text-uppercase font-monospace" style={{ fontSize: "0.72rem", letterSpacing: "0.7px", fontWeight: "700" }}>Customer Information</h4>
          <div className="d-flex align-items-start gap-3">
            <div className="rounded-circle d-flex align-items-center justify-content-center fw-700" style={{ width: "48px", height: "48px", backgroundColor: "#E9F4EE", color: "#1E6C45", fontSize: "1.05rem", flexShrink: 0 }}>
              {booking.customer.initials}
            </div>
            <div className="flex-grow-1">
              <div className="d-flex align-items-center gap-2">
                <span className="fw-700 text-dark fs-6">{booking.customer.name}</span>
                <span className="badge rounded-pill text-success bg-light border border-success-subtle fw-700" style={{ fontSize: "0.65rem", padding: "0.15rem 0.4rem" }}>Active</span>
              </div>
              <div className="mt-2">
                <div className="sb-info-item"><i className="bi bi-envelope"></i><span>{booking.customer.email}</span></div>
                <div className="sb-info-item"><i className="bi bi-telephone"></i><span className="d-flex align-items-center gap-1"><span>{booking.customer.phone}</span><i className="bi bi-whatsapp text-success" style={{ fontSize: "0.85rem", cursor: "pointer" }}></i></span></div>
                <div className="sb-info-item"><i className="bi bi-geo-alt"></i><span>{booking.customer.location}</span></div>
              </div>
            </div>
          </div>
          <button className="btn btn-outline-secondary bg-white border rounded-3 w-100 mt-3 fw-600 d-flex align-items-center justify-content-center gap-2" style={{ height: "38px", fontSize: "0.82rem" }} onClick={() => router.push("/customers")}>View Customer Profile</button>
        </div>

        {/* Trip Summary */}
        <div className="section-card border border-light p-4">
          <h4 className="text-secondary uppercase mb-3 text-uppercase font-monospace" style={{ fontSize: "0.72rem", letterSpacing: "0.7px", fontWeight: "700" }}>Trip Summary</h4>
          <div className="d-flex flex-column gap-2">
            {[
              { icon: "bi-geo-alt", label: "Destination", val: booking.destination },
              { icon: "bi-calendar3", label: "Travel Dates", val: booking.travelDates },
              { icon: "bi-clock", label: "Duration", val: booking.duration },
              { icon: "bi-people", label: "Travelers", val: booking.travelers },
              { icon: "bi-compass", label: "Trip Type", val: booking.tripType },
            ].map((r, i) => (
              <div className="sb-info-item" key={i}><i className={`bi ${r.icon}`}></i><div><span className="text-secondary d-block" style={{ fontSize: "0.68rem" }}>{r.label}</span><span className="text-dark fw-600" style={{ fontSize: "0.85rem" }}>{r.val}</span></div></div>
            ))}
          </div>
        </div>

        {/* Price Summary */}
        <div className="section-card border border-light p-4">
          <h4 className="text-secondary uppercase mb-3 text-uppercase font-monospace" style={{ fontSize: "0.72rem", letterSpacing: "0.7px", fontWeight: "700" }}>Price Summary</h4>
          <div className="d-flex flex-column">
            {[
              { l: "Flights", v: "$2,430.00" }, { l: "Hotels", v: "$820.00" }, { l: "Transfers", v: "$120.00" },
              { l: "Discount", v: "-$500.00", cls: "text-success fw-700" }, { l: "Tax", v: "$0.00" },
            ].map((r, i) => (
              <div className="d-flex justify-content-between mb-1" style={{ fontSize: "0.82rem" }} key={i}><span className="text-secondary">{r.l}</span><span className={r.cls || "text-dark fw-600"}>{r.v}</span></div>
            ))}
            <div className="d-flex justify-content-between fw-700 text-dark border-top mt-2 pt-2" style={{ fontSize: "1rem" }}><span>Total Amount</span><span>$11,950.00</span></div>
            <div className="d-flex justify-content-between mt-1" style={{ fontSize: "0.82rem" }}><span className="text-secondary">Amount Paid</span><span className="text-success fw-700">${booking.amountPaid.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span></div>
            <div className="d-flex justify-content-between" style={{ fontSize: "0.82rem" }}><span className="text-secondary">Balance</span><span className={`fw-700 ${booking.balance === 0 ? "text-success" : "text-danger"}`}>${booking.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span></div>
          </div>
        </div>

        {/* Booking Progress */}
        <div className="section-card border border-light p-4">
          <h4 className="text-secondary uppercase mb-3 text-uppercase font-monospace" style={{ fontSize: "0.72rem", letterSpacing: "0.7px", fontWeight: "700" }}>Booking Progress</h4>
          <div className="d-flex flex-column gap-2">
            {["Booking Details", "Travelers", "Services", "Review & Confirm"].map((s, i) => (
              <div className="d-flex align-items-center justify-content-between" key={i} style={{ fontSize: "0.82rem" }}>
                <div className="d-flex align-items-center gap-2 fw-600 text-success"><i className="bi bi-check-circle-fill"></i><span>{s}</span></div>
                <span className="text-secondary fw-600 small">Completed</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
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
        .service-booked-row { display: flex; align-items: center; justify-content: space-between; padding: 1rem 0; border-bottom: 1px solid var(--border); cursor: pointer; }
        .service-booked-row:last-child { border-bottom: none; padding-bottom: 0; }
        .service-booked-row:first-child { padding-top: 0; }
        .service-booked-icon { width: 36px; height: 36px; border-radius: 10px; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; color: var(--secondary); font-size: 1rem; flex-shrink: 0; }
        .traveler-card { border: 1px solid var(--border); border-radius: 14px; padding: 1.25rem; background-color: #fff; }
        .traveler-number { width: 24px; height: 24px; border-radius: 50%; background-color: #112E24; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; flex-shrink: 0; }
        .traveler-info-row { display: flex; align-items: center; gap: 0.75rem; font-size: 0.85rem; color: var(--secondary); margin-bottom: 0.5rem; }
        .traveler-info-row:last-child { margin-bottom: 0; }
        .traveler-info-row i { font-size: 0.95rem; color: var(--secondary); opacity: 0.8; width: 16px; text-align: center; }
        .sb-info-item { display: flex; align-items: center; gap: 0.75rem; font-size: 0.85rem; color: var(--secondary); margin-bottom: 0.75rem; }
        .sb-info-item:last-child { margin-bottom: 0; }
        .sb-info-item i { font-size: 0.95rem; color: var(--secondary); width: 16px; text-align: center; }
        .action-item { display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0; font-size: 0.85rem; font-weight: 600; color: var(--dark); cursor: pointer; transition: color 0.15s; }
        .action-item:hover { color: #1E6C45; }
        .action-item i.action-icon { font-size: 0.95rem; color: var(--secondary); margin-right: 0.6rem; }
        .action-item.danger { color: var(--danger); }
        .action-item.danger:hover { color: #b33c3c; }
        .action-item.danger i.action-icon { color: var(--danger); }
        .info-banner { background-color: #F8F5EE; border: 1px solid var(--border); border-radius: 12px; padding: 0.85rem 1.25rem; font-size: 0.82rem; color: var(--secondary); font-weight: 500; text-align: center; }
        .tag-pill { background-color: #F3F4F6; color: var(--dark); font-size: 0.78rem; font-weight: 600; padding: 0.3rem 0.75rem; border-radius: 6px; display: inline-block; }
        .tag-add-btn { background: none; border: 1px dashed var(--border); color: var(--secondary); font-size: 0.78rem; font-weight: 600; padding: 0.3rem 0.75rem; border-radius: 6px; cursor: pointer; }
        .tag-add-btn:hover { border-color: var(--secondary); color: var(--dark); }

        /* ─── Itinerary ─── */
        .itin-day-badge { width: 56px; text-align: center; flex-shrink: 0; }
        .itin-day-circle { width: 44px; height: 44px; border-radius: 50%; background-color: #112E24; color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 0.6rem; font-weight: 700; line-height: 1.1; margin: 0 auto 4px; }
        .itin-day-circle span:first-child { font-size: 0.55rem; opacity: 0.7; text-transform: uppercase; }
        .itin-day-date { font-size: 0.72rem; font-weight: 700; color: var(--dark); white-space: nowrap; }
        .itin-day-name { font-size: 0.65rem; font-weight: 600; color: var(--secondary); text-transform: uppercase; }
        .itin-card { border: 1px solid var(--border); border-radius: 14px; padding: 1.25rem; background-color: #fff; flex-grow: 1; }
        .itin-type-badge { font-size: 0.88rem; font-weight: 700; color: var(--dark); }
        .itin-status { font-size: 0.68rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 4px; }
        .itin-status.confirmed { background-color: #E9F4EE; color: #1E6C45; }
        .itin-detail-label { font-size: 0.68rem; color: var(--secondary); font-weight: 600; display: block; }
        .itin-detail-value { font-size: 0.85rem; color: var(--dark); font-weight: 600; }
        .itin-flight-line { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .itin-flight-point h5 { font-size: 1.05rem; font-weight: 700; color: var(--dark); margin: 0; }
        .itin-flight-point span { font-size: 0.72rem; color: var(--secondary); font-weight: 600; }
        .itin-flight-duration { display: flex; flex-direction: column; align-items: center; min-width: 80px; }
        .itin-flight-duration span { font-size: 0.68rem; color: var(--secondary); font-weight: 500; }
        .itin-flight-bar { width: 100%; height: 1.5px; background-color: var(--border); position: relative; margin: 3px 0; }
        .itin-flight-bar::after { content: ''; width: 5px; height: 5px; border-radius: 50%; background-color: var(--secondary); position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); }
        .itin-carrier-logo { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 0.6rem; font-weight: 700; color: #fff; flex-shrink: 0; }
        .star-rating { color: #F59E0B; font-size: 0.7rem; letter-spacing: 1px; }
        .itin-action-btn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid var(--border); background: #fff; display: flex; align-items: center; justify-content: center; color: var(--secondary); font-size: 0.82rem; cursor: pointer; }
        .itin-action-btn:hover { background-color: #F5F3EE; }

        /* ─── History ─── */
        .history-icon-box { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; flex-shrink: 0; }

        /* ─── Payments ─── */
        .pay-summary-card { display: flex; flex-direction: column; }
        .pay-summary-label { font-size: 0.72rem; color: var(--secondary); font-weight: 600; text-transform: uppercase; margin-bottom: 4px; }
        .pay-summary-val { font-size: 1.15rem; font-weight: 700; color: var(--dark); }
        .pay-method-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; flex-shrink: 0; }
        .pay-status-badge { font-size: 0.72rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 6px; }
        .pay-progress-ring { position: relative; width: 64px; height: 64px; }
        .pay-progress-ring svg { transform: rotate(-90deg); }
        .pay-progress-label { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; }
        .pay-note-bar { background-color: #F8F5EE; border: 1px solid var(--border); border-radius: 12px; padding: 0.85rem 1.25rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; }

        /* ─── Pagination ─── */
        .detail-pagination { display: flex; align-items: center; gap: 0.35rem; }
        .detail-page-btn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid var(--border); background: #fff; display: flex; align-items: center; justify-content: center; font-size: 0.78rem; font-weight: 600; color: var(--secondary); cursor: pointer; }
        .detail-page-btn:hover { background-color: #F5F3EE; }
        .detail-page-btn.active { background-color: #112E24; color: #fff; border-color: #112E24; }
        .detail-page-btn.disabled { opacity: 0.4; cursor: default; }
      `}</style>

      <div className="d-flex position-relative">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="app-container w-100 min-vh-100 d-flex flex-column justify-content-between">
          <Header
            toggleSidebar={toggleSidebar}
            title={tabTitles[activeTab] || activeTab}
            subtitle={tabSubtitles[activeTab] || `Home > Bookings > ${bookingId}`}
            forcePageHeaderLayout={true}
            searchPlaceholder="Search inquiries, customers, bookings, quotations..."
            actionButton={actionButton}
          />

          <main className="main-content d-flex flex-column gap-4 py-4">

            {/* Header Bar */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
              <div className="confirmed-header">
                {activeTab === "Booking Overview" && <div className="confirmed-checkmark"><i className="bi bi-check-lg"></i></div>}
                <div>
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <h2 className="fw-800 text-dark m-0" style={{ fontSize: "1.5rem" }}>{tabTitles[activeTab]}</h2>
                    <span className="confirmed-badge">Confirmed</span>
                  </div>
                  <span className="confirmed-meta d-block mt-1">
                    Booking ID: <strong>{bookingId}</strong> • {booking.travelDates} • {booking.destination}
                  </span>
                </div>
              </div>

              {/* Tab-specific action buttons */}
              <div className="d-flex align-items-center gap-2 flex-wrap">
                {activeTab === "Booking Overview" && (<>
                  <button className="btn btn-outline-secondary bg-white border rounded-3 d-flex align-items-center gap-2 fw-600" style={{ height: "40px", fontSize: "0.82rem" }}><i className="bi bi-send" style={{ fontSize: "0.85rem" }}></i><span>Send Itinerary</span></button>
                  <button className="btn btn-outline-secondary bg-white border rounded-3 d-flex align-items-center gap-2 fw-600" style={{ height: "40px", fontSize: "0.82rem" }}><i className="bi bi-download" style={{ fontSize: "0.85rem" }}></i><span>Download Invoice</span></button>
                </>)}
                {activeTab === "Itinerary" && (<>
                  <button className="btn btn-outline-secondary bg-white border rounded-3 d-flex align-items-center gap-2 fw-600" style={{ height: "40px", fontSize: "0.82rem" }}><i className="bi bi-plus-lg"></i><span>Add Item</span><i className="bi bi-chevron-down" style={{ fontSize: "0.6rem" }}></i></button>
                  <button className="btn btn-outline-secondary bg-white border rounded-3 d-flex align-items-center gap-2 fw-600" style={{ height: "40px", fontSize: "0.82rem" }}><i className="bi bi-send"></i><span>Send Itinerary</span></button>
                </>)}
                {activeTab === "Payments" && (<>
                  <button className="btn btn-outline-secondary bg-white border rounded-3 d-flex align-items-center gap-2 fw-600" style={{ height: "40px", fontSize: "0.82rem" }}><i className="bi bi-plus-lg"></i><span>Add Payment</span></button>
                  <button className="btn btn-outline-secondary bg-white border rounded-3 d-flex align-items-center gap-2 fw-600" style={{ height: "40px", fontSize: "0.82rem" }}><i className="bi bi-download"></i><span>Download Statement</span></button>
                </>)}
                {activeTab === "History" && (
                  <button className="btn btn-outline-secondary bg-white border rounded-3 d-flex align-items-center gap-2 fw-600" style={{ height: "40px", fontSize: "0.82rem" }}><i className="bi bi-download"></i><span>Export History</span></button>
                )}
                <button className="btn btn-outline-secondary bg-white border rounded-3 d-flex align-items-center gap-2 fw-600" style={{ height: "40px", fontSize: "0.82rem" }}><i className="bi bi-three-dots"></i><span>More Actions</span><i className="bi bi-chevron-down" style={{ fontSize: "0.6rem" }}></i></button>
              </div>
            </div>

            {/* Tabs */}
            <div className="d-flex border-bottom border-light overflow-auto" style={{ gap: 0 }}>
              {tabs.map(tab => (
                <button key={tab} className={`booking-detail-tab ${activeTab === tab ? "active" : ""}`} onClick={() => { setActiveTab(tab); setHistoryPage(1); setPaymentsPage(1); }}>{tab}</button>
              ))}
            </div>

            {/* ════════════════════════ BOOKING OVERVIEW ════════════════════════ */}
            {activeTab === "Booking Overview" && (
              <div className="row g-3">
                {/* Left Area (8 Columns) */}
                <div className="col-12 col-lg-8 d-flex flex-column gap-3">
                  {/* Row 1: Trip Summary + Price Summary */}
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <div className="section-card border border-light p-4 h-100">
                        <h4 className="detail-section-title mb-3"><div className="detail-section-icon"><i className="bi bi-send-fill"></i></div><span>Trip Summary</span></h4>
                        <div className="detail-info-grid">
                          {[
                            { l: "Trip Type", v: booking.tripType }, { l: "Travelers", v: booking.travelers },
                            { l: "Destination", v: booking.destination }, { l: "Class", v: booking.class },
                            { l: "Travel Dates", v: booking.travelDates }, { l: "Sales Executive", v: booking.salesExecutive },
                            { l: "Duration", v: booking.duration }, { l: "Booking Status", v: booking.bookingStatus, badge: true },
                          ].map((r, i) => (
                            <div className="detail-info-item" key={i}><label>{r.l}</label>{r.badge ? <span className="confirmed-badge d-inline-block mt-1">{r.v}</span> : <span>{r.v}</span>}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="section-card border border-light p-4 h-100">
                        <h4 className="detail-section-title mb-3"><div className="detail-section-icon"><i className="bi bi-currency-dollar"></i></div><span>Price Summary</span></h4>
                        <div className="d-flex flex-column">
                          <div className="price-row"><span>Base Amount</span><span className="text-dark fw-600">${booking.baseAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span></div>
                          <div className="price-row"><span>Discount</span><span className="text-success fw-700">-${booking.discount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span></div>
                          <div className="price-row"><span>Tax</span><span className="text-dark fw-600">${booking.tax.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span></div>
                          <div className="price-row total-row"><span>Total Amount</span><span>${booking.totalAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span></div>
                          <div className="price-row mt-2" style={{ fontSize: "0.82rem" }}><span>Amount Paid</span><span className="text-success fw-700">${booking.amountPaid.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span></div>
                          <div className="price-row" style={{ fontSize: "0.82rem" }}><span>Balance</span><span className={`fw-700 ${booking.balance === 0 ? "text-success" : "text-danger"}`}>${booking.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Services Booked + Travelers */}
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <div className="section-card border border-light p-4 h-100">
                        <h4 className="detail-section-title mb-3"><div className="detail-section-icon"><i className="bi bi-calendar-check-fill"></i></div><span>Services Booked</span></h4>
                        <div className="d-flex flex-column">
                          {booking.services.map((s, i) => (
                            <div className="service-booked-row" key={i}>
                              <div className="d-flex align-items-center gap-3">
                                <div className="service-booked-icon"><i className={`bi ${s.icon} text-dark`}></i></div>
                                <div><span className="fw-700 text-dark d-block" style={{ fontSize: "0.88rem" }}>{s.type}</span><span className="text-secondary d-block fw-500 mt-1" style={{ fontSize: "0.82rem" }}>{s.description}</span><span className="text-secondary d-block" style={{ fontSize: "0.68rem", opacity: 0.8 }}>{s.details}</span></div>
                              </div>
                              <div className="d-flex align-items-center gap-3"><span className="fw-700 text-dark" style={{ fontSize: "0.88rem" }}>${s.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span><i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.85rem" }}></i></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="section-card border border-light p-4 h-100">
                        <h4 className="detail-section-title mb-3"><div className="detail-section-icon"><i className="bi bi-people-fill"></i></div><span>Travelers ({booking.travelers})</span></h4>
                        <div className="d-flex flex-column gap-2" style={{ maxHeight: "250px", overflowY: "auto" }}>
                          {booking.travelersList.map((t, idx) => (
                            <div className="traveler-card p-3 mb-2" key={t.id}>
                              <div className="d-flex align-items-center gap-2 mb-2"><div className="traveler-number" style={{ width: "20px", height: "20px", fontSize: "0.65rem" }}>{idx + 1}</div><span className="fw-700 text-dark" style={{ fontSize: "0.85rem" }}>{t.title} {t.firstName} {t.lastName}</span>{t.isLead && <span className="badge px-2 py-1 rounded-1 fw-700" style={{ fontSize: "0.58rem", backgroundColor: "#FEF7ED", color: "#B97C2B" }}>Lead Traveler</span>}</div>
                              <div className="traveler-info-row" style={{ fontSize: "0.78rem" }}><i className="bi bi-card-heading"></i><span>Passport: {t.passport}</span></div>
                              <div className="traveler-info-row" style={{ fontSize: "0.78rem" }}><i className="bi bi-globe"></i><span>Nationality: {t.nationality}</span></div>
                              <div className="traveler-info-row" style={{ fontSize: "0.78rem" }}><i className="bi bi-envelope"></i><span>Email: {t.email}</span></div>
                              <div className="traveler-info-row" style={{ fontSize: "0.78rem" }}><i className="bi bi-telephone"></i><span>Phone: {t.phone}</span></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Special Requests + Booking Notes */}
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <div className="section-card border border-light p-4 h-100">
                        <h4 className="detail-section-title mb-3"><div className="detail-section-icon" style={{ backgroundColor: "#FEF7ED", color: "#B97C2B" }}><i className="bi bi-star-fill"></i></div><span>Special Requests</span></h4>
                        <p className="text-secondary fw-500 mb-0" style={{ fontSize: "0.85rem" }}>{booking.specialRequests}</p>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="section-card border border-light p-4 h-100">
                        <h4 className="detail-section-title mb-3"><div className="detail-section-icon" style={{ backgroundColor: "#FEF7ED", color: "#B97C2B" }}><i className="bi bi-journal-text"></i></div><span>Booking Notes</span></h4>
                        <p className="text-secondary fw-500 mb-0" style={{ fontSize: "0.85rem" }}>{booking.bookingNotes}</p>
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Tags + Blue Info Banner */}
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <div className="section-card border border-light p-4 h-100">
                        <h4 className="detail-section-title mb-3"><div className="detail-section-icon" style={{ backgroundColor: "#ECEFFE", color: "#5D59E1" }}><i className="bi bi-tags-fill"></i></div><span>Tags</span></h4>
                        <div className="d-flex flex-wrap gap-2">{booking.tags.map(t => <span key={t} className="tag-pill">{t}</span>)}<button className="tag-add-btn">+ Add Tag</button></div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="info-banner h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#E6F0FF", borderColor: "#B5D1FF", color: "#0A58CA" }}>
                        <div>
                          <i className="bi bi-info-circle-fill me-2 fs-5"></i>
                          <span>You can manage this booking, send itinerary, download documents and track all activities from this page.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Area (4 Columns) */}
                <div className="col-12 col-lg-4">
                  <div className="d-flex flex-column gap-3">
                    <div className="section-card border border-light p-4">
                      <h4 className="text-secondary uppercase mb-3 text-uppercase font-monospace" style={{ fontSize: "0.72rem", letterSpacing: "0.7px", fontWeight: "700" }}>Customer Information</h4>
                      <div className="d-flex align-items-start gap-3">
                        <div className="rounded-circle d-flex align-items-center justify-content-center fw-700" style={{ width: "48px", height: "48px", backgroundColor: "#E9F4EE", color: "#1E6C45", fontSize: "1.05rem", flexShrink: 0 }}>{booking.customer.initials}</div>
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center gap-2">
                            <span className="fw-700 text-dark fs-6">{booking.customer.name}</span>
                            <span className="badge rounded-pill text-success bg-light border border-success-subtle fw-700" style={{ fontSize: "0.65rem", padding: "0.15rem 0.4rem" }}>Active</span>
                          </div>
                          <div className="mt-2">
                            <div className="sb-info-item"><i className="bi bi-envelope"></i><span>{booking.customer.email}</span></div>
                            <div className="sb-info-item"><i className="bi bi-telephone"></i><span className="d-flex align-items-center gap-1"><span>{booking.customer.phone}</span><i className="bi bi-whatsapp text-success" style={{ fontSize: "0.85rem", cursor: "pointer" }}></i></span></div>
                            <div className="sb-info-item"><i className="bi bi-geo-alt"></i><span>{booking.customer.location}</span></div>
                          </div>
                        </div>
                      </div>
                      <button className="btn btn-outline-secondary bg-white border rounded-3 w-100 mt-3 fw-600 d-flex align-items-center justify-content-center gap-2" style={{ height: "38px", fontSize: "0.82rem" }} onClick={() => router.push("/customers")}>View Customer Profile</button>
                    </div>

                    <div className="section-card border border-light p-4">
                      <h4 className="text-secondary uppercase mb-3 text-uppercase font-monospace d-flex align-items-center gap-2" style={{ fontSize: "0.72rem", letterSpacing: "0.7px", fontWeight: "700" }}><div className="detail-section-icon" style={{ width: "28px", height: "28px", fontSize: "0.8rem" }}><i className="bi bi-credit-card-fill"></i></div>Payment Information</h4>
                      <div className="d-flex flex-column gap-2">
                        <div className="d-flex justify-content-between" style={{ fontSize: "0.82rem" }}><span className="text-secondary fw-500">Payment Method</span><span className="text-dark fw-600">{booking.payment.method}</span></div>
                        <div className="d-flex justify-content-between" style={{ fontSize: "0.82rem" }}><span className="text-secondary fw-500">Payment Status</span><span className="confirmed-badge">{booking.payment.status}</span></div>
                        <div className="d-flex justify-content-between" style={{ fontSize: "0.82rem" }}><span className="text-secondary fw-500">Amount Paid</span><span className="text-dark fw-700">${booking.payment.amountPaid.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span></div>
                        <div className="d-flex justify-content-between" style={{ fontSize: "0.82rem" }}><span className="text-secondary fw-500">Paid On</span><span className="text-dark fw-600">{booking.payment.paidOn}</span></div>
                        <div className="d-flex justify-content-between" style={{ fontSize: "0.82rem" }}><span className="text-secondary fw-500">Transaction ID</span><span className="text-dark fw-600">{booking.payment.transactionId}</span></div>
                      </div>
                      <button className="btn btn-outline-secondary bg-white border rounded-3 w-100 mt-3 fw-600 d-flex align-items-center justify-content-center gap-2" style={{ height: "38px", fontSize: "0.82rem" }}>View Payment Details</button>
                    </div>

                    <div className="section-card border border-light p-4">
                      <h4 className="text-secondary uppercase mb-3 text-uppercase font-monospace d-flex align-items-center gap-2" style={{ fontSize: "0.72rem", letterSpacing: "0.7px", fontWeight: "700" }}><i className="bi bi-lightning-fill" style={{ fontSize: "0.85rem" }}></i>Booking Actions</h4>
                      <div className="d-flex flex-column">
                        <div className="action-item" onClick={() => router.push("/bookings/new")}><span><i className="bi bi-pencil action-icon"></i> Edit Booking</span><i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.7rem" }}></i></div>
                        <div className="action-item"><span><i className="bi bi-calendar-plus action-icon"></i> Add Follow Up</span><i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.7rem" }}></i></div>
                        <div className="action-item"><span><i className="bi bi-copy action-icon"></i> Duplicate Booking</span><i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.7rem" }}></i></div>
                        <div className="action-item"><span><i className="bi bi-x-circle action-icon"></i> Cancel Booking</span><i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.7rem" }}></i></div>
                        <div className="action-item danger"><span><i className="bi bi-trash action-icon"></i> Delete Booking</span><i className="bi bi-chevron-right" style={{ fontSize: "0.7rem" }}></i></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ════════════════════════ ITINERARY TAB ════════════════════════ */}
            {activeTab === "Itinerary" && (
              <div className="row g-3">
                <div className="col-12 col-xl-9">
                  <div className="d-flex flex-column gap-3">
                    {/* Quick info strip */}
                    <div className="section-card border border-light p-3">
                      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                        <div className="d-flex flex-wrap gap-4">
                          {[
                            { icon: "bi-geo-alt", label: "Destination", val: booking.destination },
                            { icon: "bi-clock", label: "Duration", val: booking.duration },
                            { icon: "bi-calendar3", label: "Travel Dates", val: booking.travelDates },
                            { icon: "bi-people", label: "Travelers", val: booking.travelers },
                          ].map((r, i) => (
                            <div className="d-flex align-items-center gap-2" key={i}>
                              <div className="detail-section-icon" style={{ width: "28px", height: "28px", fontSize: "0.8rem" }}><i className={`bi ${r.icon}`}></i></div>
                              <div><span className="text-secondary d-block" style={{ fontSize: "0.68rem", fontWeight: 600 }}>{r.label}</span><span className="text-dark fw-700" style={{ fontSize: "0.82rem" }}>{r.val}</span></div>
                            </div>
                          ))}
                        </div>
                        <button className="btn btn-outline-secondary bg-white border rounded-3 d-flex align-items-center gap-2 fw-600" style={{ height: "36px", fontSize: "0.82rem" }}><i className="bi bi-download"></i>Download Itinerary<i className="bi bi-chevron-down" style={{ fontSize: "0.6rem" }}></i></button>
                      </div>
                    </div>

                    {/* Timeline items */}
                    {itineraryItems.map((item, idx) => (
                      <div className="d-flex gap-3 align-items-start" key={idx}>
                        {/* Day badge */}
                        <div className="itin-day-badge">
                          <div className="itin-day-circle"><span>DAY</span><span style={{ fontSize: "0.85rem" }}>{item.day}</span></div>
                          <div className="itin-day-date">{item.date}</div>
                          <div className="itin-day-name">{item.dayName}</div>
                        </div>
                        {/* Card */}
                        <div className="itin-card">
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <div className="d-flex align-items-center gap-2">
                              <span className="itin-type-badge">{item.type}</span>
                              <span className="itin-status confirmed">{item.status}</span>
                            </div>
                            <div className="d-flex gap-1">
                              <button className="itin-action-btn"><i className="bi bi-pencil"></i></button>
                              <button className="itin-action-btn"><i className="bi bi-three-dots"></i></button>
                            </div>
                          </div>

                          {/* Flight */}
                          {item.type === "Flight" && item.flight && (
                            <div className="d-flex flex-wrap align-items-center gap-4">
                              <div className="itin-flight-line">
                                <div className="itin-flight-point"><h5>{item.flight.from}</h5><span>{item.flight.fromCity}</span><span className="text-dark fw-700 d-block mt-1" style={{ fontSize: "0.88rem" }}>{item.flight.depTime}</span></div>
                                <div className="itin-flight-duration"><span>{item.flight.duration}</span><div className="itin-flight-bar"></div><span>{item.flight.stops}</span></div>
                                <div className="itin-flight-point"><h5>{item.flight.to}</h5><span>{item.flight.toCity}</span><span className="text-dark fw-700 d-block mt-1" style={{ fontSize: "0.88rem" }}>{item.flight.arrTime} {item.flight.plusOne && <sup className="text-danger fw-700" style={{ fontSize: "0.6rem" }}>+1</sup>}</span></div>
                              </div>
                              <div className="d-flex align-items-center gap-2 ms-auto">
                                <div className="itin-carrier-logo" style={{ backgroundColor: item.flight.carrierBg }}>{item.flight.carrier.substring(0, 2).toUpperCase()}</div>
                                <div><span className="text-dark fw-700 d-block" style={{ fontSize: "0.82rem" }}>{item.flight.carrier}</span><span className="text-secondary" style={{ fontSize: "0.72rem" }}>{item.flight.code}</span></div>
                              </div>
                              <div className="ms-3"><span className="text-secondary d-block" style={{ fontSize: "0.68rem" }}>Class</span><span className="text-dark fw-600" style={{ fontSize: "0.82rem" }}>{item.flight.classType}</span></div>
                              <div><span className="text-secondary d-block" style={{ fontSize: "0.68rem" }}>&nbsp;</span><span className="text-dark fw-600" style={{ fontSize: "0.82rem" }}>{item.flight.passengers}</span></div>
                            </div>
                          )}

                          {/* Hotel */}
                          {item.type === "Hotel" && item.hotel && (
                            <div className="d-flex flex-wrap gap-4 align-items-center">
                              <div><span className="text-dark fw-700" style={{ fontSize: "0.88rem" }}>{item.hotel.name}</span> <span className="star-rating">{"★".repeat(item.hotel.stars)}</span><div className="text-secondary" style={{ fontSize: "0.72rem" }}>{item.hotel.location}</div></div>
                              <div><span className="itin-detail-label">Check-in</span><span className="itin-detail-value">{item.hotel.checkIn}</span></div>
                              <div><span className="itin-detail-label">Check-out</span><span className="itin-detail-value">{item.hotel.checkOut}</span></div>
                              <div><span className="itin-detail-label">Nights</span><span className="itin-detail-value">{item.hotel.nights}</span></div>
                              <div><span className="itin-detail-label">Rooms</span><span className="itin-detail-value">{item.hotel.rooms}</span></div>
                            </div>
                          )}

                          {/* Activity */}
                          {item.type === "Activity" && item.activity && (
                            <div className="d-flex flex-wrap gap-4 align-items-center">
                              <span className="text-dark fw-700" style={{ fontSize: "0.88rem" }}>{item.activity.name}</span>
                              <span className="text-secondary fw-600" style={{ fontSize: "0.82rem" }}>{item.activity.time}</span>
                              <span className="text-secondary fw-600" style={{ fontSize: "0.82rem" }}>{item.activity.passengers}</span>
                            </div>
                          )}

                          {/* Transfer */}
                          {item.type === "Transfer" && item.transfer && (
                            <div className="d-flex flex-wrap gap-4 align-items-center">
                              <div><span className="text-dark fw-700 d-block" style={{ fontSize: "0.88rem" }}>{item.transfer.name}</span><span className="text-secondary" style={{ fontSize: "0.72rem" }}>{item.transfer.subType}</span></div>
                              <div><span className="itin-detail-label">Pick-up Time</span><span className="itin-detail-value">{item.transfer.pickupTime}</span></div>
                              <div><span className="itin-detail-label">Vehicle Type</span><span className="itin-detail-value">{item.transfer.vehicleType}</span></div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Important Notes */}
                    <div className="section-card border border-light p-4">
                      <h5 className="fw-700 text-dark mb-2" style={{ fontSize: "0.88rem" }}><i className="bi bi-exclamation-circle-fill text-success me-2"></i>Important Notes</h5>
                      <ul className="mb-0 ps-3 text-secondary" style={{ fontSize: "0.82rem" }}>
                        <li>Please carry a valid passport with at least 6 months validity.</li>
                        <li>Check-in time at hotel is 02:00 PM and check-out time is 12:00 PM.</li>
                        <li>Contact our 24/7 support for any travel assistance.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                {renderRightSidebar()}
              </div>
            )}

            {/* ════════════════════════ HISTORY TAB ════════════════════════ */}
            {activeTab === "History" && (
              <div className="row g-3">
                <div className="col-12 col-xl-9">
                  <div className="section-card border border-light p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div><h4 className="fw-700 text-dark mb-0" style={{ fontSize: "1.05rem" }}>Activity Timeline</h4><span className="text-secondary" style={{ fontSize: "0.78rem" }}>Complete activity history of this booking</span></div>
                      <div className="d-flex gap-2">
                        <button className="btn btn-outline-secondary bg-white border rounded-3 d-flex align-items-center gap-2 fw-600" style={{ height: "36px", fontSize: "0.82rem" }}><i className="bi bi-funnel"></i>Filters</button>
                        <button className="btn btn-outline-secondary bg-white border rounded-3 d-flex align-items-center gap-2 fw-600" style={{ height: "36px", fontSize: "0.82rem" }}><i className="bi bi-calendar3"></i>All Time<i className="bi bi-chevron-down" style={{ fontSize: "0.6rem" }}></i></button>
                      </div>
                    </div>

                    <div className="table-responsive">
                      <table className="table table-hover align-middle mb-0">
                        <thead><tr className="border-bottom border-light">
                          <th className="pb-3" style={{ width: 30 }}></th>
                          <th className="lablename pb-3" style={{ textTransform: "uppercase" }}>Activity</th>
                          <th className="lablename pb-3" style={{ textTransform: "uppercase" }}>Details</th>
                          <th className="lablename pb-3" style={{ textTransform: "uppercase" }}>Performed By</th>
                          <th className="lablename pb-3" style={{ textTransform: "uppercase" }}>Date & Time</th>
                          <th className="lablename pb-3" style={{ textTransform: "uppercase" }}>IP Address</th>
                        </tr></thead>
                        <tbody>
                          {pagedHistory.map((h, i) => (
                            <tr key={i} className="border-bottom border-light">
                              <td style={{ padding: "0.85rem 0.5rem" }}><div className="history-icon-box" style={{ backgroundColor: h.iconBg, color: h.iconColor }}><i className={`bi ${h.icon}`}></i></div></td>
                              <td style={{ padding: "0.85rem 0.5rem" }}><span className="fw-700 text-dark d-block" style={{ fontSize: "0.85rem" }}>{h.activity}</span><span className="text-secondary" style={{ fontSize: "0.72rem" }}>{h.desc}</span></td>
                              <td style={{ padding: "0.85rem 0.5rem", maxWidth: "220px" }}><span className="text-secondary" style={{ fontSize: "0.78rem", whiteSpace: "pre-line" }}>{h.details}</span></td>
                              <td style={{ padding: "0.85rem 0.5rem" }}>
                                <div className="d-flex align-items-center gap-2">
                                  <div className="rounded-circle d-flex align-items-center justify-content-center fw-700" style={{ width: 28, height: 28, backgroundColor: "#E9F4EE", color: "#1E6C45", fontSize: "0.65rem", flexShrink: 0 }}>{h.performedBy.split(" ").map(n => n[0]).join("")}</div>
                                  <div><span className="text-dark fw-600 d-block" style={{ fontSize: "0.82rem" }}>{h.performedBy}</span><span className="text-secondary" style={{ fontSize: "0.68rem" }}>{h.role}</span></div>
                                </div>
                              </td>
                              <td style={{ padding: "0.85rem 0.5rem", whiteSpace: "nowrap" }}><span className="text-dark fw-600 d-block" style={{ fontSize: "0.82rem" }}>{h.date}</span><span className="text-secondary" style={{ fontSize: "0.68rem" }}>{h.time}</span></td>
                              <td className="text-secondary fw-500" style={{ padding: "0.85rem 0.5rem", fontSize: "0.82rem" }}>{h.ip}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-2">
                      <span className="text-secondary" style={{ fontSize: "0.82rem" }}>Showing 1 to {pagedHistory.length} of {historyActivities.length} activities</span>
                      <div className="d-flex align-items-center gap-2">
                        <div className="detail-pagination">
                          <button className={`detail-page-btn ${historyPage <= 1 ? "disabled" : ""}`} onClick={() => historyPage > 1 && setHistoryPage(historyPage - 1)}><i className="bi bi-chevron-left" style={{ fontSize: "0.7rem" }}></i></button>
                          {Array.from({ length: historyTotalPages }, (_, i) => i + 1).map(p => (
                            <button key={p} className={`detail-page-btn ${p === historyPage ? "active" : ""}`} onClick={() => setHistoryPage(p)}>{p}</button>
                          ))}
                          <button className={`detail-page-btn ${historyPage >= historyTotalPages ? "disabled" : ""}`} onClick={() => historyPage < historyTotalPages && setHistoryPage(historyPage + 1)}><i className="bi bi-chevron-right" style={{ fontSize: "0.7rem" }}></i></button>
                        </div>
                        <select className="form-select py-1" style={{ height: "32px", fontSize: "0.78rem", width: "auto" }}><option>10 / page</option><option>20 / page</option></select>
                      </div>
                    </div>
                  </div>
                </div>
                {renderRightSidebar()}
              </div>
            )}

            {/* ════════════════════════ PAYMENTS TAB ════════════════════════ */}
            {activeTab === "Payments" && (
              <div className="row g-3">
                <div className="col-12 col-xl-9">
                  <div className="d-flex flex-column gap-3">
                    {/* Payment Summary strip */}
                    <div className="section-card border border-light p-4">
                      <h4 className="fw-700 text-dark mb-3" style={{ fontSize: "1.05rem" }}>Payment Summary</h4>
                      <div className="d-flex flex-wrap align-items-center gap-4">
                        <div className="pay-summary-card"><span className="pay-summary-label">Total Amount</span><span className="pay-summary-val">${paymentSummary.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span></div>
                        <div className="pay-summary-card"><span className="pay-summary-label">Amount Paid</span><span className="pay-summary-val text-success">${paymentSummary.paid.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span></div>
                        <div className="pay-summary-card"><span className="pay-summary-label">Balance Amount</span><span className="pay-summary-val text-danger">${paymentSummary.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span></div>
                        <div className="pay-summary-card"><span className="pay-summary-label">Next Due Amount</span><span className="pay-summary-val">${paymentSummary.nextDueAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span></div>
                        <div className="pay-summary-card"><span className="pay-summary-label">Next Due Date</span><span className="pay-summary-val">{paymentSummary.nextDueDate}</span></div>
                        {/* Progress ring */}
                        <div className="pay-progress-ring ms-auto">
                          <svg width="64" height="64" viewBox="0 0 64 64">
                            <circle cx="32" cy="32" r="28" fill="none" stroke="#F3F4F6" strokeWidth="4"></circle>
                            <circle cx="32" cy="32" r="28" fill="none" stroke="#1E6C45" strokeWidth="4" strokeDasharray={`${(paymentSummary.paidPercent / 100) * 175.93} 175.93`} strokeLinecap="round"></circle>
                          </svg>
                          <div className="pay-progress-label"><span className="fw-700 text-dark" style={{ fontSize: "0.72rem" }}>{paymentSummary.paidPercent}%</span><span className="d-block text-secondary" style={{ fontSize: "0.55rem" }}>Paid</span></div>
                        </div>
                      </div>
                    </div>

                    {/* Transactions table */}
                    <div className="section-card border border-light p-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="fw-700 text-dark mb-0" style={{ fontSize: "1.05rem" }}>Payment Transactions</h4>
                        <button className="btn btn-outline-secondary bg-white border rounded-3 d-flex align-items-center gap-2 fw-600" style={{ height: "36px", fontSize: "0.82rem" }}><i className="bi bi-funnel"></i>Filters</button>
                      </div>

                      <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                          <thead><tr className="border-bottom border-light">
                            <th className="lablename pb-3" style={{ textTransform: "uppercase" }}>Date</th>
                            <th className="lablename pb-3" style={{ textTransform: "uppercase" }}>Payment ID</th>
                            <th className="lablename pb-3" style={{ textTransform: "uppercase" }}>Payment Method</th>
                            <th className="lablename pb-3" style={{ textTransform: "uppercase" }}>Description</th>
                            <th className="lablename pb-3" style={{ textTransform: "uppercase" }}>Amount</th>
                            <th className="lablename pb-3" style={{ textTransform: "uppercase" }}>Status</th>
                            <th className="lablename pb-3" style={{ textTransform: "uppercase" }}>Receipt</th>
                            <th className="lablename pb-3" style={{ textTransform: "uppercase" }}>Actions</th>
                          </tr></thead>
                          <tbody>
                            {pagedPayments.map((p, i) => {
                              const sc = STATUS_COLORS[p.status] || { bg: "#F3F4F6", color: "#6B7280" };
                              return (
                                <tr key={i} className="border-bottom border-light">
                                  <td style={{ padding: "0.85rem 0.5rem", whiteSpace: "nowrap" }}><span className="text-dark fw-600 d-block" style={{ fontSize: "0.82rem" }}>{p.date}</span>{p.time && <span className="text-secondary" style={{ fontSize: "0.68rem" }}>{p.time}</span>}</td>
                                  <td className="text-dark fw-700" style={{ padding: "0.85rem 0.5rem", fontSize: "0.82rem" }}>{p.id}</td>
                                  <td style={{ padding: "0.85rem 0.5rem" }}>
                                    <div className="d-flex align-items-center gap-2">
                                      <div className="pay-method-icon" style={{ backgroundColor: p.methodBg, color: p.methodColor }}><i className={`bi ${p.methodIcon}`}></i></div>
                                      <div><span className="text-dark fw-600 d-block" style={{ fontSize: "0.82rem" }}>{p.method}</span>{p.methodSub && <span className="text-secondary" style={{ fontSize: "0.68rem" }}>{p.methodSub}</span>}</div>
                                    </div>
                                  </td>
                                  <td style={{ padding: "0.85rem 0.5rem" }}><span className="text-dark fw-600 d-block" style={{ fontSize: "0.82rem" }}>{p.description}</span><span className="text-secondary" style={{ fontSize: "0.68rem" }}>{p.descSub}</span></td>
                                  <td className="text-dark fw-700" style={{ padding: "0.85rem 0.5rem", fontSize: "0.85rem" }}>${p.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                                  <td style={{ padding: "0.85rem 0.5rem" }}><span className="pay-status-badge" style={{ backgroundColor: sc.bg, color: sc.color }}>{p.status}</span></td>
                                  <td style={{ padding: "0.85rem 0.5rem" }}>{p.status === "Paid" ? <button className="btn btn-outline-light border rounded-3 p-1 text-secondary" style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center" }}><i className="bi bi-download" style={{ fontSize: "0.8rem" }}></i></button> : <span className="text-secondary" style={{ fontSize: "0.82rem" }}>—</span>}</td>
                                  <td style={{ padding: "0.85rem 0.5rem" }}><button className="btn btn-outline-light border rounded-3 p-1 text-secondary" style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center" }}><i className="bi bi-three-dots" style={{ fontSize: "0.8rem" }}></i></button></td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination */}
                      <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-2">
                        <span className="text-secondary" style={{ fontSize: "0.82rem" }}>Showing 1 to {pagedPayments.length} of {paymentTransactions.length} transactions</span>
                        <div className="d-flex align-items-center gap-2">
                          <div className="detail-pagination">
                            <button className={`detail-page-btn ${paymentsPage <= 1 ? "disabled" : ""}`} onClick={() => paymentsPage > 1 && setPaymentsPage(paymentsPage - 1)}><i className="bi bi-chevron-left" style={{ fontSize: "0.7rem" }}></i></button>
                            {Array.from({ length: payTotalPages }, (_, i) => i + 1).map(p => (
                              <button key={p} className={`detail-page-btn ${p === paymentsPage ? "active" : ""}`} onClick={() => setPaymentsPage(p)}>{p}</button>
                            ))}
                            <button className={`detail-page-btn ${paymentsPage >= payTotalPages ? "disabled" : ""}`} onClick={() => paymentsPage < payTotalPages && setPaymentsPage(paymentsPage + 1)}><i className="bi bi-chevron-right" style={{ fontSize: "0.7rem" }}></i></button>
                          </div>
                          <select className="form-select py-1" style={{ height: "32px", fontSize: "0.78rem", width: "auto" }}><option>10 / page</option><option>20 / page</option></select>
                        </div>
                      </div>
                    </div>

                    {/* Payment note bar */}
                    <div className="pay-note-bar">
                      <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-info-circle-fill text-warning" style={{ fontSize: "1rem" }}></i>
                        <span className="text-secondary fw-500" style={{ fontSize: "0.82rem" }}><strong className="text-dark">Note:</strong> Next payment of <strong className="text-dark">${paymentSummary.nextDueAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong> is due on <strong className="text-dark">{paymentSummary.nextDueDate}</strong>.</span>
                      </div>
                      <button className="btn text-white rounded-3 px-3 fw-600 d-flex align-items-center gap-2" style={{ backgroundColor: "#112E24", height: "38px", fontSize: "0.82rem" }}><i className="bi bi-send"></i>Send Payment Reminder</button>
                    </div>
                  </div>
                </div>
                {renderRightSidebar()}
              </div>
            )}

            {/* ════════════════════════ OTHER TABS (placeholder) ════════════════════════ */}
            {!["Booking Overview", "Itinerary", "History", "Payments"].includes(activeTab) && (
              <div className="row g-3">
                <div className="col-12 col-xl-9">
                  <div className="section-card border border-light p-5 text-center">
                    <i className="bi bi-journal-text text-secondary d-block mb-2" style={{ fontSize: "2rem" }}></i>
                    <h5 className="text-dark fw-700 mb-1">{activeTab}</h5>
                    <p className="text-secondary mb-0" style={{ fontSize: "0.85rem" }}>This section will display {activeTab.toLowerCase()} details for booking {bookingId}.</p>
                  </div>
                </div>
                {renderRightSidebar()}
              </div>
            )}

          </main>
          <Footer />
        </div>

        {sidebarOpen && (
          <div className="position-fixed top-0 start-0 w-100 h-100 d-lg-none" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)", zIndex: 995 }} onClick={toggleSidebar}></div>
        )}
      </div>
    </>
  );
}
