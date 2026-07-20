"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CiSearch } from "react-icons/ci";

// Dummy Data for Table
const flightsData = [
  {
    id: 1,
    pnr: "ABC123",
    bookingId: "BK-1256",
    airline: "Emirates",
    flightNumber: "EK 368",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg",
    route: { from: "DXB", to: "DPS", fromName: "Dubai", toName: "Bali" },
    date: "20 Jun 2025",
    time: "10:30 AM - 09:35 PM",
    passengers: "2 Adults",
    class: "Economy",
    status: "Confirmed",
    amount: "USD 1,250.00"
  },
  {
    id: 2,
    pnr: "QTR456",
    bookingId: "BK-1255",
    airline: "Qatar Airways",
    flightNumber: "QR 962",
    logo: "https://upload.wikimedia.org/wikipedia/en/9/9b/Qatar_Airways_Logo.svg",
    route: { from: "DOH", to: "SIN", fromName: "Doha", toName: "Singapore" },
    date: "18 Jun 2025",
    time: "08:20 AM - 08:50 PM",
    passengers: "2 Adults",
    class: "Business",
    status: "On Hold",
    amount: "USD 2,480.00"
  },
  {
    id: 3,
    pnr: "SIA789",
    bookingId: "BK-1254",
    airline: "Singapore Airlines",
    flightNumber: "SQ 974",
    logo: "https://upload.wikimedia.org/wikipedia/en/6/6b/Singapore_Airlines_Logo_2.svg",
    route: { from: "SIN", to: "BKK", fromName: "Singapore", toName: "Bangkok" },
    date: "17 Jun 2025",
    time: "02:15 PM - 03:35 PM",
    passengers: "1 Adult",
    class: "Economy",
    status: "Confirmed",
    amount: "USD 320.00"
  },
  {
    id: 4,
    pnr: "TGK321",
    bookingId: "BK-1253",
    airline: "Thai Airways",
    flightNumber: "TG 320",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/58/Thai_Airways_Logo.svg",
    route: { from: "BKK", to: "CDG", fromName: "Bangkok", toName: "Paris" },
    date: "15 Jun 2025",
    time: "11:45 PM - 07:20 AM",
    passengers: "2 Adults",
    class: "Premium Economy",
    status: "Confirmed",
    amount: "USD 1,890.00",
    timePlus: "+1"
  },
  {
    id: 5,
    pnr: "AIK654",
    bookingId: "BK-1252",
    airline: "Air India",
    flightNumber: "AI 173",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Air_India_Logo.svg",
    route: { from: "DEL", to: "LHR", fromName: "Delhi", toName: "London" },
    date: "14 Jun 2025",
    time: "09:10 AM - 01:50 PM",
    passengers: "1 Adult",
    class: "Economy",
    status: "Cancelled",
    amount: "USD 720.00"
  },
  {
    id: 6,
    pnr: "JAL987",
    bookingId: "BK-1251",
    airline: "Japan Airlines",
    flightNumber: "JL 722",
    logo: "https://upload.wikimedia.org/wikipedia/en/f/fd/Japan_Airlines_Logo.svg",
    route: { from: "NRT", to: "SYD", fromName: "Tokyo", toName: "Sydney" },
    date: "12 Jun 2025",
    time: "10:30 AM - 09:40 PM",
    passengers: "2 Adults",
    class: "Business",
    status: "Expired",
    amount: "USD 2,750.00"
  },
  {
    id: 7,
    pnr: "KLM159",
    bookingId: "BK-1250",
    airline: "KLM Royal Dutch",
    flightNumber: "KL 810",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c7/KLM_logo.svg",
    route: { from: "AMS", to: "DXB", fromName: "Amsterdam", toName: "Dubai" },
    date: "10 Jun 2025",
    time: "03:45 PM - 01:20 AM",
    passengers: "1 Adult",
    class: "Economy",
    status: "On Hold",
    amount: "USD 460.00",
    timePlus: "+1"
  },
  {
    id: 8,
    pnr: "AEK753",
    bookingId: "BK-1249",
    airline: "Air France",
    flightNumber: "AF 218",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Air_France_Logo.svg",
    route: { from: "CDG", to: "DXB", fromName: "Paris", toName: "Dubai" },
    date: "08 Jun 2025",
    time: "07:35 PM - 06:35 AM",
    passengers: "2 Adults",
    class: "Economy",
    status: "Confirmed",
    amount: "USD 980.00",
    timePlus: "+1"
  }
];

