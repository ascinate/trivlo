"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Dummy Data for Table
const suppliersData = [
  {
    id: 1,
    name: "Emirates Airlines",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg",
    category: "Airline",
    contactName: "Mark Johnson",
    contactRole: "Sales Manager",
    email: "sales@emirates.com",
    phone: "+971 4 309 1111",
    country: "UAE",
    flag: "🇦🇪",
    status: "Active"
  },
  {
    id: 2,
    name: "Qatar Airways",
    logo: "https://upload.wikimedia.org/wikipedia/en/9/9b/Qatar_Airways_Logo.svg",
    category: "Airline",
    contactName: "Sarah Al Thani",
    contactRole: "Account Manager",
    email: "sales@qatarairways.com",
    phone: "+974 4022 2200",
    country: "Qatar",
    flag: "🇶🇦",
    status: "Active"
  },
  {
    id: 3,
    name: "Marriott International",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/47/Marriott_International_logo.svg",
    category: "Hotel",
    contactName: "James Wilson",
    contactRole: "Regional Director",
    email: "b2b@marriott.com",
    phone: "+1 301 380 3000",
    country: "USA",
    flag: "🇺🇸",
    status: "Active"
  },
  {
    id: 4,
    name: "Hilton Hotels",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/36/Hilton_logo.svg",
    category: "Hotel",
    contactName: "Emily Carter",
    contactRole: "Sales Executive",
    email: "sales@hilton.com",
    phone: "+1 703 883 1000",
    country: "USA",
    flag: "🇺🇸",
    status: "Active"
  },
  {
    id: 5,
    name: "dnata Travel",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Dnata_logo.svg",
    category: "Transfer",
    contactName: "Ravi Kumar",
    contactRole: "Operations Head",
    email: "operations@dnatatravel.com",
    phone: "+971 4 212 4000",
    country: "UAE",
    flag: "🇦🇪",
    status: "Active"
  },
  {
    id: 6,
    name: "Avis Car Rental",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Avis_logo.svg",
    category: "Transfer",
    contactName: "Michael Brown",
    contactRole: "Sales Manager",
    email: "sales@avis.com",
    phone: "+1 973 496 5000",
    country: "USA",
    flag: "🇺🇸",
    status: "Active"
  },
  {
    id: 7,
    name: "VFS Global",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/07/VFS_Global_logo.svg",
    category: "Visa & Docs",
    contactName: "Priya Sharma",
    contactRole: "Partnership Lead",
    email: "partners@vfsglobal.com",
    phone: "+65 6225 6788",
    country: "Singapore",
    flag: "🇸🇬",
    status: "Active"
  },
  {
    id: 8,
    name: "Allianz Travel Insurance",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Allianz.svg",
    category: "Insurance",
    contactName: "David Lee",
    contactRole: "Business Dev. Mgr.",
    email: "b2b@allianz-travel.com",
    phone: "+49 89 3800 9200",
    country: "Germany",
    flag: "🇩🇪",
    status: "Active"
  }
];

const categoryStyles = {
  "Airline": { bg: "#EAF2FF", text: "#2B73F6" },
  "Hotel": { bg: "#F4E8FB", text: "#8E44AD" },
  "Transfer": { bg: "#FEF3EB", text: "#D36C45" },
  "Visa & Docs": { bg: "#E6F8F5", text: "#0F9D58" },
  "Insurance": { bg: "#FEF7ED", text: "#B97C2B" }
};

