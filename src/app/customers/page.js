"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
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

const FLAG_URLS = {
  Indonesia: "https://flagcdn.com/w40/id.png",
  UAE: "https://flagcdn.com/w40/ae.png",
  Singapore: "https://flagcdn.com/w40/sg.png",
  Thailand: "https://flagcdn.com/w40/th.png",
  Australia: "https://flagcdn.com/w40/au.png",
  UK: "https://flagcdn.com/w40/gb.png",
  Vietnam: "https://flagcdn.com/w40/vn.png",
  USA: "https://flagcdn.com/w40/us.png",
  Germany: "https://flagcdn.com/w40/de.png",
  India: "https://flagcdn.com/w40/in.png",
};

const AVATAR_URLS = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&auto=format&fit=crop&q=80",
];

const STATUS_STYLES = {
  Active: { bg: "#E9F4EE", color: "#1E6C45" },
  Inactive: { bg: "#F3F4F6", color: "#6B7280" },
};

const TYPE_BADGE_STYLES = {
  Individual: { bg: "#EEF2FF", color: "#4338CA" },
  Family: { bg: "#FFF7ED", color: "#C2410C" },
  Corporate: { bg: "#ECFDF5", color: "#065F46" },
  Couple: { bg: "#FDF4FF", color: "#7E22CE" },
  Group: { bg: "#FFF1F2", color: "#BE123C" },
};

