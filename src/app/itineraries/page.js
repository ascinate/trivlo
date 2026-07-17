"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Custom activity type icon map
const TYPE_ICONS = {
  flight: "bi-airplane",
  transfer: "bi-car-front",
  hotel: "bi-house",
  tour: "bi-camera",
  meal: "bi-egg-fried",
  leisure: "bi-sun",
  boat: "bi-ship",
  luggage: "bi-briefcase",
  spa: "bi-heart-pulse"
};

// Initial itinerary days and schedule events data
const initialDaysData = {
  1: {
    dayLabel: "Day 1",
    dateLabel: "18 Jun 2025",
    title: "Arrival in Bali",
    location: "Ubud",
    icon: "bi-airplane",
    activities: [
      {
        id: "act-1",
        time: "09:30 AM",
        title: "Arrival at Ngurah Rai Airport (DPS)",
        details: "Meet & greet by our representative",
        status: "Included",
        type: "flight"
      },
      {
        id: "act-2",
        time: "10:30 AM",
        title: "Private Transfer to Ubud Hotel",
        details: "Duration: 1.5 hrs (Approx.)",
        status: "Included",
        type: "transfer"
      },
      {
        id: "act-3",
        time: "12:00 PM",
        title: "Check-in at Hotel",
        details: "The Ubud Village Resort & Spa",
        status: "Included",
        type: "hotel",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=240&auto=format&fit=crop&q=80"
      },
      {
        id: "act-4",
        time: "03:00 PM",
        title: "Ubud Village Tour",
        details: "Tegalalang Rice Terrace, Ubud Market, Ubud Palace",
        status: "Included",
        type: "tour",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=240&auto=format&fit=crop&q=80"
      },
      {
        id: "act-5",
        time: "07:00 PM",
        title: "Dinner at Local Restaurant",
        details: "Authentic Indonesian Cuisine",
        status: "Optional",
        type: "meal",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=240&auto=format&fit=crop&q=80"
      }
    ]
  },
  2: {
    dayLabel: "Day 2",
    dateLabel: "19 Jun 2025",
    title: "Ubud Sightseeing",
    location: "Ubud",
    icon: "bi-bank",
    activities: [
      {
        id: "act-6",
        time: "09:00 AM",
        title: "Guided Temple Tour",
        details: "Visit Tirta Empul Sacred Water Temple & Goa Gajah Elephant Cave",
        status: "Included",
        type: "tour",
        image: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?w=240&auto=format&fit=crop&q=80"
      },
      {
        id: "act-7",
        time: "01:00 PM",
        title: "Lunch at Bebek Bengil (Dirty Duck)",
        details: "Enjoy crispy duck with scenic views of Ubud rice fields",
        status: "Optional",
        type: "meal"
      },
      {
        id: "act-8",
        time: "03:00 PM",
        title: "Ubud Monkey Forest Walk",
        details: "Stroll through the lush forest sanctuary of long-tailed macaques",
        status: "Included",
        type: "tour",
        image: "https://images.unsplash.com/photo-1540206395-68808572332f?w=240&auto=format&fit=crop&q=80"
      }
    ]
  },
  3: {
    dayLabel: "Day 3",
    dateLabel: "20 Jun 2025",
    title: "Nusa Penida Island Tour",
    location: "Nusa Penida",
    icon: "bi-compass",
    activities: [
      {
        id: "act-9",
        time: "07:30 AM",
        title: "Speedboat Transfer to Nusa Penida",
        details: "Departs from Sanur Harbor (Duration: 45 min)",
        status: "Included",
        type: "boat"
      },
      {
        id: "act-10",
        time: "09:30 AM",
        title: "West Coast Island Tour",
        details: "Explore Kelingking Beach Cliff, Broken Beach, and Angel's Billabong",
        status: "Included",
        type: "tour",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=240&auto=format&fit=crop&q=80"
      },
      {
        id: "act-11",
        time: "04:30 PM",
        title: "Return Speedboat to Sanur",
        details: "Transfer back to main island Sanur harbor",
        status: "Included",
        type: "boat"
      }
    ]
  },
  4: {
    dayLabel: "Day 4",
    dateLabel: "21 Jun 2025",
    title: "Seminyak Leisure Day",
    location: "Seminyak",
    icon: "bi-sun",
    activities: [
      {
        id: "act-12",
        time: "10:00 AM",
        title: "Balinese Spa & Massage",
        details: "2-hour relaxation session at luxury Seminyak Spa",
        status: "Optional",
        type: "spa"
      },
      {
        id: "act-13",
        time: "04:00 PM",
        title: "Sunset Drinks at Potato Head",
        details: "Reserve a daybed at Seminyak's premier beach club",
        status: "Optional",
        type: "leisure",
        image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=240&auto=format&fit=crop&q=80"
      },
      {
        id: "act-14",
        time: "07:30 PM",
        title: "Farewell Seafood Dinner",
        details: "Sunset beach dinner at Jimbaran Bay grill restaurants",
        status: "Included",
        type: "meal",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=240&auto=format&fit=crop&q=80"
      }
    ]
  },
  5: {
    dayLabel: "Day 5",
    dateLabel: "22 Jun 2025",
    title: "Departure",
    location: "Bali Airport",
    icon: "bi-airplane",
    activities: [
      {
        id: "act-15",
        time: "08:00 AM",
        title: "Breakfast & Packing at Resort",
        details: "Leisure morning before hotel check-out",
        status: "Included",
        type: "leisure"
      },
      {
        id: "act-16",
        time: "12:00 PM",
        title: "Hotel Check-out & Private Transfer",
        details: "Driver will meet you at the lobby to transfer to DPS airport",
        status: "Included",
        type: "transfer"
      },
      {
        id: "act-17",
        time: "03:00 PM",
        title: "Departure Flight",
        details: "Flight departures back home. Safe travels!",
        status: "Included",
        type: "flight"
      }
    ]
  }
};