export default function AllSuppliersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
          title="All Suppliers"
          subtitle="Home > Suppliers > All Suppliers"
          forcePageHeaderLayout={true}
          searchPlaceholder="Search inquiries, customers, bookings..."
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

              <span className="text-secondary fs-7 mt-1 d-block">Manage your travel suppliers and business partners.</span>
            </div>

            <div className="d-flex align-items-center gap-2 w-md-auto">
              <button
                className="btn btn-outline-success bg-white border-light rounded-3 px-3 py-2 fw-600 d-flex align-items-center gap-2 text-success shadow-sm"
                style={{ fontSize: "0.85rem", height: "42px" }}
              >
                <i className="bi bi-plus-lg"></i>
                <span>Add New Supplier</span>
              </button>

              <button
                className="btn btn-outline-secondary bg-white border-light rounded-3 px-3 py-2 fw-600 d-flex align-items-center gap-2 text-dark shadow-sm"
                style={{ fontSize: "0.85rem", height: "42px" }}
              >
                <i className="bi bi-upload"></i>
                <span>Import Suppliers</span>
              </button>

              <button
                className="btn btn-outline-secondary bg-white border-light rounded-3 px-3 py-2 fw-600 d-flex align-items-center gap-2 text-dark shadow-sm"
                style={{ fontSize: "0.85rem", height: "42px" }}
              >
                <span>... More Actions</span>
              </button>
            </div>
          </div>

          {/* Stats Row */}


          {/* Main Layout: Split Columns */}
          <div className="row g-4 align-items-start">
            {/* Left Column: Table (8 cols on XL, 12 on smaller) */}
            <div className="col-12 col-xl-9">

              <div className="row g-3 row-cols-2 row-cols-md-3 row-cols-xl-5">
                {/* Total Suppliers */}
                <div className="col">
                  <div className="dashboard-card align-items-center" style={{ padding: "1.25rem" }}>
                    <div className="dashboard-card-icon" style={{ backgroundColor: "#E9F4EE", color: "#1E6C45" }}>
                      <i className="bi bi-buildings fs-5"></i>
                    </div>
                    <div className="dashboard-card-info">
                      <span className="dashboard-card-val fs-4 fw-800" style={{ color: "#112E24" }}>124</span>
                      <span className="dashboard-card-label" style={{ fontSize: "0.75rem", fontWeight: "500" }}>Total Suppliers</span>
                    </div>
                  </div>
                </div>

                {/* Airlines */}
                <div className="col">
                  <div className="dashboard-card align-items-center" style={{ padding: "1.25rem" }}>
                    <div className="dashboard-card-icon" style={{ backgroundColor: "#EAF2FF", color: "#2B73F6" }}>
                      <i className="bi bi-airplane fs-5"></i>
                    </div>
                    <div className="dashboard-card-info">
                      <span className="dashboard-card-val fs-4 fw-800" style={{ color: "#112E24" }}>48</span>
                      <span className="dashboard-card-label" style={{ fontSize: "0.75rem", fontWeight: "500" }}>Airlines</span>
                    </div>
                  </div>
                </div>

                {/* Hotels */}
                <div className="col">
                  <div className="dashboard-card align-items-center" style={{ padding: "1.25rem" }}>
                    <div className="dashboard-card-icon" style={{ backgroundColor: "#F4E8FB", color: "#8E44AD" }}>
                      <i className="bi bi-building fs-5"></i>
                    </div>
                    <div className="dashboard-card-info">
                      <span className="dashboard-card-val fs-4 fw-800" style={{ color: "#112E24" }}>36</span>
                      <span className="dashboard-card-label" style={{ fontSize: "0.75rem", fontWeight: "500" }}>Hotels</span>
                    </div>
                  </div>
                </div>

                {/* Transfer Services */}
                <div className="col">
                  <div className="dashboard-card align-items-center" style={{ padding: "1.25rem" }}>
                    <div className="dashboard-card-icon" style={{ backgroundColor: "#FEF3EB", color: "#D36C45" }}>
                      <i className="bi bi-bus-front fs-5"></i>
                    </div>
                    <div className="dashboard-card-info">
                      <span className="dashboard-card-val fs-4 fw-800" style={{ color: "#112E24" }}>22</span>
                      <span className="dashboard-card-label" style={{ fontSize: "0.75rem", fontWeight: "500" }}>Transfer Services</span>
                    </div>
                  </div>
                </div>

                {/* Other Services */}
                <div className="col">
                  <div className="dashboard-card align-items-center" style={{ padding: "0.85rem" }}>
                    <div className="dashboard-card-icon" style={{ backgroundColor: "#E6F8F5", color: "#0F9D58" }}>
                      <i className="bi bi-file-earmark-check fs-5"></i>
                    </div>
                    <div className="dashboard-card-info">
                      <span className="dashboard-card-val fs-4 fw-800" style={{ color: "#112E24" }}>18</span>
                      <span className="dashboard-card-label" style={{ fontSize: "0.75rem", fontWeight: "500" }}>Other Services</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="section-card border border-light mt-4 p-0 bg-white overflow-hidden">
                {/* Table Header & Filters */}
                <div className="p-3 border-bottom border-light d-flex flex-column flex-md-row justify-content-between gap-3 bg-white">
                  <div className="d-flex gap-2">
                    <select className="form-select border-light bg-light-subtle rounded-3 text-secondary fw-500 shadow-sm" style={{ fontSize: "0.85rem", width: "160px", backgroundColor: "#FCFAF6" }}>
                      <option>All Categories</option>
                      <option>Airlines</option>
                      <option>Hotels</option>
                      <option>Transfers</option>
                    </select>

                    <select className="form-select border-light bg-light-subtle rounded-3 text-secondary fw-500 shadow-sm" style={{ fontSize: "0.85rem", width: "120px", backgroundColor: "#FCFAF6" }}>
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>Pending</option>
                    </select>
                  </div>

                  <div className="d-flex gap-2 w-100" style={{ maxWidth: "400px" }}>
                    <div className="position-relative flex-grow-1">
                      <i className="bi bi-search position-absolute text-secondary" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", fontSize: "0.9rem" }}></i>
                      <input
                        type="text"
                        className="form-control border-light bg-light-subtle rounded-3 shadow-sm"
                        placeholder="Search supplier..."
                        style={{ paddingLeft: "2.5rem", fontSize: "0.85rem", backgroundColor: "#FCFAF6" }}
                      />
                    </div>
                    <button className="btn btn-outline-secondary bg-white border-light shadow-sm rounded-3 px-3 d-flex align-items-center gap-2 fw-600 text-dark">
                      <i className="bi bi-funnel"></i>
                      <span className="d-none d-sm-inline">Filter</span>
                    </button>
                  </div>
                </div>

                {/* Table Data */}
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0" style={{ fontSize: "0.85rem" }}>
                    <thead className="bg-light text-secondary">
                      <tr>
                        <th className="fw-600 py-3 ps-4 border-0" style={{ width: "220px", color: "#8C9C95" }}>Supplier Name <i className="bi bi-chevron-expand ms-1"></i></th>
                        <th className="fw-600 py-3 border-0" style={{ color: "#8C9C95" }}>Category</th>
                        <th className="fw-600 py-3 border-0" style={{ color: "#8C9C95" }}>Contact Person</th>
                        <th className="fw-600 py-3 border-0" style={{ color: "#8C9C95" }}>Email <i className="bi bi-chevron-expand ms-1"></i></th>
                        <th className="fw-600 py-3 border-0" style={{ color: "#8C9C95" }}>Phone</th>
                        <th className="fw-600 py-3 border-0" style={{ color: "#8C9C95" }}>Country</th>
                        <th className="fw-600 py-3 border-0" style={{ color: "#8C9C95" }}>Status</th>
                        <th className="fw-600 py-3 pe-4 border-0 text-center" style={{ color: "#8C9C95" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="border-top-0">
                      {suppliersData.map((supplier) => (
                        <tr key={supplier.id} className="border-bottom border-light">
                          <td className="ps-4 py-3">
                            <div className="d-flex align-items-center gap-3">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={supplier.logo} alt={supplier.name} style={{ width: "32px", height: "32px", objectFit: "contain" }} />
                              <span className="fw-700 text-dark">{supplier.name}</span>
                            </div>
                          </td>
                          <td className="py-3">
                            <span
                              className="badge rounded-2 fw-600 px-2 py-1 fs-9"
                              style={{
                                backgroundColor: categoryStyles[supplier.category]?.bg || "#EFECE6",
                                color: categoryStyles[supplier.category]?.text || "#677E75"
                              }}
                            >
                              {supplier.category}
                            </span>
                          </td>
                          <td className="py-3">
                            <div className="d-flex flex-column">
                              <span className="fw-700 text-dark" style={{ fontSize: "0.8rem" }}>{supplier.contactName}</span>
                              <span className="text-secondary" style={{ fontSize: "0.75rem" }}>{supplier.contactRole}</span>
                            </div>
                          </td>
                          <td className="py-3 text-secondary fw-500">{supplier.email}</td>
                          <td className="py-3 text-secondary fw-500">{supplier.phone}</td>
                          <td className="py-3">
                            <div className="d-flex align-items-center gap-2">
                              <span className="fs-5">{supplier.flag}</span>
                              <span className="fw-600 text-dark">{supplier.country}</span>
                            </div>
                          </td>
                          <td className="py-3">
                            <span className="badge rounded-2 fw-700 px-2 py-1 fs-9" style={{ backgroundColor: "#E9F4EE", color: "#1E6C45" }}>
                              {supplier.status}
                            </span>
                          </td>
                          <td className="pe-4 py-3 text-center">
                            <div className="d-flex justify-content-center gap-1">
                              <button className="btn btn-sm btn-light bg-transparent border-light shadow-sm text-secondary" style={{ width: "32px", height: "32px" }}>
                                <i className="bi bi-eye"></i>
                              </button>
                              <button className="btn btn-sm btn-light bg-transparent border-light shadow-sm text-secondary" style={{ width: "32px", height: "32px" }}>
                                <i className="bi bi-three-dots"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination footer */}
                <div className="p-3 border-top border-light d-flex justify-content-between align-items-center bg-white text-secondary" style={{ fontSize: "0.85rem" }}>
                  <span>Showing 1 to 8 of 124 suppliers</span>

                  <div className="d-flex align-items-center gap-3">
                    <div className="d-flex gap-1">
                      <button className="btn btn-sm btn-outline-secondary border-0 text-secondary"><i className="bi bi-chevron-left"></i></button>
                      <button className="btn btn-sm rounded-3 fw-600" style={{ backgroundColor: "#112E24", color: "white", width: "32px", height: "32px" }}>1</button>
                      <button className="btn btn-sm btn-light bg-transparent border-0 text-secondary fw-600" style={{ width: "32px", height: "32px" }}>2</button>
                      <button className="btn btn-sm btn-light bg-transparent border-0 text-secondary fw-600" style={{ width: "32px", height: "32px" }}>3</button>
                      <span className="d-flex align-items-center px-1">...</span>
                      <button className="btn btn-sm btn-light bg-transparent border-0 text-secondary fw-600" style={{ width: "32px", height: "32px" }}>16</button>
                      <button className="btn btn-sm btn-outline-secondary border-0 text-secondary"><i className="bi bi-chevron-right"></i></button>
                    </div>

                    <select className="form-select form-select-sm border-light bg-light-subtle rounded-3 text-secondary fw-500 shadow-sm" style={{ width: "100px", backgroundColor: "#FCFAF6" }}>
                      <option>10 / page</option>
                      <option>20 / page</option>
                      <option>50 / page</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Widgets (4 cols on XL, 12 on smaller) */}
            <div className="col-12 col-xl-3">
              <div className="d-flex flex-column gap-4">

                {/* Supplier Overview Widget */}
                <div className="section-card border border-light p-4 bg-white">
                  <h3 className="section-card-title mb-4 fs-6 fw-800">Supplier Overview</h3>
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="d-flex justify-content-center position-relative">
                      {/* SVG Donut Chart */}
                      <svg width="150" height="150" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#EFECE6" strokeWidth="12" />
                        {/* Airlines: 39% -> 98 */}
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#2B73F6" strokeWidth="12" strokeDasharray="98 251" strokeDashoffset="0" />
                        {/* Hotels: 29% -> 73 */}
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#8E44AD" strokeWidth="12" strokeDasharray="73 251" strokeDashoffset="-98" />
                        {/* Transfer: 18% -> 45 */}
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#E8A856" strokeWidth="12" strokeDasharray="45 251" strokeDashoffset="-171" />
                        {/* Other: 14% -> 35 */}
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#677E75" strokeWidth="12" strokeDasharray="35 251" strokeDashoffset="-216" />
                      </svg>
                      <div className="position-absolute top-50 start-50 translate-middle text-center">
                        <span className="d-block fw-800 text-dark fs-3" style={{ lineHeight: 1 }}>124</span>
                        <span className="d-block text-secondary fs-9 fw-600">Total</span>
                      </div>
                    </div>

                    <div className="d-flex flex-column gap-2 fs-8 fw-600">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-circle-fill" style={{ fontSize: "0.5rem", color: "#2B73F6" }}></i>
                          <span className="text-secondary">Airlines</span>
                        </div>
                        <div className="text-dark">
                          <span className="fw-700 me-2">48</span>
                          <span className="text-secondary fw-500">(39%)</span>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-circle-fill" style={{ fontSize: "0.5rem", color: "#8E44AD" }}></i>
                          <span className="text-secondary">Hotels</span>
                        </div>
                        <div className="text-dark">
                          <span className="fw-700 me-2">36</span>
                          <span className="text-secondary fw-500">(29%)</span>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-circle-fill" style={{ fontSize: "0.5rem", color: "#E8A856" }}></i>
                          <span className="text-secondary">Transfer</span>
                        </div>
                        <div className="text-dark">
                          <span className="fw-700 me-2">22</span>
                          <span className="text-secondary fw-500">(18%)</span>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-circle-fill" style={{ fontSize: "0.5rem", color: "#677E75" }}></i>
                          <span className="text-secondary">Other Services</span>
                        </div>
                        <div className="text-dark">
                          <span className="fw-700 me-2">18</span>
                          <span className="text-secondary fw-500">(14%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Supplier Types Widget */}
                <div className="section-card border border-light p-4 bg-white">
                  <h3 className="section-card-title mb-4 fs-6 fw-800">Top Supplier Types</h3>

                  <div className="d-flex flex-column gap-3 fs-8 fw-600">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-airplane text-primary fs-7" style={{ color: "#2B73F6 !important" }}></i>
                        <span className="text-dark">Airlines</span>
                      </div>
                      <span className="text-secondary fw-700">48</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-building text-primary fs-7" style={{ color: "#8E44AD !important" }}></i>
                        <span className="text-dark">Hotels</span>
                      </div>
                      <span className="text-secondary fw-700">36</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-bus-front text-primary fs-7" style={{ color: "#D36C45 !important" }}></i>
                        <span className="text-dark">Transfer Services</span>
                      </div>
                      <span className="text-secondary fw-700">22</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-file-earmark-text text-primary fs-7" style={{ color: "#0F9D58 !important" }}></i>
                        <span className="text-dark">Visa & Docs</span>
                      </div>
                      <span className="text-secondary fw-700">10</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-shield-check text-primary fs-7" style={{ color: "#B97C2B !important" }}></i>
                        <span className="text-dark">Insurance</span>
                      </div>
                      <span className="text-secondary fw-700">8</span>
                    </div>
                  </div>
                </div>

                {/* Recent Suppliers Widget */}
                <div className="section-card border border-light p-4 bg-white">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="section-card-title fs-6 fw-800 m-0">Recent Suppliers</h3>
                    <a href="#" className="section-card-link text-primary fs-8">View All</a>
                  </div>

                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/23/Turkish_Airlines_logo.svg" alt="Turkish Airlines" style={{ width: "24px", height: "24px", objectFit: "contain" }} />
                        <div className="d-flex flex-column">
                          <span className="fw-700 text-dark fs-8">Turkish Airlines</span>
                          <span className="text-secondary fs-9">18 May 2025</span>
                        </div>
                      </div>
                      <span className="badge rounded-2 fw-700 px-2 py-1" style={{ backgroundColor: "#E9F4EE", color: "#1E6C45", fontSize: "0.65rem" }}>Active</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/07/Accor_Logo_2019.svg" alt="Accor Hotels" style={{ width: "24px", height: "24px", objectFit: "contain" }} />
                        <div className="d-flex flex-column">
                          <span className="fw-700 text-dark fs-8">Accor Hotels</span>
                          <span className="text-secondary fs-9">16 May 2025</span>
                        </div>
                      </div>
                      <span className="badge rounded-2 fw-700 px-2 py-1" style={{ backgroundColor: "#E9F4EE", color: "#1E6C45", fontSize: "0.65rem" }}>Active</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/9f/Sixt_logo.svg" alt="Sixt Car Rental" style={{ width: "24px", height: "24px", objectFit: "contain" }} />
                        <div className="d-flex flex-column">
                          <span className="fw-700 text-dark fs-8">Sixt Car Rental</span>
                          <span className="text-secondary fs-9">14 May 2025</span>
                        </div>
                      </div>
                      <span className="badge rounded-2 fw-700 px-2 py-1" style={{ backgroundColor: "#E9F4EE", color: "#1E6C45", fontSize: "0.65rem" }}>Active</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/AXA_Logo.svg" alt="AXA Travel Insurance" style={{ width: "24px", height: "24px", objectFit: "contain" }} />
                        <div className="d-flex flex-column">
                          <span className="fw-700 text-dark fs-8">AXA Travel Insurance</span>
                          <span className="text-secondary fs-9">12 May 2025</span>
                        </div>
                      </div>
                      <span className="badge rounded-2 fw-700 px-2 py-1" style={{ backgroundColor: "#E9F4EE", color: "#1E6C45", fontSize: "0.65rem" }}>Active</span>
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
                        <span>Add New Supplier</span>
                      </div>
                      <i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.7rem" }}></i>
                    </a>
                    <a href="#" className="d-flex align-items-center justify-content-between text-decoration-none text-dark py-1">
                      <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-card-list text-secondary fs-6"></i>
                        <span>Add Supplier Category</span>
                      </div>
                      <i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.7rem" }}></i>
                    </a>
                    <a href="#" className="d-flex align-items-center justify-content-between text-decoration-none text-dark py-1">
                      <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-file-earmark-text text-secondary fs-6"></i>
                        <span>Manage Contracts</span>
                      </div>
                      <i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.7rem" }}></i>
                    </a>
                    <a href="#" className="d-flex align-items-center justify-content-between text-decoration-none text-dark py-1">
                      <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-bank text-secondary fs-6"></i>
                        <span>Supplier Bank Details</span>
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
