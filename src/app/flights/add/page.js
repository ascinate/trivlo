"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";

export default function AddNewFlightPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="d-flex position-relative">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="app-container w-100 min-vh-100 d-flex flex-column justify-content-between">
        <Header
          toggleSidebar={toggleSidebar}
          title="Add New Flight"
          subtitle="Home > Flights > Add New Flight"
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
              <div className="d-flex align-items-center justify-content-center rounded" style={{ width: "48px", height: "48px", backgroundColor: "#D93025", color: "#fff" }}>
                {/* Placeholder for Emirates Logo in red block */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg" alt="Emirates" style={{ width: "24px", filter: "brightness(0) invert(1)" }} />
              </div>
              <div>
                <h1 className="h5 fw-800 m-0" style={{ color: "#112E24" }}>Add New Flight</h1>
                <span className="text-secondary fs-7">Input all details required for a new flight</span>
              </div>
            </div>

            <div className="d-flex gap-2">
              <Link href="/flights" className="btn btn-white border shadow-sm fw-600 text-dark d-flex align-items-center gap-2 fs-7 px-3 py-2 bg-white text-decoration-none">
                <i className="bi bi-chevron-left fs-8"></i> Back to Results
              </Link>
              <button className="btn btn-white border shadow-sm fw-600 text-dark d-flex align-items-center gap-2 fs-7 px-3 py-2 bg-white">
                <i className="bi bi-share"></i> Share
              </button>
              <button className="btn text-white shadow-sm fw-600 d-flex align-items-center gap-2 fs-7 px-3 py-2" style={{ backgroundColor: "#112E24" }}>
                <i className="bi bi-download"></i> Save the Flight
              </button>
            </div>
          </div>

          {/* Sub Header (Create a New Flight Record) */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center bg-white p-3 rounded-4 border shadow-sm mt-2" style={{ borderColor: "#EFECE6" }}>
            <h5 className="fw-800 m-0 ps-2" style={{ color: "#112E24", fontSize: "1.25rem" }}>Create a New Flight Record</h5>
            <div className="d-flex gap-2 mt-3 mt-md-0">
              <button className="btn btn-outline-secondary bg-white border-light rounded-3 px-4 py-2 fw-600 fs-7">
                Discard & Cancel
              </button>
              <button className="btn text-white rounded-3 px-4 py-2 fw-600 fs-7" style={{ backgroundColor: "#112E24" }}>
                Save & Add Flight
              </button>
            </div>
          </div>

          <div className="row g-4 align-items-start mt-1">
            {/* Left Column */}
            <div className="col-12 col-xl-4 d-flex flex-column gap-4">
              
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-2 mb-4">
                    <div className="d-flex align-items-center justify-content-center rounded bg-success-subtle text-success" style={{ width: "32px", height: "32px" }}>
                      <i className="bi bi-person-fill"></i>
                    </div>
                    <h6 className="fw-800 m-0" style={{ color: "#112E24" }}>Basic Information</h6>
                  </div>

                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label fs-8 fw-700 text-dark mb-1">Flight Number</label>
                      <input type="text" className="form-control fs-7 fw-500 py-2 border-dark" placeholder="Enter flight no." defaultValue="EK201" />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fs-8 fw-700 text-dark mb-1">Airline</label>
                      <select className="form-select fs-7 fw-500 py-2 border-light text-dark shadow-none bg-white">
                        <option>Emirates</option>
                        <option>Qatar Airways</option>
                        <option>British Airways</option>
                      </select>
                    </div>
                    
                    <div className="col-12 col-md-6 mt-3">
                      <label className="form-label fs-8 fw-700 text-dark mb-1">Operating Carrier</label>
                      <select className="form-select fs-7 fw-500 py-2 border-light text-secondary shadow-none bg-white">
                        <option>Airline</option>
                        <option>Emirates</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-6 mt-3">
                      <label className="form-label fs-8 fw-700 text-dark mb-1">Departure Airport (Origin)</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-light text-secondary"><i className="bi bi-search"></i></span>
                        <input type="text" className="form-control fs-7 fw-500 py-2 border-light bg-light text-dark" placeholder="Search..." defaultValue="DXB" />
                        <span className="input-group-text bg-light border-light text-secondary fs-8 fw-600">IATA <i className="bi bi-chevron-down ms-1"></i></span>
                      </div>
                    </div>

                    <div className="col-12 col-md-6 mt-3">
                      <label className="form-label fs-8 fw-700 text-dark mb-1">Arrival Airport (Destination)</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-light text-secondary"><i className="bi bi-search"></i></span>
                        <input type="text" className="form-control fs-7 fw-500 py-2 border-light bg-light text-dark" placeholder="Search..." defaultValue="LHR" />
                        <span className="input-group-text bg-light border-light text-secondary fs-8 fw-600">IATA <i className="bi bi-chevron-down ms-1"></i></span>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mt-3">
                      <label className="form-label fs-8 fw-700 text-dark mb-1">Aircraft Type</label>
                      <select className="form-select fs-7 fw-500 py-2 border-light text-dark shadow-none bg-white">
                        <option>Boeing 777-300ER</option>
                        <option>Airbus A380</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-2 mb-4">
                    <div className="d-flex align-items-center justify-content-center rounded bg-success-subtle text-success" style={{ width: "32px", height: "32px" }}>
                      <i className="bi bi-briefcase-fill"></i>
                    </div>
                    <h6 className="fw-800 m-0" style={{ color: "#112E24" }}>Product & Class</h6>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label fs-8 fw-700 text-dark mb-2">Cabin Class</label>
                    <div className="d-flex flex-wrap gap-3">
                      <div className="form-check">
                        <input className="form-check-input border-dark bg-success" type="checkbox" defaultChecked id="classEconomy" />
                        <label className="form-check-label fs-8 fw-600" htmlFor="classEconomy">Economy</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input border-light" type="checkbox" id="classPremium" />
                        <label className="form-check-label fs-8 fw-600" htmlFor="classPremium">Premium Economy</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input border-dark bg-success" type="checkbox" defaultChecked id="classBusiness" />
                        <label className="form-check-label fs-8 fw-600" htmlFor="classBusiness">Business</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input border-light" type="checkbox" id="classFirst" />
                        <label className="form-check-label fs-8 fw-600" htmlFor="classFirst">First</label>
                      </div>
                    </div>
                  </div>

                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label fs-8 fw-700 text-dark mb-1">Booking Classes (RBD)</label>
                      <input type="text" className="form-control fs-7 fw-500 py-2 border-light text-dark bg-white" defaultValue="Y, J, F, N" />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fs-8 fw-700 text-dark mb-1">Seat Map Source</label>
                      <textarea className="form-control fs-7 fw-500 py-2 border-light text-dark bg-white" rows="2" defaultValue="Emirates GDS&#13;&#10;Sabre"></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-2 mb-4">
                    <div className="d-flex align-items-center justify-content-center rounded bg-success-subtle text-success" style={{ width: "32px", height: "32px" }}>
                      <i className="bi bi-credit-card-2-front-fill"></i>
                    </div>
                    <h6 className="fw-800 m-0" style={{ color: "#112E24" }}>Ticketing & Form of Payment</h6>
                  </div>

                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label fs-8 fw-700 text-dark mb-1">Ticketing Time Limits</label>
                      <select className="form-select fs-7 fw-500 py-2 border-light text-secondary shadow-none bg-white">
                        <option>Time</option>
                        <option>24 Hours</option>
                        <option>48 Hours</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fs-8 fw-700 text-dark mb-1">Forms of Payment Accepted</label>
                      <div className="d-flex gap-2 align-items-center border border-light rounded-3 px-2 py-2">
                        <span className="badge bg-light text-primary border border-primary-subtle px-2 py-1 fs-8 fw-700">VISA</span>
                        <span className="badge bg-light text-danger border border-danger-subtle px-2 py-1 fs-8 fw-700" style={{ color: "#EB4335" }}>MC</span>
                        <span className="badge bg-light text-info border border-info-subtle px-2 py-1 fs-8 fw-700">AMEX</span>
                        <i className="bi bi-chevron-down text-secondary ms-auto fs-9"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Middle Column */}
            <div className="col-12 col-xl-4 d-flex flex-column gap-4">
              
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-2 mb-4">
                    <div className="d-flex align-items-center justify-content-center rounded bg-success-subtle text-success" style={{ width: "32px", height: "32px" }}>
                      <i className="bi bi-calendar-event-fill"></i>
                    </div>
                    <h6 className="fw-800 m-0" style={{ color: "#112E24" }}>Schedule & Time</h6>
                  </div>

                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label fs-8 fw-700 text-dark mb-1">Departure Date</label>
                      <div className="position-relative">
                        <input type="text" className="form-control fs-7 fw-500 py-2 border-light text-dark bg-white" placeholder="Date picker" />
                        <i className="bi bi-calendar3 position-absolute top-50 end-0 translate-middle-y me-3 text-secondary"></i>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fs-8 fw-700 text-dark mb-1">Departure Time (Local)</label>
                      <select className="form-select fs-7 fw-500 py-2 border-light text-secondary shadow-none bg-white">
                        <option>Time</option>
                        <option>10:15</option>
                      </select>
                    </div>
                    
                    <div className="col-12 col-md-6 mt-4">
                      <label className="form-label fs-8 fw-700 text-dark mb-1">Arrival Date</label>
                      <div className="position-relative">
                        <input type="text" className="form-control fs-7 fw-500 py-2 border-light text-dark bg-white" placeholder="Date (late +1 day)" />
                        <i className="bi bi-calendar3 position-absolute top-50 end-0 translate-middle-y me-3 text-secondary"></i>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label className="form-label fs-8 fw-700 text-dark mb-1">Arrival Time (Local)</label>
                      <select className="form-select fs-7 fw-500 py-2 border-light text-secondary shadow-none bg-white">
                        <option>Time</option>
                        <option>14:20</option>
                      </select>
                    </div>

                    <div className="col-12 col-md-6 mt-4">
                      <label className="form-label fs-8 fw-700 text-dark mb-1">Number of Stops</label>
                      <select className="form-select fs-7 fw-500 py-2 border-light text-dark shadow-none bg-white">
                        <option>0, 1, 2+</option>
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm rounded-4" style={{ backgroundColor: "#FAFAFA", border: "1px solid #EFECE6 !important" }}>
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <i className="bi bi-arrow-left-right text-success fs-5"></i>
                    <h6 className="fw-800 m-0" style={{ color: "#112E24" }}>Stops & Transfer (Conditional)</h6>
                  </div>
                  <span className="text-secondary fs-8 fw-600 mb-4 d-block">Appears if Stops &gt; 0</span>

                  <div className="table-responsive">
                    <table className="table table-borderless align-middle mb-0">
                      <thead className="border-bottom border-light">
                        <tr className="fs-8 text-secondary">
                          <th className="fw-700 py-2 px-2 text-dark">Add Transfer Point</th>
                          <th className="fw-700 py-2 px-2 text-dark">Duration</th>
                          <th className="fw-700 py-2 px-2 text-dark">Airport Details</th>
                          <th className="py-2 px-2"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-bottom border-light">
                          <td className="py-3 px-2 fs-7 fw-600 text-secondary">Add Transfer Point</td>
                          <td className="py-3 px-2 fs-7 fw-600 text-secondary">-</td>
                          <td className="py-3 px-2 fs-7 fw-600 text-secondary">-</td>
                          <td className="py-3 px-2 text-end">
                            <i className="bi bi-pencil-fill text-dark me-2"></i>
                            <i className="bi bi-trash-fill text-dark"></i>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-2">
                <span className="fs-8 fw-700 text-secondary">Powered by <span className="text-dark">TRIVLO CRM</span></span>
              </div>

            </div>

            {/* Right Column */}
            <div className="col-12 col-xl-4 d-flex flex-column gap-4">
              
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-2 mb-4">
                    <div className="d-flex align-items-center justify-content-center rounded bg-success-subtle text-success" style={{ width: "32px", height: "32px", transform: "rotate(-45deg)" }}>
                      <i className="bi bi-tag-fill"></i>
                    </div>
                    <h6 className="fw-800 m-0" style={{ color: "#112E24" }}>Fares & Benefits</h6>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fs-8 fw-700 text-dark mb-1">Default Fare Summary (per adult)</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-light text-dark fw-600 fs-7 border-end-0">USD</span>
                      <input type="text" className="form-control fs-7 fw-500 py-2 border-light bg-light border-start-0" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fs-8 fw-700 text-dark mb-1">Fare Rules (Overview)</label>
                    <textarea className="form-control fs-7 fw-500 p-3 border-light text-secondary bg-white" rows="4" placeholder="Rich text or structured data field"></textarea>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fs-8 fw-700 text-dark mb-2">Fare Benefits</label>
                    <div className="d-flex flex-column gap-2">
                      <div className="form-check">
                        <input className="form-check-input border-dark bg-success" type="checkbox" defaultChecked id="benefitCheckedBag" />
                        <label className="form-check-label fs-8 fw-600 text-dark" htmlFor="benefitCheckedBag">Checked Baggage: 1x23kg</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input border-light" type="checkbox" id="benefitCabinBag" />
                        <label className="form-check-label fs-8 fw-600 text-secondary" htmlFor="benefitCabinBag">Cabin Baggage: 7kg</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input border-light" type="checkbox" id="benefitMeals" />
                        <label className="form-check-label fs-8 fw-600 text-secondary" htmlFor="benefitMeals">Meals Included</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input border-light" type="checkbox" id="benefitSeat" />
                        <label className="form-check-label fs-8 fw-600 text-secondary" htmlFor="benefitSeat">Seat Selection</label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-2">
                    <label className="form-label fs-8 fw-700 text-dark mb-1">Important Notes</label>
                    <textarea className="form-control fs-7 fw-500 p-3 border-light text-secondary bg-white" rows="3" placeholder="Rich text ir structured field"></textarea>
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
