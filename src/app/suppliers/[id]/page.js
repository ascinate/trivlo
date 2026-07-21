"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const OverviewTab = () => {
  return (
    <div className="d-flex flex-column gap-4 mt-4">
      {/* Supplier Performance Summary */}
      <div className="section-card border border-light p-4 bg-white">
        <h3 className="section-card-title fs-6 fw-800 mb-4 m-0">Supplier Performance Summary</h3>
        <div className="row g-3 row-cols-2 row-cols-md-4">
          <div className="col">
            <div className="d-flex flex-column gap-2 p-3 bg-light-subtle rounded-3 border border-light">
              <span className="text-secondary fw-600 fs-8">Bookings (Last 12 Mos)</span>
              <div className="d-flex align-items-center gap-2">
                <span className="fs-4 fw-800 text-dark">1,245</span>
                <span className="text-success fw-700 fs-9 d-flex align-items-center"><i className="bi bi-arrow-up-short"></i>12%</span>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="d-flex flex-column gap-2 p-3 bg-light-subtle rounded-3 border border-light">
              <span className="text-secondary fw-600 fs-8">Total Spend (Last 12 Mos)</span>
              <div className="d-flex align-items-center gap-2">
                <span className="fs-4 fw-800 text-dark">$1.5M</span>
                <span className="text-success fw-700 fs-9 d-flex align-items-center"><i className="bi bi-arrow-up-short"></i>8%</span>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="d-flex flex-column gap-2 p-3 bg-light-subtle rounded-3 border border-light">
              <span className="text-secondary fw-600 fs-8">Response Time (Avg)</span>
              <div className="d-flex align-items-center gap-2">
                <span className="fs-4 fw-800 text-dark">2.4 Hrs</span>
                <span className="text-success fw-700 fs-9 d-flex align-items-center"><i className="bi bi-arrow-down-short"></i>15%</span>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="d-flex flex-column gap-2 p-3 bg-light-subtle rounded-3 border border-light">
              <span className="text-secondary fw-600 fs-8">Contract Compliance</span>
              <div className="d-flex align-items-center gap-2">
                <span className="fs-4 fw-800 text-dark">98%</span>
                <span className="text-secondary fw-700 fs-9 d-flex align-items-center">—</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 align-items-start">
        {/* Left Column */}
        <div className="col-12 col-xl-7 d-flex flex-column gap-4">

          {/* Active Contracts (Quick View) */}
          <div className="section-card border border-light p-0 bg-white overflow-hidden">
            <div className="p-4 border-bottom border-light d-flex justify-content-between align-items-center">
              <h3 className="fs-6 fw-800 m-0 text-dark">Active Contracts (Quick View)</h3>
              <a href="#" className="text-primary text-decoration-none fs-8 fw-600">View All Contracts</a>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0" style={{ fontSize: "0.85rem" }}>
                <thead className="bg-light text-secondary">
                  <tr>
                    <th className="fw-500 py-3 ps-4 border-0 text-nowrap" style={{ color: "#8C9C95" }}>Contract Name</th>
                    <th className="fw-500 py-3 border-0 text-nowrap" style={{ color: "#8C9C95" }}>Valid Until</th>
                    <th className="fw-500 py-3 border-0 text-nowrap" style={{ color: "#8C9C95" }}>Value</th>
                    <th className="fw-500 py-3 pe-4 border-0 text-nowrap text-end" style={{ color: "#8C9C95" }}>Status</th>
                  </tr>
                </thead>
                <tbody className="border-top-0">
                  <tr className="border-bottom border-light">
                    <td className="ps-4 py-3 fw-700 text-dark">Global B2B Agreement</td>
                    <td className="py-3 text-secondary fw-500">31 Dec 2026</td>
                    <td className="py-3 text-dark fw-600">$500K</td>
                    <td className="pe-4 py-3 text-end">
                      <span className="badge rounded-2 fw-700 px-2 py-1" style={{ backgroundColor: "#E9F4EE", color: "#1E6C45", fontSize: "0.65rem" }}>Active</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="ps-4 py-3 fw-700 text-dark">API Integration SLA</td>
                    <td className="py-3 text-secondary fw-500">14 Mar 2025</td>
                    <td className="py-3 text-dark fw-600">$100K</td>
                    <td className="pe-4 py-3 text-end">
                      <span className="badge rounded-2 fw-700 px-2 py-1" style={{ backgroundColor: "#E9F4EE", color: "#1E6C45", fontSize: "0.65rem" }}>Active</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-12 col-md-6">
              {/* Supplier Risk Score */}
              <div className="section-card border border-light p-4 bg-white h-100 d-flex flex-column align-items-center text-center">
                <h3 className="section-card-title fs-6 fw-800 mb-4 m-0 w-100 text-start">Supplier Risk Score</h3>
                <div className="position-relative mt-2" style={{ width: "160px", height: "80px", overflow: "hidden" }}>
                  <svg viewBox="0 0 100 50" style={{ width: "100%", height: "200%" }}>
                    <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#EFECE6" strokeWidth="12" strokeLinecap="round" />
                    <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#0F9D58" strokeWidth="12" strokeDasharray="125" strokeDashoffset="25" strokeLinecap="round" />
                  </svg>
                  <div className="position-absolute w-100 text-center" style={{ bottom: "0" }}>
                    <span className="fs-3 fw-800 text-dark d-block" style={{ lineHeight: "1" }}>85</span>
                    <span className="text-secondary fw-600" style={{ fontSize: "0.7rem" }}>Low Risk</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-top border-light w-100 fs-8">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-secondary fw-600">Financial</span>
                    <span className="text-success fw-700">Stable</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-secondary fw-600">Operational</span>
                    <span className="text-success fw-700">Low Risk</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              {/* Key Services & Routes */}
              <div className="section-card border border-light p-4 bg-white h-100">
                <h3 className="section-card-title fs-6 fw-800 mb-4 m-0">Key Services & Routes</h3>
                <div className="d-flex flex-wrap gap-2">
                  <span className="badge bg-light-subtle text-dark border border-light fw-600 px-3 py-2 fs-8">Middle East Flights</span>
                  <span className="badge bg-light-subtle text-dark border border-light fw-600 px-3 py-2 fs-8">European Connections</span>
                  <span className="badge bg-light-subtle text-dark border border-light fw-600 px-3 py-2 fs-8">First Class Travel</span>
                  <span className="badge bg-light-subtle text-dark border border-light fw-600 px-3 py-2 fs-8">Cargo Services</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="col-12 col-xl-5 d-flex flex-column gap-4">

          {/* Supplier Profile Completeness */}
          <div className="section-card border border-light p-4 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h3 className="section-card-title fs-6 fw-800 m-0">Profile Completeness</h3>
              <span className="text-success fw-800 fs-6">92%</span>
            </div>
            <div className="progress bg-light-subtle mb-3" style={{ height: "8px" }}>
              <div className="progress-bar bg-success rounded-pill" role="progressbar" style={{ width: "92%" }} aria-valuenow="92" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <span className="text-secondary fw-600 fs-8 d-block"><i className="bi bi-exclamation-circle text-warning me-1"></i> Missing: 1 Document (Tax Certificate)</span>
          </div>

          {/* Supplier News & Updates */}
          <div className="section-card border border-light p-4 bg-white">
            <h3 className="section-card-title fs-6 fw-800 mb-4 m-0">Supplier News & Updates</h3>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex flex-column gap-1 border-bottom border-light pb-3">
                <span className="text-dark fw-700 fs-8">Emirates announces new route to Bogota.</span>
                <span className="text-secondary fs-9 fw-600">Today</span>
              </div>
              <div className="d-flex flex-column gap-1 border-bottom border-light pb-3">
                <span className="text-dark fw-700 fs-8">Updated Baggage Policy for Business Class.</span>
                <span className="text-secondary fs-9 fw-600">2 days ago</span>
              </div>
              <div className="d-flex flex-column gap-1">
                <span className="text-dark fw-700 fs-8">Awarded World&apos;s Best Airline 2024.</span>
                <span className="text-secondary fs-9 fw-600">Last week</span>
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-12 col-sm-6">
              {/* Key Contact Persons */}
              <div className="section-card border border-light p-4 bg-white h-100">
                <h3 className="section-card-title fs-6 fw-800 mb-3 m-0">Key Contact Persons</h3>
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex align-items-center gap-2">
                    <div className="d-flex align-items-center justify-content-center rounded-circle text-white fw-700 fs-9 shadow-sm" style={{ width: "32px", height: "32px", backgroundColor: "#2B73F6" }}>MJ</div>
                    <div className="d-flex flex-column">
                      <span className="fw-700 text-dark fs-8">Mark Johnson</span>
                      <span className="text-secondary" style={{ fontSize: "0.65rem" }}>Sales Manager</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <div className="d-flex align-items-center justify-content-center rounded-circle text-white fw-700 fs-9 shadow-sm" style={{ width: "32px", height: "32px", backgroundColor: "#8E44AD" }}>SM</div>
                    <div className="d-flex flex-column">
                      <span className="fw-700 text-dark fs-8">Sarah Miller</span>
                      <span className="text-secondary" style={{ fontSize: "0.65rem" }}>Finance Head</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6">
              {/* Key Account Managers */}
              <div className="section-card border border-light p-4 bg-white h-100">
                <h3 className="section-card-title fs-6 fw-800 mb-3 m-0">Key Account Managers</h3>
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex align-items-center gap-2">
                    <div className="d-flex align-items-center justify-content-center rounded-circle text-white fw-700 fs-9 shadow-sm" style={{ width: "32px", height: "32px", backgroundColor: "#112E24" }}>AL</div>
                    <div className="d-flex flex-column">
                      <span className="fw-700 text-dark fs-8">Alex Lee</span>
                      <span className="text-secondary" style={{ fontSize: "0.65rem" }}>Internal Procurement</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const ContactDetailsTab = () => {
  return (
    <div className="row g-4 mt-0 align-items-start">
      {/* Left Column */}
      <div className="col-12 col-xl-7 d-flex flex-column gap-4">

        {/* Primary Contact Information */}
        <div className="section-card border border-light p-4 bg-white">
          <div className="d-flex justify-content-between align-items-start mb-4">
            <h3 className="section-card-title fs-6 fw-800 m-0">Primary Contact Information</h3>
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-outline-secondary bg-white border-light rounded-3 px-3 fw-600 d-flex align-items-center gap-2 text-dark shadow-sm">
                <i className="bi bi-pencil"></i>
                <span>Edit</span>
              </button>
              <button className="btn btn-sm btn-outline-secondary bg-white border-light rounded-3 px-3 fw-600 d-flex align-items-center gap-2 text-dark shadow-sm">
                <i className="bi bi-chat-text"></i>
                <span>Send Message</span>
              </button>
            </div>
          </div>

          <div className="d-flex flex-column flex-md-row gap-4 align-items-center align-items-md-start mb-4 pb-4 border-bottom border-light">
            <div className="position-relative">
              <div className="d-flex align-items-center justify-content-center rounded-circle text-white fw-700 fs-1 shadow-sm" style={{ width: "80px", height: "80px", backgroundColor: "#2B73F6" }}>
                MJ
              </div>
              <div className="position-absolute bg-success border border-white border-2 rounded-circle" style={{ width: "20px", height: "20px", bottom: "2px", right: "2px" }}></div>
            </div>
            <div className="d-flex flex-column align-items-center align-items-md-start">
              <h4 className="fw-800 text-dark fs-5 m-0 mb-1">Mark Johnson</h4>
              <span className="text-secondary fw-500 fs-7 mb-2">Sales Manager</span>
              <span className="badge rounded-2 fw-600 px-2 py-1" style={{ backgroundColor: "#EAF2FF", color: "#2B73F6", fontSize: "0.7rem" }}>Key Account Manager</span>
            </div>
          </div>

          <div className="row g-3 fs-8">
            <div className="col-12 col-md-6 d-flex flex-column gap-3">
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center justify-content-center bg-light-subtle rounded-3 text-secondary" style={{ width: "36px", height: "36px" }}>
                  <i className="bi bi-envelope"></i>
                </div>
                <div className="d-flex flex-column">
                  <span className="text-secondary fw-600 fs-9">Email</span>
                  <a href="mailto:mark.j@emirates.com" className="fw-700 text-dark text-decoration-none">mark.j@emirates.com</a>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center justify-content-center bg-light-subtle rounded-3 text-secondary" style={{ width: "36px", height: "36px" }}>
                  <i className="bi bi-telephone"></i>
                </div>
                <div className="d-flex flex-column">
                  <span className="text-secondary fw-600 fs-9">Direct Line</span>
                  <span className="fw-700 text-dark">+971 4 309 1111</span>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 d-flex flex-column gap-3">
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center justify-content-center bg-light-subtle rounded-3 text-secondary" style={{ width: "36px", height: "36px" }}>
                  <i className="bi bi-phone"></i>
                </div>
                <div className="d-flex flex-column">
                  <span className="text-secondary fw-600 fs-9">Mobile</span>
                  <span className="fw-700 text-dark">+971 50 123 4567</span>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center justify-content-center bg-light-subtle rounded-3 text-secondary" style={{ width: "36px", height: "36px" }}>
                  <i className="bi bi-geo-alt"></i>
                </div>
                <div className="d-flex flex-column">
                  <span className="text-secondary fw-600 fs-9">Location</span>
                  <span className="fw-700 text-dark">Dubai, UAE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Contact Details */}
        <div className="section-card border border-light p-4 bg-white">
          <h3 className="section-card-title fs-6 fw-800 mb-4">Other Contact Details</h3>
          <div className="row g-4 fs-8">
            <div className="col-12 col-md-6 d-flex flex-column gap-3">
              <div className="d-flex flex-column">
                <span className="text-secondary fw-600 mb-1">Head Office</span>
                <span className="text-dark fw-600">Dubai International Airport, Terminal 3, P.O. Box 686, Dubai</span>
              </div>
              <div className="d-flex flex-column">
                <span className="text-secondary fw-600 mb-1">Alternate Email</span>
                <span className="text-primary fw-600">sales.support@emirates.com</span>
              </div>
            </div>
            <div className="col-12 col-md-6 d-flex flex-column gap-3">
              <div className="d-flex flex-column">
                <span className="text-secondary fw-600 mb-1">Working Hours</span>
                <span className="text-dark fw-600">Mon-Fri, 9:00 AM - 6:00 PM (GST)</span>
              </div>
              <div className="d-flex flex-column">
                <span className="text-secondary fw-600 mb-1">Timezone</span>
                <span className="text-dark fw-600">Asia/Dubai (GST, UTC+4)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact History */}
        <div className="section-card border border-light p-4 bg-white">
          <h3 className="section-card-title fs-6 fw-800 mb-4">Contact History</h3>
          <div className="d-flex flex-column position-relative ps-3 border-start border-light" style={{ marginLeft: "12px" }}>

            <div className="position-relative pb-4">
              <div className="position-absolute bg-white border border-primary rounded-circle" style={{ width: "12px", height: "12px", left: "-23px", top: "4px" }}></div>
              <div className="d-flex flex-column gap-1">
                <span className="text-dark fw-700 fs-8">Sent Annual Contract Renewal PDF</span>
                <span className="text-secondary fs-9 fw-600">Today, 10:30 AM</span>
              </div>
            </div>

            <div className="position-relative pb-4">
              <div className="position-absolute bg-white border border-light rounded-circle" style={{ width: "12px", height: "12px", left: "-23px", top: "4px" }}></div>
              <div className="d-flex flex-column gap-1">
                <span className="text-dark fw-700 fs-8">Called regarding API rate limits</span>
                <span className="text-secondary fs-9 fw-600">15 May 2025, 02:15 PM</span>
              </div>
            </div>

            <div className="position-relative">
              <div className="position-absolute bg-white border border-light rounded-circle" style={{ width: "12px", height: "12px", left: "-23px", top: "4px" }}></div>
              <div className="d-flex flex-column gap-1">
                <span className="text-dark fw-700 fs-8">Met at Arabian Travel Market (ATM Dubai)</span>
                <span className="text-secondary fs-9 fw-600">08 May 2025</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="col-12 col-xl-5 d-flex flex-column gap-4">

        {/* All Contacts Table */}
        <div className="section-card border border-light p-0 bg-white overflow-hidden">
          <div className="p-4 border-bottom border-light d-flex justify-content-between align-items-center">
            <h3 className="fs-6 fw-800 m-0 text-dark">All Contacts</h3>
            <button className="btn btn-sm btn-outline-success bg-white border-light rounded-3 px-3 fw-600 d-flex align-items-center gap-2 text-success shadow-sm">
              <i className="bi bi-plus-lg"></i>
              <span>Add Contact</span>
            </button>
          </div>

          <div className="p-3 border-bottom border-light bg-light-subtle">
            <div className="position-relative">
              <i className="bi bi-search position-absolute text-secondary" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", fontSize: "0.85rem" }}></i>
              <input type="text" className="form-control border-light bg-white rounded-3 shadow-sm" placeholder="Search contacts..." style={{ paddingLeft: "2.5rem", fontSize: "0.85rem" }} />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0" style={{ fontSize: "0.8rem" }}>
              <thead className="bg-light text-secondary">
                <tr>
                  <th className="fw-500 py-3 ps-4 border-0" style={{ color: "#8C9C95" }}>Name / Role</th>
                  <th className="fw-500 py-3 border-0" style={{ color: "#8C9C95" }}>Contact</th>
                  <th className="fw-500 py-3 border-0 text-center" style={{ color: "#8C9C95" }}>Status</th>
                  <th className="fw-500 py-3 pe-4 border-0 text-center" style={{ color: "#8C9C95" }}>Action</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                <tr className="border-bottom border-light">
                  <td className="ps-4 py-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="d-flex align-items-center justify-content-center rounded-circle text-white fw-700 fs-9 shadow-sm" style={{ width: "32px", height: "32px", backgroundColor: "#2B73F6" }}>MJ</div>
                      <div className="d-flex flex-column">
                        <span className="fw-700 text-dark">Mark Johnson</span>
                        <span className="text-secondary fs-9">Sales Manager</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="d-flex flex-column gap-1">
                      <span className="text-dark fw-600">mark.j@emirates.com</span>
                      <span className="text-secondary">+971 4 309 1111</span>
                    </div>
                  </td>
                  <td className="py-3 text-center">
                    <span className="badge rounded-2 fw-700 px-2 py-1" style={{ backgroundColor: "#EAF2FF", color: "#2B73F6", fontSize: "0.6rem" }}>Primary</span>
                  </td>
                  <td className="pe-4 py-3 text-center">
                    <button className="btn btn-sm btn-light bg-transparent border-light shadow-sm text-secondary" style={{ width: "24px", height: "24px", padding: 0 }}><i className="bi bi-three-dots"></i></button>
                  </td>
                </tr>

                <tr className="border-bottom border-light">
                  <td className="ps-4 py-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="d-flex align-items-center justify-content-center rounded-circle text-white fw-700 fs-9 shadow-sm" style={{ width: "32px", height: "32px", backgroundColor: "#8E44AD" }}>SM</div>
                      <div className="d-flex flex-column">
                        <span className="fw-700 text-dark">Sarah Miller</span>
                        <span className="text-secondary fs-9">Finance Head</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="d-flex flex-column gap-1">
                      <span className="text-dark fw-600">sarah.m@emirates.com</span>
                      <span className="text-secondary">+971 4 309 1122</span>
                    </div>
                  </td>
                  <td className="py-3 text-center">
                    <span className="badge rounded-2 fw-700 px-2 py-1" style={{ backgroundColor: "#E9F4EE", color: "#1E6C45", fontSize: "0.6rem" }}>Active</span>
                  </td>
                  <td className="pe-4 py-3 text-center">
                    <button className="btn btn-sm btn-light bg-transparent border-light shadow-sm text-secondary" style={{ width: "24px", height: "24px", padding: 0 }}><i className="bi bi-three-dots"></i></button>
                  </td>
                </tr>

                <tr className="border-bottom border-light">
                  <td className="ps-4 py-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="d-flex align-items-center justify-content-center rounded-circle text-white fw-700 fs-9 shadow-sm" style={{ width: "32px", height: "32px", backgroundColor: "#D36C45" }}>DA</div>
                      <div className="d-flex flex-column">
                        <span className="fw-700 text-dark">David Allen</span>
                        <span className="text-secondary fs-9">Tech Support</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="d-flex flex-column gap-1">
                      <span className="text-dark fw-600">david.a@emirates.com</span>
                      <span className="text-secondary">+971 4 309 1133</span>
                    </div>
                  </td>
                  <td className="py-3 text-center">
                    <span className="badge rounded-2 fw-700 px-2 py-1" style={{ backgroundColor: "#E9F4EE", color: "#1E6C45", fontSize: "0.6rem" }}>Active</span>
                  </td>
                  <td className="pe-4 py-3 text-center">
                    <button className="btn btn-sm btn-light bg-transparent border-light shadow-sm text-secondary" style={{ width: "24px", height: "24px", padding: 0 }}><i className="bi bi-three-dots"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Contact Summary */}
        <div className="section-card border border-light p-4 bg-white">
          <h3 className="section-card-title mb-4 fs-6 fw-800">Contact Summary</h3>
          <div className="d-flex flex-column gap-3 fs-8 fw-600">
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-dark">Total Contacts</span>
              <span className="text-dark fw-800">5</span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-dark">Primary Contacts</span>
              <span className="text-primary fw-800">1</span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-dark">Escalation Contacts</span>
              <span className="text-warning fw-800">2</span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-dark">Last Contacted</span>
              <span className="text-dark fw-800">Today, 10:30 AM</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="section-card border border-light p-4 bg-white">
          <h3 className="section-card-title mb-4 fs-6 fw-800">Quick Actions</h3>
          <div className="d-flex flex-column gap-2 fs-8 fw-600 text-dark">
            <a href="#" className="d-flex align-items-center justify-content-between text-decoration-none text-dark py-1">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-envelope text-secondary fs-6"></i>
                <span>Send Email to All Contacts</span>
              </div>
              <i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.7rem" }}></i>
            </a>
            <a href="#" className="d-flex align-items-center justify-content-between text-decoration-none text-dark py-1">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-calendar-event text-secondary fs-6"></i>
                <span>Schedule Meeting</span>
              </div>
              <i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.7rem" }}></i>
            </a>
            <a href="#" className="d-flex align-items-center justify-content-between text-decoration-none text-dark py-1">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-exclamation-triangle text-secondary fs-6"></i>
                <span>Update Escalation Matrix</span>
              </div>
              <i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.7rem" }}></i>
            </a>
            <a href="#" className="d-flex align-items-center justify-content-between text-decoration-none text-dark py-1">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-download text-secondary fs-6"></i>
                <span>Download Contact List</span>
              </div>
              <i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.7rem" }}></i>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