export default function CustomersPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBackendCustomers() {
      setLoading(true);
      try {
        const res = await agencyApi.customers.list("?per_page=50");
        const raw = res?.data;
        const list = Array.isArray(raw) ? raw : (raw?.data || []);
        const mapped = list.map((item) => ({
          id: item.customer_code || `C-00${item.id}`,
          dbId: item.id,
          name: item.full_name,
          badge: item.badge || null,
          email: item.email,
          phone: item.phone_code ? `${item.phone_code} ${item.phone}` : item.phone,
          country: item.country || "—",
          countryCode: item.country || "—",
          type: item.customer_type || "Individual",
          status: item.status ? (item.status.charAt(0).toUpperCase() + item.status.slice(1)) : "Active",
          bookings: 0,
          spent: "$0",
          lastBooking: item.customer_since || "—",
        }));
        setCustomers(mapped);
      } catch (err) {
        console.error("Could not load backend customers:", err);
        setCustomers([]);
      } finally {
        setLoading(false);
      }
    }
    loadBackendCustomers();
  }, []);

  const [countryFilter, setCountryFilter] = useState("All Countries");
  const [cityFilter, setCityFilter] = useState("All Cities");
  const [typeFilter, setTypeFilter] = useState("All Customer Types");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const rowsPerPage = 10;

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const filtered = useMemo(() => {
    return customers.filter(c => {
      if (countryFilter !== "All Countries" && c.countryCode !== countryFilter) return false;
      if (typeFilter !== "All Customer Types" && c.type !== typeFilter) return false;
      if (statusFilter !== "All Status" && c.status !== statusFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
      }
      return true;
    });
  }, [customers, countryFilter, typeFilter, statusFilter, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const paged = filtered.slice((safePage - 1) * rowsPerPage, safePage * rowsPerPage);

  const handleSelectAll = () => {
    const ids = paged.map(c => c.id);
    const allSel = ids.every(id => selectedIds.includes(id));
    setSelectedIds(allSel ? selectedIds.filter(id => !ids.includes(id)) : [...new Set([...selectedIds, ...ids])]);
  };

  // Dynamic calculations for Widgets & Stats
  const totalCount = customers.length;
  const activeCount = customers.filter(c => (c.status || "").toLowerCase() === "active").length;
  const repeatCount = customers.filter(c => (c.bookings || 0) > 1).length;
  const bookingsCount = customers.reduce((acc, c) => acc + (c.bookings || 0), 0);
  const totalSpentVal = customers.reduce((acc, c) => {
    const num = parseFloat((c.spent || "0").toString().replace(/[^0-9.]/g, "")) || 0;
    return acc + num;
  }, 0);

  const stats = [
    { label: "Total Customers", value: totalCount.toLocaleString(), trend: "↑ 12.8%", trendUp: true, icon: "bi-people", bgColor: "#E9F4EE", iconColor: "#1E6C45" },
    { label: "Active Customers", value: activeCount.toLocaleString(), trend: "↑ 11.6%", trendUp: true, icon: "bi-person-check", bgColor: "#FEF7ED", iconColor: "#B97C2B" },
    { label: "Repeat Customers", value: repeatCount.toLocaleString(), trend: "↑ 14.3%", trendUp: true, icon: "bi-arrow-repeat", bgColor: "#ECEFFE", iconColor: "#5D59E1" },
    { label: "Total Bookings", value: bookingsCount.toLocaleString(), trend: "↑ 13.7%", trendUp: true, icon: "bi-suitcase-lg", bgColor: "#F0F4F2", iconColor: "#677E75" },
    { label: "Total Spent", value: `$${totalSpentVal.toLocaleString()}`, trend: "↑ 15.2%", trendUp: true, icon: "bi-currency-dollar", bgColor: "#FDF0F0", iconColor: "#D05E5E" },
  ];

  const typeCounts = useMemo(() => {
    const counts = { Individual: 0, Family: 0, Corporate: 0, Couple: 0, Group: 0 };
    customers.forEach(c => {
      const t = c.type || "Individual";
      if (counts[t] !== undefined) counts[t]++;
      else counts.Individual++;
    });
    return counts;
  }, [customers]);

  const typeBreakdown = useMemo(() => {
    const total = customers.length || 1;
    const colors = { Individual: "#3B82F6", Family: "#F97316", Corporate: "#1E6C45", Couple: "#A855F7", Group: "#EF4444" };
    return Object.entries(typeCounts).map(([label, count]) => ({
      label,
      count,
      pct: `${((count / total) * 100).toFixed(1)}%`,
      color: colors[label] || "#3B82F6"
    }));
  }, [typeCounts, customers.length]);

  const doughnutData = {
    labels: ["Individual", "Family", "Corporate", "Couple", "Group"],
    datasets: [{
      data: [
        typeCounts.Individual,
        typeCounts.Family,
        typeCounts.Corporate,
        typeCounts.Couple,
        typeCounts.Group
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

  const topCountries = useMemo(() => {
    if (customers.length === 0) return [];
    const map = {};
    customers.forEach(c => {
      const cntry = c.country && c.country !== "—" ? c.country : "Other";
      map[cntry] = (map[cntry] || 0) + 1;
    });
    const sorted = Object.entries(map)
      .map(([label, count]) => {
        const foundCc = COUNTRY_CODES.find(cc => cc.country.toLowerCase() === label.toLowerCase());
        const flag = FLAG_URLS[label] || (foundCc ? `https://flagcdn.com/w40/${foundCc.iso}.png` : "");
        return { label, flag, count };
      })
      .sort((a, b) => b.count - a.count);

    const maxCount = sorted[0]?.count || 1;
    return sorted.map(item => ({
      ...item,
      pct: Math.round((item.count / maxCount) * 100)
    }));
  }, [customers]);

  const recentActivities = useMemo(() => {
    if (customers.length === 0) return [];
    return customers.slice(0, 5).map(c => ({
      text: `New customer ${c.name} added`,
      time: c.lastBooking && c.lastBooking !== "—" ? c.lastBooking : "Recently",
      type: "add"
    }));
  }, [customers]);

  const activityIcon = (type) => {
    switch (type) {
      case "add": return { icon: "bi-person-plus-fill", color: "#1E6C45", bg: "#E9F4EE" };
      case "booking": return { icon: "bi-journal-bookmark-fill", color: "#B97C2B", bg: "#FEF7ED" };
      case "payment": return { icon: "bi-credit-card-fill", color: "#5D59E1", bg: "#ECEFFE" };
      case "itinerary": return { icon: "bi-map-fill", color: "#677E75", bg: "#F0F4F2" };
      case "update": return { icon: "bi-pencil-fill", color: "#D05E5E", bg: "#FCEAEA" };
      default: return { icon: "bi-circle-fill", color: "#677E75", bg: "#F0F4F2" };
    }
  };

  const newCustomerButton = (
    <button
      className="btn text-white rounded-3 px-3 d-flex align-items-center gap-2"
      style={{ backgroundColor: "#112E24", height: "42px", fontWeight: "400" }}
      id="btn-new-customer"
      onClick={() => router.push("/customers/new")}
    >
      <i className="bi bi-plus-lg fs-6"></i>
      <span>New Customer</span>
      <i className="bi bi-chevron-down ms-1" style={{ fontSize: "0.75rem" }}></i>
    </button>
  );

  return (
    <ProtectedRoute>
      <div className="d-flex position-relative">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="app-container flex-grow-1 min-vh-100 d-flex flex-column justify-content-between">
        <Header
          toggleSidebar={toggleSidebar}
          title="Customers Details"
          subtitle="Home > CRM >  Customers > Customers Details"
          forcePageHeaderLayout={true}
          searchPlaceholder="Search inquiries, customers, bookings, quotations..."
          actionButton={newCustomerButton}
        />

        <main className="main-content d-flex flex-column gap-4 py-4">

          {/* Page header */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-2">
            <div>
              <p className="text-secondary fs-7 mt-1 mb-0">Manage your customers and their travel history.</p>
            </div>
            <div className="d-flex align-items-center gap-2 border rounded-3 border-light bg-white px-3 py-2 shadow-sm" style={{ fontSize: "0.82rem", fontWeight: 600, color: "#495057" }}>
              <i className="bi bi-calendar3 text-secondary"></i>
              <span>01 May 2025 – 31 May 2025</span>
              <i className="bi bi-chevron-down text-secondary" style={{ fontSize: "0.7rem" }}></i>
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
                {[
                  { val: countryFilter, set: setCountryFilter, def: "All Countries", opts: ["Indonesia", "UAE", "Singapore", "Thailand", "Australia", "UK", "Vietnam", "USA", "Germany", "India"] },
                  { val: cityFilter, set: setCityFilter, def: "All Cities", opts: ["Jakarta", "Dubai", "Singapore City", "Bangkok", "Sydney", "London"] },
                  { val: typeFilter, set: setTypeFilter, def: "All Customer Types", opts: ["Individual", "Family", "Corporate", "Couple", "Group"] },
                  { val: statusFilter, set: setStatusFilter, def: "All Status", opts: ["Active", "Inactive"] },
                ].map(({ val, set, def, opts }) => (
                  <select
                    key={def}
                    className="form-select rounded-3 border-light shadow-sm text-dark bg-white fw-600"
                    style={{ width: "auto", minWidth: "155px", height: "42px", fontSize: "0.85rem" }}
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
                <button className="btn btn-light border border-light shadow-sm rounded-3 fw-600 d-flex align-items-center gap-1" style={{ height: "42px", fontSize: "0.85rem" }} onClick={() => { setCountryFilter("All Countries"); setCityFilter("All Cities"); setTypeFilter("All Customer Types"); setStatusFilter("All Status"); setSearchQuery(""); }}>
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
            <div className="col-12 col-lg-8">
              <div className="section-card border border-light p-4">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead>
                      <tr className="border-bottom border-light">
                        <th className="pb-3" style={{ width: 40 }}>
                          <input type="checkbox" className="form-check-input shadow-none"
                            checked={paged.length > 0 && paged.every(c => selectedIds.includes(c.id))}
                            onChange={handleSelectAll} />
                        </th>
                        {["Customer Name", "Email", "Phone", "Country", "Customer Type", "Status", "Total Bookings", "Total Spent", "Last Booking", "Actions"].map(h => (
                          <th key={h} className="lablename pb-3" style={{ whiteSpace: "nowrap", textTransform: "uppercase" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={10} className="text-center py-5">
                            <div className="spinner-border text-success" role="status" style={{ width: "2rem", height: "2rem" }}>
                              <span className="visually-hidden">Loading...</span>
                            </div>
                            <div className="text-secondary fs-8 mt-2 fw-500">Loading customers...</div>
                          </td>
                        </tr>
                      ) : paged.length === 0 ? (
                        <tr>
                          <td colSpan={10} className="text-center py-5 text-secondary">
                            <i className="bi bi-people fs-1 d-block mb-2 text-muted"></i>
                            <div className="fw-600">No customers found.</div>
                          </td>
                        </tr>
                      ) : (
                        paged.map((c, idx) => {
                          const st = STATUS_STYLES[c.status] || { bg: "#F3F4F6", color: "#6B7280" };
                          const typeSt = TYPE_BADGE_STYLES[c.type] || { bg: "#F3F4F6", color: "#6B7280" };
                          const flag = FLAG_URLS[c.countryCode] || (COUNTRY_CODES.find(cc => cc.country.toLowerCase() === (c.country || "").toLowerCase()) ? `https://flagcdn.com/w40/${COUNTRY_CODES.find(cc => cc.country.toLowerCase() === (c.country || "").toLowerCase()).iso}.png` : "");
                          const avatar = AVATAR_URLS[idx % AVATAR_URLS.length];
                          return (
                            <tr
                              key={c.id}
                              className="border-bottom border-light"
                              style={{ cursor: "pointer" }}
                              onClick={() => router.push(`/customers/${c.id}`)}
                            >
                              <td style={{ padding: "0.9rem 0.5rem" }} onClick={e => e.stopPropagation()}>
                                <input type="checkbox" className="form-check-input shadow-none"
                                  checked={selectedIds.includes(c.id)}
                                  onChange={() => setSelectedIds(prev => prev.includes(c.id) ? prev.filter(x => x !== c.id) : [...prev, c.id])} />
                              </td>
                              <td style={{ padding: "0.9rem 0.5rem" }}>
                                <div className="d-flex align-items-center gap-2">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={avatar} alt={c.name} className="rounded-circle border" style={{ width: 34, height: 34, objectFit: "cover" }} />
                                  <div>
                                    <div className="d-flex align-items-center gap-1">
                                      <span className="fw-700 text-dark bd-labe" style={{ fontSize: "0.85rem", lineHeight: 1.2 }}>{c.name}</span>
                                      {c.badge && (
                                        <span className="badge rounded-1 px-2 py-1 fw-700" style={{ fontSize: "0.6rem", backgroundColor: c.badge === "VIP" ? "#112E24" : "#7C3AED", color: "#fff" }}>{c.badge}</span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="text-secondary fw-500" style={{ padding: "0.9rem 0.5rem", fontSize: "0.82rem" }}>{c.email}</td>
                              <td className="fw-600 text-dark" style={{ padding: "0.9rem 0.5rem", fontSize: "0.82rem", whiteSpace: "nowrap" }}>{c.phone}</td>
                              <td style={{ padding: "0.9rem 0.5rem" }}>
                                <div className="d-flex align-items-center gap-1">
                                  {flag && <img src={flag} alt={c.country} className="rounded-1" style={{ width: 18, height: 12, objectFit: "cover" }} />}
                                  <span className="fw-600 text-dark" style={{ fontSize: "0.82rem" }}>{c.country}</span>
                                </div>
                              </td>
                              <td style={{ padding: "0.9rem 0.5rem" }}>
                                <span className="badge px-2 py-1 rounded-2 fw-700" style={{ fontSize: "0.72rem", backgroundColor: typeSt.bg, color: typeSt.color }}>{c.type}</span>
                              </td>
                              <td style={{ padding: "0.9rem 0.5rem" }}>
                                <span className="badge px-3 py-2 rounded-2 fw-700 fs-8" style={{ backgroundColor: st.bg, color: st.color }}>{c.status}</span>
                              </td>
                              <td className="fw-700 text-dark text-center" style={{ padding: "0.9rem 0.5rem", fontSize: "0.85rem" }}>{c.bookings}</td>
                              <td className="fw-700 text-dark" style={{ padding: "0.9rem 0.5rem", fontSize: "0.85rem" }}>{c.spent}</td>
                              <td className="fw-600 text-secondary" style={{ padding: "0.9rem 0.5rem", fontSize: "0.82rem", whiteSpace: "nowrap" }}>{c.lastBooking}</td>
                              <td style={{ padding: "0.9rem 0.5rem" }}>
                                <div className="d-inline-flex gap-1">
                                  <button
                                    className="btn btn-outline-light border rounded-3 p-1 text-secondary"
                                    style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center" }}
                                    aria-label="View"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      router.push(`/customers/${c.id}`);
                                    }}
                                  >
                                    <i className="bi bi-eye" style={{ fontSize: "0.8rem" }}></i>
                                  </button>
                                  <button className="btn btn-outline-light border rounded-3 p-1 text-secondary" style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="More">
                                    <i className="bi bi-three-dots-vertical" style={{ fontSize: "0.8rem" }}></i>
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
                    Showing {filtered.length === 0 ? 0 : (safePage - 1) * rowsPerPage + 1} to {Math.min(safePage * rowsPerPage, filtered.length)} of {filtered.length.toLocaleString()} customers
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
                        <span className="fw-800 text-dark d-block" style={{ fontSize: "1.3rem", lineHeight: 1.1 }}>{totalCount.toLocaleString()}</span>
                        <span className="text-secondary fw-600" style={{ fontSize: "0.62rem", letterSpacing: "0.5px" }}>TOTAL</span>
                      </div>
                    </div>
                    <div className="col-7">
                      <div className="d-flex flex-column gap-2" style={{ fontSize: "0.78rem" }}>
                        {typeBreakdown.map(item => (
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

                {/* Top Countries */}
                <div className="section-card border border-light p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="section-card-title">Top Countries</h3>
                    <a href="#" className="section-card-link" onClick={e => e.preventDefault()}>View All</a>
                  </div>
                  <div className="d-flex flex-column gap-2">
                    {topCountries.length > 0 ? (
                      topCountries.map(c => (
                        <div key={c.label} className="d-flex align-items-center justify-content-between gap-2">
                          <div className="d-flex align-items-center gap-2" style={{ width: 100 }}>
                            {c.flag && (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img src={c.flag} alt={c.label} className="rounded-1" style={{ width: 18, height: 12, objectFit: "cover" }} />
                            )}
                            <span className="fw-700 text-dark" style={{ fontSize: "0.82rem" }}>{c.label}</span>
                          </div>
                          <div className="flex-grow-1 mx-2">
                            <div className="progress rounded-pill bg-light" style={{ height: 6 }}>
                              <div className="progress-bar rounded-pill" style={{ width: `${c.pct}%`, backgroundColor: "#1C3F35" }}></div>
                            </div>
                          </div>
                          <span className="fw-800 text-dark" style={{ fontSize: "0.82rem", minWidth: 28, textAlign: "right" }}>{c.count}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-secondary fs-8 text-center py-2">No country data available</div>
                    )}
                  </div>
                </div>

                {/* Recent Activities */}
                <div className="section-card border border-light p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="section-card-title">Recent Activities</h3>
                    <a href="#" className="section-card-link" onClick={e => e.preventDefault()}>View All</a>
                  </div>
                  <div className="d-flex flex-column gap-3">
                    {recentActivities.length > 0 ? (
                      recentActivities.map((act, i) => {
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
                      })
                    ) : (
                      <div className="text-secondary fs-8 text-center py-2">No recent activity</div>
                    )}
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
    </ProtectedRoute>
  );
}
