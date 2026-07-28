"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";

export default function FlightDetailsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const tabs = ["Overview", "Fare Details", "Baggage", "Fare Rules", "Refund & Change", "Seat Map", "Flight Info"];

  return (
    <div className="d-flex position-relative">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="app-container w-100 min-vh-100 d-flex flex-column justify-content-between">
        <Header
          toggleSidebar={toggleSidebar}
          title="Flight Details"
          subtitle="Home > Flights > Search Results > Flight Details"
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

        <main className="main-content d-flex flex-column gap-4 py-4" style={{ backgroundColor: "#FAFAFA" }}>
          {/* Header Row */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center justify-content-center rounded" style={{ width: "48px", height: "48px", backgroundColor: "#E6F8F5", color: "#0F9D58" }}>
                <i className="bi bi-airplane fs-4" style={{ transform: "rotate(-45deg)" }}></i>
              </div>
              <div>
                <h1 className="h5 fw-800 m-0" style={{ color: "#112E24" }}>Flight Details</h1>
                <span className="text-secondary fs-7">Review fare rules, baggage, refund policy and other details before booking.</span>
              </div>
            </div>

            <div className="d-flex gap-2">
              <Link href="/flights" className="btn btn-white border shadow-sm fw-600 text-dark d-flex align-items-center gap-2 fs-7 px-3 py-2 bg-white">
                <i className="bi bi-chevron-left fs-8"></i> Back to Results
              </Link>
              <button className="btn btn-white border shadow-sm fw-600 text-dark d-flex align-items-center gap-2 fs-7 px-3 py-2 bg-white">
                <i className="bi bi-share"></i> Share
              </button>
              <button className="btn btn-white border shadow-sm fw-600 text-dark d-flex align-items-center gap-2 fs-7 px-3 py-2 bg-white">
                <i className="bi bi-bookmark"></i> Save Search
              </button>
            </div>
          </div>

          {/* Global Tabs */}
          <div className="border-bottom border-light w-100">
            <ul className="nav nav-underline flex-nowrap overflow-auto">
              {tabs.map(tab => (
                <li className="nav-item" key={tab}>
                  <button
                    className={`nav-link fw-700 py-3 border-0 bg-transparent ${activeTab === tab ? 'active text-dark' : 'text-secondary'}`}
                    style={{
                      color: activeTab === tab ? "#112E24" : "",
                      borderBottom: activeTab === tab ? "2px solid #112E24" : "2px solid transparent"
                    }}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="row g-4 align-items-start">
            {/* Left Column */}
            <div className="col-12 col-xl-8 d-flex flex-column gap-4">
              {/* Conditional Tab Contents */}
              {activeTab === "Overview" && <OverviewTab />}
              {activeTab === "Fare Details" && <FareDetailsTab />}
              {activeTab === "Baggage" && <BaggageTab />}
              {activeTab === "Fare Rules" && <FareRulesTab />}
              {activeTab === "Refund & Change" && <RefundChangeTab />}
              {activeTab === "Seat Map" && <SeatMapTab />}
              {activeTab === "Flight Info" && <FlightInfoTab />}

              {/* Common Left Footer */}
              <div className="card border-0 rounded-4" style={{ backgroundColor: "#F0F5FF" }}>
                <div className="card-body p-4">
                  <h6 className="fw-800 mb-3 text-primary" style={{ color: "#2B73F6 !important" }}>Important Notes</h6>
                  <ul className="mb-0 text-dark fs-7 d-flex flex-column gap-2" style={{ color: "#3B4A54" }}>
                    <li>Fares are not guaranteed until ticketed.</li>
                    <li>Seat availability and fare may change without prior notice.</li>
                    <li className="d-flex align-items-center gap-1">
                      Please review fare rules, refund & change policy carefully before booking.
                      <i className="bi bi-info-circle text-primary"></i>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                  <h6 className="fw-800 mb-4" style={{ color: "#112E24" }}>Payment & Ticketing Info</h6>
                  <div className="row g-4 mb-4">
                    <div className="col-12 col-md-4">
                      <span className="text-secondary fw-600 fs-8 d-block mb-1">Ticket Type</span>
                      <span className="fw-700 fs-7 d-block">E-Ticket</span>
                    </div>
                    <div className="col-12 col-md-4">
                      <span className="text-secondary fw-600 fs-8 d-block mb-1">Payment Time Limit</span>
                      <span className="fw-700 fs-7 d-block">02h 30m</span>
                    </div>
                    <div className="col-12 col-md-4">
                      <span className="text-secondary fw-600 fs-8 d-block mb-1">Ticketing Time Limit</span>
                      <span className="fw-700 fs-7 d-block">24h</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3 pt-3 border-top border-light flex-wrap">
                    <span className="text-secondary fw-600 fs-8">Form of Payment</span>
                    <div className="d-flex gap-2 align-items-center">
                      <span className="badge bg-light text-primary border border-primary-subtle px-2 py-1 fs-8 fw-700">VISA</span>
                      <span className="badge bg-light text-danger border border-danger-subtle px-2 py-1 fs-8 fw-700" style={{ color: "#EB4335" }}>MC</span>
                      <span className="badge bg-light text-info border border-info-subtle px-2 py-1 fs-8 fw-700">AMEX</span>
                      <span className="text-secondary fs-8 fw-600 ms-2">and more</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-12 col-xl-4 d-flex flex-column gap-4">
              
              {/* Dynamic Side Cards based on Tab */}
              {activeTab === "Fare Details" && <FareDetailsSide />}
              {activeTab === "Baggage" && <BaggageSide />}
              {activeTab === "Fare Rules" && <FareRulesSide />}
              {activeTab === "Refund & Change" && <RefundChangeSide />}
              
              {/* Static Global Side Cards */}
              <div className="card border-0 shadow-sm rounded-4" style={{ backgroundColor: "#FAFAFA", border: "1px solid #EFECE6 !important" }}>
                <div className="card-body p-4">
                  <h6 className="fw-800 mb-3" style={{ color: "#112E24" }}>Fare Summary</h6>
                  <div className="d-flex align-items-end justify-content-between mb-2">
                    <div className="d-flex flex-column">
                      <span className="fw-800 fs-3" style={{ color: "#112E24", lineHeight: 1.2 }}>USD 1,145.00</span>
                      <span className="text-secondary fs-8 fw-600">Per Adult</span>
                    </div>
                    <span className="badge bg-success-subtle text-success border border-success-subtle rounded-1 mb-2" style={{ fontSize: "0.65rem" }}>Recommended</span>
                  </div>

                  <div className="d-flex flex-column gap-2 mt-4">
                    <button className="btn text-white rounded-3 fw-600 d-flex justify-content-between align-items-center px-3 py-2 w-100" style={{ backgroundColor: "#112E24" }}>
                      <span>Continue to Booking</span>
                      <i className="bi bi-arrow-right"></i>
                    </button>
                    <button className="btn btn-outline-secondary bg-white border-light shadow-sm rounded-3 fw-600 d-flex justify-content-center align-items-center gap-2 px-3 py-2 w-100">
                      <i className="bi bi-clock"></i> Hold This Fare
                    </button>
                    <button className="btn btn-outline-secondary bg-white border-light shadow-sm rounded-3 fw-600 d-flex justify-content-center align-items-center gap-2 px-3 py-2 w-100">
                      <i className="bi bi-calendar-plus"></i> Add to Queue
                    </button>
                  </div>
                </div>
              </div>

              {activeTab !== "Fare Details" && (
                <div className="card border-0 shadow-sm rounded-4">
                  <div className="card-body p-4">
                    <h6 className="fw-800 mb-3" style={{ color: "#112E24" }}>Fare Benefits</h6>
                    <div className="d-flex flex-column gap-3 fs-8 fw-600">
                      <div className="d-flex align-items-start gap-2">
                        <i className="bi bi-check-circle-fill text-success fs-7"></i>
                        <span className="text-dark">30kg Checked Baggage</span>
                      </div>
                      <div className="d-flex align-items-start gap-2">
                        <i className="bi bi-check-circle-fill text-success fs-7"></i>
                        <span className="text-dark">7kg Cabin Baggage</span>
                      </div>
                      <div className="d-flex align-items-start gap-2">
                        <i className="bi bi-check-circle-fill text-success fs-7"></i>
                        <span className="text-dark">Meal Included</span>
                      </div>
                      <div className="d-flex align-items-start gap-2">
                        <i className="bi bi-check-circle-fill text-success fs-7"></i>
                        <span className="text-dark">Seat Selection Included</span>
                      </div>
                      <div className="d-flex align-items-start gap-2">
                        <i className="bi bi-check-circle-fill text-success fs-7"></i>
                        <span className="text-dark">Change Allowed (Fee applies)</span>
                      </div>
                      <div className="d-flex align-items-start gap-2">
                        <i className="bi bi-check-circle-fill text-success fs-7"></i>
                        <span className="text-dark">Refundable (Fee applies)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                  <h6 className="fw-800 mb-1" style={{ color: "#112E24" }}>Price Alert</h6>
                  <span className="text-secondary fs-8 d-block mb-3">Get notified if the price drops</span>
                  <button className="btn btn-outline-secondary bg-white border-light shadow-sm rounded-3 fw-600 d-flex justify-content-center align-items-center gap-2 px-3 py-2 w-100 fs-7">
                    <i className="bi bi-bell"></i> Create Price Alert
                  </button>
                </div>
              </div>

              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                  <h6 className="fw-800 mb-3" style={{ color: "#112E24" }}>Quick Links</h6>
                  <div className="d-flex flex-column gap-2 fs-8 fw-600">
                    <a href="#" className="d-flex justify-content-between align-items-center text-dark text-decoration-none py-2 border-bottom border-light">
                      <div className="d-flex gap-2 align-items-center"><i className="bi bi-bag"></i> Baggage Allowance</div>
                      <i className="bi bi-chevron-right text-secondary fs-9"></i>
                    </a>
                    <a href="#" className="d-flex justify-content-between align-items-center text-dark text-decoration-none py-2 border-bottom border-light">
                      <div className="d-flex gap-2 align-items-center"><i className="bi bi-file-text"></i> Fare Rules</div>
                      <i className="bi bi-chevron-right text-secondary fs-9"></i>
                    </a>
                    <a href="#" className="d-flex justify-content-between align-items-center text-dark text-decoration-none py-2 border-bottom border-light">
                      <div className="d-flex gap-2 align-items-center"><i className="bi bi-person-workspace"></i> Seat Map</div>
                      <i className="bi bi-chevron-right text-secondary fs-9"></i>
                    </a>
                    <a href="#" className="d-flex justify-content-between align-items-center text-dark text-decoration-none py-2">
                      <div className="d-flex gap-2 align-items-center"><i className="bi bi-info-circle"></i> Flight Status</div>
                      <i className="bi bi-chevron-right text-secondary fs-9"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// TAB COMPONENTS
// ----------------------------------------------------

function OverviewTab() {
  return (
    <>
      {/* Flight Overview Card */}
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-4">
            <div className="d-flex align-items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg" alt="Emirates" style={{ width: "80px", objectFit: "contain" }} />
              <div className="d-flex flex-column gap-2">
                <div className="d-flex align-items-center gap-2">
                  <span className="fw-700 fs-7">Emirates EK 201</span>
                  <span className="badge bg-success-subtle text-success border border-success-subtle rounded-1" style={{ fontSize: "0.65rem" }}>Recommended</span>
                </div>
                <div className="d-flex align-items-center gap-4 mt-2">
                  <div className="d-flex flex-column text-start">
                    <span className="fw-800 fs-4">DXB <span className="fs-5">10:15</span></span>
                    <span className="text-secondary fs-8">Dubai</span>
                    <span className="text-secondary fs-8">18 May 2025, Sun</span>
                  </div>

                  <div className="d-flex flex-column align-items-center position-relative mx-3" style={{ width: "120px" }}>
                    <span className="text-secondary fs-8 mb-1">7h 05m</span>
                    <div className="w-100 d-flex align-items-center position-relative">
                      <div className="border-bottom border-2 flex-grow-1" style={{ borderColor: "#EFECE6" }}></div>
                      <i className="bi bi-airplane-fill text-secondary position-absolute top-50 start-50 translate-middle" style={{ fontSize: "1rem" }}></i>
                    </div>
                    <span className="text-secondary fs-8 mt-1">Non-stop</span>
                  </div>

                  <div className="d-flex flex-column text-start">
                    <span className="fw-800 fs-4">14:20 LHR</span>
                    <span className="text-secondary fs-8">London (Heathrow)</span>
                    <span className="text-secondary fs-8">18 May 2025, Sun</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column gap-2 border-start ps-4">
              <div className="d-flex justify-content-between gap-4">
                <span className="text-secondary fs-7">Total Duration</span>
                <span className="fw-600 fs-7">7h 05m</span>
              </div>
              <div className="d-flex justify-content-between gap-4">
                <span className="text-secondary fs-7">Flight Type</span>
                <span className="fw-600 fs-7">Non-stop</span>
              </div>
              <div className="d-flex justify-content-between gap-4">
                <span className="text-secondary fs-7">Aircraft</span>
                <span className="fw-600 fs-7">Boeing 777-300ER</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Itinerary Details */}
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <h6 className="fw-800 mb-4" style={{ color: "#112E24" }}>Itinerary Details</h6>
          <div className="d-flex position-relative">
            {/* Timeline line */}
            <div className="position-absolute" style={{ left: "7px", top: "24px", bottom: "24px", width: "2px", backgroundColor: "#D1F0E4" }}></div>

            <div className="d-flex flex-column gap-5 w-100">
              {/* Departure */}
              <div className="d-flex w-100 position-relative">
                <i className="bi bi-circle-fill text-success position-absolute" style={{ left: 0, top: "4px", fontSize: "14px", backgroundColor: "#fff", zIndex: 1 }}></i>
                <div className="ms-4 d-flex justify-content-between w-100 flex-wrap gap-3">
                  <div className="d-flex flex-column">
                    <span className="text-secondary fs-8 fw-600">18 May 2025, Sunday</span>
                    <span className="fw-800 fs-4 mb-1">10:15</span>
                    <span className="fw-700">DXB</span>
                    <span className="text-secondary fs-8">Dubai, United Arab Emirates</span>
                    <span className="text-secondary fs-8">Dubai Intl. Airport (DXB)</span>
                    <span className="text-primary fs-8 fw-600 mt-1" style={{ color: "#2B73F6" }}>Terminal 3</span>
                  </div>
                  <div className="d-flex flex-column align-items-center justify-content-center text-center px-4" style={{ backgroundColor: "#FAFAFA", borderRadius: "8px" }}>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg" alt="Emirates" style={{ width: "24px", objectFit: "contain" }} />
                      <div className="text-start">
                        <span className="fw-700 fs-8 d-block">Emirates EK 201</span>
                        <span className="text-secondary fs-9 d-block">Boeing 777-300ER</span>
                      </div>
                    </div>
                    <div className="d-flex flex-column text-start gap-1 fs-8 text-secondary">
                      <span><i className="bi bi-clock me-2"></i>7h 05m</span>
                      <span><i className="bi bi-airplane me-2"></i>Non-stop</span>
                      <span><i className="bi bi-cup-hot me-2"></i>Economy (N)</span>
                    </div>
                  </div>
                  <div className="d-flex flex-column text-end">
                    <span className="text-secondary fs-8 fw-600">18 May 2025, Sunday</span>
                    <span className="fw-800 fs-4 mb-1">14:20</span>
                    <span className="fw-700">LHR</span>
                    <span className="text-secondary fs-8">London, United Kingdom</span>
                    <span className="text-secondary fs-8">Heathrow Airport (LHR)</span>
                    <span className="text-primary fs-8 fw-600 mt-1" style={{ color: "#2B73F6" }}>Terminal 3</span>
                  </div>
                </div>
              </div>

              {/* Arrival Node */}
              <div className="d-flex w-100 position-relative align-items-center">
                <i className="bi bi-circle text-success position-absolute" style={{ left: 0, fontSize: "14px", backgroundColor: "#fff", zIndex: 1 }}></i>
              </div>
            </div>
          </div>

          {/* Flight Attributes Row */}
          <div className="d-flex justify-content-between flex-wrap gap-3 mt-4 pt-4 border-top border-light">
            <div className="d-flex flex-column">
              <span className="text-secondary fw-600 fs-8 mb-1">Flight Status</span>
              <span className="fw-700 fs-7 text-success">On Time</span>
            </div>
            <div className="d-flex flex-column">
              <span className="text-secondary fw-600 fs-8 mb-1">Meal</span>
              <span className="fw-700 fs-7">Meal</span>
            </div>
            <div className="d-flex flex-column">
              <span className="text-secondary fw-600 fs-8 mb-1">Baggage</span>
              <span className="fw-700 fs-7">30kg</span>
            </div>
            <div className="d-flex flex-column">
              <span className="text-secondary fw-600 fs-8 mb-1">Cabin</span>
              <span className="fw-700 fs-7">Economy</span>
            </div>
            <div className="d-flex flex-column">
              <span className="text-secondary fw-600 fs-8 mb-1">Booking Class</span>
              <span className="fw-700 fs-7">N</span>
            </div>
            <div className="d-flex flex-column">
              <span className="text-secondary fw-600 fs-8 mb-1">Seat Available</span>
              <span className="fw-700 fs-7">Yes</span>
            </div>
          </div>
        </div>
      </div>

      <FlightInfoTab />
    </>
  );
}

function FareDetailsTab() {
  return (
    <>
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <h6 className="fw-800 mb-4" style={{ color: "#112E24" }}>Base Fare Breakdown</h6>
          <span className="d-block mb-3 fw-600">Economy Class <i className="bi bi-arrow-right mx-2"></i> Business Class</span>
          <div className="table-responsive">
            <table className="table table-borderless align-middle mb-0">
              <thead className="border-bottom border-light">
                <tr className="fs-8 text-secondary">
                  <th className="fw-600 py-3 px-3">Segment</th>
                  <th className="fw-600 py-3 px-3">Passenger Type</th>
                  <th className="fw-600 py-3 px-3">Original Fare</th>
                  <th className="fw-600 py-3 px-3">New Fare</th>
                  <th className="fw-600 py-3 px-3">Difference</th>
                </tr>
              </thead>
              <tbody>
                <tr className="fs-7 fw-600 border-bottom border-light">
                  <td className="py-4 px-3">DXB <i className="bi bi-arrow-right mx-1"></i> LHR</td>
                  <td className="py-4 px-3 text-secondary">Adult</td>
                  <td className="py-4 px-3">$850.00</td>
                  <td className="py-4 px-3">$1,250.00</td>
                  <td className="py-4 px-3">+$400.00</td>
                </tr>
                <tr className="fs-7 fw-600">
                  <td className="py-4 px-3">DXB <i className="bi bi-arrow-right mx-1"></i> LHR</td>
                  <td className="py-4 px-3 text-secondary">Adult</td>
                  <td className="py-4 px-3">$850.00</td>
                  <td className="py-4 px-3">$1,250.00</td>
                  <td className="py-4 px-3">+$400.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <h6 className="fw-800 mb-4" style={{ color: "#112E24" }}>Total Fare Breakdown</h6>
          <div className="d-flex flex-column fs-7 fw-600 gap-4">
            <div className="d-flex justify-content-between border-bottom border-light pb-3">
              <span className="text-secondary">Base Fare (All PAX)</span>
              <span>$2,500.00</span>
            </div>
            <div className="d-flex justify-content-between border-bottom border-light pb-3">
              <span className="text-secondary">Taxes</span>
              <span>$735.00</span>
            </div>
            <div className="d-flex justify-content-between border-bottom border-light pb-3">
              <span className="text-secondary">Carrier Fees</span>
              <span>$90.00</span>
            </div>
            <div className="d-flex justify-content-between border-bottom border-light pb-3">
              <span className="text-secondary">Booking Fees</span>
              <span>$15.00</span>
            </div>
            <div className="d-flex justify-content-between border-bottom border-light pb-3">
              <span className="text-secondary">Special Surcharges</span>
              <span>$25.00</span>
            </div>
            <div className="d-flex justify-content-between pt-2">
              <span className="fw-800 fs-5 text-dark">Total Fare (USD)</span>
              <span className="fw-800 fs-5 text-dark">$3,365.00</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function BaggageTab() {
  return (
    <>
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center justify-content-center rounded" style={{ width: "40px", height: "40px", backgroundColor: "#E6F8F5", color: "#0F9D58" }}>
                <i className="bi bi-briefcase fs-5"></i>
              </div>
              <div>
                <h6 className="fw-800 m-0 fs-6" style={{ color: "#112E24" }}>Baggage Allowance</h6>
                <span className="text-secondary fs-8 fw-600">Single Adult</span>
              </div>
            </div>
            <span className="fw-700 fs-7">1501688</span>
          </div>

          <div className="row g-4 pt-3 border-top border-light">
            <div className="col-12 col-md-6 border-end border-light pe-md-4">
              <span className="fw-700 fs-7 d-block mb-3">Checked Baggage</span>
              <div className="d-flex gap-3 mb-3">
                <div className="d-flex flex-column align-items-center gap-1">
                  <div className="d-flex align-items-center justify-content-center rounded bg-success text-white" style={{ width: "48px", height: "48px", opacity: 0.8 }}>
                    <i className="bi bi-suitcase-lg fs-4"></i>
                  </div>
                  <span className="fs-8 fw-600">2 x 23 kg</span>
                </div>
                <div className="d-flex flex-column align-items-center gap-1">
                  <div className="d-flex align-items-center justify-content-center rounded bg-success text-white" style={{ width: "48px", height: "48px", opacity: 0.8 }}>
                    <i className="bi bi-suitcase-lg fs-4"></i>
                  </div>
                  <span className="fs-8 fw-600">2 x 23 kg</span>
                </div>
              </div>
              <span className="fs-8 text-secondary fw-600 d-block">2 pieces, max 23 kg each.</span>
              <span className="fs-8 text-secondary fw-600">Total combined weight 46 kg.</span>
            </div>
            <div className="col-12 col-md-6 ps-md-4">
              <span className="fw-700 fs-7 d-block mb-3">Carry-On Baggage</span>
              <div className="d-flex gap-4 align-items-center mb-3">
                <div className="d-flex gap-2">
                  <div className="d-flex flex-column align-items-center gap-1">
                    <div className="d-flex align-items-center justify-content-center rounded bg-success text-white" style={{ width: "40px", height: "40px", opacity: 0.8 }}>
                      <i className="bi bi-briefcase fs-5"></i>
                    </div>
                    <span className="fs-9 fw-600">Carry-on</span>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-1">
                    <div className="d-flex align-items-center justify-content-center rounded bg-success text-white" style={{ width: "40px", height: "40px", opacity: 0.8 }}>
                      <i className="bi bi-handbag fs-5"></i>
                    </div>
                    <span className="fs-9 fw-600">Personal item</span>
                  </div>
                </div>
                <div className="d-flex flex-column">
                  <span className="fs-8 text-secondary fw-600">1 standard bag,</span>
                  <span className="fs-8 text-secondary fw-600">1 personal item.</span>
                  <span className="fs-8 fw-700">Combined max 7 kg.</span>
                </div>
              </div>
              <span className="fw-700 fs-7 d-block mt-4 mb-1">Special Items</span>
              <span className="fs-8 text-secondary fw-600">Sports equipment or musical instruments.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <h6 className="fw-800 mb-4" style={{ color: "#112E24" }}>Specific Items & Restrictions</h6>
          <div className="table-responsive">
            <table className="table table-borderless align-middle mb-0">
              <thead className="border-bottom border-light">
                <tr className="fs-8 text-secondary">
                  <th className="fw-700 py-3 px-3">Items</th>
                  <th className="fw-700 py-3 px-3">Type</th>
                  <th className="fw-700 py-3 px-3">Dimensions (L+W+H)</th>
                  <th className="fw-700 py-3 px-3">Weight (Max)</th>
                  <th className="fw-700 py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="fs-7 fw-600 border-bottom border-light">
                  <td className="py-4 px-3">Laptop Bag</td>
                  <td className="py-4 px-3 text-secondary">Laptop Bag</td>
                  <td className="py-4 px-3">30x40x10 cm</td>
                  <td className="py-4 px-3">2 kg</td>
                  <td className="py-4 px-3 text-secondary">Included (Personal Item)</td>
                </tr>
                <tr className="fs-7 fw-600 border-bottom border-light">
                  <td className="py-4 px-3">Overcoat</td>
                  <td className="py-4 px-3 text-secondary">Overcoat</td>
                  <td className="py-4 px-3">30x40x10 cm</td>
                  <td className="py-4 px-3">2 kg</td>
                  <td className="py-4 px-3 text-secondary">Included (Personal Item)</td>
                </tr>
                <tr className="fs-7 fw-600 border-bottom border-light">
                  <td className="py-4 px-3">Duffel Bag</td>
                  <td className="py-4 px-3 text-secondary">Duffel Bag</td>
                  <td className="py-4 px-3">30x40x10 cm</td>
                  <td className="py-4 px-3">2 kg</td>
                  <td className="py-4 px-3 text-secondary">Included (Personal Item)</td>
                </tr>
                <tr className="fs-7 fw-600">
                  <td className="py-4 px-3">Stroller (Infant)</td>
                  <td className="py-4 px-3 text-secondary">Stroller</td>
                  <td className="py-4 px-3">N/A</td>
                  <td className="py-4 px-3">N/A</td>
                  <td className="py-4 px-3 text-secondary">Free of charge (at gate)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

function FareRulesTab() {
  return (
    <>
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center justify-content-center rounded" style={{ width: "40px", height: "40px", backgroundColor: "#E6F8F5", color: "#0F9D58" }}>
                <i className="bi bi-file-text fs-5"></i>
              </div>
              <div>
                <h6 className="fw-800 m-0 fs-6" style={{ color: "#112E24" }}>Fare Rule Summary - [Fare Basis Code: HE34PR]</h6>
                <span className="text-secondary fs-8 fw-600">Single Adult</span>
              </div>
            </div>
            <span className="fw-700 fs-7">1501688</span>
          </div>

          <div className="d-flex flex-wrap gap-4 align-items-center mt-3 pt-3">
            <span className="fw-800 fs-6">Tickets Are:</span>
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-check-lg text-dark fs-5"></i>
              <span className="fw-600 text-dark">Non-refundable</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-x-lg text-danger fs-5"></i>
              <span className="fw-600 text-dark">Changeable (with fee)</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-check-lg text-dark fs-5"></i>
              <span className="fw-600 text-dark">Non-transferable</span>
            </div>
          </div>
          
          <div className="mt-4 p-3 rounded-3" style={{ backgroundColor: "#F0F5FF" }}>
            <span className="fs-7 fw-600 text-dark" style={{ color: "#3B4A54" }}>
              This fare is non-refundable. Changes are permitted with a penalty and fare difference.
              Min/Max stay requirements may apply.
            </span>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <h6 className="fw-800 mb-4" style={{ color: "#112E24" }}>Specific Fare Rules</h6>
          <div className="table-responsive">
            <table className="table table-borderless align-middle mb-0">
              <thead className="border-bottom border-light">
                <tr className="fs-8 text-secondary">
                  <th className="fw-700 py-3 px-3 w-25">Category</th>
                  <th className="fw-700 py-3 px-3 w-25">Details</th>
                  <th className="fw-700 py-3 px-3 w-50">Restrictions/Fee</th>
                </tr>
              </thead>
              <tbody>
                <tr className="fs-7 fw-600 border-bottom border-light">
                  <td className="py-4 px-3">Cancellation</td>
                  <td className="py-4 px-3 text-secondary">Before departure.</td>
                  <td className="py-4 px-3 text-dark">Non-refundable. Any unused taxes may be refundable.</td>
                </tr>
                <tr className="fs-7 fw-600 border-bottom border-light">
                  <td className="py-4 px-3">Change</td>
                  <td className="py-4 px-3 text-secondary">Time/Date changes permitted.</td>
                  <td className="py-4 px-3 text-dark">Fee of USD 150 per change plus fare difference. Must be done before departure.</td>
                </tr>
                <tr className="fs-7 fw-600 border-bottom border-light">
                  <td className="py-4 px-3">No Show</td>
                  <td className="py-4 px-3 text-secondary">Failure to check-in.</td>
                  <td className="py-4 px-3 text-dark">Ticket has no value. Cancellation fee applies.</td>
                </tr>
                <tr className="fs-7 fw-600 border-bottom border-light">
                  <td className="py-4 px-3">Min Stay</td>
                  <td className="py-4 px-3 text-secondary">Required stay at destination.</td>
                  <td className="py-4 px-3 text-dark">3 days.</td>
                </tr>
                <tr className="fs-7 fw-600 border-bottom border-light">
                  <td className="py-4 px-3">Max Stay</td>
                  <td className="py-4 px-3 text-secondary">Maximum permitted stay.</td>
                  <td className="py-4 px-3 text-dark">1 year.</td>
                </tr>
                <tr className="fs-7 fw-600">
                  <td className="py-4 px-3">Advance Purchase</td>
                  <td className="py-4 px-3 text-secondary">Days before flight.</td>
                  <td className="py-4 px-3 text-dark">14 days before departure.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

function RefundChangeTab() {
  return (
    <>
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center justify-content-center rounded" style={{ width: "40px", height: "40px", backgroundColor: "#E6F8F5", color: "#0F9D58" }}>
                <i className="bi bi-arrow-repeat fs-5"></i>
              </div>
              <div>
                <h6 className="fw-800 m-0 fs-6" style={{ color: "#112E24" }}>Refund & Change Policy Summary - [Fare Basis Code: HE34PR]</h6>
                <span className="text-secondary fs-8 fw-600">Single Adult</span>
              </div>
            </div>
            <span className="fw-700 fs-7">1501688</span>
          </div>

          <div className="mt-3">
            <span className="fw-700 fs-6 d-block mb-3">Summary: Specific refund and change conditions apply. See table below.</span>
            
            <div className="p-3 rounded-3" style={{ backgroundColor: "#F0F5FF" }}>
              <div className="d-flex gap-2">
                <i className="bi bi-info-circle" style={{ color: "#2B73F6", marginTop: "2px" }}></i>
                <div>
                  <span className="fw-700 text-dark d-block mb-1">Information</span>
                  <span className="fs-7 fw-600 text-secondary">
                    This fare is non-refundable but changeable with a fee. Special cases and schedule changes are handled separately.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <h6 className="fw-800 mb-4" style={{ color: "#112E24" }}>Refund & Change Matrix</h6>
          <div className="table-responsive">
            <table className="table table-borderless align-middle mb-0">
              <thead className="border-bottom border-light">
                <tr className="fs-8 text-secondary">
                  <th className="fw-700 py-3 px-3">Category</th>
                  <th className="fw-700 py-3 px-3">Passenger Type</th>
                  <th className="fw-700 py-3 px-3 w-50">Refund Policy</th>
                  <th className="fw-700 py-3 px-3 text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="fs-7 fw-600 border-bottom border-light">
                  <td className="py-4 px-3">Cancellation / Refund</td>
                  <td className="py-4 px-3 text-secondary">Before departure</td>
                  <td className="py-4 px-3 text-dark">Non-refundable. Only unused taxes may be eligible.</td>
                  <td className="py-4 px-3 text-end text-secondary">[N/A]</td>
                </tr>
                <tr className="fs-7 fw-600 border-bottom border-light">
                  <td className="py-4 px-3">Cancellation / Refund</td>
                  <td className="py-4 px-3 text-secondary">No Show</td>
                  <td className="py-4 px-3 text-dark">Non-refundable. Non-changeable.</td>
                  <td className="py-4 px-3 text-end text-secondary">[N/A]</td>
                </tr>
                <tr className="fs-7 fw-600 border-bottom border-light">
                  <td className="py-4 px-3">Date Change</td>
                  <td className="py-4 px-3 text-secondary">Before departure</td>
                  <td className="py-4 px-3 text-dark">Changeable with a fee. Fare difference may apply.</td>
                  <td className="py-4 px-3 text-end text-dark">USD 150 per passenger.</td>
                </tr>
                <tr className="fs-7 fw-600">
                  <td className="py-4 px-3">Schedule Change</td>
                  <td className="py-4 px-3 text-secondary">Airlines initiated</td>
                  <td className="py-4 px-3 text-dark">Special handling applies. Full refund or free change may be offered.</td>
                  <td className="py-4 px-3 text-end text-secondary">[Fee Waived]</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

function SeatMapTab() {
  return (
    <>
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center justify-content-center rounded" style={{ width: "40px", height: "40px", backgroundColor: "#E6F8F5", color: "#0F9D58" }}>
                <i className="bi bi-person-bounding-box fs-5"></i>
              </div>
              <div>
                <h6 className="fw-800 m-0 fs-6" style={{ color: "#112E24" }}>Seat Selection - [Flight EK34PR]</h6>
                <span className="text-secondary fs-8 fw-600">Select or change seats for Single Adult</span>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
            <span className="fw-700 fs-6">Emirates Boeing 777-300ER</span>
            <div className="d-flex gap-3 align-items-center">
              <div className="d-flex gap-2 align-items-center"><span className="badge rounded-circle bg-secondary d-flex align-items-center justify-content-center" style={{ width: "24px", height: "24px", fontSize: "10px" }}>A</span> Window</div>
              <div className="d-flex gap-2 align-items-center"><div className="border border-secondary rounded" style={{ width: "20px", height: "20px" }}></div> Aisle</div>
            </div>
          </div>

          <div className="d-flex justify-content-center position-relative w-100 overflow-auto py-5 bg-light rounded-4">
             {/* Simple mockup for seat map graphic */}
             <div className="position-relative d-flex align-items-center justify-content-center" style={{ minWidth: "600px", height: "300px", backgroundColor: "#EFECE6", borderRadius: "150px" }}>
                {/* Airplane shape mock */}
                <span className="position-absolute fs-4 fw-800 text-secondary" style={{ transform: "rotate(-90deg)", left: "20px" }}>Emirates</span>
                
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex gap-2">
                    <div className="btn btn-sm btn-success rounded" style={{ width: "40px", height: "40px" }}>A</div>
                    <div className="btn btn-sm btn-light border-secondary rounded" style={{ width: "40px", height: "40px" }}>B</div>
                    <div className="mx-3 fw-800 text-secondary d-flex align-items-center">Aisle</div>
                    <div className="btn btn-sm btn-light border-secondary rounded" style={{ width: "40px", height: "40px" }}>C</div>
                    <div className="btn btn-sm btn-light border-secondary rounded" style={{ width: "40px", height: "40px" }}>D</div>
                    <div className="btn btn-sm bg-secondary text-white rounded" style={{ width: "40px", height: "40px" }}>E</div>
                    <div className="btn btn-sm btn-light border-secondary rounded" style={{ width: "40px", height: "40px" }}>F</div>
                    <div className="btn btn-sm btn-light border-secondary rounded" style={{ width: "40px", height: "40px" }}>G</div>
                    <div className="mx-3 fw-800 text-secondary d-flex align-items-center">Aisle</div>
                    <div className="btn btn-sm btn-light border-secondary rounded" style={{ width: "40px", height: "40px" }}>H</div>
                    <div className="btn btn-sm btn-light border-secondary rounded" style={{ width: "40px", height: "40px" }}>I</div>
                    <div className="btn btn-sm btn-light border-secondary rounded" style={{ width: "40px", height: "40px" }}>J</div>
                    <div className="btn btn-sm btn-light border-secondary rounded" style={{ width: "40px", height: "40px" }}>K</div>
                  </div>
                  <div className="d-flex gap-2">
                    <div className="btn btn-sm btn-dark text-white rounded" style={{ width: "40px", height: "40px" }}><i className="bi bi-check"></i> A</div>
                    <div className="btn btn-sm btn-light border-secondary rounded" style={{ width: "40px", height: "40px" }}>B</div>
                    <div className="mx-3 fw-800 text-secondary d-flex align-items-center">Aisle</div>
                    <div className="btn btn-sm btn-light border-secondary rounded" style={{ width: "40px", height: "40px" }}>C</div>
                    <div className="btn btn-sm bg-secondary text-white rounded" style={{ width: "40px", height: "40px" }}>D</div>
                    <div className="btn btn-sm btn-light border-secondary rounded" style={{ width: "40px", height: "40px" }}>E</div>
                    <div className="btn btn-sm bg-secondary text-white rounded" style={{ width: "40px", height: "40px" }}>F</div>
                    <div className="btn btn-sm btn-light border-secondary rounded" style={{ width: "40px", height: "40px" }}>G</div>
                    <div className="mx-3 fw-800 text-secondary d-flex align-items-center">Aisle</div>
                    <div className="btn btn-sm btn-light border-secondary rounded" style={{ width: "40px", height: "40px" }}>15</div>
                    <div className="btn btn-sm btn-light border-secondary rounded" style={{ width: "40px", height: "40px" }}>16</div>
                    <div className="btn btn-sm btn-light border-secondary rounded" style={{ width: "40px", height: "40px" }}>17</div>
                    <div className="btn btn-sm btn-light border-secondary rounded" style={{ width: "40px", height: "40px" }}>18</div>
                  </div>
                </div>

                <div className="position-absolute" style={{ right: "20px", top: "20px" }}>
                  <div className="bg-white p-3 rounded shadow-sm border border-light d-flex flex-column gap-2 fs-8 fw-600">
                    <span className="fw-700 fs-7 mb-1">Legend <span className="badge rounded-circle bg-secondary mx-1" style={{ fontSize: "10px" }}>A</span></span>
                    <div className="d-flex align-items-center gap-2"><div className="border border-secondary rounded" style={{ width: "16px", height: "16px", backgroundColor: "#fff" }}></div> Available</div>
                    <div className="d-flex align-items-center gap-2"><div className="border border-secondary rounded" style={{ width: "16px", height: "16px", backgroundColor: "#6c757d" }}></div> Occupied</div>
                    <div className="d-flex align-items-center gap-2"><div className="rounded" style={{ width: "16px", height: "16px", backgroundColor: "#112E24" }}><i className="bi bi-check text-white" style={{ fontSize: "12px", lineHeight: "16px", display: "block", textAlign: "center" }}></i></div> Selected seat</div>
                    <div className="d-flex align-items-center gap-2"><div className="rounded" style={{ width: "16px", height: "16px", backgroundColor: "#b3e5fc" }}></div> Extra Legroom</div>
                    <div className="d-flex align-items-center gap-2"><div className="rounded" style={{ width: "16px", height: "16px", backgroundColor: "#81d4fa" }}></div> Extra Legroom, Bulkhead</div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4 d-flex justify-content-between align-items-center flex-wrap gap-4">
          <div className="d-flex align-items-center gap-3">
             <div className="d-flex align-items-center justify-content-center rounded" style={{ width: "40px", height: "40px", backgroundColor: "#E6F8F5", color: "#0F9D58" }}>
                <i className="bi bi-person-bounding-box fs-5"></i>
              </div>
              <h6 className="fw-800 m-0 fs-5" style={{ color: "#112E24" }}>Selected Seat</h6>
          </div>

          <div className="d-flex align-items-center justify-content-between flex-grow-1 mx-4 gap-4 flex-wrap">
            <span className="fw-700 fs-6">Adult 1: <span className="text-danger">Row 12, Seat A</span> (Window)</span>
            <span className="fw-700 fs-6">Seat Price: $0 <span className="text-secondary fw-500">(Included in fare)</span></span>
          </div>

          <button className="btn text-white rounded-3 fw-600 px-4 py-2" style={{ backgroundColor: "#112E24" }}>
            Confirm Seat Selection
          </button>
        </div>
      </div>
    </>
  );
}

function FlightInfoTab() {
  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4">
      <div className="card-body p-4">
        <h6 className="fw-800 mb-4" style={{ color: "#112E24" }}>Flight Information</h6>
        <div className="row g-4">
          <div className="col-12 col-md-3">
            <span className="text-secondary fw-600 fs-8 d-block mb-1">Airline</span>
            <span className="fw-700 fs-7 d-block">Emirates</span>
          </div>
          <div className="col-12 col-md-3">
            <span className="text-secondary fw-600 fs-8 d-block mb-1">Aircraft</span>
            <span className="fw-700 fs-7 d-block">Boeing 777-300ER</span>
          </div>
          <div className="col-12 col-md-3">
            <span className="text-secondary fw-600 fs-8 d-block mb-1">Flight Duration</span>
            <span className="fw-700 fs-7 d-block">7h 05m</span>
          </div>
          <div className="col-12 col-md-3">
            <span className="text-secondary fw-600 fs-8 d-block mb-1">On-Time Performance</span>
            <span className="fw-700 fs-7 d-block">85%</span>
          </div>
          <div className="col-12 col-md-3">
            <span className="text-secondary fw-600 fs-8 d-block mb-1">Miles / Points</span>
            <span className="fw-700 fs-7 d-block">Skywards Miles: 4,202</span>
          </div>
          <div className="col-12 col-md-3">
            <span className="text-secondary fw-600 fs-8 d-block mb-1">Frequent Flyer</span>
            <span className="fw-700 fs-7 d-block">Yes</span>
          </div>
          <div className="col-12 col-md-3">
            <span className="text-secondary fw-600 fs-8 d-block mb-1">Connectivity</span>
            <span className="fw-700 fs-7 d-block">Wi-Fi Available</span>
          </div>
          <div className="col-12 col-md-3">
            <span className="text-secondary fw-600 fs-8 d-block mb-1">Power</span>
            <span className="fw-700 fs-7 d-block">In-Seat Power</span>
          </div>
        </div>
      </div>
    </div>
  );
}


// ----------------------------------------------------
// RIGHT SIDE DYNAMIC COMPONENTS
// ----------------------------------------------------

function FareDetailsSide() {
  return (
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-body p-4">
        <div className="d-flex flex-column gap-3 fs-7 fw-600">
          <div className="d-flex justify-content-between border-bottom border-light pb-3">
            <span className="text-secondary">Fare Basis</span>
            <span className="text-dark">BECO/BS</span>
          </div>
          <div className="d-flex justify-content-between border-bottom border-light pb-3">
            <span className="text-secondary">Class/RBD</span>
            <span className="text-dark">N / E</span>
          </div>
          <div className="d-flex justify-content-between border-bottom border-light pb-3">
            <span className="text-secondary">Cabin Class</span>
            <span className="text-dark">Economy (N) to Business (E)</span>
          </div>
          <div className="d-flex justify-content-between border-bottom border-light pb-3">
            <span className="text-secondary">Commission</span>
            <span className="text-dark">3%</span>
          </div>
          <div className="d-flex justify-content-between pt-1">
            <span className="text-secondary">YQ Detail</span>
            <div className="d-flex flex-column align-items-end">
              <span className="text-dark fw-700">$90.00</span>
              <span className="text-secondary fs-9 fw-500">(split by segment if needed)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BaggageSide() {
  return (
    <>
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <h6 className="fw-800 mb-4" style={{ color: "#112E24" }}>Extra Baggage & Services</h6>
          <div className="d-flex flex-column gap-4 fs-7 fw-600 border-bottom border-light pb-4 mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-dark">Add 1 Checked Bag (23kg):</span>
              <span className="text-dark fw-800 fs-6">USD 60</span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-dark">Increase Carry-on Weight:</span>
              <span className="text-dark fw-800 fs-6">USD 25</span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-dark w-50">Sports Equipment (e.g., Golf Bag):</span>
              <span className="text-dark fw-800 fs-6">From USD 75</span>
            </div>
          </div>
          <button className="btn text-white rounded-3 fw-600 px-4 py-2 w-100" style={{ backgroundColor: "#112E24" }}>
            Add Extra Baggage
          </button>
        </div>
      </div>
      
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <h6 className="fw-800 mb-4" style={{ color: "#112E24" }}>Baggage Policy Highlights</h6>
          <ul className="d-flex flex-column gap-3 text-dark fs-7 fw-600 mb-4 ps-3">
            <li>Pre-book extra bags for savings.</li>
            <li>Restrictions on dangerous goods apply.</li>
            <li>Baggage tracing services available.</li>
          </ul>
          <a href="#" className="fw-700 text-primary text-decoration-none" style={{ color: "#2B73F6 !important" }}>Full Baggage Terms & Conditions <i className="bi bi-box-arrow-up-right ms-1"></i></a>
        </div>
      </div>
    </>
  );
}

function FareRulesSide() {
  return (
    <>
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <h6 className="fw-800 mb-4" style={{ color: "#112E24" }}>Penalty Summary</h6>
          <div className="d-flex flex-column gap-4 fs-7 fw-600 border-bottom border-light pb-4 mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-dark">Cancellation Fee</span>
              <span className="text-dark fw-800 fs-6">Non-refundable</span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-dark">Change Fee (per PAX)</span>
              <span className="text-dark fw-800 fs-6">USD 150 + Fare Diff</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <span className="text-dark">No Show Fee</span>
              <span className="text-dark fw-800 fs-6">USD 250</span>
            </div>
          </div>
          <button className="btn text-white rounded-3 fw-600 px-4 py-2 w-100" style={{ backgroundColor: "#112E24" }}>
            Add Extra Baggage
          </button>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <h6 className="fw-800 mb-4" style={{ color: "#112E24" }}>Rule Rules Reference</h6>
          <div className="d-flex flex-column gap-3 fs-7 fw-600 mb-4">
            <div className="d-flex justify-content-between border-bottom border-light pb-2">
              <span className="text-secondary">Fare Basis Code</span>
              <span className="text-dark">HE34PR</span>
            </div>
            <div className="d-flex justify-content-between border-bottom border-light pb-2">
              <span className="text-secondary">Ticket Type</span>
              <span className="text-dark">E-Ticket</span>
            </div>
            <div className="d-flex justify-content-between pb-2">
              <span className="text-secondary">Last Updated</span>
              <span className="text-dark">15 May 2025</span>
            </div>
          </div>
          <button className="btn text-white rounded-3 fw-600 px-4 py-2 w-100" style={{ backgroundColor: "#112E24" }}>
            View Full Rule Text
          </button>
        </div>
      </div>
    </>
  );
}

function RefundChangeSide() {
  return (
    <>
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <h6 className="fw-800 mb-4" style={{ color: "#112E24" }}>Fee Summary</h6>
          <div className="d-flex flex-column gap-4 fs-7 fw-600 border-bottom border-light pb-4 mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-dark">Refund Fee</span>
              <span className="text-dark fw-800 fs-6">Non-refundable</span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-dark">Change Fee (per PAX)</span>
              <span className="text-dark fw-800 fs-6">USD 150</span>
            </div>
          </div>
          <button className="btn text-white rounded-3 fw-600 px-4 py-2 w-100" style={{ backgroundColor: "#112E24" }}>
            Submit Refund/Change Request
          </button>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <h6 className="fw-800 mb-4" style={{ color: "#112E24" }}>Rule Rules Reference</h6>
          <div className="d-flex flex-column gap-3 fs-7 fw-600 mb-4">
            <div className="d-flex justify-content-between border-bottom border-light pb-2">
              <span className="text-secondary">Fare Basis Code</span>
              <span className="text-dark">HE34PR</span>
            </div>
            <div className="d-flex justify-content-between border-bottom border-light pb-2">
              <span className="text-secondary">Ticket Type</span>
              <span className="text-dark">E-Ticket</span>
            </div>
            <div className="d-flex justify-content-between pb-2">
              <span className="text-secondary">Last Updated</span>
              <span className="text-dark">15 May 2025</span>
            </div>
          </div>
          <button className="btn text-white rounded-3 fw-600 px-4 py-2 w-100" style={{ backgroundColor: "#112E24" }}>
            View Full Rule Text
          </button>
        </div>
      </div>
    </>
  );
}
