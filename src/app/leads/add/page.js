"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

export default function AddLeadPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [validated, setValidated] = useState(false);
  const [addAnother, setAddAnother] = useState(false);

  // ── Personal Information ────────────────────────────────────────
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneCode, setPhoneCode] = useState("+62");
  const [phone, setPhone] = useState("");
  const [altEmail, setAltEmail] = useState("");
  const [waCode, setWaCode] = useState("+62");
  const [waPhone, setWaPhone] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState("");

  // ── Source & Destination ────────────────────────────────────────
  const [source, setSource] = useState("");
  const [hearAbout, setHearAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelers, setTravelers] = useState("");
  const [budget, setBudget] = useState("");

  // ── Additional ──────────────────────────────────────────────────
  const [purpose, setPurpose] = useState("");
  const [requirements, setRequirements] = useState("");
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  // ── Right sidebar ───────────────────────────────────────────────
  const [assignedTo, setAssignedTo] = useState("Sarah Johnson");
  const [status, setStatus] = useState("New");
  const [priority, setPriority] = useState("Medium");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // ── Lead Score computation (dynamic) ───────────────────────────
  const scoreItems = useMemo(() => {
    const profileFilled = [fullName, email, phone, company].filter(Boolean).length;
    const profileScore = Math.round((profileFilled / 4) * 20);

    const engagementFilled = [source, hearAbout].filter(Boolean).length;
    const engagementScore = Math.round((engagementFilled / 2) * 20);

    const budgetScore = budget ? 15 : 0;
    const travelScore = destination ? 20 : 0;
    const conversionScore = status === "Qualified" ? 10 : status === "New" ? 5 : 8;

    return {
      profile: Math.min(profileScore, 20),
      engagement: Math.min(engagementScore, 20),
      budget: budgetScore,
      travel: travelScore,
      conversion: conversionScore,
    };
  }, [fullName, email, phone, company, source, hearAbout, budget, destination, status]);

  const totalScore = Object.values(scoreItems).reduce((a, b) => a + b, 0);
  const scoreLabel = totalScore >= 80 ? "Excellent" : totalScore >= 60 ? "Good Potential" : totalScore >= 40 ? "Moderate" : "Low";
  const scoreColor = totalScore >= 80 ? "#1E6C45" : totalScore >= 60 ? "#B97C2B" : totalScore >= 40 ? "#3B82F6" : "#D05E5E";

  const scoreChartData = {
    datasets: [{
      data: [totalScore, 100 - totalScore],
      backgroundColor: [scoreColor, "#F0F0F0"],
      borderWidth: 0,
    }]
  };

  const scoreChartOptions = {
    cutout: "75%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } }
  };

  const handleTagKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tag) => setTags(tags.filter(t => t !== tag));

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    alert(`Lead "${fullName}" saved successfully!`);
    if (addAnother) {
      // reset form
      setValidated(false);
      setFullName(""); setEmail(""); setPhone(""); setAltEmail(""); setWaPhone("");
      setJobTitle(""); setCompany(""); setWebsite(""); setIndustry("");
      setSource(""); setHearAbout(""); setDestination(""); setTravelDate("");
      setTravelers(""); setBudget(""); setPurpose(""); setRequirements("");
      setNotes(""); setTags([]);
    } else {
      router.push("/leads");
    }
  };

  const COUNTRY_CODES = [
    { code: "+62", label: "🇮🇩 +62" },
    { code: "+1", label: "🇺🇸 +1" },
    { code: "+971", label: "🇦🇪 +971" },
    { code: "+65", label: "🇸🇬 +65" },
    { code: "+66", label: "🇹🇭 +66" },
    { code: "+61", label: "🇦🇺 +61" },
    { code: "+44", label: "🇬🇧 +44" },
    { code: "+81", label: "🇯🇵 +81" },
    { code: "+91", label: "🇮🇳 +91" },
    { code: "+49", label: "🇩🇪 +49" },
    { code: "+33", label: "🇫🇷 +33" },
    { code: "+60", label: "🇲🇾 +60" },
  ];

  const backButton = (
    <button
      className="btn btn-light border border-light shadow-sm rounded-3 px-3 fw-700 d-flex align-items-center gap-2"
      style={{ height: "42px", fontSize: "0.85rem" }}
      onClick={() => router.push("/leads")}
      id="btn-back-to-leads"
    >
      <i className="bi bi-arrow-left"></i>
      <span>Back to Leads</span>
    </button>
  );

  return (
    <div className="d-flex position-relative">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="app-container w-100 min-vh-100 d-flex flex-column justify-content-between">
        <Header
          toggleSidebar={toggleSidebar}
          hideWelcome={true}
          forcePageHeaderLayout={true}
          searchPlaceholder="Search inquiries, customers, bookings, quotations..."
          actionButton={backButton}
        />

        <main className="main-content d-flex flex-column gap-4 py-4">

          {/* Page Header */}
          <div>
            <span className="text-secondary fs-7 fw-500">Home &gt; CRM &gt; Leads &gt; Add Lead</span>
            <h1 className="fs-3 fw-800 text-dark m-0 mt-1">Add New Lead</h1>
            <p className="text-secondary fs-7 mt-1 mb-0">Fill in the details below to add a new lead.</p>
          </div>

          {/* Main grid: Form (left 8) + Widgets (right 4) */}
          <form className={validated ? "was-validated" : ""} noValidate onSubmit={handleSubmit}>
            <div className="row g-4">

              {/* ── Left column: Form sections ─────────────────────── */}
              <div className="col-12 col-xl-8">
                <div className="d-flex flex-column gap-4">

                  {/* Section 1: Personal Information */}
                  <div className="section-card border border-light p-4">
                    <h3 className="fw-800 text-dark fs-5 mb-4">Personal Information</h3>

                    <div className="row g-3">
                      {/* Full Name */}
                      <div className="col-md-4">
                        <label className="form-label fw-700 text-dark" style={{ fontSize: "0.82rem" }}>
                          Full Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control rounded-3 border-light shadow-sm bg-white"
                          placeholder="Enter full name"
                          required
                          value={fullName}
                          onChange={e => setFullName(e.target.value)}
                          style={{ height: "42px", fontSize: "0.88rem" }}
                        />
                        <div className="invalid-feedback" style={{ fontSize: "0.75rem" }}>Full name is required.</div>
                      </div>

                      {/* Email */}
                      <div className="col-md-4">
                        <label className="form-label fw-700 text-dark" style={{ fontSize: "0.82rem" }}>
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control rounded-3 border-light shadow-sm bg-white"
                          placeholder="Enter email address"
                          required
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          style={{ height: "42px", fontSize: "0.88rem" }}
                        />
                        <div className="invalid-feedback" style={{ fontSize: "0.75rem" }}>A valid email is required.</div>
                      </div>

                      {/* Phone */}
                      <div className="col-md-4">
                        <label className="form-label fw-700 text-dark" style={{ fontSize: "0.82rem" }}>
                          Phone <span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <select
                            className="form-select rounded-start-3 border-light shadow-sm bg-white fw-600"
                            style={{ maxWidth: "90px", height: "42px", fontSize: "0.82rem" }}
                            value={phoneCode}
                            onChange={e => setPhoneCode(e.target.value)}
                          >
                            {COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
                          </select>
                          <input
                            type="tel"
                            className="form-control rounded-end-3 border-light shadow-sm bg-white"
                            placeholder="812 3456 7890"
                            required
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            style={{ height: "42px", fontSize: "0.88rem" }}
                          />
                          <div className="invalid-feedback" style={{ fontSize: "0.75rem" }}>Phone is required.</div>
                        </div>
                      </div>

                      {/* Alternate Email */}
                      <div className="col-md-4">
                        <label className="form-label fw-700 text-dark" style={{ fontSize: "0.82rem" }}>Alternate Email</label>
                        <input
                          type="email"
                          className="form-control rounded-3 border-light shadow-sm bg-white"
                          placeholder="Enter alternate email"
                          value={altEmail}
                          onChange={e => setAltEmail(e.target.value)}
                          style={{ height: "42px", fontSize: "0.88rem" }}
                        />
                      </div>

                      {/* WhatsApp */}
                      <div className="col-md-4">
                        <label className="form-label fw-700 text-dark" style={{ fontSize: "0.82rem" }}>WhatsApp Number</label>
                        <div className="input-group">
                          <select
                            className="form-select rounded-start-3 border-light shadow-sm bg-white fw-600"
                            style={{ maxWidth: "90px", height: "42px", fontSize: "0.82rem" }}
                            value={waCode}
                            onChange={e => setWaCode(e.target.value)}
                          >
                            {COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
                          </select>
                          <input
                            type="tel"
                            className="form-control rounded-end-3 border-light shadow-sm bg-white"
                            placeholder="812 3456 7890"
                            value={waPhone}
                            onChange={e => setWaPhone(e.target.value)}
                            style={{ height: "42px", fontSize: "0.88rem" }}
                          />
                        </div>
                      </div>

                      {/* Job Title */}
                      <div className="col-md-4">
                        <label className="form-label fw-700 text-dark" style={{ fontSize: "0.82rem" }}>Job Title</label>
                        <input
                          type="text"
                          className="form-control rounded-3 border-light shadow-sm bg-white"
                          placeholder="Enter job title"
                          value={jobTitle}
                          onChange={e => setJobTitle(e.target.value)}
                          style={{ height: "42px", fontSize: "0.88rem" }}
                        />
                      </div>

                      {/* Company */}
                      <div className="col-md-4">
                        <label className="form-label fw-700 text-dark" style={{ fontSize: "0.82rem" }}>Company Name</label>
                        <input
                          type="text"
                          className="form-control rounded-3 border-light shadow-sm bg-white"
                          placeholder="Enter company name"
                          value={company}
                          onChange={e => setCompany(e.target.value)}
                          style={{ height: "42px", fontSize: "0.88rem" }}
                        />
                      </div>

                      {/* Website */}
                      <div className="col-md-4">
                        <label className="form-label fw-700 text-dark" style={{ fontSize: "0.82rem" }}>Website</label>
                        <div className="input-group">
                          <span className="input-group-text border-light bg-white text-secondary" style={{ borderRadius: "0.75rem 0 0 0.75rem" }}>
                            <i className="bi bi-globe2" style={{ fontSize: "0.85rem" }}></i>
                          </span>
                          <input
                            type="url"
                            className="form-control border-light shadow-sm bg-white"
                            style={{ borderRadius: "0 0.75rem 0.75rem 0", height: "42px", fontSize: "0.88rem" }}
                            placeholder="https://example.com"
                            value={website}
                            onChange={e => setWebsite(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Industry */}
                      <div className="col-md-4">
                        <label className="form-label fw-700 text-dark" style={{ fontSize: "0.82rem" }}>Industry</label>
                        <select
                          className="form-select rounded-3 border-light shadow-sm bg-white"
                          style={{ height: "42px", fontSize: "0.88rem" }}
                          value={industry}
                          onChange={e => setIndustry(e.target.value)}
                        >
                          <option value="">Select industry</option>
                          <option>Technology</option>
                          <option>Finance</option>
                          <option>Healthcare</option>
                          <option>Education</option>
                          <option>Travel & Tourism</option>
                          <option>Retail</option>
                          <option>Manufacturing</option>
                          <option>Real Estate</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Source & Destination */}
                  <div className="section-card border border-light p-4">
                    <h3 className="fw-800 text-dark fs-5 mb-4">Source &amp; Destination</h3>

                    <div className="row g-3">
                      {/* Lead Source */}
                      <div className="col-md-4">
                        <label className="form-label fw-700 text-dark" style={{ fontSize: "0.82rem" }}>
                          Lead Source <span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-select rounded-3 border-light shadow-sm bg-white"
                          required
                          style={{ height: "42px", fontSize: "0.88rem" }}
                          value={source}
                          onChange={e => setSource(e.target.value)}
                        >
                          <option value="">Select source</option>
                          <option>Website</option>
                          <option>Referral</option>
                          <option>Walk In</option>
                          <option>Social Media</option>
                          <option>Email Campaign</option>
                          <option>Google Ads</option>
                          <option>Facebook Ads</option>
                          <option>Trade Show</option>
                          <option>Cold Call</option>
                          <option>Other</option>
                        </select>
                        <div className="invalid-feedback" style={{ fontSize: "0.75rem" }}>Please select a source.</div>
                      </div>

                      {/* How did you hear */}
                      <div className="col-md-4">
                        <label className="form-label fw-700 text-dark" style={{ fontSize: "0.82rem" }}>How did you hear about us?</label>
                        <select
                          className="form-select rounded-3 border-light shadow-sm bg-white"
                          style={{ height: "42px", fontSize: "0.88rem" }}
                          value={hearAbout}
                          onChange={e => setHearAbout(e.target.value)}
                        >
                          <option value="">Select option</option>
                          <option>Google Search</option>
                          <option>Social Media</option>
                          <option>Friend / Colleague</option>
                          <option>Advertisement</option>
                          <option>Travel Magazine</option>
                          <option>Event / Exhibition</option>
                          <option>Other</option>
                        </select>
                      </div>

                      {/* Destination */}
                      <div className="col-md-4">
                        <label className="form-label fw-700 text-dark" style={{ fontSize: "0.82rem" }}>
                          Destination Interested In <span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-select rounded-3 border-light shadow-sm bg-white"
                          required
                          style={{ height: "42px", fontSize: "0.88rem" }}
                          value={destination}
                          onChange={e => setDestination(e.target.value)}
                        >
                          <option value="">Select destination</option>
                          <option>Bali, Indonesia</option>
                          <option>Dubai, UAE</option>
                          <option>Singapore</option>
                          <option>Bangkok, Thailand</option>
                          <option>Sydney, Australia</option>
                          <option>Tokyo, Japan</option>
                          <option>London, UK</option>
                          <option>Switzerland</option>
                          <option>Paris, France</option>
                          <option>Maldives</option>
                          <option>Other</option>
                        </select>
                        <div className="invalid-feedback" style={{ fontSize: "0.75rem" }}>Please select a destination.</div>
                      </div>

                      {/* Travel Date */}
                      <div className="col-md-4">
                        <label className="form-label fw-700 text-dark" style={{ fontSize: "0.82rem" }}>Preferred Travel Date</label>
                        <div className="input-group">
                          <span className="input-group-text border-light bg-white text-secondary" style={{ borderRadius: "0.75rem 0 0 0.75rem" }}>
                            <i className="bi bi-calendar3" style={{ fontSize: "0.85rem" }}></i>
                          </span>
                          <input
                            type="text"
                            className="form-control border-light shadow-sm bg-white"
                            style={{ borderRadius: "0 0.75rem 0.75rem 0", height: "42px", fontSize: "0.88rem" }}
                            placeholder="Select date range"
                            value={travelDate}
                            onFocus={e => e.target.type = "date"}
                            onBlur={e => { if (!e.target.value) e.target.type = "text"; }}
                            onChange={e => setTravelDate(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Travelers */}
                      <div className="col-md-4">
                        <label className="form-label fw-700 text-dark" style={{ fontSize: "0.82rem" }}>Number of Travelers</label>
                        <select
                          className="form-select rounded-3 border-light shadow-sm bg-white"
                          style={{ height: "42px", fontSize: "0.88rem" }}
                          value={travelers}
                          onChange={e => setTravelers(e.target.value)}
                        >
                          <option value="">Select number</option>
                          <option>1 Person</option>
                          <option>2 People</option>
                          <option>3 – 5 People</option>
                          <option>6 – 10 People</option>
                          <option>11 – 20 People</option>
                          <option>20+ People</option>
                        </select>
                      </div>

                      {/* Budget */}
                      <div className="col-md-4">
                        <label className="form-label fw-700 text-dark" style={{ fontSize: "0.82rem" }}>Budget Range</label>
                        <select
                          className="form-select rounded-3 border-light shadow-sm bg-white"
                          style={{ height: "42px", fontSize: "0.88rem" }}
                          value={budget}
                          onChange={e => setBudget(e.target.value)}
                        >
                          <option value="">Select budget range</option>
                          <option>Under $500</option>
                          <option>$500 – $1,000</option>
                          <option>$1,000 – $2,500</option>
                          <option>$2,500 – $5,000</option>
                          <option>$5,000 – $10,000</option>
                          <option>$10,000 – $25,000</option>
                          <option>$25,000+</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Additional Information */}
                  <div className="section-card border border-light p-4">
                    <h3 className="fw-800 text-dark fs-5 mb-4">Additional Information</h3>

                    <div className="row g-3">
                      {/* Travel Purpose */}
                      <div className="col-md-6">
                        <label className="form-label fw-700 text-dark" style={{ fontSize: "0.82rem" }}>Travel Purpose</label>
                        <select
                          className="form-select rounded-3 border-light shadow-sm bg-white"
                          style={{ height: "42px", fontSize: "0.88rem" }}
                          value={purpose}
                          onChange={e => setPurpose(e.target.value)}
                        >
                          <option value="">Select purpose</option>
                          <option>Leisure / Holiday</option>
                          <option>Honeymoon</option>
                          <option>Family Vacation</option>
                          <option>Business Trip</option>
                          <option>Adventure / Sports</option>
                          <option>Medical Tourism</option>
                          <option>Educational Tour</option>
                          <option>Group Tour</option>
                          <option>Other</option>
                        </select>
                      </div>

                      {/* Special Requirements */}
                      <div className="col-md-6">
                        <label className="form-label fw-700 text-dark" style={{ fontSize: "0.82rem" }}>Special Requirements</label>
                        <textarea
                          className="form-control rounded-3 border-light shadow-sm bg-white"
                          rows={3}
                          placeholder="Enter special requirements (optional)"
                          style={{ fontSize: "0.88rem" }}
                          value={requirements}
                          onChange={e => setRequirements(e.target.value)}
                        ></textarea>
                      </div>

                      {/* Notes */}
                      <div className="col-12">
                        <label className="form-label fw-700 text-dark" style={{ fontSize: "0.82rem" }}>Notes</label>
                        <textarea
                          className="form-control rounded-3 border-light shadow-sm bg-white"
                          rows={4}
                          maxLength={500}
                          placeholder="Enter notes about this lead (optional)"
                          style={{ fontSize: "0.88rem" }}
                          value={notes}
                          onChange={e => setNotes(e.target.value)}
                        ></textarea>
                        <div className="d-flex justify-content-end mt-1">
                          <span className="text-secondary" style={{ fontSize: "0.72rem" }}>{notes.length} / 500</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form Footer Actions */}
                  <div className="section-card border border-light p-4">
                    <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3">
                      {/* Add another */}
                      <div className="form-check mb-0">
                        <input
                          type="checkbox"
                          className="form-check-input shadow-none"
                          id="addAnother"
                          checked={addAnother}
                          onChange={e => setAddAnother(e.target.checked)}
                          style={{ width: "16px", height: "16px" }}
                        />
                        <label className="form-check-label text-secondary fw-600 ms-2" htmlFor="addAnother" style={{ fontSize: "0.85rem" }}>
                          Add another lead after saving
                        </label>
                      </div>

                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-light border border-light shadow-sm rounded-3 px-4 py-2 fw-700"
                          style={{ fontSize: "0.9rem" }}
                          onClick={() => router.push("/leads")}
                          id="btn-cancel-lead"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn text-white rounded-3 px-4 py-2 fw-700 d-flex align-items-center gap-2"
                          style={{ backgroundColor: "#112E24", fontSize: "0.9rem" }}
                          id="btn-save-lead"
                        >
                          <i className="bi bi-check-lg"></i>
                          Save Lead
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* ── Right column: Lead Score + Tags + Owner + Status ── */}
              <div className="col-12 col-xl-4">
                <div className="d-flex flex-column gap-3" style={{ position: "sticky", top: "100px" }}>

                  {/* Lead Score Preview */}
                  <div className="section-card border border-light p-4">
                    <h3 className="fw-800 text-dark fs-6 mb-4">Lead Score Preview</h3>

                    <div className="row align-items-center mb-3">
                      <div className="col-5 d-flex justify-content-center align-items-center position-relative" style={{ height: 110 }}>
                        <div style={{ width: 110, height: 110 }}>
                          <Doughnut data={scoreChartData} options={scoreChartOptions} />
                        </div>
                        <div className="position-absolute text-center" style={{ pointerEvents: "none" }}>
                          <span className="fw-800 text-dark d-block" style={{ fontSize: "1.6rem", lineHeight: 1 }}>{totalScore}</span>
                          <span className="text-secondary fw-600" style={{ fontSize: "0.62rem" }}>/100</span>
                        </div>
                      </div>
                      <div className="col-7">
                        <div className="d-flex flex-column gap-2" style={{ fontSize: "0.78rem" }}>
                          {[
                            { label: "Profile Completeness", max: 20, current: scoreItems.profile },
                            { label: "Engagement", max: 20, current: scoreItems.engagement },
                            { label: "Budget Fit", max: 15, current: scoreItems.budget },
                            { label: "Travel Intent", max: 20, current: scoreItems.travel },
                            { label: "Conversion Probability", max: 10, current: scoreItems.conversion },
                          ].map(item => (
                            <div key={item.label} className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center gap-2">
                                <span className="rounded-circle d-inline-block" style={{ width: 7, height: 7, backgroundColor: scoreColor }}></span>
                                <span className="text-secondary fw-500">{item.label}</span>
                              </div>
                              <span className="fw-700 text-dark">{item.current}/{item.max}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Score label */}
                    <div className="text-center">
                      <span className="badge px-3 py-2 rounded-2 fw-700 fs-8" style={{ backgroundColor: `${scoreColor}18`, color: scoreColor }}>
                        {scoreLabel}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="section-card border border-light p-4">
                    <h3 className="fw-800 text-dark fs-6 mb-3">Tags</h3>

                    {/* Tag chips */}
                    {tags.length > 0 && (
                      <div className="d-flex flex-wrap gap-2 mb-2">
                        {tags.map(tag => (
                          <span key={tag} className="badge rounded-2 px-2 py-2 fw-600 d-flex align-items-center gap-1" style={{ backgroundColor: "#E9F4EE", color: "#1E6C45", fontSize: "0.78rem" }}>
                            {tag}
                            <button type="button" className="btn p-0 border-0 bg-transparent" style={{ color: "#1E6C45", lineHeight: 1 }} onClick={() => removeTag(tag)}>
                              <i className="bi bi-x-lg" style={{ fontSize: "0.65rem" }}></i>
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    <select
                      className="form-select rounded-3 border-light shadow-sm bg-white mb-2"
                      style={{ height: "42px", fontSize: "0.88rem" }}
                      value=""
                      onChange={e => {
                        if (e.target.value && !tags.includes(e.target.value)) {
                          setTags([...tags, e.target.value]);
                        }
                      }}
                    >
                      <option value="">Add tags...</option>
                      {["Hot Lead", "Cold Lead", "VIP", "Referral", "Repeat Customer", "Honeymoon", "Family Trip", "Corporate", "Budget Traveler", "Luxury Traveler"].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>

                    <input
                      type="text"
                      className="form-control rounded-3 border-light shadow-sm bg-white"
                      placeholder="Press Enter to add tags"
                      style={{ height: "42px", fontSize: "0.88rem" }}
                      value={tagInput}
                      onChange={e => setTagInput(e.target.value)}
                      onKeyDown={handleTagKeyDown}
                    />
                  </div>

                  {/* Lead Owner */}
                  <div className="section-card border border-light p-4">
                    <h3 className="fw-800 text-dark fs-6 mb-3">Lead Owner</h3>

                    <label className="form-label fw-700 text-dark" style={{ fontSize: "0.82rem" }}>
                      Assigned To <span className="text-danger">*</span>
                    </label>
                    <div className="position-relative">
                      <div className="d-flex align-items-center gap-2 p-2 border border-light rounded-3 bg-white shadow-sm" style={{ cursor: "pointer" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&auto=format&fit=crop&q=80"
                          alt={assignedTo}
                          className="rounded-circle border"
                          style={{ width: 28, height: 28, objectFit: "cover" }}
                        />
                        <select
                          className="form-select border-0 bg-transparent p-0 shadow-none fw-700 text-dark"
                          required
                          style={{ height: "auto", fontSize: "0.88rem" }}
                          value={assignedTo}
                          onChange={e => setAssignedTo(e.target.value)}
                        >
                          <option>Sarah Johnson</option>
                          <option>Michael Lee</option>
                          <option>David Brown</option>
                          <option>Emma Williams</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Lead Status */}
                  <div className="section-card border border-light p-4">
                    <h3 className="fw-800 text-dark fs-6 mb-3">Lead Status</h3>

                    <div className="mb-3">
                      <label className="form-label fw-700 text-dark" style={{ fontSize: "0.82rem" }}>
                        Status <span className="text-danger">*</span>
                      </label>
                      <div className="d-flex align-items-center gap-2 border border-light rounded-3 bg-white shadow-sm px-3" style={{ height: "42px" }}>
                        <span className="rounded-circle" style={{ width: 8, height: 8, backgroundColor: status === "New" ? "#3B82F6" : status === "Contacted" ? "#D97706" : status === "Qualified" ? "#059669" : status === "Proposal Sent" ? "#7C3AED" : status === "Negotiation" ? "#DC2626" : "#9CA3AF" }}></span>
                        <select
                          className="form-select border-0 bg-transparent p-0 shadow-none fw-700 text-dark flex-grow-1"
                          required
                          style={{ height: "auto", fontSize: "0.88rem" }}
                          value={status}
                          onChange={e => setStatus(e.target.value)}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Qualified">Qualified</option>
                          <option value="Proposal Sent">Proposal Sent</option>
                          <option value="Negotiation">Negotiation</option>
                          <option value="Lost">Lost</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="form-label fw-700 text-dark" style={{ fontSize: "0.82rem" }}>Priority</label>
                      <div className="d-flex align-items-center gap-2 border border-light rounded-3 bg-white shadow-sm px-3" style={{ height: "42px" }}>
                        <span className="rounded-circle" style={{ width: 8, height: 8, backgroundColor: priority === "High" ? "#D05E5E" : priority === "Medium" ? "#E8A856" : "#1E6C45" }}></span>
                        <select
                          className="form-select border-0 bg-transparent p-0 shadow-none fw-700 text-dark flex-grow-1"
                          style={{ height: "auto", fontSize: "0.88rem" }}
                          value={priority}
                          onChange={e => setPriority(e.target.value)}
                        >
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </form>
        </main>

        <Footer />
      </div>

      {sidebarOpen && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-lg-none" style={{ backgroundColor: "rgba(0,0,0,0.4)", zIndex: 995 }} onClick={toggleSidebar}></div>
      )}
    </div>
  );
}
