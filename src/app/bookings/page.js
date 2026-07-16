"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Custom styles for the bookings list page
const BOOKING_STATUS_STYLES = {
  Confirmed: { bg: "#E9F4EE", color: "#1E6C45" },
  Completed: { bg: "#E6F0FF", color: "#0A58CA" },
  Cancelled: { bg: "#FCEAEA", color: "#D05E5E" },
};

const initialBookings = [
  {
    id: "BK-1256",
    customer: { name: "John Doe", id: "CUST-1024", initials: "JD", color: "#E9F4EE", textColor: "#1E6C45" },
    destination: { name: "Bali, Indonesia", flag: "https://flagcdn.com/w40/id.png", type: "Leisure Trip" },
    dates: "20 Jun 2025 - 25 Jun 2025",
    travelers: "2 Adults",
    amount: "$2,450",
    status: "Confirmed",
    bookingDate: "18 May 2025",
    nextAction: { icon: "bi-calendar3", text: "Send Itinerary", subtext: "20 May 2025" }
  },
  {
    id: "BK-1132",
    customer: { name: "Sarah Mitchell", id: "CUST-0987", initials: "SM", color: "#F3E8FF", textColor: "#6D28D9" },
    destination: { name: "Dubai, UAE", flag: "https://flagcdn.com/w40/ae.png", type: "Family Vacation" },
    dates: "15 Apr 2025 - 20 Apr 2025",
    travelers: "2 Adults",
    amount: "$3,280",
    status: "Completed",
    bookingDate: "16 May 2025",
    nextAction: { icon: "bi-telephone", text: "Follow Up", subtext: "—" }
  },
  {
    id: "BK-0987",
    customer: { name: "Ahmed Raza", id: "CUST-0761", initials: "AR", color: "#FEF7ED", textColor: "#B97C2B" },
    destination: { name: "Singapore", flag: "https://flagcdn.com/w40/sg.png", type: "Business Trip" },
    dates: "10 Mar 2025 - 13 Mar 2025",
    travelers: "1 Adult",
    amount: "$1,120",
    status: "Completed",
    bookingDate: "01 Mar 2025",
    nextAction: { icon: "bi-star", text: "Review", subtext: "Done" }
  },
  {
    id: "BK-0871",
    customer: { name: "Priya Patel", id: "CUST-0643", initials: "PP", color: "#E9F4EE", textColor: "#1E6C45" },
    destination: { name: "Bangkok, Thailand", flag: "https://flagcdn.com/w40/th.png", type: "Leisure Trip" },
    dates: "05 Feb 2025 - 09 Feb 2025",
    travelers: "2 Adults",
    amount: "$2,360",
    status: "Completed",
    bookingDate: "28 Jan 2025",
    nextAction: { icon: "bi-star", text: "Review", subtext: "Done" }
  },
  {
    id: "BK-0756",
    customer: { name: "Laura Wilson", id: "CUST-0598", initials: "LW", color: "#ECEFFE", textColor: "#5D59E1" },
    destination: { name: "London, UK", flag: "https://flagcdn.com/w40/gb.png", type: "Vacation" },
    dates: "10 Jan 2025 - 15 Jan 2025",
    travelers: "2 Adults",
    amount: "$3,240",
    status: "Completed",
    bookingDate: "02 Jan 2025",
    nextAction: { icon: "bi-telephone", text: "Follow Up", subtext: "—" }
  },
  {
    id: "BK-0654",
    customer: { name: "Vikram Chandra", id: "CUST-0472", initials: "VC", color: "#FDF0F0", textColor: "#D05E5E" },
    destination: { name: "Maldives", flag: "https://flagcdn.com/w40/mv.png", type: "Honeymoon Trip" },
    dates: "20 Aug 2024 - 24 Aug 2024",
    travelers: "2 Adults",
    amount: "$4,560",
    status: "Cancelled",
    bookingDate: "15 Aug 2024",
    nextAction: { icon: "bi-arrow-counterclockwise", text: "Refund", subtext: "Completed" }
  },
  {
    id: "BK-0541",
    customer: { name: "Nopporn Thitipong", id: "CUST-0391", initials: "NT", color: "#ECEFFE", textColor: "#5D59E1" },
    destination: { name: "Paris, France", flag: "https://flagcdn.com/w40/fr.png", type: "Anniversary Trip" },
    dates: "12 Jun 2024 - 17 Jun 2024",
    travelers: "2 Adults",
    amount: "$2,890",
    status: "Completed",
    bookingDate: "20 May 2024",
    nextAction: { icon: "bi-star", text: "Review", subtext: "Done" }
  },
  {
    id: "BK-0423",
    customer: { name: "Emma Clark", id: "CUST-0287", initials: "EC", color: "#FDF0F0", textColor: "#D05E5E" },
    destination: { name: "Tokyo, Japan", flag: "https://flagcdn.com/w40/jp.png", type: "Business Trip" },
    dates: "05 Apr 2024 - 10 Apr 2024",
    travelers: "1 Adult",
    amount: "$1,550",
    status: "Completed",
    bookingDate: "25 Mar 2024",
    nextAction: { icon: "bi-telephone", text: "Follow Up", subtext: "—" }
  }
];