export default function ItineraryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeDay, setActiveDay] = useState(1);
  const [daysData, setDaysData] = useState(() => initialDaysData);
  const [activeTab, setActiveTab] = useState("Itinerary");
  const [showModal, setShowModal] = useState(false);

  // Form states for new activity
  const [formValidated, setFormValidated] = useState(false);
  const [formTime, setFormTime] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formDetails, setFormDetails] = useState("");
  const [formStatus, setFormStatus] = useState("Included");
  const [formType, setFormType] = useState("tour");
  const [formImage, setFormImage] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAddActivitySubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setFormValidated(true);
      return;
    }

    setFormValidated(false);

    const newActivity = {
      id: `act-${Date.now()}`,
      time: formTime,
      title: formTitle,
      details: formDetails,
      status: formStatus,
      type: formType,
      image: formImage || null
    };

    // Update active day's activities list
    setDaysData(prev => {
      const day = prev[activeDay];
      return {
        ...prev,
        [activeDay]: {
          ...day,
          activities: [...day.activities, newActivity]
        }
      };
    });

    setShowModal(false);

    // Reset fields
    setFormTime("");
    setFormTitle("");
    setFormDetails("");
    setFormStatus("Included");
    setFormType("tour");
    setFormImage("");
  };

  const activeDayObj = daysData[activeDay] || daysData[1];

  const handleSendToCustomer = () => {
    alert("Itinerary sent successfully to John Doe (john.doe@email.com)!");
  };

  const handleConvertToQuote = () => {
    alert("Itinerary converted successfully to Quotation QT-1256!");
  };

  return (
    <div className="d-flex position-relative">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Workspace Container */}
      <div className="app-container w-100 min-vh-100 d-flex flex-column justify-content-between">

        {/* Header */}
        <Header
          toggleSidebar={toggleSidebar}
          title="Inquiries"
          subtitle="Home > Inquiries"
          forcePageHeaderLayout={true}
          searchPlaceholder="Search inquiries, customers, bookings..."
          actionButton={
            <button
              className="btn text-white rounded-3 px-3 d-flex align-items-center gap-2"
              style={{ backgroundColor: "#112E24", height: "42px", fontWeight: "400" }}
              aria-label="Add new inquiry"
              onClick={() => alert("New inquiry modal trigger")}
            >
              <i className="bi bi-plus-lg fs-6"></i>
              <span>New Inquiry</span>
              <i className="bi bi-chevron-down ms-1" style={{ fontSize: "0.75rem" }}></i>
            </button>
          }
        />

        {/* Main Contents */}
        <main className="main-content d-flex flex-column gap-4 py-4">

          {/* Sub-Header Row: Breadcrumbs & Page Action Buttons */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 w-100">
            <div>

              <div className="d-flex align-items-center gap-2 mt-1 flex-wrap">
                <h1 className="fs-3 fw-800 text-dark m-0">Itinerary Idea #1</h1>
                <span className="badge rounded-2 fw-700 px-2 py-1 fs-9" style={{ backgroundColor: "#E9F4EE", color: "#1E6C45" }}>
                  Recommended
                </span>
              </div>
              <span className="text-secondary fs-7 mt-1 d-block">Created on 18 Jun 2025 • by Sarah Johnson</span>
            </div>

            {/* Subheader page actions */}
            <div className="d-flex align-items-center gap-2 w-md-auto">

              {/* Actions Dropdown */}
              <select
                className="form-select rounded-3 border-light shadow-sm text-dark bg-white py-2 px-3 fw-600 w-auto"
                style={{ height: "42px", fontSize: "0.85rem" }}
              >
                <option>Actions</option>
                <option>Duplicate</option>
                <option>Edit Details</option>
                <option className="text-danger">Delete</option>
              </select>

              {/* Prev / Next Arrows */}
              <div className="btn-group border border-light rounded-3 bg-white shadow-sm" style={{ height: "42px" }}>
                <button className="btn btn-light bg-transparent border-0 text-secondary" style={{ width: "40px" }} aria-label="Previous version">
                  <i className="bi bi-chevron-left"></i>
                </button>
                <div className="border-start border-light h-75 my-auto"></div>
                <button className="btn btn-light bg-transparent border-0 text-secondary" style={{ width: "40px" }} aria-label="Next version">
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>

              {/* Send to Customer Button */}
              <button
                className="btn text-white rounded-3 px-3 d-flex align-items-center gap-2 flex-grow-1 flex-md-grow-0"
                style={{ backgroundColor: "#112E24", height: "42px", fontWeight: "600", fontSize: "0.85rem" }}
                onClick={handleSendToCustomer}
              >
                <i className="bi bi-send"></i>
                <span>Send to Customer</span>
              </button>

            </div>
          </div>

          {/* 1. Page top summary details block */}
          <section className="summary-block-section">
            <div className="section-card border border-light p-3 bg-white" style={{ border: '1px solid #efece6 !important' }}>
              <div className="row g-3 row-cols-2 row-cols-sm-3 row-cols-lg-6">

                {/* Field 1: Customer */}
                <div className="d-flex align-items-center gap-2 border-end-lg border-light pr-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80"
                    alt="John Doe"
                    className="rounded-circle border"
                    style={{ width: "36px", height: "36px", objectFit: "cover" }}
                  />
                  <div>
                    <span className="text-secondary d-block fs-9 fw-600">Customer</span>
                    <span className="text-dark fw-800 fs-7 d-block" style={{ lineHeight: 1.1 }}>John Doe</span>
                    <span className="text-secondary fs-9">2 Adults</span>
                  </div>
                </div>

                {/* Field 2: Destination */}
                <div className="d-flex align-items-center gap-2 border-end-lg border-light pr-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://flagcdn.com/w40/id.png"
                    alt="Indonesia"
                    className="rounded-1 border"
                    style={{ width: "24px", height: "16px", objectFit: "cover" }}
                  />
                  <div>
                    <span className="text-secondary d-block fs-9 fw-600">Destination</span>
                    <span className="text-dark fw-800 fs-7 d-block" style={{ lineHeight: 1.1 }}>Bali, Indonesia</span>
                    <span className="text-secondary fs-9">Primary Destination</span>
                  </div>
                </div>

                {/* Field 3: Trip Type */}
                <div className="d-flex align-items-center gap-2 border-end-lg border-light pr-2">
                  <div className="rounded-circle bg-light d-flex align-items-center justify-content-center text-primary" style={{ width: "32px", height: "32px" }}>
                    <i className="bi bi-compass fs-6"></i>
                  </div>
                  <div>
                    <span className="text-secondary d-block fs-9 fw-600">Trip Type</span>
                    <span className="text-dark fw-800 fs-7 d-block" style={{ lineHeight: 1.1 }}>Leisure</span>
                  </div>
                </div>

                {/* Field 4: Duration */}
                <div className="d-flex align-items-center gap-2 border-end-lg border-light pr-2">
                  <div className="rounded-circle bg-light d-flex align-items-center justify-content-center text-primary" style={{ width: "32px", height: "32px" }}>
                    <i className="bi bi-calendar3 fs-6"></i>
                  </div>
                  <div>
                    <span className="text-secondary d-block fs-9 fw-600">Duration</span>
                    <span className="text-dark fw-800 fs-7 d-block" style={{ lineHeight: 1.1 }}>5 Days / 4 Nights</span>
                    <span className="text-secondary fs-9">18 Jun - 22 Jun 2025</span>
                  </div>
                </div>

                {/* Field 5: Budget */}
                <div className="d-flex align-items-center gap-2 border-end-lg border-light pr-2">
                  <div className="rounded-circle bg-light d-flex align-items-center justify-content-center text-primary" style={{ width: "32px", height: "32px" }}>
                    <i className="bi bi-wallet2 fs-6"></i>
                  </div>
                  <div>
                    <span className="text-secondary d-block fs-9 fw-600">Budget</span>
                    <span className="text-dark fw-800 fs-7 d-block" style={{ lineHeight: 1.1 }}>$1,000 - $2,000</span>
                    <span className="text-secondary fs-9">Total Budget</span>
                  </div>
                </div>

                {/* Field 6: Status */}
                <div className="d-flex align-items-center gap-2">
                  <div className="rounded-circle bg-light d-flex align-items-center justify-content-center text-warning" style={{ width: "32px", height: "32px" }}>
                    <i className="bi bi-circle-fill fs-8"></i>
                  </div>
                  <div>
                    <span className="text-secondary d-block fs-9 fw-600">Status</span>
                    <span className="text-dark fw-800 fs-7 d-block" style={{ lineHeight: 1.1 }}>In Progress</span>
                    <span className="text-secondary fs-9">Itinerary Stage</span>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* 2. Category Tabs Row */}
          <section className="tabs-bar-section">
            <div className="border-bottom border-light d-flex flex-wrap gap-1">
              {[
                { name: "Itinerary", count: null },
                { name: "Hotels", count: 4 },
                { name: "Flights", count: 2 },
                { name: "Transfers", count: 2 },
                { name: "Activities", count: 3 },
                { name: "Pricing", count: null },
                { name: "Notes", count: 2 },
                { name: "Documents", count: 2 }
              ].map((tab) => {
                const isActive = activeTab === tab.name;
                return (
                  <button
                    key={tab.name}
                    className={`btn py-2 px-3 border-0 rounded-0 fw-700 fs-7 ${isActive ? "text-primary border-bottom border-2 border-primary" : "text-secondary"}`}
                    style={{
                      borderBottom: isActive ? "2.5px solid #112E24 !important" : "none",
                      color: isActive ? "#112E24" : "var(--secondary)"
                    }}
                    onClick={() => setActiveTab(tab.name)}
                  >
                    {tab.name}
                    {tab.count !== null && <span className="ms-1 px-1 bg-light text-secondary rounded-pill" style={{ fontSize: "0.68rem" }}>{tab.count}</span>}
                  </button>
                );
              })}
            </div>
          </section>

          {/* 3. Main Split columns */}
          <section className="itinerary-details-section">
            <div className="row g-3">

              {/* Left timeline planner (8 cols) */}
              <div className="col-12 col-xl-8">

                {/* Sub-card container */}
                <div className="section-card border border-light p-4 bg-white">

                  {/* Planner header */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="section-card-title">Trip Itinerary</h3>

                    <button
                      className="btn btn-outline-secondary border-light shadow-sm rounded-3 py-1 px-3 d-inline-flex align-items-center gap-1 fw-700"
                      style={{ fontSize: "0.8rem", height: "36px" }}
                      onClick={() => alert("Add day handler")}
                    >
                      <i className="bi bi-plus-lg text-secondary fw-700"></i>
                      <span>Add Day</span>
                    </button>
                  </div>

                  {/* Split timelines body */}
                  <div className="row g-3">

                    {/* Side day indexes (4 cols) */}
                    <div className="col-12 col-md-4 border-end-md border-light">
                      <div className="d-flex flex-row flex-md-column gap-2 overflow-auto" style={{ maxHeight: "400px", paddingRight: "0.5rem" }}>
                        {Object.keys(daysData).map((dayKey) => {
                          const dayNum = parseInt(dayKey, 10);
                          const dayItem = daysData[dayNum];
                          const isDayActive = activeDay === dayNum;

                          return (
                            <button
                              key={dayNum}
                              className="btn text-start p-3 rounded-3 border w-100 d-flex flex-column gap-1 transition-all"
                              style={{
                                backgroundColor: isDayActive ? "#EBF3E8" : "#FCFAF5",
                                borderColor: isDayActive ? "#1C3F35" : "var(--border)",
                                boxShadow: isDayActive ? "0 4px 10px rgba(28, 63, 53, 0.05)" : "none"
                              }}
                              onClick={() => setActiveDay(dayNum)}
                            >
                              <div className="d-flex align-items-center justify-content-between w-100">
                                <span className={`fw-800 ${isDayActive ? "text-primary" : "text-dark"}`} style={{ fontSize: "0.8rem" }}>
                                  {dayItem.dayLabel}
                                </span>
                                <span className="text-secondary opacity-75 fw-500" style={{ fontSize: "0.68rem" }}>
                                  {dayItem.dateLabel}
                                </span>
                              </div>
                              <span className="fw-700 text-dark d-block fs-8 truncate-1" style={{ lineHeight: 1.2 }}>
                                {dayItem.title}
                              </span>
                              <span className="text-secondary fs-9 d-flex align-items-center gap-1">
                                <i className="bi bi-geo-alt"></i>
                                {dayItem.location}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Timeline summary card bottom */}
                      <div className="p-3 bg-light border rounded-3 mt-3 d-none d-md-flex align-items-center justify-content-between text-secondary fs-8 fw-600">
                        <div className="d-flex align-items-center gap-1">
                          <i className="bi bi-calendar3"></i>
                          <span>5 Days / 4 Nights</span>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                          <i className="bi bi-geo-alt"></i>
                          <span>3 Cities</span>
                        </div>
                      </div>
                    </div>

                    {/* Day Detailed schedule (8 cols) */}
                    <div className="col-12 col-md-8 px-md-3">

                      {/* Day summary title */}
                      <div className="d-flex justify-content-between align-items-start border-bottom border-light pb-2 mb-3">
                        <div>
                          <span className="text-secondary fs-9 fw-600">{activeDayObj.dayLabel} - {activeDayObj.dateLabel}</span>
                          <h4 className="fw-800 text-dark m-0 fs-5 mt-1">{activeDayObj.title}</h4>
                          <span className="text-secondary fs-8 d-flex align-items-center gap-1 mt-1">
                            <i className="bi bi-geo-alt"></i>
                            {activeDayObj.location}
                          </span>
                        </div>

                        <div className="d-inline-flex gap-2">
                          <button className="btn btn-outline-light border rounded-3 px-2 py-1 text-secondary fs-8 fw-700 d-inline-flex align-items-center gap-1" style={{ height: "32px" }}>
                            <i className="bi bi-pencil"></i>
                            <span>Edit Day</span>
                          </button>
                          <button className="btn btn-outline-light border rounded-3 px-1 text-secondary" style={{ width: "32px", height: "32px" }}>
                            <i className="bi bi-three-dots-vertical"></i>
                          </button>
                        </div>
                      </div>

                      {/* Activities Schedule Timeline */}
                      <div className="position-relative ps-2">
                        {/* Timeline dotted vertical line */}
                        <div className="position-absolute start-0 top-0 bottom-0 border-start border-light border-2 border-dashed" style={{ left: "15px", zIndex: 1 }}></div>

                        <div className="d-flex flex-column gap-3">
                          {activeDayObj.activities.map((act) => {
                            const iconClass = TYPE_ICONS[act.type] || "bi-compass";
                            const statusColor = act.status === "Included"
                              ? { backgroundColor: "#E9F4EE", color: "#1E6C45" }
                              : { backgroundColor: "#FFF6EE", color: "#B97C2B" };

                            return (
                              <div key={act.id} className="d-flex gap-3 position-relative" style={{ zIndex: 2 }}>

                                {/* Left Time label */}
                                <div className="text-secondary fw-700 fs-9 py-1" style={{ width: "65px", flexShrink: 0 }}>
                                  {act.time}
                                </div>

                                {/* Timeline icon anchor */}
                                <div className="rounded-circle d-flex align-items-center justify-content-center bg-white border shadow-sm" style={{ width: "32px", height: "32px", flexShrink: 0, color: "#112E24" }}>
                                  <i className={`bi ${iconClass}`} style={{ fontSize: "0.85rem" }}></i>
                                </div>

                                {/* Event content card */}
                                <div className="flex-grow-1 border rounded-3 p-3 bg-light-subtle shadow-sm transition-all" style={{ backgroundColor: "#FDFDFD" }}>
                                  <div className="d-flex justify-content-between align-items-start gap-2 flex-wrap mb-1">
                                    <h5 className="fw-800 text-dark m-0 fs-7" style={{ lineHeight: 1.2 }}>{act.title}</h5>
                                    <span className="badge rounded-2 fw-700 px-2 py-1 fs-9" style={statusColor}>
                                      {act.status}
                                    </span>
                                  </div>
                                  <p className="text-secondary fs-8 m-0 mt-1">{act.details}</p>

                                  {/* Attached picture card (if present) */}
                                  {act.image && (
                                    <div className="mt-2 rounded-2 overflow-hidden border" style={{ maxHeight: "110px", width: "100%", position: "relative" }}>
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img
                                        src={act.image}
                                        alt={act.title}
                                        style={{ width: "100%", height: "110px", objectFit: "cover" }}
                                      />
                                    </div>
                                  )}
                                </div>

                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Add Activity Button */}
                      <button
                        className="btn btn-outline-secondary border-dashed border-2 rounded-3 w-100 py-2 mt-4 fw-700 text-secondary fs-8 d-flex align-items-center justify-content-center gap-1"
                        onClick={() => setShowModal(true)}
                      >
                        <i className="bi bi-plus-lg"></i>
                        <span>Add Activity</span>
                      </button>

                    </div>

                  </div>

                  {/* Day Footer Navigation Buttons */}
                  <div className="d-flex justify-content-between align-items-center mt-5 pt-3 border-top border-light gap-2">
                    <button
                      className="btn btn-light border rounded-3 px-4 py-2"
                      style={{ fontSize: "0.88rem", fontWeight: "600" }}
                      onClick={() => alert("Back")}
                    >
                      Back
                    </button>

                    <div className="d-inline-flex gap-2">
                      <button
                        className="btn btn-light border rounded-3 px-4 py-2 d-inline-flex align-items-center gap-1"
                        style={{ fontSize: "0.88rem", fontWeight: "600" }}
                        onClick={() => alert("Draft saved")}
                      >
                        <i className="bi bi-bookmark"></i>
                        <span>Save as Draft</span>
                      </button>
                      <button
                        className="btn text-white rounded-3 px-4 py-2 d-inline-flex align-items-center gap-1"
                        style={{ backgroundColor: "#112E24", fontSize: "0.88rem", fontWeight: "600" }}
                        onClick={() => alert("Next page")}
                      >
                        <span>Next: Pricing</span>
                        <i className="bi bi-arrow-right"></i>
                      </button>
                    </div>
                  </div>

                </div>

              </div>

              {/* Right column: pricing and info widgets (4 cols) */}
              <div className="col-12 col-xl-4">
                <div className="d-flex flex-column gap-3">

                  {/* Quote Summary widget */}
                  <div className="section-card border border-light p-4 bg-white">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h3 className="section-card-title">Quote Summary</h3>
                      <a href="#" className="section-card-link" onClick={e => e.preventDefault()}>View Price Breakup</a>
                    </div>

                    <div className="d-flex flex-column gap-2 mb-3" style={{ fontSize: "0.85rem" }}>
                      <div className="d-flex justify-content-between">
                        <span className="text-secondary">Subtotal (2 Adults)</span>
                        <span className="text-dark fw-600">$1,420.00</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="text-secondary">Tax & Fees</span>
                        <span className="text-dark fw-600">$128.00</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="text-secondary">Discount</span>
                        <span className="text-success fw-700">-$50.00</span>
                      </div>
                      <hr className="border-light my-2" />
                      <div className="d-flex justify-content-between align-items-baseline">
                        <span className="fw-800 text-dark fs-7">Total Amount</span>
                        <div className="text-end">
                          <span className="fw-800 text-primary fs-4">$1,498.00</span>
                          <span className="text-secondary fs-9 d-block">(USD)</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-light-subtle border p-3 rounded-3 mb-3 text-secondary" style={{ fontSize: "0.72rem", backgroundColor: "#FCFAF6" }}>
                      This is an estimated quote. Final price may vary based on availability.
                    </div>

                    <button
                      className="btn text-white rounded-3 w-100 py-2 d-flex align-items-center justify-content-center gap-2 fw-500 fs-7"
                      style={{ backgroundColor: "#112E24" }}
                      onClick={handleConvertToQuote}
                    >
                      <i className="bi bi-file-earmark-text"></i>
                      <span>Convert to Quote</span>
                    </button>
                  </div>

                  {/* Included Checklist widget */}
                  <div className="section-card border border-light p-4 bg-white">
                    <h3 className="section-card-title mb-3">Included in this Itinerary</h3>

                    <div className="d-flex flex-column gap-2 fs-8 fw-600 text-dark">
                      {[
                        "Hotels (4 Nights)",
                        "Airport Transfers",
                        "Daily Breakfast",
                        "Sightseeing & Activities",
                        "All Taxes & Service Charges"
                      ].map((item, idx) => (
                        <div key={idx} className="d-flex align-items-center gap-2">
                          <div className="rounded-circle bg-success-subtle text-success d-flex align-items-center justify-content-center" style={{ width: "18px", height: "18px" }}>
                            <i className="bi bi-check-lg" style={{ fontSize: "0.68rem" }}></i>
                          </div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer Preferences widget */}
                  <div className="section-card border border-light p-4 bg-white">
                    <h3 className="section-card-title mb-3">Customer Preferences</h3>

                    <div className="bg-light-subtle border p-3 rounded-3 mb-3" style={{ backgroundColor: "#FCFAF6" }}>
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <i className="bi bi-heart-fill text-danger fs-8"></i>
                        <span className="fw-700 text-dark fs-8">Honeymoon setup, Ocean view room</span>
                      </div>
                      <p className="text-secondary fs-8 m-0">Looking for romantic places and water activities.</p>
                    </div>

                    <button
                      className="btn btn-outline-secondary w-100 py-2 border-light shadow-sm rounded-3 fw-700 fs-8 text-secondary bg-white hover:bg-light"
                      onClick={() => alert("Edit preferences")}
                    >
                      Edit
                    </button>
                  </div>

                </div>
              </div>

            </div>
          </section>

        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-lg-none"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)", zIndex: 995 }}
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Interactive Activity Creation modal */}
      {showModal && (
        <>
          <div className="modal-backdrop fade show" style={{ zIndex: 1060 }} onClick={() => setShowModal(false)}></div>
          <div className="modal fade show d-block" style={{ zIndex: 1070 }} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content border-0 rounded-4 shadow-lg">

                <div className="modal-header border-bottom border-light px-4 py-3 bg-light rounded-top-4 d-flex justify-content-between align-items-center">
                  <h5 className="modal-title fw-700 text-dark m-0">Add New Activity</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                  ></button>
                </div>

                <form className={formValidated ? "was-validated" : ""} noValidate onSubmit={handleAddActivitySubmit}>
                  <div className="modal-body p-4" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>

                    <div className="mb-3">
                      <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>Time</label>
                      <input
                        type="text"
                        className="form-control rounded-3 py-2 border-light shadow-sm text-dark bg-white"
                        required
                        placeholder="e.g. 09:30 AM"
                        value={formTime}
                        onChange={e => setFormTime(e.target.value)}
                      />
                      <div className="invalid-feedback" style={{ fontSize: "0.75rem" }}>
                        Please specify the time (e.g. 10:00 AM).
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>Activity Title</label>
                      <input
                        type="text"
                        className="form-control rounded-3 py-2 border-light shadow-sm text-dark bg-white"
                        required
                        placeholder="e.g. Guided Temple Tour"
                        value={formTitle}
                        onChange={e => setFormTitle(e.target.value)}
                      />
                      <div className="invalid-feedback" style={{ fontSize: "0.75rem" }}>
                        Please enter the activity title.
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>Details</label>
                      <textarea
                        className="form-control rounded-3 py-2 border-light shadow-sm text-dark bg-white"
                        rows="3"
                        required
                        placeholder="Provide details about the activity..."
                        value={formDetails}
                        onChange={e => setFormDetails(e.target.value)}
                      ></textarea>
                      <div className="invalid-feedback" style={{ fontSize: "0.75rem" }}>
                        Please provide activity details.
                      </div>
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-6">
                        <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>Status</label>
                        <select
                          className="form-select rounded-3 py-2 border-light shadow-sm text-dark bg-white"
                          value={formStatus}
                          onChange={e => setFormStatus(e.target.value)}
                        >
                          <option value="Included">Included</option>
                          <option value="Optional">Optional</option>
                        </select>
                      </div>
                      <div className="col-6">
                        <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>Type</label>
                        <select
                          className="form-select rounded-3 py-2 border-light shadow-sm text-dark bg-white"
                          value={formType}
                          onChange={e => setFormType(e.target.value)}
                        >
                          <option value="tour">Tour / Sightseeing</option>
                          <option value="flight">Flight</option>
                          <option value="transfer">Transfer</option>
                          <option value="hotel">Hotel Lodging</option>
                          <option value="meal">Meal</option>
                          <option value="boat">Boat / Ferry</option>
                          <option value="spa">Spa / Relaxation</option>
                          <option value="leisure">Leisure / Free time</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>Attach Photo URL (Optional)</label>
                      <select
                        className="form-select rounded-3 py-2 border-light shadow-sm text-dark bg-white"
                        value={formImage}
                        onChange={e => setFormImage(e.target.value)}
                      >
                        <option value="">No photo</option>
                        <option value="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=240&auto=format&fit=crop&q=80">Bali Nature</option>
                        <option value="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=240&auto=format&fit=crop&q=80">Luxury Villa</option>
                        <option value="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=240&auto=format&fit=crop&q=80">Gourmet Food</option>
                      </select>
                    </div>

                  </div>

                  <div className="modal-footer border-top border-light px-4 py-3 d-flex justify-content-end gap-2">
                    <button
                      type="button"
                      className="btn btn-light border rounded-3 px-4 py-2"
                      style={{ fontSize: "0.9rem", fontWeight: "600" }}
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn text-white rounded-3 px-4 py-2"
                      style={{ backgroundColor: "#112E24", fontSize: "0.9rem", fontWeight: "600" }}
                    >
                      Add Activity
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
