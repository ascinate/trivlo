"use client";

import React, { useState } from 'react';

export default function AddSupplierModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('Active');

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        .custom-placeholder::placeholder {
          color: rgb(158, 186, 171) !important;
          font-size: 0.75rem !important;
        }
      `}</style>
      {/* Modal Backdrop */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50"
        style={{ zIndex: 1040 }}
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div
        className="position-fixed top-50 start-50 translate-middle bg-white rounded-4 shadow-lg d-flex flex-column"
        style={{ zIndex: 1050, width: '90%', maxWidth: '600px', maxHeight: '90vh', overflow: 'hidden' }}
      >
        {/* Header */}
        <div
          className="d-flex justify-content-between align-items-center px-4 py-3"
          style={{ backgroundColor: '#112E24', color: 'white' }}
        >
          <h2 className="m-0 fs-5 fw-600">Add New Supplier</h2>
          <button
            className="btn-close btn-close-white"
            onClick={onClose}
            aria-label="Close"
          ></button>
        </div>

        {/* Body */}
        <div className="p-4 overflow-y-auto" style={{ flex: '1 1 auto' }}>

          {/* 1. General Information */}
          <div className="mb-4">
            <h3 className="fs-6 fw-700 mb-3 text-dark">1. General Information</h3>

            <div className="mb-3">
              <label className="form-label fw-600 fs-8 text-dark">Supplier Name <span className="text-danger">*</span></label>
              <input type="text" className="form-control custom-placeholder" placeholder='e.g Supplier Name' style={{ ...inputStyle, }} />
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <div className="d-flex justify-content-between">
                  <label className="form-label fw-600 fs-8 text-dark">Category <span className="text-danger">*</span></label>

                </div>
                <div className="position-relative">
                  <select className="form-select" style={inputStyle}>
                    <option>Airlines</option>
                    <option>Hotels</option>
                    <option>Transfer Services</option>
                    <option>Visa & Docs</option>
                    <option>Insurance</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-600 fs-8 text-dark">Status</label>
                <div className="d-flex bg-light rounded-3 p-1 border border-light">
                  <button
                    className={`btn btn-sm flex-grow-1 rounded-3 fw-600 ${activeTab === 'Active' ? 'text-white' : 'text-secondary bg-transparent border-0'}`}
                    style={{ backgroundColor: activeTab === 'Active' ? '#2B845C' : 'transparent' }}
                    onClick={() => setActiveTab('Active')}
                  >
                    Active
                  </button>
                  <button
                    className={`btn btn-sm flex-grow-1 rounded-3 fw-600 ${activeTab === 'Inactive' ? 'text-white' : 'text-secondary bg-transparent border-0'}`}
                    style={{ backgroundColor: activeTab === 'Inactive' ? '#2B845C' : 'transparent' }}
                    onClick={() => setActiveTab('Inactive')}
                  >
                    Inactive
                  </button>
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-600 fs-8 text-dark">Country</label>
                <div className="input-group">
                  <span className="input-group-text border-end-0" style={{ backgroundColor: '#F6FAF8', borderColor: '#BDE0CE' }}>🇺🇸</span>
                  <select className="form-select border-start-0 ps-0" style={{ ...inputStyle, borderLeft: 'none' }}>
                    <option>United States</option>
                    <option>United Arab Emirates</option>
                    <option>Qatar</option>
                    <option>Singapore</option>
                    <option>Germany</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center gap-3">
                <div className="flex-grow-1">
                  <label className="form-label fw-600 fs-8 text-dark mb-1">Supplier Logo</label>
                  <div
                    className="rounded-3 d-flex flex-column align-items-center justify-content-center py-2 text-secondary"
                    style={{ border: '1px dashed #BDE0CE', backgroundColor: '#F6FAF8', cursor: 'pointer' }}
                  >
                    <i className="bi bi-camera fs-5 mb-1"></i>
                    <span className="fs-9 text-center" style={{ lineHeight: '1.2' }}>Click to Upload<br />or Drag & Drop</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-4 text-light" />

          {/* 2. Contact Information */}
          <div className="mb-4">
            <h3 className="fs-6 fw-700 mb-3 text-dark">2. Contact Information</h3>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label fw-600 fs-8 text-dark">Primary Contact Person</label>
                <input type="text" className="form-control custom-placeholder" placeholder='e.g Contact Person' style={{ ...inputStyle, }} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-600 fs-8 text-dark">Designation / Role</label>
                <input type="text" className="form-control custom-placeholder" placeholder='e.g Sales Manager' style={{ ...inputStyle, }} />
              </div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label fw-600 fs-8 text-dark">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text border-end-0 text-secondary" style={{ backgroundColor: '#F6FAF8', borderColor: '#BDE0CE' }}><i className="bi bi-envelope"></i></span>
                  <input type="email" className="form-control border-start-0 ps-0" style={{ ...inputStyle, borderLeft: 'none' }} />
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-600 fs-8 text-dark">Phone Number</label>
                <div className="input-group">
                  <span className="input-group-text border-end-0 text-secondary" style={{ backgroundColor: '#F6FAF8', borderColor: '#BDE0CE' }}><i className="bi bi-telephone"></i></span>
                  <input type="text" className="form-control border-start-0 ps-0 custom-placeholder" placeholder="Enter phone number" style={{ ...inputStyle, borderLeft: 'none' }} />
                </div>
              </div>
            </div>

            <button className="btn btn-sm text-white fw-600 px-3 py-2 mt-2" style={{ backgroundColor: '#112E24', borderRadius: '8px' }}>
              <i className="bi bi-plus-lg me-1"></i> Add Additional Contact
            </button>
          </div>

          <hr className="my-4 text-light" />

          {/* 3. Address Details */}
          <div>
            <h3 className="fs-6 fw-700 mb-3 text-dark">3. Address Details</h3>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label fw-600 fs-8 text-dark">Street Address</label>
                <input type="text" className="form-control" style={inputStyle} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-600 fs-8 text-dark">City</label>
                <input type="text" className="form-control" style={inputStyle} />
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-600 fs-8 text-dark">State / Region</label>
                <input type="text" className="form-control" style={inputStyle} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-600 fs-8 text-dark">Postal / Zip Code</label>
                <input type="text" className="form-control" style={inputStyle} />
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 px-4 border-top border-light d-flex justify-content-between align-items-center bg-white mt-auto">
          <button className="btn btn-light fw-600 px-4 py-2 border" onClick={onClose} style={{ borderRadius: '8px', color: '#333' }}>Cancel</button>
          <button className="btn text-white fw-600 px-4 py-2" style={{ backgroundColor: '#112E24', borderRadius: '8px' }}>Save Supplier</button>
        </div>
      </div>
    </>
  );
}

const inputStyle = {
  backgroundColor: '#F6FAF8',
  borderColor: '#BDE0CE',
  color: '#333'
};
