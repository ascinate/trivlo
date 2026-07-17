"use client";

import { useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { LuSunMedium } from "react-icons/lu";

export default function Header({
  toggleSidebar,
  title,
  subtitle,
  searchPlaceholder,
  hideWelcome = false,
  forcePageHeaderLayout = false,
  actionButton = null
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-bs-theme");
    }
  };

  const notifications = [
    { id: 1, text: "New inquiry from John Doe", time: "10m ago", icon: "bi-chat-left-text text-primary" },
    { id: 2, text: "Quotation sent to Emma Watson", time: "1h ago", icon: "bi-file-earmark-text text-success" },
    { id: 3, text: "Booking confirmed by David", time: "2h ago", icon: "bi-check-circle text-info" }
  ];

  const isPageHeader = title || forcePageHeaderLayout;

  return (
    <header className="header border-bottom border-light">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 w-100">

        {/* Left Welcome Section & Hamburger Menu */}
        <div className="d-flex align-items-center gap-3">
          <button
            className="sidebar-toggler p-0 me-2"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <i className="bi bi-list"></i>
          </button>

          {!hideWelcome && (
            <div className="welcome-message">
              {title ? (
                <>
                  <h1 className="fs-4 fw-800 text-dark m-0">{title}</h1>
                  {subtitle && (
                    <span className="text-secondary fs-7 fw-500 d-block mt-1">{subtitle}</span>
                  )}
                </>
              ) : (
                <>
                  <span className="text-secondary fs-7 fw-500 d-block">Good Morning, John! 👋</span>
                  <h1 className="fs-4 fw-800 text-dark m-0 mt-1">Here&apos;s what&apos;s happening with your business today.</h1>
                </>
              )}
            </div>
          )}
        </div>

        {/* Center Search & Right Action Group */}
        <div className="d-flex align-items-center gap-3 ms-auto flex-grow-1 flex-md-grow-0 justify-content-end">

          {/* Search Box */}
          <div className="header-search flex-grow-1 flex-md-grow-0">
            <i className="bi bi-search header-search-icon"></i>
            <input
              type="text"
              placeholder={searchPlaceholder || "Search anything..."}
              aria-label="Search"
            />
            <kbd className="header-search-kbd d-none d-sm-inline-block">⌘ K</kbd>
          </div>

          {/* Optional Page Action Button */}
          {actionButton}

          {isPageHeader ? (
            // Page-specific header elements (matches Inquiries image)
            <>
              {/* Theme Toggler */}
              <button
                className="header-action-btn"
                onClick={toggleTheme}
                aria-label="Toggle Dark Mode"
              >
                <i className={`bi ${isDarkMode ? "bi-moon-fill text-warning" : "bi-sun"}`}></i>
              </button>

              {/* Notifications Icon with Badge */}
              <div className="position-relative">
                <button
                  className="header-action-btn"
                  onClick={() => setShowNotifications(!showNotifications)}
                  aria-label="Notifications"
                >
                  <FaRegBell />
                  <span className="header-badge" style={{ backgroundColor: forcePageHeaderLayout ? "#D36C45" : "#da272b" }}>
                    {forcePageHeaderLayout ? 3 : 14}
                  </span>
                </button>

                {showNotifications && (
                  <div className="dropdown-menu show position-absolute end-0 mt-2 p-0 overflow-hidden" style={{ width: "300px", zIndex: 1050 }}>
                    <div className="p-3  border-bottom d-flex justify-content-between align-items-center">
                      <h6 className="m-0 fw-700">Notifications</h6>
                      <span className="badge bg-danger rounded-pill">
                        {forcePageHeaderLayout ? "3 New" : "14 New"}
                      </span>
                    </div>
                    <div className="list-group list-group-flush" style={{ maxHeight: "240px", overflowY: "auto" }}>
                      {notifications.map((notif) => (
                        <a key={notif.id} href="#" className="list-group-item list-group-item-action p-3" onClick={(e) => e.preventDefault()}>
                          <div className="d-flex align-items-start gap-2">
                            <i className={`bi ${notif.icon} mt-1`}></i>
                            <div>
                              <p className="m-0 small text-dark fw-600">{notif.text}</p>
                              <span className="xsmall text-secondary">{notif.time}</span>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Icon with Badge */}
              <div className="position-relative">
                <button
                  className="header-action-btn"
                  onClick={() => setShowChat(!showChat)}
                  aria-label="Chat messages"
                >
                  <i className="bi bi-chat-left-text"></i>
                  <span className="header-badge" style={{ backgroundColor: forcePageHeaderLayout ? "#D36C45" : "#da272b" }}>
                    {forcePageHeaderLayout ? 5 : 8}
                  </span>
                </button>
                {showChat && (
                  <div className="dropdown-menu show position-absolute end-0 mt-2 p-0 overflow-hidden" style={{ width: "260px", zIndex: 1050 }}>
                    <div className="p-3 bg-light border-bottom">
                      <h6 className="m-0 fw-700">Messages</h6>
                    </div>
                    <div className="p-3 text-center text-muted small">
                      No unread messages.
                    </div>
                  </div>
                )}
              </div>

              {/* User profile avatar dropdown */}
              <div className="position-relative">
                <button
                  className="d-flex align-items-center gap-2 border-0 bg-transparent p-0"
                  onClick={() => setShowProfile(!showProfile)}
                  aria-expanded={showProfile}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/john-smith.png"
                    alt="John Smith avatar"
                    className="rounded-circle border border-2 border-light shadow-sm"
                    style={{ width: "40px", height: "40px", objectFit: "cover" }}
                  />
                  <div className="text-start d-none d-md-block">
                    <span className="fw-600 text-dark d-block fs-7" style={{ lineHeight: "1.2" }}>John Smith</span>
                    <span className="text-secondary d-block" style={{ fontSize: "0.68rem" }}>Super Admin</span>
                  </div>
                  <i className="bi bi-chevron-down text-secondary ms-1 d-none d-md-block" style={{ fontSize: "0.75rem", transform: showProfile ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}></i>
                </button>
                {showProfile && (
                  <ul className="dropdown-menu show position-absolute end-0 mt-2 w-100" style={{ minWidth: "160px", zIndex: 1050 }}>
                    <li><a className="dropdown-item py-2" href="#" onClick={(e) => e.preventDefault()}><i className="bi bi-person me-2"></i> My Profile</a></li>
                    <li><a className="dropdown-item py-2" href="#" onClick={(e) => e.preventDefault()}><i className="bi bi-gear me-2"></i> Settings</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item py-2 text-danger" href="#" onClick={(e) => e.preventDefault()}><i className="bi bi-box-arrow-right me-2"></i> Logout</a></li>
                  </ul>
                )}
              </div>
            </>
          ) : (
            // Default Welcome Header elements (original dashboard layout)
            <>
              {/* Theme Toggler */}
              <button
                className="header-action-btn"
                onClick={toggleTheme}
                aria-label="Toggle Dark Mode"
              >
                <i className={`bi ${isDarkMode ? "bi-moon-fill text-warning" : "bi-sun"}`}></i>
              </button>

              {/* Notifications Dropdown */}
              <div className="position-relative">
                <button
                  className="header-action-btn"
                  onClick={() => setShowNotifications(!showNotifications)}
                  aria-expanded={showNotifications}
                  aria-label="Notifications"
                >
                  <i className="bi bi-bell"></i>
                  <span className="header-badge">3</span>
                </button>

                {showNotifications && (
                  <div className="dropdown-menu show position-absolute end-0 mt-2 p-0 overflow-hidden" style={{ width: "300px", zIndex: 1050 }}>
                    <div className="p-3  border-bottom d-flex justify-content-between align-items-center">
                      <h6 className="m-0 fw-700">Notifications</h6>
                      <span className="badge bg-danger rounded-pill">3 New</span>
                    </div>
                    <div className="list-group list-group-flush" style={{ maxHeight: "240px", overflowY: "auto" }}>
                      {notifications.map((notif) => (
                        <a key={notif.id} href="#" className="list-group-item list-group-item-action p-3" onClick={(e) => e.preventDefault()}>
                          <div className="d-flex align-items-start gap-2">
                            <i className={`bi ${notif.icon} mt-1`}></i>
                            <div>
                              <p className="m-0 small text-dark fw-600">{notif.text}</p>
                              <span className="xsmall text-secondary">{notif.time}</span>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                    <div className="p-2 border-top text-center ">
                      <a href="#" className="small text-decoration-none fw-700" onClick={(e) => e.preventDefault()}>View All Notifications</a>
                    </div>
                  </div>
                )}
              </div>

              {/* Add New Button */}
              <button className="header-btn-new">
                <i className="bi bi-plus-lg"></i>
                <span>New</span>
              </button>

              {/* User profile avatar dropdown */}
              <div className="position-relative">
                <button
                  className="d-flex align-items-center gap-2 border-0 bg-transparent p-0"
                  onClick={() => setShowProfile(!showProfile)}
                  aria-expanded={showProfile}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/john-smith.png"
                    alt="John Smith avatar"
                    className="rounded-circle border border-2 border-light shadow-sm"
                    style={{ width: "40px", height: "40px", objectFit: "cover" }}
                  />
                  <div className="text-start d-none d-md-block">
                    <span className="fw-600 text-dark d-block fs-7" style={{ lineHeight: "1.2" }}>John Smith</span>
                    <span className="text-secondary d-block" style={{ fontSize: "0.68rem" }}>Super Admin</span>
                  </div>
                  <i className="bi bi-chevron-down text-secondary ms-1 d-none d-md-block" style={{ fontSize: "0.75rem", transform: showProfile ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}></i>
                </button>
                {showProfile && (
                  <ul className="dropdown-menu show position-absolute end-0 mt-2 w-100" style={{ minWidth: "160px", zIndex: 1050 }}>
                    <li><a className="dropdown-item py-2" href="#" onClick={(e) => e.preventDefault()}><i className="bi bi-person me-2"></i> My Profile</a></li>
                    <li><a className="dropdown-item py-2" href="#" onClick={(e) => e.preventDefault()}><i className="bi bi-gear me-2"></i> Settings</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item py-2 text-danger" href="#" onClick={(e) => e.preventDefault()}><i className="bi bi-box-arrow-right me-2"></i> Logout</a></li>
                  </ul>
                )}
              </div>
            </>
          )}
        </div>

      </div>
    </header>
  );
}
