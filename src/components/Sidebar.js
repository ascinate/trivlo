"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const pathname = usePathname();
  const [crmExpanded, setCrmExpanded] = useState(true);
  const [suppliersExpanded, setSuppliersExpanded] = useState(true);

  const menuItems = [
    { name: "Dashboard", icon: "bi-grid", href: "/" },
    {
      name: "CRM",
      icon: "bi-person",
      isParent: true,
      expanded: crmExpanded,
      setExpanded: setCrmExpanded,
      subItems: [
        { name: "Inquiries", href: "/inquiries", badge: 12 },
        { name: "Leads", href: "/leads" },
        { name: "Customers", href: "/customers" }
      ]
    },
    { name: "Itineraries", icon: "bi-map", href: "/itineraries" },
    { name: "Quotations", icon: "bi-file-earmark-text", href: "/quotations" },
    { name: "Bookings", icon: "bi-journal-bookmark", href: "/bookings" },
    {
      name: "Suppliers",
      icon: "bi-building",
      isParent: true,
      expanded: suppliersExpanded,
      setExpanded: setSuppliersExpanded,
      subItems: [
        { name: "Hotels", href: "/suppliers/hotels" }
      ]
    },
    { name: "Flights", icon: "bi-airplane", href: "#" },
    { name: "Transfers", icon: "bi-car-front", href: "#" },
    { name: "Visa & Docs", icon: "bi-passport", href: "#" },
    { name: "Insurance", icon: "bi-shield-check", href: "#" },
    { name: "Finance", icon: "bi-wallet2", href: "#" },
    { name: "Reports", icon: "bi-bar-chart-line", href: "#" },
    { name: "Marketing", icon: "bi-megaphone", href: "#" },
    { name: "Calendar", icon: "bi-calendar3", href: "/calendar" },
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
              <Image src="/images/logo.svg" className="logos" alt="Logo" width={140} height={43} />
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
          if (item.isParent) {
            const isAnySubActive = item.subItems.some(sub => pathname === sub.href);
            return (
              <div key={item.name} className="d-flex flex-column">
                <button
                  className={`nav-parent-btn text-start d-flex align-items-center justify-content-between ${isAnySubActive ? "active-parent" : ""}`}
                  onClick={() => item.setExpanded(!item.expanded)}
                  aria-expanded={item.expanded}
                >
                  <div className="d-flex align-items-center">
                    <i className={`bi ${item.icon} me-2 fs-5`}></i>
                    <span>{item.name}</span>
                  </div>
                  <i className={`bi bi-chevron-${item.expanded ? "up" : "down"} ms-auto`} style={{ fontSize: "0.75rem", opacity: 0.7 }}></i>
                </button>
                {item.expanded && (
                  <div className="nav-sub-menu d-flex flex-column">
                    {item.subItems.map((sub) => {
                      const isSubActive = pathname === sub.href;
                      return (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className={`nav-sub-link ${isSubActive ? "active" : ""}`}
                          onClick={(e) => {
                            if (sub.href === "#") {
                              e.preventDefault();
                            }
                          }}
                        >
                          <span>{sub.name}</span>
                          {sub.badge && (
                            <span className="sidebar-badge">{sub.badge}</span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

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