const ContractsTab = () => {
  return (
    <div className="d-flex flex-column gap-4 mt-0">
      {/* Contracts Table Card */}
      <div className="section-card border border-light p-0 bg-white overflow-hidden">
        <div className="p-4 border-bottom border-light d-flex justify-content-between align-items-center">
          <div>
            <h3 className="fs-6 fw-800 m-0 text-dark">Contracts</h3>
            <span className="text-secondary fs-8">Manage all contracts and agreements.</span>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-outline-success bg-white border-light rounded-3 px-3 fw-600 d-flex align-items-center gap-2 text-success shadow-sm">
              <i className="bi bi-plus-lg"></i>
              <span>Add Contract</span>
            </button>
            <button className="btn btn-sm btn-outline-secondary bg-white border-light rounded-3 px-3 fw-600 d-flex align-items-center gap-2 text-dark shadow-sm">
              <i className="bi bi-download"></i>
              <span>Export</span>
              <i className="bi bi-chevron-down ms-1" style={{ fontSize: "0.6rem" }}></i>
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: "0.85rem" }}>
            <thead className="bg-light text-secondary">
              <tr>
                <th className="fw-500 py-3 ps-4 border-0 text-nowrap" style={{ color: "#8C9C95" }}>Contract ID</th>
                <th className="fw-500 py-3 border-0 text-nowrap" style={{ color: "#8C9C95" }}>Agreement Type</th>
                <th className="fw-500 py-3 border-0 text-nowrap" style={{ color: "#8C9C95" }}>Contract Name</th>
                <th className="fw-500 py-3 border-0 text-nowrap" style={{ color: "#8C9C95" }}>Valid From</th>
                <th className="fw-500 py-3 border-0 text-nowrap" style={{ color: "#8C9C95" }}>Valid To</th>
                <th className="fw-500 py-3 border-0 text-nowrap" style={{ color: "#8C9C95" }}>Commission / Markup</th>
                <th className="fw-500 py-3 border-0 text-nowrap" style={{ color: "#8C9C95" }}>Credit Limit</th>
                <th className="fw-500 py-3 border-0 text-nowrap" style={{ color: "#8C9C95" }}>Payment Terms</th>
                <th className="fw-500 py-3 border-0 text-nowrap" style={{ color: "#8C9C95" }}>Status</th>
                <th className="fw-500 py-3 pe-4 border-0 text-center" style={{ color: "#8C9C95" }}>Actions</th>
              </tr>
            </thead>
            <tbody className="border-top-0">
              {/* Row 1 */}
              <tr className="border-bottom border-light">
                <td className="ps-4 py-3"><span className="fw-700 text-dark">CTR-001</span></td>
                <td className="py-3 text-secondary fw-500">Master Agreement</td>
                <td className="py-3 fw-700 text-dark">Emirates Global B2B Agreement</td>
                <td className="py-3 text-secondary fw-500">01 Jan 2024</td>
                <td className="py-3 text-secondary fw-500">31 Dec 2026</td>
                <td className="py-3 text-dark fw-600">12% Comm.</td>
                <td className="py-3 text-dark fw-600">$500,000</td>
                <td className="py-3 text-secondary fw-500">Net 30</td>
                <td className="py-3">
                  <span className="badge rounded-2 fw-700 px-2 py-1" style={{ backgroundColor: "#E9F4EE", color: "#1E6C45", fontSize: "0.65rem" }}>Active</span>
                </td>
                <td className="pe-4 py-3 text-center">
                  <div className="d-flex justify-content-center gap-1">
                    <button className="btn btn-sm btn-light bg-transparent border-light shadow-sm text-secondary" style={{ width: "28px", height: "28px", padding: 0 }}>
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn btn-sm btn-light bg-transparent border-light shadow-sm text-secondary" style={{ width: "28px", height: "28px", padding: 0 }}>
                      <i className="bi bi-three-dots"></i>
                    </button>
                  </div>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="border-bottom border-light">
                <td className="ps-4 py-3"><span className="fw-700 text-dark">CTR-002</span></td>
                <td className="py-3 text-secondary fw-500">Service Level Agreement</td>
                <td className="py-3 fw-700 text-dark">API Integration SLA</td>
                <td className="py-3 text-secondary fw-500">15 Mar 2024</td>
                <td className="py-3 text-secondary fw-500">14 Mar 2025</td>
                <td className="py-3 text-dark fw-600">10% Comm.</td>
                <td className="py-3 text-dark fw-600">$100,000</td>
                <td className="py-3 text-secondary fw-500">Net 15</td>
                <td className="py-3">
                  <span className="badge rounded-2 fw-700 px-2 py-1" style={{ backgroundColor: "#E9F4EE", color: "#1E6C45", fontSize: "0.65rem" }}>Active</span>
                </td>
                <td className="pe-4 py-3 text-center">
                  <div className="d-flex justify-content-center gap-1">
                    <button className="btn btn-sm btn-light bg-transparent border-light shadow-sm text-secondary" style={{ width: "28px", height: "28px", padding: 0 }}>
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn btn-sm btn-light bg-transparent border-light shadow-sm text-secondary" style={{ width: "28px", height: "28px", padding: 0 }}>
                      <i className="bi bi-three-dots"></i>
                    </button>
                  </div>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="border-bottom border-light">
                <td className="ps-4 py-3"><span className="fw-700 text-dark">CTR-003</span></td>
                <td className="py-3 text-secondary fw-500">Special Fare Agreement</td>
                <td className="py-3 fw-700 text-dark">Hajj & Umrah Special Fares</td>
                <td className="py-3 text-secondary fw-500">01 Aug 2024</td>
                <td className="py-3 text-secondary fw-500">31 Jul 2025</td>
                <td className="py-3 text-dark fw-600">$50 Markup</td>
                <td className="py-3 text-dark fw-600">$250,000</td>
                <td className="py-3 text-secondary fw-500">Prepaid</td>
                <td className="py-3">
                  <span className="badge rounded-2 fw-700 px-2 py-1" style={{ backgroundColor: "#FEF7ED", color: "#B97C2B", fontSize: "0.65rem" }}>Pending</span>
                </td>
                <td className="pe-4 py-3 text-center">
                  <div className="d-flex justify-content-center gap-1">
                    <button className="btn btn-sm btn-light bg-transparent border-light shadow-sm text-secondary" style={{ width: "28px", height: "28px", padding: 0 }}>
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn btn-sm btn-light bg-transparent border-light shadow-sm text-secondary" style={{ width: "28px", height: "28px", padding: 0 }}>
                      <i className="bi bi-three-dots"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-3 border-top border-light d-flex justify-content-between align-items-center bg-white text-secondary" style={{ fontSize: "0.85rem" }}>
          <span>Showing 1 to 3 of 3 contracts</span>
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex gap-1">
              <button className="btn btn-sm btn-outline-secondary border-0 text-secondary"><i className="bi bi-chevron-left"></i></button>
              <button className="btn btn-sm rounded-2 fw-600 text-white" style={{ backgroundColor: "#112E24", width: "28px", height: "28px", padding: 0 }}>1</button>
              <button className="btn btn-sm btn-outline-secondary border-0 text-secondary"><i className="bi bi-chevron-right"></i></button>
            </div>
            <select className="form-select form-select-sm border-light bg-light-subtle rounded-3 text-secondary fw-500 shadow-sm" style={{ width: "100px", backgroundColor: "#FCFAF6" }}>
              <option>10 / page</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row g-4 align-items-start">
        {/* Left Column */}
        <div className="col-12 col-xl-7 d-flex flex-column gap-4">
          {/* Contract Details */}
          <div className="section-card border border-light p-4 bg-white">
            <div className="d-flex justify-content-between align-items-start mb-4">
              <h3 className="section-card-title fs-6 fw-800 m-0">Contract Details</h3>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-outline-secondary bg-white border-light rounded-3 px-3 fw-600 d-flex align-items-center gap-2 text-dark shadow-sm">
                  <i className="bi bi-pencil"></i>
                  <span>Edit</span>
                </button>
                <button className="btn btn-sm btn-outline-secondary bg-white border-light rounded-3 px-3 fw-600 d-flex align-items-center gap-2 text-dark shadow-sm">
                  <i className="bi bi-arrow-repeat"></i>
                  <span>Renew</span>
                </button>
              </div>
            </div>

            <div className="row g-3 fs-8">
              <div className="col-12 col-md-6 d-flex flex-column gap-3">
                <div className="d-flex justify-content-between">
                  <span className="text-secondary fw-600" style={{ width: "130px" }}>Agreement Type</span>
                  <span className="text-dark fw-600 flex-grow-1">Master Agreement</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary fw-600" style={{ width: "130px" }}>Contract Name</span>
                  <span className="text-dark fw-600 flex-grow-1">Emirates Global B2B Agreement</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary fw-600" style={{ width: "130px" }}>Valid From</span>
                  <span className="text-dark fw-600 flex-grow-1">01 Jan 2024</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary fw-600" style={{ width: "130px" }}>Valid To</span>
                  <span className="text-dark fw-600 flex-grow-1 d-flex flex-column">
                    <span>31 Dec 2026</span>
                    <span className="text-secondary fs-9">(2 years, 7 months remaining)</span>
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary fw-600" style={{ width: "130px" }}>Commission / Markup</span>
                  <span className="text-dark fw-600 flex-grow-1">12% Base Commission + 2% Override</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary fw-600" style={{ width: "130px" }}>Credit Limit</span>
                  <span className="text-dark fw-600 flex-grow-1">$500,000 USD</span>
                </div>
              </div>

              <div className="col-12 col-md-6 d-flex flex-column gap-3">
                <div className="d-flex justify-content-between">
                  <span className="text-secondary fw-600" style={{ width: "130px" }}>Payment Terms</span>
                  <span className="text-dark fw-600 flex-grow-1">Net 30 Days</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary fw-600" style={{ width: "130px" }}>Invoicing Cycle</span>
                  <span className="text-dark fw-600 flex-grow-1">Monthly</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary fw-600" style={{ width: "130px" }}>Auto Renew</span>
                  <span className="text-dark fw-600 flex-grow-1">Yes</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary fw-600" style={{ width: "130px" }}>Notice Period</span>
                  <span className="text-dark fw-600 flex-grow-1">90 Days</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary fw-600" style={{ width: "130px" }}>Point of Contact</span>
                  <span className="text-primary fw-600 flex-grow-1">Mark Johnson (Sales Director)</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary fw-600" style={{ width: "130px" }}>Contract Owner</span>
                  <span className="text-primary fw-600 flex-grow-1">Sarah Miller (Procurement Head)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contract Documents */}
          <div className="section-card border border-light p-4 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="section-card-title fs-6 fw-800 m-0">Contract Documents</h3>
              <a href="#" className="section-card-link text-primary fs-8 fw-600 text-decoration-none">Upload New</a>
            </div>

            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-between align-items-center p-3 border border-light rounded-3 bg-light-subtle">
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center justify-content-center bg-white rounded-3 shadow-sm border border-light" style={{ width: "40px", height: "40px", color: "#DC3545" }}>
                    <i className="bi bi-file-earmark-pdf-fill fs-5"></i>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="fw-700 text-dark fs-8">B2B_Master_Agreement_2024.pdf</span>
                    <span className="text-secondary fs-9 fw-500">Signed • 2.4 MB</span>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-light bg-white border-light shadow-sm text-secondary" style={{ width: "28px", height: "28px", padding: 0 }}><i className="bi bi-eye"></i></button>
                  <button className="btn btn-sm btn-light bg-white border-light shadow-sm text-secondary" style={{ width: "28px", height: "28px", padding: 0 }}><i className="bi bi-download"></i></button>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center p-3 border border-light rounded-3 bg-light-subtle">
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center justify-content-center bg-white rounded-3 shadow-sm border border-light" style={{ width: "40px", height: "40px", color: "#DC3545" }}>
                    <i className="bi bi-file-earmark-pdf-fill fs-5"></i>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="fw-700 text-dark fs-8">Commercial_Terms_Annexure_A.pdf</span>
                    <span className="text-secondary fs-9 fw-500">Approved • 1.1 MB</span>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-light bg-white border-light shadow-sm text-secondary" style={{ width: "28px", height: "28px", padding: 0 }}><i className="bi bi-eye"></i></button>
                  <button className="btn btn-sm btn-light bg-white border-light shadow-sm text-secondary" style={{ width: "28px", height: "28px", padding: 0 }}><i className="bi bi-download"></i></button>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center p-3 border border-light rounded-3 bg-light-subtle">
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center justify-content-center bg-white rounded-3 shadow-sm border border-light" style={{ width: "40px", height: "40px", color: "#DC3545" }}>
                    <i className="bi bi-file-earmark-pdf-fill fs-5"></i>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="fw-700 text-dark fs-8">API_Technical_Specs.pdf</span>
                    <span className="text-secondary fs-9 fw-500">Draft • 3.5 MB</span>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-light bg-white border-light shadow-sm text-secondary" style={{ width: "28px", height: "28px", padding: 0 }}><i className="bi bi-eye"></i></button>
                  <button className="btn btn-sm btn-light bg-white border-light shadow-sm text-secondary" style={{ width: "28px", height: "28px", padding: 0 }}><i className="bi bi-download"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-12 col-xl-5 d-flex flex-column gap-4">

          {/* Contract Summary */}
          <div className="section-card border border-light p-4 bg-white">
            <h3 className="section-card-title mb-4 fs-6 fw-800">Contract Summary</h3>
            <div className="d-flex flex-column gap-3 fs-8 fw-600">
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-dark">Total Contracts</span>
                <span className="text-dark fw-800">3</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-dark">Active</span>
                <span className="text-success fw-800">2</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-dark">Pending</span>
                <span className="text-warning fw-800">1</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-dark">Expiring Soon ({"<"} 90 Days)</span>
                <span className="text-dark fw-800">0</span>
              </div>
            </div>

            <button className="btn btn-outline-secondary bg-white border-light rounded-3 w-100 mt-4 py-2 fw-600 d-flex align-items-center justify-content-center gap-2 text-dark shadow-sm fs-8">
              <i className="bi bi-graph-up"></i>
              <span>View Analytics</span>
            </button>
          </div>

          {/* Upcoming Expirations */}
          <div className="section-card border border-light p-4 bg-white">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="d-flex align-items-center justify-content-center bg-warning-subtle text-warning rounded-circle" style={{ width: "32px", height: "32px" }}>
                <i className="bi bi-calendar-x"></i>
              </div>
              <h3 className="section-card-title m-0 fs-6 fw-800">Upcoming Expirations</h3>
            </div>
            <div className="p-3 border border-warning-subtle bg-light-subtle rounded-3 d-flex flex-column gap-1">
              <span className="fw-700 text-dark fs-8">API Integration SLA</span>
              <span className="text-secondary fs-9 fw-600">Expires on 14 Mar 2025 (in 10 months)</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="section-card border border-light p-4 bg-white">
            <h3 className="section-card-title mb-4 fs-6 fw-800">Quick Actions</h3>
            <div className="d-flex flex-column gap-2 fs-8 fw-600 text-dark">
              <a href="#" className="d-flex align-items-center justify-content-between text-decoration-none text-dark py-1">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-plus-circle text-secondary fs-6"></i>
                  <span>Create New Contract</span>
                </div>
                <i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.7rem" }}></i>
              </a>
              <a href="#" className="d-flex align-items-center justify-content-between text-decoration-none text-dark py-1">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-arrow-repeat text-secondary fs-6"></i>
                  <span>Request Contract Renewal</span>
                </div>
                <i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.7rem" }}></i>
              </a>
              <a href="#" className="d-flex align-items-center justify-content-between text-decoration-none text-dark py-1">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-shield-check text-secondary fs-6"></i>
                  <span>Review Compliance Report</span>
                </div>
                <i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.7rem" }}></i>
              </a>
              <a href="#" className="d-flex align-items-center justify-content-between text-decoration-none text-dark py-1">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-file-earmark-text text-secondary fs-6"></i>
                  <span>Manage Contract Templates</span>
                </div>
                <i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.7rem" }}></i>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const BankDetailsTab = () => {
  return (
    <div className="d-flex flex-column gap-4 mt-4">
      {/* Bank Accounts Table Card */}
      <div className="section-card border border-light p-0 bg-white overflow-hidden">
        <div className="p-4 border-bottom border-light d-flex justify-content-between align-items-center">
          <div>
            <h3 className="fs-6 fw-800 m-0 text-dark">Bank Accounts</h3>
            <span className="text-secondary fs-8">Manage all bank accounts for payments and settlements.</span>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-outline-success bg-white border-light rounded-3 px-3 fw-600 d-flex align-items-center gap-2 text-success shadow-sm">
              <i className="bi bi-plus-lg"></i>
              <span>Add Bank Account</span>
            </button>
            <button className="btn btn-sm btn-outline-secondary bg-white border-light rounded-3 px-3 fw-600 d-flex align-items-center gap-2 text-dark shadow-sm">
              <i className="bi bi-download"></i>
              <span>Export</span>
              <i className="bi bi-chevron-down ms-1" style={{ fontSize: "0.6rem" }}></i>
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: "0.85rem" }}>
            <thead className="bg-light text-secondary">
              <tr>
                <th className="fw-500 py-3 ps-4 border-0 text-nowrap" style={{ color: "#8C9C95" }}>Bank Account Name</th>
                <th className="fw-500 py-3 border-0 text-nowrap" style={{ color: "#8C9C95" }}>Bank Name</th>
                <th className="fw-500 py-3 border-0 text-nowrap" style={{ color: "#8C9C95" }}>Account Number</th>
                <th className="fw-500 py-3 border-0 text-nowrap" style={{ color: "#8C9C95" }}>Currency</th>
                <th className="fw-500 py-3 border-0 text-nowrap" style={{ color: "#8C9C95" }}>Account Holder</th>
                <th className="fw-500 py-3 border-0 text-nowrap" style={{ color: "#8C9C95" }}>SWIFT Code</th>
                <th className="fw-500 py-3 border-0 text-nowrap text-center" style={{ color: "#8C9C95" }}>Is Primary</th>
                <th className="fw-500 py-3 border-0 text-nowrap" style={{ color: "#8C9C95" }}>Status</th>
                <th className="fw-500 py-3 pe-4 border-0 text-center" style={{ color: "#8C9C95" }}>Actions</th>
              </tr>
            </thead>
            <tbody className="border-top-0">
              {/* Row 1 */}
              <tr className="border-bottom border-light">
                <td className="ps-4 py-3">
                  <div className="d-flex align-items-center gap-2">
                    <span className="fw-700 text-dark">Emirates AED Account</span>
                    <span className="badge rounded-2 fw-600 px-2 py-1" style={{ backgroundColor: "#EAF2FF", color: "#2B73F6", fontSize: "0.65rem" }}>Primary</span>
                  </div>
                </td>
                <td className="py-3">
                  <div className="d-flex align-items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://upload.wikimedia.org/wikipedia/en/2/23/Emirates_NBD_Logo.svg" alt="NBD" style={{ width: "20px", height: "20px", objectFit: "contain" }} />
                    <span className="fw-600 text-dark">Emirates NBD</span>
                  </div>
                </td>
                <td className="py-3 text-secondary fw-500">1012345678901</td>
                <td className="py-3 text-dark fw-600">AED</td>
                <td className="py-3 text-secondary fw-500">Emirates Airlines</td>
                <td className="py-3 text-secondary fw-500">EBILAEAD</td>
                <td className="py-3 text-center text-warning fs-6"><i className="bi bi-star-fill"></i></td>
                <td className="py-3">
                  <span className="badge rounded-2 fw-700 px-2 py-1" style={{ backgroundColor: "#E9F4EE", color: "#1E6C45", fontSize: "0.65rem" }}>Active</span>
                </td>
                <td className="pe-4 py-3 text-center">
                  <div className="d-flex justify-content-center gap-1">
                    <button className="btn btn-sm btn-light bg-transparent border-light shadow-sm text-secondary" style={{ width: "28px", height: "28px", padding: 0 }}>
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn btn-sm btn-light bg-transparent border-light shadow-sm text-secondary" style={{ width: "28px", height: "28px", padding: 0 }}>
                      <i className="bi bi-three-dots"></i>
                    </button>
                  </div>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="border-bottom border-light">
                <td className="ps-4 py-3"><span className="fw-700 text-dark">Emirates USD Account</span></td>
                <td className="py-3">
                  <div className="d-flex align-items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/HSBC_logo_%282018%29.svg" alt="HSBC" style={{ width: "20px", height: "20px", objectFit: "contain" }} />
                    <span className="fw-600 text-dark">HSBC Bank Middle East</span>
                  </div>
                </td>
                <td className="py-3 text-secondary fw-500">0033545678102</td>
                <td className="py-3 text-dark fw-600">USD</td>
                <td className="py-3 text-secondary fw-500">Emirates Airlines</td>
                <td className="py-3 text-secondary fw-500">BBMEAEAD</td>
                <td className="py-3 text-center text-secondary fw-500">—</td>
                <td className="py-3">
                  <span className="badge rounded-2 fw-700 px-2 py-1" style={{ backgroundColor: "#E9F4EE", color: "#1E6C45", fontSize: "0.65rem" }}>Active</span>
                </td>
                <td className="pe-4 py-3 text-center">
                  <div className="d-flex justify-content-center gap-1">
                    <button className="btn btn-sm btn-light bg-transparent border-light shadow-sm text-secondary" style={{ width: "28px", height: "28px", padding: 0 }}>
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn btn-sm btn-light bg-transparent border-light shadow-sm text-secondary" style={{ width: "28px", height: "28px", padding: 0 }}>
                      <i className="bi bi-three-dots"></i>
                    </button>
                  </div>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="border-bottom border-light">
                <td className="ps-4 py-3"><span className="fw-700 text-dark">Emirates EUR Account</span></td>
                <td className="py-3">
                  <div className="d-flex align-items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Standard_Chartered_logo.svg" alt="Standard Chartered" style={{ width: "20px", height: "20px", objectFit: "contain" }} />
                    <span className="fw-600 text-dark">Standard Chartered</span>
                  </div>
                </td>
                <td className="py-3 text-secondary fw-500">556677889900</td>
                <td className="py-3 text-dark fw-600">EUR</td>
                <td className="py-3 text-secondary fw-500">Emirates Airlines</td>
                <td className="py-3 text-secondary fw-500">SCBLAEAD</td>
                <td className="py-3 text-center text-secondary fw-500">—</td>
                <td className="py-3">
                  <span className="badge rounded-2 fw-700 px-2 py-1" style={{ backgroundColor: "#F1F3F4", color: "#5F6368", fontSize: "0.65rem" }}>Inactive</span>
                </td>
                <td className="pe-4 py-3 text-center">
                  <div className="d-flex justify-content-center gap-1">
                    <button className="btn btn-sm btn-light bg-transparent border-light shadow-sm text-secondary" style={{ width: "28px", height: "28px", padding: 0 }}>
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn btn-sm btn-light bg-transparent border-light shadow-sm text-secondary" style={{ width: "28px", height: "28px", padding: 0 }}>
                      <i className="bi bi-three-dots"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-3 border-top border-light d-flex justify-content-between align-items-center bg-white text-secondary" style={{ fontSize: "0.85rem" }}>
          <span>Showing 1 to 3 of 3 bank accounts</span>
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex gap-1">
              <button className="btn btn-sm btn-outline-secondary border-0 text-secondary"><i className="bi bi-chevron-left"></i></button>
              <button className="btn btn-sm rounded-2 fw-600 text-white" style={{ backgroundColor: "#112E24", width: "28px", height: "28px", padding: 0 }}>1</button>
              <button className="btn btn-sm btn-outline-secondary border-0 text-secondary"><i className="bi bi-chevron-right"></i></button>
            </div>
            <select className="form-select form-select-sm border-light bg-light-subtle rounded-3 text-secondary fw-500 shadow-sm" style={{ width: "100px", backgroundColor: "#FCFAF6" }}>
              <option>10 / page</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row g-4 align-items-start">
        {/* Selected Bank Account Details */}
        <div className="col-12 col-xl-7">
          <div className="section-card border border-light p-4 bg-white h-100">
            <div className="d-flex justify-content-between align-items-start mb-4">
              <div>
                <h3 className="section-card-title fs-6 fw-800 m-0 mb-3">Selected Bank Account Details</h3>
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center justify-content-center border border-light rounded-3 shadow-sm bg-light-subtle" style={{ width: "48px", height: "48px" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://upload.wikimedia.org/wikipedia/en/2/23/Emirates_NBD_Logo.svg" alt="NBD" style={{ width: "24px", height: "24px", objectFit: "contain" }} />
                  </div>
                  <div className="d-flex flex-column">
                    <div className="d-flex align-items-center gap-2">
                      <span className="fw-800 text-dark fs-6">Emirates AED Account</span>
                      <span className="badge rounded-2 fw-600 px-2 py-1" style={{ backgroundColor: "#EAF2FF", color: "#2B73F6", fontSize: "0.6rem" }}>Primary</span>
                    </div>
                    <span className="text-secondary fw-500 fs-8">Emirates NBD</span>
                  </div>
                </div>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-outline-secondary bg-white border-light rounded-3 px-3 fw-600 d-flex align-items-center gap-2 text-dark shadow-sm">
                  <i className="bi bi-pencil"></i>
                  <span>Edit Account</span>
                </button>
                <button className="btn btn-sm btn-outline-secondary bg-white border-light rounded-3 px-3 fw-600 d-flex align-items-center gap-2 text-dark shadow-sm">
                  <i className="bi bi-star"></i>
                  <span>Set as Primary</span>
                </button>
              </div>
            </div>

            <div className="row g-3 fs-8 mb-4">
              <div className="col-12 col-md-6 d-flex flex-column gap-3">
                <div className="d-flex justify-content-between">
                  <span className="text-secondary fw-600" style={{ width: "120px" }}>Bank Name</span>
                  <span className="text-dark fw-600 flex-grow-1">Emirates NBD</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary fw-600" style={{ width: "120px" }}>Account Holder</span>
                  <span className="text-dark fw-600 flex-grow-1">Emirates Airlines</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary fw-600" style={{ width: "120px" }}>Account Number</span>
                  <span className="text-dark fw-600 flex-grow-1">1012345678901</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary fw-600" style={{ width: "120px" }}>IBAN</span>
                  <span className="text-dark fw-600 flex-grow-1">AE320260001012345678901</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary fw-600" style={{ width: "120px" }}>Currency</span>
                  <span className="text-dark fw-600 flex-grow-1">AED - UAE Dirham</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary fw-600" style={{ width: "120px" }}>Branch Name</span>
                  <span className="text-dark fw-600 flex-grow-1">Corporate Banking, Dubai</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary fw-600" style={{ width: "120px" }}>Branch Address</span>
                  <span className="text-dark fw-600 flex-grow-1">Emirates NBD Tower, Sheikh Zayed Road, Dubai, UAE</span>
                </div>
              </div>

              <div className="col-12 col-md-6 d-flex flex-column gap-3">
                <div className="d-flex justify-content-between">
                  <span className="text-secondary fw-600" style={{ width: "120px" }}>SWIFT Code</span>
                  <span className="text-dark fw-600 flex-grow-1">EBILAEAD</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary fw-600" style={{ width: "120px" }}>Bank Address</span>
                  <span className="text-dark fw-600 flex-grow-1">P.O. Box 777, Dubai, UAE</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary fw-600" style={{ width: "120px" }}>Bank Phone</span>
                  <span className="text-dark fw-600 flex-grow-1">+971 4 222 2555</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary fw-600" style={{ width: "120px" }}>Bank Email</span>
                  <span className="text-primary fw-600 flex-grow-1 text-decoration-none">corporatebanking@emiratesnbd.com</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary fw-600" style={{ width: "120px" }}>Payment Method</span>
                  <span className="text-dark fw-600 flex-grow-1">Bank Transfer</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary fw-600" style={{ width: "120px" }}>Payment Terms</span>
                  <span className="text-dark fw-600 flex-grow-1">Net 30 Days</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary fw-600" style={{ width: "120px" }}>Remarks</span>
                  <span className="text-dark fw-600 flex-grow-1">Used for all AED transactions.</span>
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2 p-3 rounded-3" style={{ backgroundColor: "#EAF2FF", color: "#2B73F6", fontSize: "0.8rem", fontWeight: "600" }}>
              <i className="bi bi-info-circle fs-6"></i>
              <span>This is the primary bank account. Payments will be made to this account by default.</span>
            </div>
          </div>
        </div>

        {/* Right Side Widgets */}
        <div className="col-12 col-xl-5 d-flex flex-column gap-4">

          {/* Bank Summary */}
          <div className="section-card border border-light p-4 bg-white">
            <h3 className="section-card-title mb-4 fs-6 fw-800">Bank Summary</h3>
            <div className="d-flex flex-column gap-3 fs-8 fw-600">
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-dark">Total Bank Accounts</span>
                <span className="text-dark fw-800">3</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-dark">Active Accounts</span>
                <span className="text-dark fw-800">2</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-dark">Primary Account</span>
                <span className="text-dark fw-800">Emirates AED Account</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-dark">Total Currencies</span>
                <span className="text-dark fw-800">3</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-dark">Last Updated</span>
                <span className="text-dark fw-800">18 May 2025, 11:30 AM</span>
              </div>
            </div>

            <button className="btn btn-outline-secondary bg-white border-light rounded-3 w-100 mt-4 py-2 fw-600 d-flex align-items-center justify-content-center gap-2 text-dark shadow-sm fs-8">
              <i className="bi bi-clock-history"></i>
              <span>View Bank Account History</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="section-card border border-light p-4 bg-white">
            <h3 className="section-card-title mb-4 fs-6 fw-800">Quick Actions</h3>
            <div className="d-flex flex-column gap-2 fs-8 fw-600 text-dark">
              <a href="#" className="d-flex align-items-center justify-content-between text-decoration-none text-dark py-1">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-plus-circle text-secondary fs-6"></i>
                  <span>Add New Bank Account</span>
                </div>
                <i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.7rem" }}></i>
              </a>
              <a href="#" className="d-flex align-items-center justify-content-between text-decoration-none text-dark py-1">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-file-earmark-arrow-up text-secondary fs-6"></i>
                  <span>Upload Bank Document</span>
                </div>
                <i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.7rem" }}></i>
              </a>
              <a href="#" className="d-flex align-items-center justify-content-between text-decoration-none text-dark py-1">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-clock-history text-secondary fs-6"></i>
                  <span>View Bank Account History</span>
                </div>
                <i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.7rem" }}></i>
              </a>
              <a href="#" className="d-flex align-items-center justify-content-between text-decoration-none text-dark py-1">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-file-earmark-pdf text-secondary fs-6"></i>
                  <span>Download Bank Details (PDF)</span>
                </div>
                <i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.7rem" }}></i>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const DocumentsTab = () => {
  return (
    <div className="row g-4 mt-0 align-items-start">
      {/* Left Column */}
      <div className="col-12 col-xl-8 d-flex flex-column gap-4">
        <div className="section-card border border-light p-0 bg-white overflow-hidden">
          <div className="p-4 border-bottom border-light d-flex justify-content-between align-items-center flex-wrap gap-3">
            <h3 className="fs-5 fw-800 m-0 text-dark">Documents (13)</h3>
            <div className="d-flex gap-2 align-items-center">
              <div className="position-relative">
                <i className="bi bi-search position-absolute text-secondary" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", fontSize: "0.85rem" }}></i>
                <input type="text" className="form-control form-control-sm border-light bg-light-subtle rounded-3 shadow-sm" placeholder="Search documents" style={{ paddingLeft: "2.5rem", width: "200px" }} />
              </div>
              <button className="btn btn-sm text-white rounded-3 px-3 fw-600 d-flex align-items-center gap-2 shadow-sm" style={{ backgroundColor: "#112E24" }}>
                <i className="bi bi-plus-lg"></i>
                <span>Add New Document</span>
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0" style={{ fontSize: "0.85rem" }}>
              <thead className="bg-light text-secondary">
                <tr>
                  <th className="fw-500 py-3 ps-4 border-0 text-nowrap" style={{ color: "#8C9C95" }}>File Name <i className="bi bi-arrow-up"></i></th>
                  <th className="fw-500 py-3 border-0 text-nowrap" style={{ color: "#8C9C95" }}>Document Type</th>
                  <th className="fw-500 py-3 border-0 text-nowrap" style={{ color: "#8C9C95" }}>Upload Date</th>
                  <th className="fw-500 py-3 border-0 text-nowrap" style={{ color: "#8C9C95" }}>Expiry Date</th>
                  <th className="fw-500 py-3 border-0 text-nowrap" style={{ color: "#8C9C95" }}>Related Contract</th>
                  <th className="fw-500 py-3 border-0 text-nowrap" style={{ color: "#8C9C95" }}>Status</th>
                  <th className="fw-500 py-3 pe-4 border-0 text-center" style={{ color: "#8C9C95" }}>Actions</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {/* Row 1 */}
                <tr className="border-bottom border-light">
                  <td className="ps-4 py-3">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-file-earmark-pdf-fill text-danger fs-5"></i>
                      <span className="fw-700 text-dark">GSA Agreement.pdf</span>
                    </div>
                  </td>
                  <td className="py-3 text-dark fw-600">GSA Agreement</td>
                  <td className="py-3 text-secondary fw-500">12-12 2022</td>
                  <td className="py-3 text-secondary fw-500">12-12 2025</td>
                  <td className="py-3 text-dark fw-600">SUP-001</td>
                  <td className="py-3">
                    <span className="badge rounded-2 fw-700 px-2 py-1" style={{ backgroundColor: "#E9F4EE", color: "#1E6C45", fontSize: "0.65rem" }}>Active</span>
                  </td>
                  <td className="pe-4 py-3 text-center">
                    <div className="d-flex justify-content-center gap-1">
                      <button className="btn btn-sm btn-light bg-transparent border-light shadow-sm text-secondary" style={{ width: "28px", height: "28px", padding: 0 }}><i className="bi bi-eye"></i></button>
                      <button className="btn btn-sm btn-light bg-transparent border-light shadow-sm text-secondary" style={{ width: "28px", height: "28px", padding: 0 }}><i className="bi bi-download"></i></button>
                      <button className="btn btn-sm btn-light bg-transparent border-light shadow-sm text-secondary" style={{ width: "28px", height: "28px", padding: 0 }}><i className="bi bi-three-dots-vertical"></i></button>
                    </div>
                  </td>
                </tr>
                {/* Row 2 */}
                <tr className="border-bottom border-light">
                  <td className="ps-4 py-3">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-file-earmark-word-fill text-primary fs-5"></i>
                      <span className="fw-700 text-dark">Insurance_Cert_2024.docx</span>
                    </div>
                  </td>
                  <td className="py-3 text-dark fw-600">Document File</td>
                  <td className="py-3 text-secondary fw-500">12-12 2022</td>
                  <td className="py-3 text-secondary fw-500">12-12 2025</td>
                  <td className="py-3 text-dark fw-600">SUP-002</td>
                  <td className="py-3">
                    <span className="badge rounded-2 fw-700 px-2 py-1" style={{ backgroundColor: "#FEF7ED", color: "#B97C2B", fontSize: "0.65rem" }}>Pending Review</span>
                  </td>
                  <td className="pe-4 py-3 text-center">
                    <div className="d-flex justify-content-center gap-1">
                      <button className="btn btn-sm btn-light bg-transparent border-light shadow-sm text-secondary" style={{ width: "28px", height: "28px", padding: 0 }}><i className="bi bi-eye"></i></button>
                      <button className="btn btn-sm btn-light bg-transparent border-light shadow-sm text-secondary" style={{ width: "28px", height: "28px", padding: 0 }}><i className="bi bi-download"></i></button>
                      <button className="btn btn-sm btn-light bg-transparent border-light shadow-sm text-secondary" style={{ width: "28px", height: "28px", padding: 0 }}><i className="bi bi-three-dots-vertical"></i></button>
                    </div>
                  </td>
                </tr>
                {/* Row 3 */}
                <tr className="border-bottom border-light">
                  <td className="ps-4 py-3">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-file-earmark-pdf-fill text-danger fs-5"></i>
                      <div className="d-flex flex-column">
                        <span className="fw-700 text-dark">Response Time (Avg)</span>
                        <span className="fw-700 text-dark">SafetyAudit_EK.pdf</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-dark fw-600">Document File</td>
                  <td className="py-3 text-secondary fw-500">12-12 2022</td>
                  <td className="py-3 text-secondary fw-500">09-12 2025</td>
                  <td className="py-3 text-dark fw-600">SUP-003</td>
                  <td className="py-3">
                    <span className="badge rounded-2 fw-700 px-2 py-1" style={{ backgroundColor: "#E9F4EE", color: "#1E6C45", fontSize: "0.65rem" }}>Active</span>
                  </td>
                  <td className="pe-4 py-3 text-center">
                    <div className="d-flex justify-content-center gap-1">
                      <button className="btn btn-sm btn-light bg-transparent border-light shadow-sm text-secondary" style={{ width: "28px", height: "28px", padding: 0 }}><i className="bi bi-eye"></i></button>
                      <button className="btn btn-sm btn-light bg-transparent border-light shadow-sm text-secondary" style={{ width: "28px", height: "28px", padding: 0 }}><i className="bi bi-download"></i></button>
                      <button className="btn btn-sm btn-light bg-transparent border-light shadow-sm text-secondary" style={{ width: "28px", height: "28px", padding: 0 }}><i className="bi bi-three-dots-vertical"></i></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-3 border-top border-light d-flex justify-content-end align-items-center bg-white">
            <button className="btn btn-sm btn-outline-secondary rounded-2 bg-white d-flex align-items-center gap-2 text-dark shadow-sm">
              <i className="bi bi-chevron-left"></i>
              Page 4
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="col-12 col-xl-4 d-flex flex-column gap-4">
        {/* Recently Added */}
        <div className="section-card border border-light p-4 bg-white">
          <h3 className="section-card-title mb-4 fs-6 fw-800">Recently Added</h3>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center gap-2">
              <div className="p-2 bg-danger-subtle rounded text-danger d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}><i className="bi bi-file-earmark-pdf-fill fs-6"></i></div>
              <span className="fw-700 text-dark fs-8">GSA Agreement.pdf</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div className="p-2 bg-primary-subtle rounded text-primary d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}><i className="bi bi-file-earmark-word-fill fs-6"></i></div>
              <span className="fw-700 text-dark fs-8">Insurance_Cert_2024.docx</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div className="p-2 bg-danger-subtle rounded text-danger d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}><i className="bi bi-file-earmark-pdf-fill fs-6"></i></div>
              <span className="fw-700 text-dark fs-8">SafetyAudit_EK.pdf</span>
            </div>
          </div>

          <h3 className="section-card-title mb-4 mt-5 fs-6 fw-800">Document Categories</h3>
          <div className="d-flex flex-column gap-3 fs-8 fw-600 text-dark">
            <div className="d-flex align-items-center gap-2">
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#333" }}></span>
              Contracts
            </div>
            <div className="d-flex align-items-center gap-2">
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#333" }}></span>
              Compliance
            </div>
            <div className="d-flex align-items-center gap-2">
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#333" }}></span>
              Financial
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivityLogTab = () => {
  return (
    <div className="row g-4 mt-0 align-items-start">
      {/* Left Column */}
      <div className="col-12 col-xl-8 d-flex flex-column gap-4">
        <div className="section-card border border-light p-4 bg-white">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
            <h3 className="fs-5 fw-800 m-0 text-dark">Activity Feed</h3>
            <div className="d-flex gap-2 align-items-center flex-wrap">
              <div className="position-relative">
                <i className="bi bi-search position-absolute text-secondary" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", fontSize: "0.85rem" }}></i>
                <input type="text" className="form-control form-control-sm border-light bg-light-subtle rounded-3 shadow-sm" placeholder="Search Log" style={{ paddingLeft: "2.5rem", width: "160px" }} />
              </div>
              <button className="btn btn-sm btn-outline-secondary bg-white border-light rounded-3 px-3 fw-600 d-flex align-items-center gap-2 text-dark shadow-sm">
                <i className="bi bi-funnel"></i>
              </button>
              <button className="btn btn-sm btn-outline-secondary bg-white border-light rounded-3 px-3 fw-600 d-flex align-items-center gap-2 text-dark shadow-sm">
                Filter By Date Range
              </button>
              <select className="form-select form-select-sm border-light bg-white rounded-3 text-dark fw-600 shadow-sm" style={{ width: "130px" }}>
                <option>Last 30 Days</option>
              </select>
              <select className="form-select form-select-sm border-light bg-white rounded-3 text-dark fw-600 shadow-sm" style={{ width: "130px" }}>
                <option>Action Type</option>
              </select>
              <button className="btn btn-sm btn-outline-secondary bg-white border-light rounded-3 px-3 fw-600 d-flex align-items-center gap-2 text-dark shadow-sm">
                <i className="bi bi-download"></i>
              </button>
            </div>
          </div>

          <div className="d-flex flex-column">
            {/* Today */}
            <h4 className="fs-6 fw-800 text-dark mb-4 mt-2">Today, 21 Jun 2024</h4>
            <div className="position-relative ms-3 border-start border-light ps-4 pb-4">
              <div className="position-absolute bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px", left: "-16px", top: "-4px" }}>
                <i className="bi bi-file-earmark-text"></i>
              </div>
              <div className="d-flex align-items-center flex-wrap gap-2 fs-8">
                <span className="text-secondary fw-600">11:32 AM</span>
                <div className="d-flex align-items-center justify-content-center rounded-circle text-white fw-700 fs-9 shadow-sm" style={{ width: "24px", height: "24px", backgroundColor: "#2B73F6" }}>JS</div>
                <span className="fw-700 text-dark">John Smith</span>
                <span className="text-dark">uploaded a new GSA Agreement document for SUP-001. [Status: Pending Review]</span>
              </div>
            </div>
            <div className="position-relative ms-3 border-start border-light ps-4 pb-4">
              <div className="position-absolute bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px", left: "-16px", top: "-4px" }}>
                <i className="bi bi-pencil"></i>
              </div>
              <div className="d-flex align-items-center flex-wrap gap-2 fs-8">
                <span className="text-secondary fw-600">10:15 AM -</span>
                <span className="fw-700 text-dark">John Smith</span>
                <span className="text-dark">updated the &apos;Dubai, UAE&apos; address on the supplier profile.</span>
              </div>
            </div>

            {/* Yesterday */}
            <h4 className="fs-6 fw-800 text-dark mb-4 mt-4">Yesterday, 20 Jun 2024</h4>
            <div className="position-relative ms-3 border-start border-light ps-4 pb-4">
              <div className="position-absolute bg-warning-subtle text-warning rounded-circle d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px", left: "-16px", top: "-4px" }}>
                <i className="bi bi-chat-text"></i>
              </div>
              <div className="d-flex align-items-center flex-wrap gap-2 fs-8">
                <span className="text-secondary fw-600">04:45 PM -</span>
                <span className="fw-700 text-dark">Mark Johnson</span>
                <span className="text-dark">added a note to &apos;Contract Renegotiation (Q3)&apos; regarding financial sectors.</span>
              </div>
            </div>
            <div className="position-relative ms-3 border-start border-light ps-4 pb-4">
              <div className="position-absolute bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px", left: "-16px", top: "-4px" }}>
                <i className="bi bi-arrow-left-right"></i>
              </div>
              <div className="d-flex align-items-center flex-wrap gap-2 fs-8">
                <span className="text-secondary fw-600">02:10 PM -</span>
                <span className="fw-700 text-dark">Ravid Samer</span>
                <span className="text-dark">changed the status of Contract SUP-002 from &apos;Pending Renewal&apos; to &apos;Active&apos;.</span>
              </div>
            </div>

            {/* 18 Jun 2024 */}
            <h4 className="fs-6 fw-800 text-dark mb-4 mt-4">18 Jun 2024</h4>
            <div className="position-relative ms-3 ps-4 pb-2">
              <div className="position-absolute bg-dark text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px", left: "-16px", top: "-4px" }}>
                <i className="bi bi-exclamation-triangle"></i>
              </div>
              <div className="d-flex align-items-center flex-wrap gap-2 fs-8">
                <span className="text-secondary fw-600">09:00 AM -</span>
                <span className="fw-700 text-dark">System Alert:</span>
                <span className="text-dark">Automated Risk Score updated to 92/100 (Improved compliance).</span>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button className="btn btn-sm btn-outline-secondary rounded-2 bg-white d-flex align-items-center gap-2 text-dark shadow-sm">
              <i className="bi bi-chevron-left"></i>
              Page 1 of 5
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="col-12 col-xl-4 d-flex flex-column gap-4">
        <div className="section-card border border-light p-4 bg-white">
          <h3 className="section-card-title mb-4 fs-5 fw-800 text-dark">Activity Overview</h3>

          <h5 className="text-white rounded-1 p-2 mb-3" style={{ backgroundColor: "#112E24", fontSize: "0.85rem" }}>Top Contributors</h5>
          <div className="d-flex flex-column gap-3 mb-4">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <span className="fw-700 text-dark fs-8">1</span>
                <div className="d-flex align-items-center justify-content-center rounded-circle text-white fw-700 fs-9 shadow-sm" style={{ width: "24px", height: "24px", backgroundColor: "#2B73F6" }}>JS</div>
                <span className="fw-600 text-dark fs-8">John Smith</span>
              </div>
              <span className="fw-600 text-dark fs-8">11</span>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <span className="fw-700 text-dark fs-8">2</span>
                <div className="d-flex align-items-center justify-content-center rounded-circle text-white fw-700 fs-9 shadow-sm" style={{ width: "24px", height: "24px", backgroundColor: "#8E44AD" }}>MJ</div>
                <span className="fw-600 text-dark fs-8">Mark Johnson</span>
              </div>
              <span className="fw-600 text-dark fs-8">4</span>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <span className="fw-700 text-dark fs-8">3</span>
                <div className="d-flex align-items-center justify-content-center rounded-circle text-white fw-700 fs-9 shadow-sm" style={{ width: "24px", height: "24px", backgroundColor: "#D36C45" }}>RS</div>
                <span className="fw-600 text-dark fs-8">Ravid Samer</span>
              </div>
              <span className="fw-600 text-dark fs-8">1</span>
            </div>
          </div>

          <h5 className="text-white rounded-1 p-2 mb-3" style={{ backgroundColor: "#112E24", fontSize: "0.85rem" }}>Action Breakdown</h5>
          <div className="d-flex justify-content-center mb-4 mt-2">
            {/* SVG representation of donut chart */}
            <svg viewBox="0 0 100 100" style={{ width: "120px", height: "120px" }}>
              <circle cx="50" cy="50" r="40" fill="none" stroke="#E9F4EE" strokeWidth="20" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#2B73F6" strokeWidth="20" strokeDasharray="180 251.2" strokeDashoffset="0" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#F4B400" strokeWidth="20" strokeDasharray="40 251.2" strokeDashoffset="-180" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#0F9D58" strokeWidth="20" strokeDasharray="31.2 251.2" strokeDashoffset="-220" />
            </svg>
          </div>
          <div className="row g-2 fs-9 fw-600 text-dark mb-4">
            <div className="col-6 d-flex align-items-center gap-2"><span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#0F9D58" }}></span>Contracts</div>
            <div className="col-6 d-flex align-items-center gap-2"><span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#2B73F6" }}></span>Documents</div>
            <div className="col-6 d-flex align-items-center gap-2"><span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#E9F4EE" }}></span>Profile</div>
            <div className="col-6 d-flex align-items-center gap-2"><span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#F4B400" }}></span>Notes</div>
          </div>

          <h5 className="text-white rounded-1 p-2 mb-3" style={{ backgroundColor: "#112E24", fontSize: "0.85rem" }}>Most Active Contracts</h5>
          <div className="d-flex flex-column gap-2 fs-8 fw-600 text-dark">
            <div className="d-flex justify-content-between border-bottom border-light pb-2">
              <span className="text-secondary">Top Contract ID</span>
              <span className="text-secondary">Activity</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>SUP-001</span>
              <span>14</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>SUP-002</span>
              <span>5</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>SUP-003</span>
              <span>2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotesTab = () => {
  return (
    <div className="row g-4 mt-0 align-items-start">
      {/* Left Column */}
      <div className="col-12 col-xl-8 d-flex flex-column gap-4">
        <div className="section-card border border-light p-4 bg-white">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
            <h3 className="fs-5 fw-800 m-0 text-dark">Notes Log</h3>
            <div className="d-flex gap-2 align-items-center flex-wrap">
              <div className="position-relative">
                <i className="bi bi-search position-absolute text-secondary" style={{ left: "1rem", top: "50%", transform: "translateY(-50%)", fontSize: "0.85rem" }}></i>
                <input type="text" className="form-control form-control-sm border-light bg-light-subtle rounded-3 shadow-sm" placeholder="Search" style={{ paddingLeft: "2.5rem", width: "160px" }} />
              </div>
              <button className="btn btn-sm btn-outline-secondary bg-white border-light rounded-3 px-3 fw-600 d-flex align-items-center gap-2 text-dark shadow-sm">
                <i className="bi bi-funnel"></i>
              </button>
              <button className="btn btn-sm btn-outline-secondary bg-white border-light rounded-3 px-3 fw-600 d-flex align-items-center gap-2 text-dark shadow-sm">
                Filter <i className="bi bi-chevron-down ms-1" style={{ fontSize: "0.6rem" }}></i>
              </button>
              <button className="btn btn-sm btn-outline-secondary bg-white border-light rounded-3 px-3 fw-600 d-flex align-items-center gap-2 text-dark shadow-sm">
                <i className="bi bi-download"></i> Export Log
              </button>
            </div>
          </div>

          <div className="d-flex align-items-start gap-3 mb-5 border border-light rounded-3 p-3 bg-white shadow-sm position-relative">
            <button className="btn btn-sm text-white rounded-3 px-3 fw-600 d-flex align-items-center gap-2 shadow-sm flex-shrink-0" style={{ backgroundColor: "#112E24" }}>
              <i className="bi bi-plus-lg"></i>
              <span>Add New Note</span>
            </button>
            <div className="d-flex flex-column w-100 bg-white">
              <div className="d-flex align-items-center gap-3 border-bottom border-light pb-2 mb-2 text-secondary px-2">
                <i className="bi bi-type-bold"></i>
                <i className="bi bi-type-italic"></i>
                <i className="bi bi-type-underline"></i>
                <i className="bi bi-type-strikethrough"></i>
                <i className="bi bi-code"></i>
                <span className="border-start border-light h-100 mx-1"></span>
                <i className="bi bi-pencil"></i>
                <i className="bi bi-list-ul"></i>
                <i className="bi bi-list-ol"></i>
                <span className="border-start border-light h-100 mx-1"></span>
                <i className="bi bi-link-45deg"></i>
                <i className="bi bi-image"></i>
                <i className="bi bi-calculator"></i>
              </div>
              <textarea className="form-control border-0 p-2 fs-8 fw-500 text-dark shadow-none" rows="1" placeholder="Add text note"></textarea>
            </div>
            <button className="btn btn-sm btn-light bg-transparent border-0 text-secondary position-absolute top-0 end-0 mt-2 me-2">
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          <h4 className="fs-5 fw-800 text-dark mb-4">Key Meeting Minutes</h4>
          <div className="row g-3 mb-5">
            <div className="col-12 col-md-6">
              <div className="p-3 border border-light rounded-3 shadow-sm bg-white h-100">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="fs-6 fw-800 text-dark m-0">Contract Renegotiation (Q3)</h5>
                  <div className="d-flex" style={{ marginLeft: "-10px" }}>
                    <div className="rounded-circle text-white fw-700 fs-9 shadow-sm border border-white d-flex justify-content-center align-items-center" style={{ width: "24px", height: "24px", backgroundColor: "#2B73F6", marginLeft: "-8px", zIndex: 3 }}>JS</div>
                    <div className="rounded-circle text-white fw-700 fs-9 shadow-sm border border-white d-flex justify-content-center align-items-center" style={{ width: "24px", height: "24px", backgroundColor: "#8E44AD", marginLeft: "-8px", zIndex: 2 }}>MJ</div>
                    <div className="rounded-circle text-white fw-700 fs-9 shadow-sm border border-white d-flex justify-content-center align-items-center" style={{ width: "24px", height: "24px", backgroundColor: "#D36C45", marginLeft: "-8px", zIndex: 1 }}>RS</div>
                  </div>
                </div>
                <p className="fs-9 text-secondary fw-500 mb-3">17 May 2022 • 1 John Smith</p>
                <p className="fs-8 fw-700 text-dark mb-1">Key Summary</p>
                <ul className="fs-8 text-dark fw-500 ps-3 mb-3" style={{ lineHeight: "1.6" }}>
                  <li>Contract Renegotiation (Q3) metes contact financial sectures</li>
                  <li>Contract Renegotiation Strategy</li>
                  <li>Endure sum poinss and to capor tmens and commundient rocomptions ...</li>
                </ul>
                <div className="d-flex flex-wrap gap-2">
                  <span className="badge rounded-2 fw-600 px-2 py-1" style={{ backgroundColor: "#FEF7ED", color: "#B97C2B", fontSize: "0.65rem" }}>Internal</span>
                  <span className="badge rounded-2 fw-600 px-2 py-1" style={{ backgroundColor: "#FEF7ED", color: "#B97C2B", fontSize: "0.65rem" }}>Internal</span>
                  <span className="badge rounded-2 fw-600 px-2 py-1" style={{ backgroundColor: "#FEF7ED", color: "#B97C2B", fontSize: "0.65rem" }}>Internal</span>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="p-3 border border-light rounded-3 shadow-sm bg-white h-100">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="fs-6 fw-800 text-dark m-0">Market Expansion Strategy</h5>
                  <div className="d-flex" style={{ marginLeft: "-10px" }}>
                    <div className="rounded-circle text-white fw-700 fs-9 shadow-sm border border-white d-flex justify-content-center align-items-center" style={{ width: "24px", height: "24px", backgroundColor: "#2B73F6", marginLeft: "-8px", zIndex: 3 }}>JS</div>
                    <div className="rounded-circle text-white fw-700 fs-9 shadow-sm border border-white d-flex justify-content-center align-items-center" style={{ width: "24px", height: "24px", backgroundColor: "#8E44AD", marginLeft: "-8px", zIndex: 2 }}>MJ</div>
                    <div className="rounded-circle text-white fw-700 fs-9 shadow-sm border border-white d-flex justify-content-center align-items-center" style={{ width: "24px", height: "24px", backgroundColor: "#D36C45", marginLeft: "-8px", zIndex: 1 }}>RS</div>
                  </div>
                </div>
                <p className="fs-9 text-secondary fw-500 mb-3">17 May 2022 • 1 John Smith</p>
                <p className="fs-8 fw-700 text-dark mb-1">Key Summary</p>
                <ul className="fs-8 text-dark fw-500 ps-3 mb-3" style={{ lineHeight: "1.6" }}>
                  <li>Contract pointes about market expansion strategy</li>
                  <li>Market Expansion Strategy w/row prom suses</li>
                  <li>Supplier responiizes growth your team wrket ecoroption</li>
                </ul>
                <div className="d-flex flex-wrap gap-2">
                  <span className="badge rounded-2 fw-600 px-2 py-1" style={{ backgroundColor: "#FEF7ED", color: "#B97C2B", fontSize: "0.65rem" }}>Internal</span>
                  <span className="badge rounded-2 fw-600 px-2 py-1" style={{ backgroundColor: "#FEF7ED", color: "#B97C2B", fontSize: "0.65rem" }}>Supplier Communication</span>
                </div>
              </div>
            </div>
          </div>

          <h4 className="fs-5 fw-800 text-dark mb-4">Daily Activity Notes</h4>
          <div className="d-flex flex-column">
            <div className="position-relative ms-3 border-start border-light ps-4 pb-4">
              <div className="position-absolute bg-success text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "28px", height: "28px", left: "-14px", top: "-4px" }}>
                <i className="bi bi-arrow-up-short"></i>
              </div>
              <div className="d-flex flex-column gap-2 fs-8">
                <span className="fw-700 text-dark">14 May 2022 - John Smith noted potential issue with flight capacity for June (attached: email thread)</span>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-secondary fw-500">14 May 2022</span>
                  <div className="d-flex align-items-center justify-content-center rounded-circle text-white fw-700 fs-9 shadow-sm" style={{ width: "24px", height: "24px", backgroundColor: "#2B73F6" }}>JS</div>
                  <span className="badge rounded-pill fw-600 px-3 py-1 bg-light-subtle text-secondary border border-light" style={{ fontSize: "0.65rem" }}>Supplier Communication</span>
                </div>
              </div>
            </div>

            <div className="position-relative ms-3 border-start border-light ps-4 pb-4">
              <div className="position-absolute bg-warning text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "28px", height: "28px", left: "-14px", top: "-4px" }}>
                <i className="bi bi-person"></i>
              </div>
              <div className="d-flex flex-column gap-2 fs-8">
                <span className="fw-700 text-dark">12 May 2022 - Ravid Samer updated account strategy document</span>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-secondary fw-500">12 May 2022</span>
                  <div className="d-flex align-items-center justify-content-center rounded-circle text-white fw-700 fs-9 shadow-sm" style={{ width: "24px", height: "24px", backgroundColor: "#D36C45" }}>RS</div>
                  <span className="badge rounded-pill fw-600 px-3 py-1 bg-light-subtle text-secondary border border-light" style={{ fontSize: "0.65rem" }}>Supplier Communication</span>
                </div>
              </div>
            </div>

            <div className="position-relative ms-3 border-start border-light ps-4 pb-4">
              <div className="position-absolute bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "28px", height: "28px", left: "-14px", top: "-4px" }}>
                <i className="bi bi-calendar-event"></i>
              </div>
              <div className="d-flex flex-column gap-2 fs-8">
                <span className="fw-700 text-dark">11 May 2022 - Mark Johnson noted supplier response time optimization meeting</span>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-secondary fw-500">11 May 2022</span>
                  <div className="d-flex align-items-center justify-content-center rounded-circle text-white fw-700 fs-9 shadow-sm" style={{ width: "24px", height: "24px", backgroundColor: "#8E44AD" }}>MJ</div>
                  <span className="badge rounded-pill fw-600 px-3 py-1 bg-light-subtle text-secondary border border-light" style={{ fontSize: "0.65rem" }}>Supplier Communication</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="col-12 col-xl-4 d-flex flex-column gap-4">
        {/* Recently Updated Notes */}
        <div className="section-card border border-light p-4 bg-white">
          <h3 className="section-card-title mb-4 fs-6 fw-800">Recently Updated Notes</h3>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center gap-2">
              <div className="p-2 bg-danger-subtle rounded text-danger d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}><i className="bi bi-file-earmark-pdf-fill fs-6"></i></div>
              <span className="fw-700 text-dark fs-8">Contract Renegotiation (Q3)</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div className="p-2 bg-primary-subtle rounded text-primary d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}><i className="bi bi-file-earmark-word-fill fs-6"></i></div>
              <span className="fw-700 text-dark fs-8">Insurance_Cert_2024.docx</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div className="p-2 bg-danger-subtle rounded text-danger d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}><i className="bi bi-file-earmark-pdf-fill fs-6"></i></div>
              <span className="fw-700 text-dark fs-8">SafetyAudit_EK.pdf</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div className="p-2 bg-primary-subtle rounded text-primary d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}><i className="bi bi-file-earmark-text fs-6"></i></div>
              <span className="fw-700 text-dark fs-8">Markert Expansion Strategy</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div className="p-2 bg-primary-subtle rounded text-primary d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}><i className="bi bi-person fs-6"></i></div>
              <span className="fw-700 text-primary fs-8">John Smith renewed</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div className="p-2 bg-danger-subtle rounded text-danger d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}><i className="bi bi-file-earmark-pdf-fill fs-6"></i></div>
              <span className="fw-700 text-dark fs-8">Market Expansion Strategy</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div className="p-2 bg-secondary-subtle rounded text-secondary d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}><i className="bi bi-calendar fs-6"></i></div>
              <span className="fw-700 text-dark fs-8">Daily Activity Notes</span>
            </div>
          </div>
        </div>

        {/* Note Tags */}
        <div className="section-card border border-light p-4 bg-white">
          <h3 className="section-card-title mb-4 fs-6 fw-800">Note Tags</h3>
          <div className="d-flex flex-wrap gap-2">
            <span className="badge bg-light-subtle text-secondary border border-light fw-600 px-3 py-2 fs-8 rounded-pill">Contracts</span>
            <span className="badge bg-light-subtle text-secondary border border-light fw-600 px-3 py-2 fs-8 rounded-pill">Operations</span>
            <span className="badge bg-light-subtle text-secondary border border-light fw-600 px-3 py-2 fs-8 rounded-pill">Compliance</span>
            <span className="badge bg-light-subtle text-secondary border border-light fw-600 px-3 py-2 fs-8 rounded-pill">Compliance</span>
            <span className="badge bg-light-subtle text-secondary border border-light fw-600 px-3 py-2 fs-8 rounded-pill">Compliane</span>
            <span className="badge bg-light-subtle text-secondary border border-light fw-600 px-3 py-2 fs-8 rounded-pill">Flights</span>
            <span className="badge bg-light-subtle text-secondary border border-light fw-600 px-3 py-2 fs-8 rounded-pill">Financial</span>
          </div>

          <div className="d-flex justify-content-center mt-5">
            <button className="btn btn-sm btn-outline-secondary rounded-2 bg-white d-flex align-items-center gap-2 text-dark shadow-sm">
              <i className="bi bi-chevron-left"></i>
              Page 4
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function SupplierDetailsPage() {
  const params = useParams();
  const supplierId = params.id;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Bank Details");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const tabs = [
    { id: "Overview", label: "Overview" },
    { id: "Contact Details", label: "Contact Details" },
    { id: "Contracts", label: "Contracts (3)" },
    { id: "Bank Details", label: "Bank Details" },
    { id: "Documents", label: "Documents (12)" },
    { id: "Notes", label: "Notes" },
    { id: "Activity Log", label: "Activity Log" }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return <OverviewTab />;
      case "Contact Details":
        return <ContactDetailsTab />;
      case "Contracts":
        return <ContractsTab />;
      case "Bank Details":
        return <BankDetailsTab />;
      case "Documents":
        return <DocumentsTab />;
      case "Notes":
        return <NotesTab />;
      case "Activity Log":
        return <ActivityLogTab />;
      default:
        return <div className="p-4 bg-white border border-light rounded-3 mt-4 text-center text-secondary">Coming Soon</div>;
    }
  };

  return (
    <div className="d-flex position-relative">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="app-container w-100 min-vh-100 d-flex flex-column justify-content-between">
        <Header
          toggleSidebar={toggleSidebar}
          title="Emirates Airlines"
          subtitle={`Home > Suppliers > Emirates Airlines > ${activeTab}`}
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

        <main className="main-content d-flex flex-column gap-4 py-4">

          {/* Supplier Header */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
            <div className="d-flex align-items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg"
                alt="Emirates"
                style={{ width: "64px", height: "64px", objectFit: "contain" }}
              />
              <div className="d-flex flex-column gap-1">
                <div className="d-flex align-items-center gap-2">
                  <h2 className="fs-3 fw-800 m-0 text-dark">Emirates Airlines</h2>
                  <span className="badge rounded-2 fw-700 px-2 py-1" style={{ backgroundColor: "#E9F4EE", color: "#1E6C45" }}>Active</span>
                  <span className="badge rounded-2 fw-700 px-2 py-1" style={{ backgroundColor: "#EAF2FF", color: "#2B73F6" }}>Airline</span>
                </div>
                <div className="d-flex align-items-center gap-3 text-secondary fs-8 fw-500">
                  <span className="d-flex align-items-center gap-1">
                    <i className="bi bi-diagram-3"></i>
                    Supplier ID: SUP-001
                  </span>
                  <span>•</span>
                  <span className="d-flex align-items-center gap-1">
                    <i className="bi bi-calendar3"></i>
                    Since: 12 May 2022
                  </span>
                  <span>•</span>
                  <span className="d-flex align-items-center gap-1">
                    <i className="bi bi-geo-alt"></i>
                    Dubai, UAE
                  </span>
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-outline-secondary bg-white border-light rounded-3 px-3 py-2 fw-600 d-flex align-items-center gap-2 text-dark shadow-sm">
                <i className="bi bi-pencil"></i>
                <span>Edit Supplier</span>
              </button>
              <button className="btn btn-outline-secondary bg-white border-light rounded-3 px-3 py-2 fw-600 d-flex align-items-center gap-2 text-dark shadow-sm">
                <span>More Actions</span>
                <i className="bi bi-chevron-down ms-1" style={{ fontSize: "0.75rem" }}></i>
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="section-card border border-light p-4 bg-white">
            <div className="border-bottom border-light overflow-auto">
              <ul className="nav nav-tabs border-0 flex-nowrap" style={{ paddingBottom: "1px" }}>
                {tabs.map((tab) => (
                  <li className="nav-item" key={tab.id}>
                    <button
                      className={`nav-link border-0 bg-transparent  px-4 py-2 ${activeTab === tab.id ? 'active' : 'text-secondary'}`}
                      style={{
                        color: activeTab === tab.id ? "#1E6C45" : "inherit",
                        borderBottom: activeTab === tab.id ? "2px solid #1E6C45" : "2px solid #1E6C45",
                        whiteSpace: "nowrap"
                      }}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Tab Content Area */}
            <div>
              {renderTabContent()}
            </div>
          </div>



        </main>

        <Footer />
      </div>

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
