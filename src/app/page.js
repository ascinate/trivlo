"use client";

import { useState, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import DashboardCards from "@/components/DashboardCards";
import BookingsMap from "@/components/BookingsMap";
import SalesPipeline from "@/components/SalesPipeline";
import DeparturesList from "@/components/DeparturesList";
import RevenueCharts from "@/components/RevenueCharts";
import BottomGrids from "@/components/BottomGrids";
import Footer from "@/components/Footer";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Datepicker ref for programmatic open
  const datePickerRef = useRef(null);
  const [datePickerValue, setDatePickerValue] = useState("");
  // Datepicker wrapper click handler
  const handleDatePickerWrapperClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.showPicker();
    }
  };

  return (
    <div className="d-flex position-relative">

      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Layout Container */}
      <div className="app-container w-100 min-vh-100 d-flex flex-column justify-content-between">

        {/* Header Navigation */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Main Workspace */}
        <main className="main-content d-flex flex-column gap-4">

          {/* Sub-Header Actions Row (Datepicker floating right) */}
          <div className="d-flex justify-content-end align-items-center">


            <div
              className="datepicker-wrapper position-relative"
              style={{ height: "42px", cursor: "pointer" }}
              onClick={handleDatePickerWrapperClick}
              role="button"
              aria-label="Select date range"
            >
              <i className="bi bi-calendar3 text-secondary me-2"></i>
              <span className="me-2 text-dark fw-600 inq-date-label">
                {datePickerValue
                  ? new Date(datePickerValue).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
                  : "01 May 2025 - 31 May 2025"}
              </span>
              <i className="bi bi-chevron-down text-secondary" style={{ fontSize: "0.8rem" }}></i>
              {/* Hidden native date input — programmatically opened via ref */}
              <input
                ref={datePickerRef}
                type="date"
                value={datePickerValue}
                onChange={(e) => setDatePickerValue(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: "absolute",
                  opacity: 0,
                  width: "1px",
                  height: "1px",
                  pointerEvents: "none",
                  bottom: 0,
                  left: 0
                }}
                aria-hidden="true"
                tabIndex="-1"
              />
            </div>
          </div>



          {/* 1. Stats Counter Cards Section */}
          <section className="stats-section">
            <DashboardCards />
          </section>

          {/* 2. Map, Pipeline, and Departures Row */}
          <section className="middle-row-section">
            <div className="row g-3">
              {/* Map (5 columns) */}
              <div className="col-12 col-xl-5">
                <BookingsMap />
              </div>

              {/* Sales Pipeline (3 columns) */}
              <div className="col-12 col-md-6 col-xl-3">
                <SalesPipeline />
              </div>

              {/* Departures List (4 columns) */}
              <div className="col-12 col-md-6 col-xl-4">
                <DeparturesList />
              </div>
            </div>
          </section>

          {/* 3. Revenue Trend & Source Charts Section */}
          <section className="revenue-section">
            <RevenueCharts />
          </section>

          {/* 4. Agents, Destinations & Recent Feed Section */}
          <section className="bottom-grids-section">
            <BottomGrids />
          </section>

        </main>

        {/* Page Footer */}
        <Footer />
      </div>

      {/* Overlay to click-close sidebar on mobile viewports */}
      {sidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-lg-none"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)", zIndex: 995 }}
          onClick={toggleSidebar}
        ></div>
      )}

    </div>
  );
}
