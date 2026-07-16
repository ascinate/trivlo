"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AddNewCustomerPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Personal Information
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneCode, setPhoneCode] = useState("+62");
  const [phone, setPhone] = useState("");
  const [altEmail, setAltEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [customerSince, setCustomerSince] = useState("");

  // Address Information
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // Communication Preferences
  const [emailNotif, setEmailNotif] = useState("");
  const [smsNotif, setSmsNotif] = useState("");
  const [whatsappNotif, setWhatsappNotif] = useState("");

  // Source Information
  const [source, setSource] = useState("");
  const [referredBy, setReferredBy] = useState("");

  // Sidebar: Additional Information
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [status, setStatus] = useState("Active");
  const [notes, setNotes] = useState("");

  // Sidebar: Preferences
  const [travelType, setTravelType] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  // Checkbox
  const [addAnother, setAddAnother] = useState(false);

  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSave = () => {
    // In a real app, save data to backend
    if (addAnother) {
      // Reset form
      setFullName(""); setEmail(""); setPhone(""); setAltEmail("");
      setDob(""); setGender(""); setCustomerType(""); setPreferredLanguage("");
      setCustomerSince(""); setCountry(""); setCity(""); setAddress("");
      setPostalCode(""); setEmailNotif(""); setSmsNotif(""); setWhatsappNotif("");
      setSource(""); setReferredBy(""); setTags([]); setNotes("");
      setTravelType(""); setBudgetRange(""); setSpecialRequests("");
      window.scrollTo(0, 0);
    } else {
      router.push("/customers");
    }
  };

  const actionButton = (
    <button
      className="btn text-white rounded-3 px-3 d-flex align-items-center gap-2"
      style={{ backgroundColor: "#112E24", height: "42px", fontWeight: "400" }}
      onClick={() => router.push("/customers/new")}
    >
      <i className="bi bi-plus-lg fs-6"></i>
      <span>New Customer</span>
      <i className="bi bi-chevron-down ms-1" style={{ fontSize: "0.75rem" }}></i>
    </button>
  );

  return (
    <>
      <style>{`
        /* Add Customer Form Styles */
        .form-section-heading {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 0.5rem;
          margin-bottom: 1.25rem;
        }
        .cust-form-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--secondary);
          text-transform: uppercase;
          margin-bottom: 0.4rem;
          display: block;
        }
        .cust-form-label .req {
          color: var(--danger);
          margin-left: 2px;
        }
        .cust-form-control,
        .cust-form-select {
          border-color: var(--border);
          border-radius: 10px;
          font-size: 0.85rem;
          height: 42px;
          font-weight: 500;
          color: var(--dark);
          padding-left: 1rem;
          width: 100%;
        }
        .cust-form-control:focus,
        .cust-form-select:focus {
          border-color: var(--secondary);
          box-shadow: 0 0 0 3px rgba(103, 126, 117, 0.1);
        }
        .cust-form-control::placeholder {
          color: #AEAEAE;
          font-weight: 400;
        }
        textarea.cust-form-control {
          height: auto;
          padding-top: 0.75rem;
        }
        .phone-input-group {
          display: flex;
          align-items: center;
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow: hidden;
          height: 42px;
          background-color: #fff;
        }
        .phone-input-group:focus-within {
          border-color: var(--secondary);
          box-shadow: 0 0 0 3px rgba(103, 126, 117, 0.1);
        }
        .phone-flag-btn {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0 0.75rem;
          border: none;
          background: none;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--dark);
          border-right: 1px solid var(--border);
          height: 100%;
          cursor: pointer;
          flex-shrink: 0;
        }
        .phone-flag-btn img {
          width: 22px;
          height: 15px;
          object-fit: cover;
          border-radius: 2px;
        }
        .phone-input-field {
          border: none;
          outline: none;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--dark);
          padding: 0 0.75rem;
          flex-grow: 1;
          height: 100%;
        }
        .phone-input-field::placeholder {
          color: #AEAEAE;
          font-weight: 400;
        }
        .sidebar-section-title {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--secondary);
          text-transform: uppercase;
          letter-spacing: 0.7px;
          margin-bottom: 1rem;
        }
        .sidebar-field-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--secondary);
          margin-bottom: 0.4rem;
          display: block;
        }
        .sidebar-field-label .req {
          color: var(--danger);
          margin-left: 2px;
        }
        .tags-input-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          border: 1px solid var(--border);
          padding: 0.4rem;
          border-radius: 10px;
          min-height: 42px;
          background-color: #fff;
          align-items: center;
        }
        .tags-input-container:focus-within {
          border-color: var(--secondary);
          box-shadow: 0 0 0 3px rgba(103, 126, 117, 0.1);
        }
        .tag-chip {
          background-color: #F3F4F6;
          color: var(--dark);
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }
        .tag-chip i {
          cursor: pointer;
          opacity: 0.7;
          font-size: 0.75rem;
        }
        .tag-chip i:hover {
          opacity: 1;
          color: var(--danger);
        }
        .tag-text-input {
          border: none;
          outline: none;
          font-size: 0.82rem;
          padding: 0.2rem;
          flex-grow: 1;
          min-width: 120px;
        }
        .tag-text-input::placeholder {
          color: #AEAEAE;
          font-weight: 400;
        }
        .tag-hint {
          font-size: 0.68rem;
          color: var(--secondary);
          margin-top: 0.3rem;
          font-style: italic;
          opacity: 0.8;
        }
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 6px;
        }
        .status-dot.active { background-color: #1E6C45; }
        .status-dot.inactive { background-color: #6B7280; }
        .footer-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          border-top: 1px solid var(--border);
          padding-top: 1.25rem;
          margin-top: 0.5rem;
        }
      `}</style>

      <div className="d-flex position-relative">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="app-container w-100 min-vh-100 d-flex flex-column justify-content-between">
          <Header
            toggleSidebar={toggleSidebar}
            title="Add New Customer"
            subtitle="Home > CRM > Customers > Add New Customer"
            forcePageHeaderLayout={true}
            searchPlaceholder="Search inquiries, customers, bookings, quotations..."
            actionButton={actionButton}
          />

          <main className="main-content d-flex flex-column gap-4 py-4">

            {/* Page subtitle */}
            <div>
              <p className="text-secondary fs-7 mt-0 mb-0">Fill in the details below to add a new customer.</p>
            </div>

            {/* Two-column layout */}
            <div className="row g-3">

              {/* Left Column — Main Form */}
              <div className="col-12 col-xl-8 d-flex flex-column gap-3">

                {/* Personal Information */}
                <div className="section-card border border-light p-4">
                  <h4 className="form-section-heading">Personal Information</h4>
                  <div className="row g-3">
                    {/* Full Name */}
                    <div className="col-12 col-md-4">
                      <label className="cust-form-label">Full Name <span className="req">*</span></label>
                      <input
                        type="text"
                        className="form-control cust-form-control"
                        placeholder="Enter full name"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                      />
                    </div>
                    {/* Email */}
                    <div className="col-12 col-md-4">
                      <label className="cust-form-label">Email <span className="req">*</span></label>
                      <input
                        type="email"
                        className="form-control cust-form-control"
                        placeholder="Enter email address"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>
                    {/* Phone */}
                    <div className="col-12 col-md-4">
                      <label className="cust-form-label">Phone <span className="req">*</span></label>
                      <div className="phone-input-group">
                        <button className="phone-flag-btn" type="button">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src="https://flagcdn.com/w40/id.png" alt="ID" />
                          <span>{phoneCode}</span>
                          <i className="bi bi-chevron-down" style={{ fontSize: "0.6rem" }}></i>
                        </button>
                        <input
                          type="text"
                          className="phone-input-field"
                          placeholder="812 3456 7890"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* Alternate Email */}
                    <div className="col-12 col-md-4">
                      <label className="cust-form-label">Alternate Email</label>
                      <input
                        type="email"
                        className="form-control cust-form-control"
                        placeholder="Enter alternate email"
                        value={altEmail}
                        onChange={e => setAltEmail(e.target.value)}
                      />
                    </div>
                    {/* DOB */}
                    <div className="col-12 col-md-4">
                      <label className="cust-form-label">Date of Birth</label>
                      <input
                        type="date"
                        className="form-control cust-form-control"
                        value={dob}
                        onChange={e => setDob(e.target.value)}
                      />
                    </div>
                    {/* Gender */}
                    <div className="col-12 col-md-4">
                      <label className="cust-form-label">Gender</label>
                      <select className="form-select cust-form-select" value={gender} onChange={e => setGender(e.target.value)}>
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    {/* Customer Type */}
                    <div className="col-12 col-md-4">
                      <label className="cust-form-label">Customer Type <span className="req">*</span></label>
                      <select className="form-select cust-form-select" value={customerType} onChange={e => setCustomerType(e.target.value)}>
                        <option value="">Select customer type</option>
                        <option value="Individual">Individual</option>
                        <option value="Family">Family</option>
                        <option value="Corporate">Corporate</option>
                        <option value="Couple">Couple</option>
                        <option value="Group">Group</option>
                      </select>
                    </div>
                    {/* Preferred Language */}
                    <div className="col-12 col-md-4">
                      <label className="cust-form-label">Preferred Language</label>
                      <select className="form-select cust-form-select" value={preferredLanguage} onChange={e => setPreferredLanguage(e.target.value)}>
                        <option value="">Select language</option>
                        <option value="English">English</option>
                        <option value="Indonesian">Indonesian</option>
                        <option value="Arabic">Arabic</option>
                        <option value="Mandarin">Mandarin</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Spanish">Spanish</option>
                      </select>
                    </div>
                    {/* Customer Since */}
                    <div className="col-12 col-md-4">
                      <label className="cust-form-label">Customer Since</label>
                      <input
                        type="date"
                        className="form-control cust-form-control"
                        value={customerSince}
                        onChange={e => setCustomerSince(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="section-card border border-light p-4">
                  <h4 className="form-section-heading">Address Information</h4>
                  <div className="row g-3">
                    {/* Country */}
                    <div className="col-12 col-md-4">
                      <label className="cust-form-label">Country <span className="req">*</span></label>
                      <select className="form-select cust-form-select" value={country} onChange={e => setCountry(e.target.value)}>
                        <option value="">Select country</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="UAE">UAE</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Thailand">Thailand</option>
                        <option value="Australia">Australia</option>
                        <option value="UK">United Kingdom</option>
                        <option value="USA">United States</option>
                        <option value="India">India</option>
                        <option value="Germany">Germany</option>
                      </select>
                    </div>
                    {/* City */}
                    <div className="col-12 col-md-4">
                      <label className="cust-form-label">City <span className="req">*</span></label>
                      <input
                        type="text"
                        className="form-control cust-form-control"
                        placeholder="Enter city"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                      />
                    </div>
                    {/* Address */}
                    <div className="col-12 col-md-4">
                      <label className="cust-form-label">Address <span className="req">*</span></label>
                      <input
                        type="text"
                        className="form-control cust-form-control"
                        placeholder="Enter full address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                      />
                    </div>
                    {/* Postal Code */}
                    <div className="col-12 col-md-4">
                      <label className="cust-form-label">Postal Code</label>
                      <input
                        type="text"
                        className="form-control cust-form-control"
                        placeholder="Enter postal code"
                        value={postalCode}
                        onChange={e => setPostalCode(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Communication Preferences */}
                <div className="section-card border border-light p-4">
                  <h4 className="form-section-heading">Communication Preferences</h4>
                  <div className="row g-3">
                    {/* Email Notifications */}
                    <div className="col-12 col-md-4">
                      <label className="cust-form-label">Email Notifications</label>
                      <select className="form-select cust-form-select" value={emailNotif} onChange={e => setEmailNotif(e.target.value)}>
                        <option value="">Select preference</option>
                        <option value="All">All notifications</option>
                        <option value="Important">Important only</option>
                        <option value="None">None</option>
                      </select>
                    </div>
                    {/* SMS Notifications */}
                    <div className="col-12 col-md-4">
                      <label className="cust-form-label">SMS Notifications</label>
                      <select className="form-select cust-form-select" value={smsNotif} onChange={e => setSmsNotif(e.target.value)}>
                        <option value="">Select preference</option>
                        <option value="All">All notifications</option>
                        <option value="Important">Important only</option>
                        <option value="None">None</option>
                      </select>
                    </div>
                    {/* WhatsApp Notifications */}
                    <div className="col-12 col-md-4">
                      <label className="cust-form-label">WhatsApp Notifications</label>
                      <select className="form-select cust-form-select" value={whatsappNotif} onChange={e => setWhatsappNotif(e.target.value)}>
                        <option value="">Select preference</option>
                        <option value="All">All notifications</option>
                        <option value="Important">Important only</option>
                        <option value="None">None</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Source Information */}
                <div className="section-card border border-light p-4">
                  <h4 className="form-section-heading">Source Information</h4>
                  <div className="row g-3">
                    {/* Source */}
                    <div className="col-12 col-md-6">
                      <label className="cust-form-label">Source <span className="req">*</span></label>
                      <select className="form-select cust-form-select" value={source} onChange={e => setSource(e.target.value)}>
                        <option value="">Select source</option>
                        <option value="Website">Website</option>
                        <option value="Referral">Referral</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Walk-in">Walk-in</option>
                        <option value="Cold Call">Cold Call</option>
                        <option value="Exhibition">Exhibition</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    {/* Referred By */}
                    <div className="col-12 col-md-6">
                      <label className="cust-form-label">Referred By</label>
                      <input
                        type="text"
                        className="form-control cust-form-control"
                        placeholder="Enter referrer name (if any)"
                        value={referredBy}
                        onChange={e => setReferredBy(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="footer-actions">
                  <div className="form-check">
                    <input
                      className="form-check-input shadow-none"
                      type="checkbox"
                      id="addAnotherCheck"
                      checked={addAnother}
                      onChange={e => setAddAnother(e.target.checked)}
                    />
                    <label className="form-check-label text-secondary fw-500" htmlFor="addAnotherCheck" style={{ fontSize: "0.85rem" }}>
                      Add another customer after saving
                    </label>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-outline-secondary bg-white border rounded-3 fw-600 px-4"
                      style={{ height: "42px", fontSize: "0.85rem" }}
                      onClick={() => router.push("/customers")}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn text-white rounded-3 px-4 fw-600 d-flex align-items-center gap-2"
                      style={{ backgroundColor: "#112E24", height: "42px", fontSize: "0.85rem" }}
                      onClick={handleSave}
                    >
                      <i className="bi bi-check-lg"></i>
                      <span>Save Customer</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Column — Sidebar Panels */}
              <div className="col-12 col-xl-4 d-flex flex-column gap-3">

                {/* Additional Information */}
                <div className="section-card border border-light p-4">
                  <h4 className="sidebar-section-title">Additional Information</h4>

                  {/* Tags */}
                  <div className="mb-3">
                    <label className="sidebar-field-label">Tags</label>
                    <div className="tags-input-container">
                      {tags.map(tag => (
                        <span key={tag} className="tag-chip">
                          {tag}
                          <i className="bi bi-x" onClick={() => handleRemoveTag(tag)}></i>
                        </span>
                      ))}
                      <input
                        type="text"
                        className="tag-text-input"
                        placeholder="Select or add tags"
                        value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                        onKeyDown={handleAddTag}
                      />
                    </div>
                    <span className="tag-hint">Press Enter to add tags</span>
                  </div>

                  {/* Status */}
                  <div className="mb-3">
                    <label className="sidebar-field-label">Status <span className="req">*</span></label>
                    <select
                      className="form-select cust-form-select"
                      value={status}
                      onChange={e => setStatus(e.target.value)}
                    >
                      <option value="Active">● Active</option>
                      <option value="Inactive">● Inactive</option>
                    </select>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="sidebar-field-label">Notes</label>
                    <textarea
                      className="form-control cust-form-control"
                      rows="4"
                      placeholder="Enter notes about the customer (optional)"
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      maxLength={500}
                    ></textarea>
                    <div className="text-end text-secondary mt-1" style={{ fontSize: "0.72rem" }}>{notes.length} / 500</div>
                  </div>
                </div>

                {/* Preferences */}
                <div className="section-card border border-light p-4">
                  <h4 className="sidebar-section-title">Preferences</h4>

                  {/* Preferred Travel Type */}
                  <div className="mb-3">
                    <label className="sidebar-field-label">Preferred Travel Type</label>
                    <select className="form-select cust-form-select" value={travelType} onChange={e => setTravelType(e.target.value)}>
                      <option value="">Select travel type</option>
                      <option value="Leisure">Leisure</option>
                      <option value="Business">Business</option>
                      <option value="Adventure">Adventure</option>
                      <option value="Luxury">Luxury</option>
                      <option value="Budget">Budget</option>
                      <option value="Family">Family</option>
                    </select>
                  </div>

                  {/* Budget Range */}
                  <div className="mb-3">
                    <label className="sidebar-field-label">Budget Range</label>
                    <select className="form-select cust-form-select" value={budgetRange} onChange={e => setBudgetRange(e.target.value)}>
                      <option value="">Select budget range</option>
                      <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                      <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                      <option value="$25,000+">$25,000+</option>
                    </select>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="sidebar-field-label">Special Requests / Preferences</label>
                    <textarea
                      className="form-control cust-form-control"
                      rows="4"
                      placeholder="Enter special requests or preferences (optional)"
                      value={specialRequests}
                      onChange={e => setSpecialRequests(e.target.value)}
                      maxLength={500}
                    ></textarea>
                    <div className="text-end text-secondary mt-1" style={{ fontSize: "0.72rem" }}>{specialRequests.length} / 500</div>
                  </div>
                </div>

              </div>

            </div>

          </main>
          <Footer />
        </div>

        {/* Overlay to click-close sidebar on mobile */}
        {sidebarOpen && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-lg-none"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)", zIndex: 995 }}
            onClick={toggleSidebar}
          ></div>
        )}
      </div>
    </>
  );
}
