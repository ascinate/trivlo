"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { agencyApi } from "@/lib/api";
import COUNTRY_CODES from "@/lib/countryCodes";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const AVATAR_URLS = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
];

const STATUS_STYLES = {
  active: { bg: "#E9F4EE", color: "#1E6C45", label: "Active" },
  inactive: { bg: "#F3F4F6", color: "#6B7280", label: "Inactive" },
  blocked: { bg: "#FEE2E2", color: "#991B1B", label: "Blocked" },
};

const TYPE_BADGE_STYLES = {
  Individual: { bg: "#EEF2FF", color: "#4338CA" },
  Family: { bg: "#FFF7ED", color: "#C2410C" },
  Corporate: { bg: "#ECFDF5", color: "#065F46" },
  Couple: { bg: "#FDF4FF", color: "#7E22CE" },
  Group: { bg: "#FFF1F2", color: "#BE123C" },
};

function getFlagUrl(countryName) {
  if (!countryName) return null;
  const found = COUNTRY_CODES.find(c => c.country.toLowerCase() === countryName.toLowerCase());
  return found ? `https://flagcdn.com/w40/${found.iso}.png` : null;
}

export default function CustomersPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginationMeta, setPaginationMeta] = useState(null);

  const [countryFilter, setCountryFilter] = useState("All Countries");
  const [cityFilter, setCityFilter] = useState("All Cities");
  const [typeFilter, setTypeFilter] = useState("All Customer Types");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    try {
      let params = `?page=${currentPage}&per_page=${rowsPerPage}`;
      if (searchQuery) params += `&search=${encodeURIComponent(searchQuery)}`;
      if (statusFilter !== "All Status") params += `&status=${statusFilter.toLowerCase()}`;
      if (typeFilter !== "All Customer Types") params += `&customer_type=${encodeURIComponent(typeFilter)}`;

      const res = await agencyApi.customers.list(params);
      setCustomers(res.data || []);
      setPaginationMeta(res.meta || null);
    } catch (err) {
      console.error("Failed to fetch customers:", err);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, statusFilter, typeFilter, rowsPerPage]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const totalCustomers = paginationMeta?.total ?? customers.length;
  const activeCustomers = customers.filter(c => c.status === "active").length;

  const handleSelectAll = () => {
    const ids = customers.map(c => c.id);
    const allSel = ids.length > 0 && ids.every(id => selectedIds.includes(id));
    setSelectedIds(allSel ? selectedIds.filter(id => !ids.includes(id)) : [...new Set([...selectedIds, ...ids])]);
  };

  const actionButton = (
    <button
      className="btn text-white rounded-3 px-3 d-flex align-items-center gap-2"
      style={{ backgroundColor: "#112E24", height: "42px", fontWeight: "400" }}
      onClick={() => router.push("/customers/new")}
    >
      <i className="bi bi-plus-lg fs-6"></i>
      <span>New Customer</span>
    </button>
  );

  const stats = [
    { label: "Total Customers", value: totalCustomers.toLocaleString(), trend: "+12.8%", trendUp: true, icon: "bi-people", bgColor: "#E9F4EE", iconColor: "#1E6C45" },
    { label: "Active Customers", value: activeCustomers.toLocaleString(), trend: "+11.6%", trendUp: true, icon: "bi-person-check", bgColor: "#FEF7ED", iconColor: "#B97C2B" },
    { label: "Repeat Customers", value: "0", trend: "0%", trendUp: true, icon: "bi-arrow-repeat", bgColor: "#ECEFFE", iconColor: "#5D59E1" },
    { label: "Total Bookings", value: "0", trend: "0%", trendUp: true, icon: "bi-briefcase", bgColor: "#F0F4F2", iconColor: "#677E75" },
    { label: "Total Spent", value: "$0", trend: "0%", trendUp: true, icon: "bi-currency-dollar", bgColor: "#FEE2E2", iconColor: "#991B1B" },
  ];

  const doughnutData = {
    labels: ["Individual", "Family", "Corporate", "Couple", "Group"],
    datasets: [{
      data: [
        customers.filter(c => c.customer_type === "Individual").length || 1,
        customers.filter(c => c.customer_type === "Family").length,
        customers.filter(c => c.customer_type === "Corporate").length,
        customers.filter(c => c.customer_type === "Couple").length,
        customers.filter(c => c.customer_type === "Group").length,
      ],
      backgroundColor: ["#3B82F6", "#F97316", "#1E6C45", "#A855F7", "#EF4444"],
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

  const totalPages = paginationMeta?.last_page || 1;

  return (
    <div className="d-flex position-relative">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="app-container w-100 min-vh-100 d-flex flex-column justify-content-between">
        <Header
          toggleSidebar={toggleSidebar}
          title="Customers Details"
          subtitle="Home > CRM > Customers > Customers Details"
          forcePageHeaderLayout={true}
          searchPlaceholder="Search customers..."
          actionButton={actionButton}
          onSearchChange={(val) => { setSearchQuery(val); setCurrentPage(1); }}
        />

        <main className="main-content flex-grow-1 p-3 p-lg-4">
          <div className="d-flex flex-column gap-3">

            {/* Date filter bar */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
              <div>
                <h2 className="fw-800 text-dark m-0" style={{ fontSize: "1.2rem" }}>Customers Overview</h2>
                <p className="text-secondary fs-8 m-0">Manage and view all customer profiles</p>
              </div>
            </div>

            {/* Stats row */}
            <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-5 g-3">
              {stats.map((card, idx) => (
                <div className="col" key={idx}>
                  <div className="dashboard-card border border-light">
                    <div className="dashboard-card-icon" style={{ backgroundColor: card.bgColor, color: card.iconColor }}>
                      <i className={`bi ${card.icon}`}></i>
                    </div>
                    <div className="dashboard-card-info">
                      <span className="dashboard-card-label">{card.label}</span>
                      <span className="dashboard-card-val">{card.value}</span>
                      <span className={`dashboard-card-trend ${card.trendUp ? "trend-up" : "trend-down"}`}>
                        <i className={`bi ${card.trendUp ? "bi-arrow-up-short" : "bi-arrow-down-short"}`}></i>
                        {card.trend} <span className="trend-label">vs last month</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Filter bar */}
            <div className="section-card border border-light p-3">
              <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
                <div className="d-flex flex-wrap gap-2">
                  <select
                    className="form-select rounded-3 border-light shadow-sm text-dark bg-white fw-600"
                    style={{ width: "auto", minWidth: "155px", height: "42px", fontSize: "0.85rem" }}
                    value={typeFilter}
                    onChange={e => { setTypeFilter(e.target.value); setCurrentPage(1); }}
                  >
                    <option value="All Customer Types">All Customer Types</option>
                    <option value="Individual">Individual</option>
                    <option value="Family">Family</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Couple">Couple</option>
                    <option value="Group">Group</option>
                  </select>

                  <select
                    className="form-select rounded-3 border-light shadow-sm text-dark bg-white fw-600"
                    style={{ width: "auto", minWidth: "155px", height: "42px", fontSize: "0.85rem" }}
                    value={statusFilter}
                    onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                  >
                    <option value="All Status">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Blocked">Blocked</option>
                  </select>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-light border border-light shadow-sm rounded-3 fw-600 d-flex align-items-center gap-1"
                    style={{ height: "42px", fontSize: "0.85rem" }}
                    onClick={() => { setCountryFilter("All Countries"); setCityFilter("All Cities"); setTypeFilter("All Customer Types"); setStatusFilter("All Status"); setSearchQuery(""); setCurrentPage(1); }}
                  >
                    <i className="bi bi-arrow-counterclockwise"></i> Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Main grid */}
            <div className="row g-3">

              {/* Left: Table */}
              <div className="col-12 col-lg-8">
                <div className="section-card border border-light p-4">
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead>
                        <tr className="border-bottom border-light">
                          <th className="pb-3" style={{ width: 40 }}>
                            <input
                              type="checkbox"
                              className="form-check-input shadow-none"
                              checked={customers.length > 0 && customers.every(c => selectedIds.includes(c.id))}
                              onChange={handleSelectAll}
                            />
                          </th>
                          {["Code", "Customer Name", "Email", "Phone", "Country", "Type", "Status", "Actions"].map(h => (
                            <th key={h} className="lablename pb-3" style={{ whiteSpace: "nowrap", textTransform: "uppercase" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan={9} className="text-center py-5">
                              <div className="spinner-border text-success" role="status" style={{ width: "2rem", height: "2rem" }}>
                                <span className="visually-hidden">Loading...</span>
                              </div>
                              <div className="text-secondary fs-8 mt-2 fw-500">Loading customers...</div>
                            </td>
                          </tr>
                        ) : customers.length === 0 ? (
                          <tr>
                            <td colSpan={9} className="text-center py-5 text-secondary">
                              <i className="bi bi-people fs-1 d-block mb-2 text-muted"></i>
                              <div className="fw-600">No customers found.</div>
                              <div className="fs-8 text-muted">Click "New Customer" to create your first customer.</div>
                            </td>
                          </tr>
                        ) : (
                          customers.map((c, idx) => {
                            const stKey = (c.status || "active").toLowerCase();
                            const st = STATUS_STYLES[stKey] || STATUS_STYLES.active;
                            const typeSt = TYPE_BADGE_STYLES[c.customer_type] || { bg: "#F3F4F6", color: "#6B7280" };
                            const flag = getFlagUrl(c.country);
                            const avatar = AVATAR_URLS[idx % AVATAR_URLS.length];
                            const phoneFormatted = c.phone_code ? `${c.phone_code} ${c.phone}` : c.phone;

                            return (
                              <tr key={c.id} className="border-bottom border-light" style={{ cursor: "pointer" }}>
                                <td style={{ padding: "0.9rem 0.5rem" }} onClick={e => e.stopPropagation()}>
                                  <input
                                    type="checkbox"
                                    className="form-check-input shadow-none"
                                    checked={selectedIds.includes(c.id)}
                                    onChange={() => setSelectedIds(prev => prev.includes(c.id) ? prev.filter(x => x !== c.id) : [...prev, c.id])}
                                  />
                                </td>
                                <td style={{ padding: "0.9rem 0.5rem" }}>
                                  <span className="badge bg-light text-dark border fw-700" style={{ fontSize: "0.75rem" }}>
                                    {c.customer_code || `C-${c.id}`}
                                  </span>
                                </td>
                                <td style={{ padding: "0.9rem 0.5rem" }}>
                                  <div className="d-flex align-items-center gap-2">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={avatar} alt={c.full_name} className="rounded-circle border" style={{ width: 34, height: 34, objectFit: "cover" }} />
                                    <div>
                                      <div className="d-flex align-items-center gap-1">
                                        <span className="fw-700 text-dark bd-labe" style={{ fontSize: "0.85rem", lineHeight: 1.2 }}>{c.full_name}</span>
                                        {c.badge && (
                                          <span className="badge rounded-1 px-2 py-1 fw-700" style={{ fontSize: "0.6rem", backgroundColor: c.badge === "VIP" ? "#112E24" : "#7C3AED", color: "#fff" }}>
                                            {c.badge}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="text-secondary fw-500" style={{ padding: "0.9rem 0.5rem", fontSize: "0.82rem" }}>{c.email}</td>
                                <td className="fw-600 text-dark" style={{ padding: "0.9rem 0.5rem", fontSize: "0.82rem", whiteSpace: "nowrap" }}>{phoneFormatted}</td>
                                <td style={{ padding: "0.9rem 0.5rem" }}>
                                  <div className="d-flex align-items-center gap-1">
                                    {flag && <img src={flag} alt={c.country || ""} className="rounded-1" style={{ width: 18, height: 12, objectFit: "cover" }} />}
                                    <span className="fw-600 text-dark" style={{ fontSize: "0.82rem" }}>{c.country || "N/A"}</span>
                                  </div>
                                </td>
                                <td style={{ padding: "0.9rem 0.5rem" }}>
                                  <span className="badge px-2 py-1 rounded-2 fw-700" style={{ fontSize: "0.72rem", backgroundColor: typeSt.bg, color: typeSt.color }}>
                                    {c.customer_type || "Individual"}
                                  </span>
                                </td>
                                <td style={{ padding: "0.9rem 0.5rem" }}>
                                  <span className="badge px-3 py-2 rounded-2 fw-700 fs-8" style={{ backgroundColor: st.bg, color: st.color }}>
                                    {st.label}
                                  </span>
                                </td>
                                <td style={{ padding: "0.9rem 0.5rem" }}>
                                  <div className="d-inline-flex gap-1">
                                    <button
                                      className="btn btn-outline-light border rounded-3 p-1 text-secondary"
                                      style={{ width: 30, height: 30, display: "flex", flexShrink: 0, alignItems: "center", justifyContent: "center" }}
                                      aria-label="View"
                                      onClick={() => router.push(`/customers/${c.id}`)}
                                    >
                                      <i className="bi bi-eye" style={{ fontSize: "0.8rem" }}></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-4 pt-3 border-top border-light gap-3 inq-pagination">
                    <span className="text-secondary fs-8 fw-500">
                      Showing {customers.length === 0 ? 0 : ((currentPage - 1) * rowsPerPage + 1)} to {Math.min(currentPage * rowsPerPage, totalCustomers)} of {totalCustomers.toLocaleString()} customers
                    </span>
                    <nav>
                      <ul className="pagination pagination-sm m-0">
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                          <button className="page-link border-0 text-secondary bg-transparent rounded-2" onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>
                            <i className="bi bi-chevron-left"></i>
                          </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                          <li key={num} className="page-item">
                            <button
                              className="page-link border-0 rounded-2 mx-1 fw-600"
                              style={currentPage === num ? { backgroundColor: "#112E24", color: "#fff" } : { backgroundColor: "transparent", color: "var(--dark)" }}
                              onClick={() => setCurrentPage(num)}
                            >
                              {num}
                            </button>
                          </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                          <button className="page-link border-0 text-secondary bg-transparent rounded-2" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}>
                            <i className="bi bi-chevron-right"></i>
                          </button>
                        </li>
                      </ul>
                    </nav>
                    <select
                      className="form-select form-select-sm border rounded-2"
                      style={{ width: "100px", height: "30px", fontSize: "0.78rem" }}
                      value={`${rowsPerPage} / page`}
                      onChange={e => { setRowsPerPage(parseInt(e.target.value)); setCurrentPage(1); }}
                    >
                      <option value="10">10 / page</option>
                      <option value="25">25 / page</option>
                      <option value="50">50 / page</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Right: Widgets */}
              <div className="col-12 col-lg-4">
                <div className="d-flex flex-column gap-3">

                  {/* Doughnut: Customers by Type */}
                  <div className="section-card border border-light p-4">
                    <h3 className="section-card-title mb-4">Customers by Type</h3>
                    <div className="row align-items-center">
                      <div className="col-5 d-flex justify-content-center align-items-center position-relative" style={{ height: 130 }}>
                        <div style={{ width: 130, height: 130 }}>
                          <Doughnut data={doughnutData} options={doughnutOptions} />
                        </div>
                        <div className="position-absolute text-center" style={{ pointerEvents: "none" }}>
                          <span className="fw-800 text-dark d-block" style={{ fontSize: "1.3rem", lineHeight: 1.1 }}>{totalCustomers}</span>
                          <span className="text-secondary fw-600" style={{ fontSize: "0.62rem", letterSpacing: "0.5px" }}>TOTAL</span>
                        </div>
                      </div>
                      <div className="col-7">
                        <div className="d-flex flex-column gap-2" style={{ fontSize: "0.78rem" }}>
                          {[
                            { label: "Individual", color: "#3B82F6" },
                            { label: "Family", color: "#F97316" },
                            { label: "Corporate", color: "#1E6C45" },
                            { label: "Couple", color: "#A855F7" },
                            { label: "Group", color: "#EF4444" },
                          ].map(item => {
                            const count = customers.filter(c => c.customer_type === item.label).length;
                            const pct = totalCustomers > 0 ? ((count / totalCustomers) * 100).toFixed(1) : "0.0";
                            return (
                              <div key={item.label} className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center gap-2">
                                  <span className="rounded-circle d-inline-block" style={{ width: 8, height: 8, backgroundColor: item.color }}></span>
                                  <span className="text-secondary fw-500">{item.label}</span>
                                </div>
                                <span className="fw-700 text-dark">{count} <span className="text-secondary fw-500">({pct}%)</span></span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
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