export default function BookingsPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [activeTab, setActiveTab] = useState("All Bookings");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const stats = [
    { label: "Total Bookings", value: "128", trend: "All time", icon: "bi-calendar3", bgColor: "#E9F4EE", iconColor: "#1E6C45" },
    { label: "Total Revenue", value: "$245,680", trend: "All time", icon: "bi-currency-dollar", bgColor: "#ECEFFE", iconColor: "#5D59E1" },
    { label: "Upcoming Trips", value: "32", trend: "Next 90 days", icon: "bi-airplane", bgColor: "#FEF7ED", iconColor: "#B97C2B" },
    { label: "Completed Trips", value: "86", trend: "All time", icon: "bi-check-circle", bgColor: "#FDF0F0", iconColor: "#D05E5E" },
  ];

  // Filtering Logic
  const filteredBookings = useMemo(() => {
    return initialBookings.filter(b => {
      // 1. Tab filter
      if (activeTab === "Upcoming" && b.status !== "Confirmed") return false;
      if (activeTab === "Completed" && b.status !== "Completed") return false;
      if (activeTab === "Cancelled" && b.status !== "Cancelled") return false;
      // In Progress
      if (activeTab === "In Progress" && b.status !== "Confirmed") return false;

      // 2. Status Dropdown filter
      if (statusFilter !== "All Status" && b.status !== statusFilter) return false;

      // 3. Search query filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          b.id.toLowerCase().includes(q) ||
          b.customer.name.toLowerCase().includes(q) ||
          b.destination.name.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeTab, statusFilter, searchQuery]);

  const handleSelectAll = () => {
    const ids = filteredBookings.map(b => b.id);
    const allSel = ids.every(id => selectedIds.includes(id));
    setSelectedIds(allSel ? selectedIds.filter(id => !ids.includes(id)) : [...new Set([...selectedIds, ...ids])]);
  };

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
        .booking-tab-btn { background: none; border: none; border-bottom: 2.5px solid transparent; padding: 0.6rem 1rem; font-size: 0.88rem; font-weight: 700; color: var(--secondary); cursor: pointer; white-space: nowrap; transition: color 0.15s; }
        .booking-tab-btn.active { color: #112E24; border-bottom-color: #112E24; }
        .booking-tab-btn:hover:not(.active) { color: var(--dark); }
        .booking-next-action-box { display: flex; align-items: center; gap: 0.5rem; }
        .booking-next-action-icon { width: 28px; height: 28px; border-radius: 50%; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 0.8rem; color: var(--secondary); }
      `}</style>

      <div className="d-flex position-relative">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="app-container w-100 min-vh-100 d-flex flex-column justify-content-between">
          <Header
            toggleSidebar={toggleSidebar}
            title="Bookings"
            subtitle="Home > Bookings"
            forcePageHeaderLayout={true}
            searchPlaceholder="Search inquiries, customers, bookings, quotations..."
            actionButton={actionButton}
          />

          <main className="main-content d-flex flex-column gap-4 py-4">
            
            {/* Page Header Info */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-2">
              <div>
                <p className="text-secondary fs-7 mt-1 mb-0">View and manage all your bookings in one place.</p>
              </div>
            </div>

            {/* Stats row */}
            <div className="row row-cols-2 row-cols-sm-2 row-cols-lg-4 g-3">
              {stats.map((card, idx) => (
                <div className="col" key={idx}>
                  <div className="dashboard-card border border-light">
                    <div className="dashboard-card-icon" style={{ backgroundColor: card.bgColor, color: card.iconColor }}>
                      <i className={`bi ${card.icon}`}></i>
                    </div>
                    <div className="dashboard-card-info">
                      <span className="dashboard-card-label">{card.label}</span>
                      <span className="dashboard-card-val">{card.value}</span>
                      <span className="text-secondary small mt-1" style={{ fontSize: "0.75rem", fontWeight: "500" }}>{card.trend}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Filters Row */}
            <div className="section-card border border-light p-3">
              <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
                <div className="d-flex flex-wrap gap-2 align-items-center flex-grow-1">
                  
                  {/* Search Bar inside Filters */}
                  <div className="position-relative" style={{ minWidth: "300px" }}>
                    <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" style={{ fontSize: "0.85rem" }}></i>
                    <input
                      type="text"
                      className="form-control rounded-3 border-light shadow-sm text-dark bg-white"
                      style={{ paddingLeft: "2.3rem", height: "42px", fontSize: "0.85rem" }}
                      placeholder="Search bookings by ID, destination, customer..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* Status Dropdown */}
                  <select
                    className="form-select rounded-3 border-light shadow-sm text-dark bg-white fw-600"
                    style={{ width: "auto", minWidth: "130px", height: "42px", fontSize: "0.85rem" }}
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                  >
                    <option value="All Status">All Status</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>

                  {/* Travel Dates Dropdown Mock */}
                  <div className="d-flex align-items-center gap-2 border rounded-3 border-light bg-white px-3 shadow-sm" style={{ height: "42px", fontSize: "0.85rem", cursor: "pointer", color: "#212529", fontWeight: 600 }}>
                    <i className="bi bi-calendar3 text-secondary"></i>
                    <span>Travel Dates</span>
                    <i className="bi bi-chevron-down text-secondary" style={{ fontSize: "0.7rem" }}></i>
                  </div>

                  {/* More Filters button */}
                  <button className="btn btn-outline-secondary bg-white border border-light shadow-sm rounded-3 d-flex align-items-center gap-2 fw-600" style={{ height: "42px", fontSize: "0.85rem" }}>
                    <i className="bi bi-sliders"></i>
                    <span>More Filters</span>
                  </button>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <button className="btn btn-light border border-light shadow-sm rounded-3 fw-600 d-flex align-items-center gap-2" style={{ height: "42px", fontSize: "0.85rem" }} onClick={() => { setSearchQuery(""); setStatusFilter("All Status"); }}>
                    <i className="bi bi-arrow-counterclockwise"></i> Reset
                  </button>
                  <button className="btn btn-light border border-light shadow-sm rounded-3 fw-600 d-flex align-items-center gap-2" style={{ height: "42px", fontSize: "0.85rem" }}>
                    <i className="bi bi-download"></i>
                    <span>Export</span>
                  </button>
                  <button 
                    className="btn text-white rounded-3 px-3 fw-600 d-flex align-items-center gap-2" 
                    style={{ backgroundColor: "#112E24", height: "42px", fontSize: "0.85rem" }}
                    onClick={() => router.push("/bookings/new")}
                  >
                    <i className="bi bi-plus-lg"></i>
                    <span>Add Booking</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bookings Tabs & Main Table */}
            <div className="section-card border border-light p-4">
              
              {/* Tab headers */}
              <div className="d-flex border-bottom border-light mb-3 overflow-auto">
                {["All Bookings", "Upcoming", "In Progress", "Completed", "Cancelled"].map(tab => (
                  <button
                    key={tab}
                    className={`booking-tab-btn ${activeTab === tab ? "active" : ""}`}
                    onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Bookings Table */}
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead>
                    <tr className="border-bottom border-light">
                      <th className="pb-3" style={{ width: 40 }}>
                        <input
                          type="checkbox"
                          className="form-check-input shadow-none"
                          checked={filteredBookings.length > 0 && filteredBookings.every(b => selectedIds.includes(b.id))}
                          onChange={handleSelectAll}
                        />
                      </th>
                      {["Booking ID", "Customer", "Destination", "Travel Dates", "Travelers", "Amount", "Status", "Booking Date", "Next Action", "Actions"].map(h => (
                        <th key={h} className="lablename pb-3" style={{ whiteSpace: "nowrap", textTransform: "uppercase" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((b) => {
                      const st = BOOKING_STATUS_STYLES[b.status] || { bg: "#F3F4F6", color: "#6B7280" };
                      return (
                        <tr
                          key={b.id}
                          className="border-bottom border-light"
                          style={{ cursor: "pointer" }}
                          onClick={() => router.push("/bookings/new")}
                        >
                          <td style={{ padding: "0.9rem 0.5rem" }} onClick={e => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              className="form-check-input shadow-none"
                              checked={selectedIds.includes(b.id)}
                              onChange={() => setSelectedIds(prev => prev.includes(b.id) ? prev.filter(x => x !== b.id) : [...prev, b.id])}
                            />
                          </td>
                          <td style={{ padding: "0.9rem 0.5rem" }}>
                            <span className="fw-700" style={{ color: "#1E6C45", fontSize: "0.85rem" }}>{b.id}</span>
                          </td>
                          <td style={{ padding: "0.9rem 0.5rem" }}>
                            <div className="d-flex align-items-center gap-2">
                              <div
                                className="rounded-circle d-flex align-items-center justify-content-center fw-700"
                                style={{ width: 34, height: 34, backgroundColor: b.customer.color, color: b.customer.textColor, fontSize: "0.8rem" }}
                              >
                                {b.customer.initials}
                              </div>
                              <div>
                                <span className="fw-700 text-dark d-block" style={{ fontSize: "0.85rem", lineHeight: 1.2 }}>{b.customer.name}</span>
                                <span className="text-secondary d-block" style={{ fontSize: "0.68rem" }}>{b.customer.id}</span>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: "0.9rem 0.5rem" }}>
                            <div className="d-flex align-items-center gap-2">
                              {b.destination.flag && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={b.destination.flag} alt={b.destination.name} className="rounded-1" style={{ width: 18, height: 12, objectFit: "cover" }} />
                              )}
                              <div>
                                <span className="fw-600 text-dark d-block" style={{ fontSize: "0.85rem", lineHeight: 1.2 }}>{b.destination.name}</span>
                                <span className="text-secondary d-block" style={{ fontSize: "0.68rem" }}>{b.destination.type}</span>
                              </div>
                            </div>
                          </td>
                          <td className="fw-600 text-secondary" style={{ padding: "0.9rem 0.5rem", fontSize: "0.82rem", whiteSpace: "nowrap" }}>
                            {b.dates}
                          </td>
                          <td className="text-dark fw-500" style={{ padding: "0.9rem 0.5rem", fontSize: "0.82rem" }}>
                            {b.travelers}
                          </td>
                          <td className="fw-700 text-dark" style={{ padding: "0.9rem 0.5rem", fontSize: "0.85rem" }}>
                            {b.amount}
                          </td>
                          <td style={{ padding: "0.9rem 0.5rem" }}>
                            <span className="badge px-3 py-2 rounded-2 fw-700" style={{ backgroundColor: st.bg, color: st.color, fontSize: "0.72rem" }}>{b.status}</span>
                          </td>
                          <td className="fw-600 text-secondary" style={{ padding: "0.9rem 0.5rem", fontSize: "0.82rem", whiteSpace: "nowrap" }}>
                            {b.bookingDate}
                          </td>
                          <td style={{ padding: "0.9rem 0.5rem" }}>
                            <div className="booking-next-action-box">
                              <div className="booking-next-action-icon">
                                <i className={`bi ${b.nextAction.icon}`}></i>
                              </div>
                              <div>
                                <span className="text-dark fw-600 d-block" style={{ fontSize: "0.82rem", lineHeight: 1.2 }}>{b.nextAction.text}</span>
                                <span className="text-secondary d-block" style={{ fontSize: "0.68rem" }}>{b.nextAction.subtext}</span>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: "0.9rem 0.5rem" }} onClick={e => e.stopPropagation()}>
                            <div className="d-inline-flex gap-1">
                              <button className="btn btn-outline-light border rounded-3 p-1 text-secondary" style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => router.push("/bookings/new")} aria-label="View">
                                <i className="bi bi-eye" style={{ fontSize: "0.8rem" }}></i>
                              </button>
                              <button className="btn btn-outline-light border rounded-3 p-1 text-secondary" style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => router.push("/bookings/new")} aria-label="Edit">
                                <i className="bi bi-pencil" style={{ fontSize: "0.8rem" }}></i>
                              </button>
                              <button className="btn btn-outline-light border rounded-3 p-1 text-secondary" style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="More">
                                <i className="bi bi-three-dots-vertical" style={{ fontSize: "0.8rem" }}></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredBookings.length === 0 && (
                      <tr>
                        <td colSpan={11} className="text-center py-5 text-secondary">
                          <i className="bi bi-journal-bookmark fs-1 d-block mb-2"></i>
                          No bookings found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Section */}
              <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-2">
                <span className="text-secondary" style={{ fontSize: "0.82rem" }}>
                  Showing 1 to {filteredBookings.length} of 128 bookings
                </span>
                
                <nav aria-label="Page navigation">
                  <ul className="pagination mb-0 pagination-sm gap-1">
                    <li className="page-item">
                      <button className="page-link rounded-3 border-light text-secondary d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px" }} aria-label="Previous">
                        <i className="bi bi-chevron-left" style={{ fontSize: "0.75rem" }}></i>
                      </button>
                    </li>
                    {[1, 2, 3, 4, "...", 16].map((p, idx) => (
                      <li key={idx} className={`page-item ${p === 1 ? "active" : ""}`}>
                        <button
                          className="page-link rounded-3 border-light fw-600 d-flex align-items-center justify-content-center"
                          style={{
                            width: "32px",
                            height: "32px",
                            backgroundColor: p === 1 ? "#112E24" : "#fff",
                            color: p === 1 ? "#fff" : "#6c757d",
                            borderColor: p === 1 ? "#112E24" : "var(--border)"
                          }}
                        >
                          {p}
                        </button>
                      </li>
                    ))}
                    <li className="page-item">
                      <button className="page-link rounded-3 border-light text-secondary d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px" }} aria-label="Next">
                        <i className="bi bi-chevron-right" style={{ fontSize: "0.75rem" }}></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>

            </div>

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
