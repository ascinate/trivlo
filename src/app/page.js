"use client";

import { useState } from "react";
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
            <div className="datepicker-wrapper">
              <i className="bi bi-calendar3 text-secondary"></i>
              <span>01 May 2025 - 31 May 2025</span>
              <i className="bi bi-chevron-down text-secondary" style={{ fontSize: "0.8rem" }}></i>
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