const statusStyles = {
  "Confirmed": { bg: "#E6F8F5", text: "#0F9D58" },
  "On Hold": { bg: "#FEF3EB", text: "#D36C45" },
  "Cancelled": { bg: "#FBEAE9", text: "#D93025" },
  "Expired": { bg: "#F1F3F4", text: "#5F6368" },
  "Expired / Closed": { bg: "#F1F3F4", text: "#5F6368" }
};

export default function AllFlightsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [airlineFilter, setAirlineFilter] = useState("All Airlines");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [classFilter, setClassFilter] = useState("All Classes");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Filtering
  let filteredData = flightsData.filter(flight => {
    const matchesSearch =
      flight.pnr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.route.fromName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.route.toName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAirline = airlineFilter === "All Airlines" || flight.airline === airlineFilter;
    const matchesStatus = statusFilter === "All Statuses" || flight.status === statusFilter;
    const matchesClass = classFilter === "All Classes" || flight.class === classFilter;

    return matchesSearch && matchesAirline && matchesStatus && matchesClass;
  });

  // Sorting
  if (sortConfig.key) {
    filteredData.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'pnr') {
        aValue = a.pnr; bValue = b.pnr;
      }
      if (sortConfig.key === 'route') {
        aValue = a.route.from; bValue = b.route.from;
      }

      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return <i className="bi bi-chevron-expand ms-1 opacity-50"></i>;
    return sortConfig.direction === 'asc' ?
      <i className="bi bi-chevron-up ms-1"></i> :
      <i className="bi bi-chevron-down ms-1"></i>;
  };

  return (
    <div className="d-flex position-relative">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Workspace Container */}
      <div className="app-container w-100 min-vh-100 d-flex flex-column justify-content-between ">
        {/* Header */}
        <Header
          toggleSidebar={toggleSidebar}
          title="All Flights"
          subtitle="Home > Flights > All Flights"
          forcePageHeaderLayout={true}
          searchPlaceholder="Search inquiries, customers, bookings, quotations..."
          actionButton={
            <button
              className="btn text-white rounded-3 px-3 d-flex align-items-center gap-2"
              style={{ backgroundColor: "#112E24", height: "42px", fontWeight: "400" }}
            >
              <i className="bi bi-plus-lg fs-6"></i>
              <span>New Booking</span>
              <i className="bi bi-chevron-down ms-1" style={{ fontSize: "0.75rem" }}></i>
            </button>
          }
        />

        {/* Main Contents */}
        <main className="main-content d-flex flex-column gap-4 py-4">
          {/* Sub-Header Row: Page Title & Actions */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 w-100">
            <div>
              <span className="text-secondary fs-7 mt-1 d-block">Search, compare and manage all flight reservations.</span>
            </div>

            <div className="d-flex flex-wrap align-items-center gap-2 w-md-auto">
              <button
                className="btn btn-outline-success bg-white border-light rounded-3 px-3 py-2 fw-600 d-flex align-items-center gap-2 text-success shadow-sm"
                style={{ fontSize: "0.85rem", height: "42px" }}
              >
                <i className="bi bi-plus-lg"></i>
                <span>Add New Flight</span>
              </button>

              <button
                className="btn btn-outline-secondary bg-white border-light rounded-3 px-3 py-2 fw-600 d-flex align-items-center gap-2 text-dark shadow-sm"
                style={{ fontSize: "0.85rem", height: "42px" }}
              >
                <i className="bi bi-download"></i>
                <span>Import PNR</span>
              </button>

              <button
                className="btn btn-outline-secondary bg-white border-light rounded-3 px-3 py-2 fw-600 d-flex align-items-center gap-2 text-dark shadow-sm"
                style={{ fontSize: "0.85rem", height: "42px" }}
              >
                <span>... More Actions</span>
                <i className="bi bi-chevron-down ms-1" style={{ fontSize: "0.75rem" }}></i>
              </button>
            </div>
          </div>

          {/* Main Layout: Split Columns */}
          <div className="row g-4 align-items-start">
            {/* Left Column: Table & Stats (8 cols on XL, 12 on smaller) */}
            <div className="col-12 col-xl-9">
              {/* Stats Row */}
              <div className="row g-3 row-cols-2 row-cols-md-3 row-cols-xl-5 mb-4">
                {/* Total Flights */}
                <div className="col">
                  <div className="dashboard-card align-items-center" style={{ padding: "1.25rem" }}>
                    <div className="dashboard-card-icon" style={{ backgroundColor: "#E9F4EE", color: "#1E6C45" }}>
                      <i className="bi bi-airplane fs-5" style={{ transform: "rotate(-45deg)" }}></i>
                    </div>
                    <div className="dashboard-card-info">
                      <span className="dashboard-card-val fs-4 fw-800" style={{ color: "#112E24" }}>156</span>
                      <span className="dashboard-card-label" style={{ fontSize: "0.75rem", fontWeight: "500" }}>Total Flights</span>
                    </div>
                  </div>
                </div>

                {/* Confirmed */}
                <div className="col">
                  <div className="dashboard-card align-items-center" style={{ padding: "1.25rem" }}>
                    <div className="dashboard-card-icon" style={{ backgroundColor: "#EAF2FF", color: "#2B73F6" }}>
                      <i className="bi bi-ticket-perforated fs-5"></i>
                    </div>
                    <div className="dashboard-card-info">
                      <span className="dashboard-card-val fs-4 fw-800" style={{ color: "#112E24" }}>82</span>
                      <span className="dashboard-card-label" style={{ fontSize: "0.75rem", fontWeight: "500" }}>Confirmed</span>
                    </div>
                  </div>
                </div>

                {/* On Hold */}
                <div className="col">
                  <div className="dashboard-card align-items-center" style={{ padding: "1.25rem" }}>
                    <div className="dashboard-card-icon" style={{ backgroundColor: "#FEF3EB", color: "#D36C45" }}>
                      <i className="bi bi-clock fs-5"></i>
                    </div>
                    <div className="dashboard-card-info">
                      <span className="dashboard-card-val fs-4 fw-800" style={{ color: "#112E24" }}>28</span>
                      <span className="dashboard-card-label" style={{ fontSize: "0.75rem", fontWeight: "500" }}>On Hold</span>
                    </div>
                  </div>
                </div>

                {/* Cancelled */}
                <div className="col">
                  <div className="dashboard-card align-items-center" style={{ padding: "1.25rem" }}>
                    <div className="dashboard-card-icon" style={{ backgroundColor: "#F4E8FB", color: "#8E44AD" }}>
                      <i className="bi bi-x-circle fs-5"></i>
                    </div>
                    <div className="dashboard-card-info">
                      <span className="dashboard-card-val fs-4 fw-800" style={{ color: "#112E24" }}>14</span>
                      <span className="dashboard-card-label" style={{ fontSize: "0.75rem", fontWeight: "500" }}>Cancelled</span>
                    </div>
                  </div>
                </div>

                {/* Expired / Closed */}
                <div className="col">
                  <div className="dashboard-card align-items-center" style={{ padding: "1.25rem" }}>
                    <div className="dashboard-card-icon" style={{ backgroundColor: "#E6F8F5", color: "#0F9D58" }}>
                      <i className="bi bi-arrow-repeat fs-5"></i>
                    </div>
                    <div className="dashboard-card-info">
                      <span className="dashboard-card-val fs-4 fw-800" style={{ color: "#112E24" }}>32</span>
                      <span className="dashboard-card-label" style={{ fontSize: "0.75rem", fontWeight: "500" }}>Expired / Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="section-card border border-light p-0 bg-white overflow-hidden">
                {/* Table Header & Filters */}
                <div className="p-3 border-bottom border-light d-flex flex-column flex-xl-row justify-content-between gap-3 bg-white">
                  <div className="d-flex flex-wrap gap-2">
                    <select
                      className="form-select border-light bg-light-subtle rounded-3 text-secondary fw-500 shadow-sm"
                      style={{ fontSize: "0.85rem", width: "130px", backgroundColor: "#FCFAF6" }}
                      value={airlineFilter}
                      onChange={(e) => { setAirlineFilter(e.target.value); setCurrentPage(1); }}
                    >
                      <option value="All Airlines">All Airlines</option>
                      <option value="Emirates">Emirates</option>
                      <option value="Qatar Airways">Qatar Airways</option>
                      <option value="Singapore Airlines">Singapore Airlines</option>
                      <option value="Thai Airways">Thai Airways</option>
                      <option value="Air India">Air India</option>
                      <option value="Japan Airlines">Japan Airlines</option>
                    </select>

                    <select
                      className="form-select border-light bg-light-subtle rounded-3 text-secondary fw-500 shadow-sm"
                      style={{ fontSize: "0.85rem", width: "130px", backgroundColor: "#FCFAF6" }}
                      value={statusFilter}
                      onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                    >
                      <option value="All Statuses">All Statuses</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Expired">Expired</option>
                    </select>

                    <select
                      className="form-select border-light bg-light-subtle rounded-3 text-secondary fw-500 shadow-sm"
                      style={{ fontSize: "0.85rem", width: "130px", backgroundColor: "#FCFAF6" }}
                      value={classFilter}
                      onChange={(e) => { setClassFilter(e.target.value); setCurrentPage(1); }}
                    >
                      <option value="All Classes">All Classes</option>
                      <option value="Economy">Economy</option>
                      <option value="Premium Economy">Premium Economy</option>
                      <option value="Business">Business</option>
                      <option value="First Class">First Class</option>
                    </select>

                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control border-light bg-light-subtle rounded-3 shadow-sm text-secondary fw-500"
                        value="20 May 2025 - 20 Jun 2025"
                        readOnly
                        style={{ fontSize: "0.85rem", width: "200px", backgroundColor: "#FCFAF6", paddingRight: "2.5rem" }}
                      />
                      <i className="bi bi-calendar3 position-absolute text-secondary" style={{ right: "1rem", top: "50%", transform: "translateY(-50%)", fontSize: "0.9rem" }}></i>
                    </div>
                  </div>

                  <div className="d-flex gap-2 w-100 flex-grow-1" style={{ maxWidth: "200px" }}>
                    <div className="position-relative flex-grow-1">
                      <CiSearch className="bi bi-search position-absolute text-secondary" style={{ left: "1rem", top: "53%", transform: "translateY(-50%)", fontSize: "0.9rem" }}></CiSearch>
                      <input
                        type="text"
                        className="form-control border-light bg-light-subtle rounded-3 shadow-sm"
                        placeholder="Search by PNR, Booking ID, Customer..."
                        style={{ paddingLeft: "2.5rem", fontSize: "0.85rem", backgroundColor: "#FCFAF6" }}
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                      />
                    </div>

                  </div>
                </div>

                {/* Table Data */}
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0" style={{ fontSize: "0.85rem" }}>
                    <thead className="bg-light text-secondary">
                      <tr>
                        <th className="fw-400 py-3 ps-4 border-0 text-nowrap" style={{ width: "160px", fontWeight: "500", color: "#8C9C95", cursor: "pointer" }} onClick={() => handleSort('pnr')}>
                          PNR / Booking ID {renderSortIcon('pnr')}
                        </th>
                        <th className="fw-400 py-3 border-0 text-nowrap" style={{ color: "#8C9C95", fontWeight: "500", cursor: "pointer" }} onClick={() => handleSort('airline')}>
                          Airline {renderSortIcon('airline')}
                        </th>
                        <th className="fw-400 py-3 border-0 text-nowrap" style={{ color: "#8C9C95", fontWeight: "500", cursor: "pointer" }} onClick={() => handleSort('route')}>
                          Route {renderSortIcon('route')}
                        </th>
                        <th className="fw-400 py-3 border-0 text-nowrap" style={{ color: "#8C9C95", fontWeight: "500", cursor: "pointer" }} onClick={() => handleSort('date')}>
                          Date & Time {renderSortIcon('date')}
                        </th>
                        <th className="fw-400 py-3 border-0 text-nowrap" style={{ color: "#8C9C95", fontWeight: "500", cursor: "pointer" }} onClick={() => handleSort('passengers')}>
                          Passenger(s) {renderSortIcon('passengers')}
                        </th>
                        <th className="fw-400 py-3 border-0 text-nowrap" style={{ color: "#8C9C95", fontWeight: "500", cursor: "pointer" }} onClick={() => handleSort('class')}>
                          Class {renderSortIcon('class')}
                        </th>
                        <th className="fw-400 py-3 border-0 text-nowrap" style={{ color: "#8C9C95", fontWeight: "500", cursor: "pointer" }} onClick={() => handleSort('status')}>
                          Status {renderSortIcon('status')}
                        </th>
                        <th className="fw-400 py-3 border-0 text-nowrap" style={{ color: "#8C9C95", fontWeight: "500", cursor: "pointer" }} onClick={() => handleSort('amount')}>
                          Amount {renderSortIcon('amount')}
                        </th>
                        <th className="fw-400 py-3 pe-4 border-0 text-center" style={{ color: "#8C9C95", fontWeight: "500" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="border-top-0">
                      {paginatedData.length > 0 ? paginatedData.map((flight) => (
                        <tr key={flight.id} className="border-bottom border-light">
                          <td className="ps-4 py-3">
                            <div className="d-flex flex-column">
                              <span className="fw-700 text-dark">PNR: {flight.pnr}</span>
                              <span className="text-secondary" style={{ fontSize: "0.75rem" }}>{flight.bookingId}</span>
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="d-flex align-items-center gap-2">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={flight.logo} alt={flight.airline} style={{ width: "24px", height: "24px", objectFit: "contain" }} />
                              <div className="d-flex flex-column">
                                <span className="fw-700 text-dark fs-8">{flight.airline}</span>
                                <span className="text-secondary" style={{ fontSize: "0.75rem" }}>{flight.flightNumber}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="d-flex flex-column">
                              <div className="d-flex align-items-center gap-1 fw-700 text-dark">
                                <span>{flight.route.from}</span>
                                <i className="bi bi-arrow-right text-secondary" style={{ fontSize: "0.7rem" }}></i>
                                <span>{flight.route.to}</span>
                              </div>
                              <span className="text-secondary d-flex align-items-center gap-1" style={{ fontSize: "0.75rem" }}>
                                <span>{flight.route.fromName}</span>
                                <i className="bi bi-arrow-right" style={{ fontSize: "0.5rem" }}></i>
                                <span>{flight.route.toName}</span>
                              </span>
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="d-flex flex-column">
                              <span className="text-dark fw-500">{flight.date}</span>
                              <div className="d-flex align-items-center gap-1">
                                <span className="text-secondary" style={{ fontSize: "0.75rem" }}>{flight.time}</span>
                                {flight.timePlus && (
                                  <span className="badge bg-light text-primary border border-primary-subtle rounded-1 px-1 py-0" style={{ fontSize: "0.6rem" }}>{flight.timePlus}</span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 text-dark fw-500">{flight.passengers}</td>
                          <td className="py-3 text-dark fw-500">{flight.class}</td>
                          <td className="py-3">
                            <span
                              className="badge rounded-1 fw-600 px-2 py-1 fs-9"
                              style={{
                                backgroundColor: statusStyles[flight.status]?.bg || "#EFECE6",
                                color: statusStyles[flight.status]?.text || "#677E75"
                              }}
                            >
                              {flight.status}
                            </span>
                          </td>
                          <td className="py-3 text-dark fw-600">{flight.amount}</td>
                          <td className="pe-4 py-3 text-center">
                            <div className="d-flex justify-content-center gap-1">
                              <button className="btn btn-sm btn-light bg-transparent border-light shadow-sm text-secondary" style={{ width: "28px", height: "28px", padding: 0 }}>
                                <i className="bi bi-eye"></i>
                              </button>
                              <button className="btn btn-sm btn-light bg-transparent border-light shadow-sm text-secondary" style={{ width: "28px", height: "28px", padding: 0 }}>
                                <i className="bi bi-three-dots"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="9" className="text-center py-5 text-secondary">
                            <i className="bi bi-search d-block mb-2 fs-2 text-muted opacity-50"></i>
                            <span className="fw-500">No flights found matching your filters.</span>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination footer */}
                <div className="p-3 border-top border-light d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3 bg-white text-secondary" style={{ fontSize: "0.85rem" }}>
                  <span>
                    Showing {filteredData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} flights
                  </span>

                  <div className="d-flex align-items-center gap-3">
                    <div className="d-flex gap-1">
                      <button
                        className="btn btn-sm btn-outline-secondary border-0 text-secondary"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        <i className="bi bi-chevron-left"></i>
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={page}
                              className={`btn btn-sm rounded-2 fw-600 ${currentPage === page ? 'text-white' : 'btn-light bg-transparent border-0 text-secondary'}`}
                              style={{
                                backgroundColor: currentPage === page ? "#112E24" : "transparent",
                                width: "28px", height: "28px", padding: 0
                              }}
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </button>
                          );
                        } else if (
                          page === currentPage - 2 ||
                          page === currentPage + 2
                        ) {
                          return <span key={page} className="d-flex align-items-center px-1">...</span>;
                        }
                        return null;
                      })}

                      <button
                        className="btn btn-sm btn-outline-secondary border-0 text-secondary"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages || totalPages === 0}
                      >
                        <i className="bi bi-chevron-right"></i>
                      </button>
                    </div>

                    <select
                      className="form-select form-select-sm border-light bg-light-subtle rounded-3 text-secondary fw-500 shadow-sm"
                      style={{ width: "100px", backgroundColor: "#FCFAF6" }}
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                    >
                      <option value={10}>10 / page</option>
                      <option value={20}>20 / page</option>
                      <option value={50}>50 / page</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Widgets (4 cols on XL, 12 on smaller) */}
            <div className="col-12 col-xl-3">
              <div className="d-flex flex-column gap-4">

                {/* Flights Overview Widget */}
                <div className="section-card border border-light p-4 bg-white">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="section-card-title fs-6 fw-800 m-0">Flights Overview</h3>
                    <a href="#" className="section-card-link text-primary fs-8 text-decoration-none" style={{ color: "#2B73F6 !important" }}>View Report</a>
                  </div>
                  <div className="d-flex align-items-center justify-content-between gap-3">
                    <div className="d-flex justify-content-center position-relative">
                      {/* SVG Donut Chart */}
                      <svg width="120" height="120" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#EFECE6" strokeWidth="12" />
                        {/* Confirmed: 53% -> 133 */}
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#0F9D58" strokeWidth="12" strokeDasharray="133 251" strokeDashoffset="0" />
                        {/* On Hold: 18% -> 45 */}
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#D36C45" strokeWidth="12" strokeDasharray="45 251" strokeDashoffset="-133" />
                        {/* Cancelled: 9% -> 22 */}
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#8E44AD" strokeWidth="12" strokeDasharray="22 251" strokeDashoffset="-178" />
                        {/* Expired/Closed: 20% -> 50 */}
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#5F6368" strokeWidth="12" strokeDasharray="50 251" strokeDashoffset="-200" />
                      </svg>
                      <div className="position-absolute top-50 start-50 translate-middle text-center">
                        <span className="d-block fw-800 text-dark fs-3" style={{ lineHeight: 1 }}>156</span>
                        <span className="d-block text-secondary fs-9 fw-600">Total</span>
                      </div>
                    </div>

                    <div className="d-flex flex-column gap-2 fs-8 fw-600 flex-grow-1 w-100">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-circle-fill" style={{ fontSize: "0.5rem", color: "#0F9D58" }}></i>
                          <span className="text-secondary" style={{ fontSize: "0.7rem" }}>Confirmed</span>
                        </div>
                        <div className="text-dark">
                          <span className="fw-700 me-1" style={{ fontSize: "0.7rem" }}>82</span>
                          <span className="text-secondary fw-500" style={{ fontSize: "0.65rem" }}>(53%)</span>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-circle-fill" style={{ fontSize: "0.5rem", color: "#D36C45" }}></i>
                          <span className="text-secondary" style={{ fontSize: "0.7rem" }}>On Hold</span>
                        </div>
                        <div className="text-dark">
                          <span className="fw-700 me-1" style={{ fontSize: "0.7rem" }}>28</span>
                          <span className="text-secondary fw-500" style={{ fontSize: "0.65rem" }}>(18%)</span>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-circle-fill" style={{ fontSize: "0.5rem", color: "#8E44AD" }}></i>
                          <span className="text-secondary" style={{ fontSize: "0.7rem" }}>Cancelled</span>
                        </div>
                        <div className="text-dark">
                          <span className="fw-700 me-1" style={{ fontSize: "0.7rem" }}>14</span>
                          <span className="text-secondary fw-500" style={{ fontSize: "0.65rem" }}>(9%)</span>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-circle-fill" style={{ fontSize: "0.5rem", color: "#5F6368" }}></i>
                          <span className="text-secondary" style={{ fontSize: "0.7rem" }}>Expired / Closed</span>
                        </div>
                        <div className="text-dark">
                          <span className="fw-700 me-1" style={{ fontSize: "0.7rem" }}>32</span>
                          <span className="text-secondary fw-500" style={{ fontSize: "0.65rem" }}>(20%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Airlines Widget */}
                <div className="section-card border border-light p-4 bg-white">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="section-card-title fs-6 fw-800 m-0">Top Airlines</h3>
                    <a href="#" className="section-card-link text-primary fs-8 text-decoration-none" style={{ color: "#2B73F6 !important" }}>View All</a>
                  </div>

                  <div className="d-flex flex-column gap-3 fs-8 fw-600">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg" alt="Emirates" style={{ width: "16px", height: "16px", objectFit: "contain" }} />
                        <span className="text-dark">Emirates</span>
                      </div>
                      <span className="text-secondary fw-700">26</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://upload.wikimedia.org/wikipedia/en/9/9b/Qatar_Airways_Logo.svg" alt="Qatar Airways" style={{ width: "16px", height: "16px", objectFit: "contain" }} />
                        <span className="text-dark">Qatar Airways</span>
                      </div>
                      <span className="text-secondary fw-700">18</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://upload.wikimedia.org/wikipedia/en/6/6b/Singapore_Airlines_Logo_2.svg" alt="Singapore Airlines" style={{ width: "16px", height: "16px", objectFit: "contain" }} />
                        <span className="text-dark">Singapore Airlines</span>
                      </div>
                      <span className="text-secondary fw-700">16</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://upload.wikimedia.org/wikipedia/en/5/58/Thai_Airways_Logo.svg" alt="Thai Airways" style={{ width: "16px", height: "16px", objectFit: "contain" }} />
                        <span className="text-dark">Thai Airways</span>
                      </div>
                      <span className="text-secondary fw-700">15</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Air_India_Logo.svg" alt="Air India" style={{ width: "16px", height: "16px", objectFit: "contain" }} />
                        <span className="text-dark">Air India</span>
                      </div>
                      <span className="text-secondary fw-700">12</span>
                    </div>
                  </div>
                </div>

                {/* Recent Bookings Widget */}
                <div className="section-card border border-light p-4 bg-white">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="section-card-title fs-6 fw-800 m-0">Recent Bookings</h3>
                    <a href="#" className="section-card-link text-primary fs-8 text-decoration-none" style={{ color: "#2B73F6 !important" }}>View All</a>
                  </div>

                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-start gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg" alt="Emirates" style={{ width: "16px", height: "16px", objectFit: "contain", marginTop: "2px" }} />
                        <div className="d-flex flex-column">
                          <span className="fw-700 text-dark fs-8">PNR: ABC123</span>
                          <span className="text-secondary" style={{ fontSize: "0.65rem" }}>BK-1256 • 20 Jun 2025</span>
                        </div>
                      </div>
                      <span className="badge rounded-1 fw-600 px-2 py-1" style={{ backgroundColor: "#E6F8F5", color: "#0F9D58", fontSize: "0.6rem" }}>Confirmed</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-start gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://upload.wikimedia.org/wikipedia/en/9/9b/Qatar_Airways_Logo.svg" alt="Qatar" style={{ width: "16px", height: "16px", objectFit: "contain", marginTop: "2px" }} />
                        <div className="d-flex flex-column">
                          <span className="fw-700 text-dark fs-8">PNR: QTR456</span>
                          <span className="text-secondary" style={{ fontSize: "0.65rem" }}>BK-1255 • 18 Jun 2025</span>
                        </div>
                      </div>
                      <span className="badge rounded-1 fw-600 px-2 py-1" style={{ backgroundColor: "#FEF3EB", color: "#D36C45", fontSize: "0.6rem" }}>On Hold</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-start gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://upload.wikimedia.org/wikipedia/en/6/6b/Singapore_Airlines_Logo_2.svg" alt="Singapore Airlines" style={{ width: "16px", height: "16px", objectFit: "contain", marginTop: "2px" }} />
                        <div className="d-flex flex-column">
                          <span className="fw-700 text-dark fs-8">PNR: SIA789</span>
                          <span className="text-secondary" style={{ fontSize: "0.65rem" }}>BK-1254 • 17 Jun 2025</span>
                        </div>
                      </div>
                      <span className="badge rounded-1 fw-600 px-2 py-1" style={{ backgroundColor: "#E6F8F5", color: "#0F9D58", fontSize: "0.6rem" }}>Confirmed</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-start gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://upload.wikimedia.org/wikipedia/en/5/58/Thai_Airways_Logo.svg" alt="Thai Airways" style={{ width: "16px", height: "16px", objectFit: "contain", marginTop: "2px" }} />
                        <div className="d-flex flex-column">
                          <span className="fw-700 text-dark fs-8">PNR: TGK321</span>
                          <span className="text-secondary" style={{ fontSize: "0.65rem" }}>BK-1253 • 15 Jun 2025</span>
                        </div>
                      </div>
                      <span className="badge rounded-1 fw-600 px-2 py-1" style={{ backgroundColor: "#E6F8F5", color: "#0F9D58", fontSize: "0.6rem" }}>Confirmed</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-start gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Air_India_Logo.svg" alt="Air India" style={{ width: "16px", height: "16px", objectFit: "contain", marginTop: "2px" }} />
                        <div className="d-flex flex-column">
                          <span className="fw-700 text-dark fs-8">PNR: AIK654</span>
                          <span className="text-secondary" style={{ fontSize: "0.65rem" }}>BK-1252 • 14 Jun 2025</span>
                        </div>
                      </div>
                      <span className="badge rounded-1 fw-600 px-2 py-1" style={{ backgroundColor: "#FBEAE9", color: "#D93025", fontSize: "0.6rem" }}>Cancelled</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions Widget */}
                <div className="section-card border border-light p-4 bg-white">
                  <h3 className="section-card-title mb-4 fs-6 fw-800">Quick Actions</h3>

                  <div className="d-flex flex-column gap-2 fs-8 fw-600 text-dark">
                    <a href="#" className="d-flex align-items-center justify-content-between text-decoration-none text-dark py-1">
                      <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-plus text-secondary fs-6"></i>
                        <span>Create New Flight</span>
                      </div>
                      <i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.7rem" }}></i>
                    </a>
                    <a href="#" className="d-flex align-items-center justify-content-between text-decoration-none text-dark py-1">
                      <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-search text-secondary fs-6"></i>
                        <span>Flight Search</span>
                      </div>
                      <i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.7rem" }}></i>
                    </a>
                    <a href="#" className="d-flex align-items-center justify-content-between text-decoration-none text-dark py-1">
                      <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-currency-dollar text-secondary fs-6"></i>
                        <span>Manage Fare Rules</span>
                      </div>
                      <i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.7rem" }}></i>
                    </a>
                    <a href="#" className="d-flex align-items-center justify-content-between text-decoration-none text-dark py-1">
                      <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-person-workspace text-secondary fs-6"></i>
                        <span>Seat Map / Availability</span>
                      </div>
                      <i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.7rem" }}></i>
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50 d-lg-none"
          style={{ zIndex: 999 }}
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}
