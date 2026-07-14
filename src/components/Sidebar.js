"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const pathname = usePathname();
  
  const menuItems = [
    { name: "Dashboard", icon: "bi-grid", href: "/" },
    { name: "Inquiries", icon: "bi-chat-left-text", href: "/inquiries", badge: 12 },
    { name: "Itineraries", icon: "bi-map", href: "#" },
    { name: "Quotations", icon: "bi-file-earmark-text", href: "#" },
    { name: "Bookings", icon: "bi-journal-bookmark", href: "#" },
    { name: "Customers", icon: "bi-people", href: "#" },
    { name: "Suppliers", icon: "bi-building", href: "#" },
    { name: "Flights", icon: "bi-airplane", href: "#" },
    { name: "Hotels", icon: "bi-house", href: "#" },
    { name: "Visa & Docs", icon: "bi-passport", href: "#" },
    { name: "Insurance", icon: "bi-shield-check", href: "#" },
    { name: "Finance", icon: "bi-wallet2", href: "#" },
    { name: "Reports", icon: "bi-bar-chart-line", href: "#" },
    { name: "Marketing", icon: "bi-megaphone", href: "#" },
    { name: "Calendar", icon: "bi-calendar3", href: "#" },
    { name: "Tasks", icon: "bi-check2-square", href: "#" },
    { name: "Documents", icon: "bi-file-earmark-text", href: "#" },
    { name: "Settings", icon: "bi-gear", href: "#" }
  ];

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <aside className={`sidebar ${isOpen ? "show" : ""}`}>
      {/* Brand Header */}
      <div className="brand d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="d-flex flex-column">
            <h2 className="m-0">
              TRIVLO <i className="bi bi-airplane-fill text-warning rotate-45" style={{ transform: "rotate(45deg)", display: "inline-block" }}></i>
            </h2>
            <p className="m-0 mt-1">Travel CRM & Booking Management</p>
          </div>
          {/* Close button for mobile */}
          <button 
            className="btn btn-link text-white d-lg-none p-0 ms-auto" 
            onClick={toggleSidebar}
            aria-label="Close Sidebar"
          >
            <i className="bi bi-x-lg fs-4"></i>
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`nav-link ${isActive ? "active" : ""}`}
              onClick={(e) => {
                if (item.href === "#") {
                  e.preventDefault();
                }
              }}
            >
              <i className={`bi ${item.icon}`}></i>
              <span>{item.name}</span>
              {item.badge && (
                <span className="sidebar-badge">{item.badge}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Footer Profile Card */}
      <div className="sidebar-footer">
        <div className="position-relative w-100">
          <button
            className="sidebar-footer-card text-start w-100 btn p-2 border-0"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            aria-expanded={profileDropdownOpen}
          >
            <div className="sidebar-footer-profile">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/john-smith.png"
                alt="John Smith avatar"
              />
              <div className="sidebar-footer-info">
                <h6>John Smith</h6>
                <p>Super Admin</p>
              </div>
            </div>
            <i className={`bi bi-chevron-down sidebar-footer-arrow transition-all ${profileDropdownOpen ? "rotate-180" : ""}`} style={{ transform: profileDropdownOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}></i>
          </button>

          {profileDropdownOpen && (
            <ul className="dropdown-menu show position-absolute bottom-100 start-0 w-100 mb-2">
              <li><a className="dropdown-item py-2" href="#" onClick={(e) => e.preventDefault()}><i className="bi bi-person me-2"></i> My Profile</a></li>
              <li><a className="dropdown-item py-2" href="#" onClick={(e) => e.preventDefault()}><i className="bi bi-gear me-2"></i> Settings</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item py-2 text-danger" href="#" onClick={(e) => e.preventDefault()}><i className="bi bi-box-arrow-right me-2"></i> Logout</a></li>
            </ul>
          )}
        </div>
      </div>
    </aside>
  );
}
