"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NewBookingPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [step, setStep] = useState(1);

  // Form States (for live summary updating)
  const [bookingType, setBookingType] = useState("Leisure Trip");
  const [bookingDate, setBookingDate] = useState("2025-05-20");
  const [bookingStatus, setBookingStatus] = useState("Confirmed");
  const [source, setSource] = useState("Website");
  const [salesExecutive, setSalesExecutive] = useState("Sarah Johnson");
  const [priority, setPriority] = useState("Medium");
  const [customerName, setCustomerName] = useState("John Doe");

  const [destination, setDestination] = useState("Bali, Indonesia");
  const [travelDates, setTravelDates] = useState("20 Jun 2025 - 25 Jun 2025");
  const [duration, setDuration] = useState("5 Days / 4 Nights");
  const [travelersCount, setTravelersCount] = useState("2 Adults");
  const [tripName, setTripName] = useState("Bali Leisure Trip - June 2025");
  const [groupName, setGroupName] = useState("Doe Family");
  const [specialRequests, setSpecialRequests] = useState("Sea view room preferred, near beach location.");

  const [currency, setCurrency] = useState("USD - US Dollar");
  const [baseAmount, setBaseAmount] = useState(12450.00);
  const [discount, setDiscount] = useState(500.00);
  const [tax, setTax] = useState(0.00);
  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");
  const [paymentStatus, setPaymentStatus] = useState("Paid");
  const [amountPaid, setAmountPaid] = useState(11950.00);

  const [tags, setTags] = useState(["VIP", "Frequent Traveler", "Family Trip"]);
  const [tagInput, setTagInput] = useState("");
  const [nextFollowUp, setNextFollowUp] = useState("2025-05-22");
  const [notes, setNotes] = useState("Customer prefers luxury resorts and private transfers.");

  // Step 2: Traveler details states
  const [travelers, setTravelers] = useState([
    {
      id: 1,
      title: "Mr.",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@gmail.com",
      phone: "+62 812 3456 7890",
      dob: "1988-02-12",
      passportNo: "C1234567",
      issuingCountry: "Indonesia",
      expiryDate: "2030-06-05",
      dietary: "None",
      mobility: "None",
      isLead: true
    },
    {
      id: 2,
      title: "Mrs.",
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@gmail.com",
      phone: "+62 812 9876 5432",
      dob: "1990-03-15",
      passportNo: "C7654321",
      issuingCountry: "Indonesia",
      expiryDate: "2030-06-05",
      dietary: "None",
      mobility: "None",
      isLead: false
    }
  ]);

  // Step 3: Flight selections states
  const [selectedFlightId, setSelectedFlightId] = useState("flight-2"); // Qatar selected by default as in screenshot
  const [serviceTab, setServiceTab] = useState("Flights");
  const [flightTripType, setFlightTripType] = useState("Round Trip");
  const [flightFrom, setFlightFrom] = useState("DPS - Bali, Indonesia");
  const [flightTo, setFlightTo] = useState("DXB - Dubai, UAE");
  const [flightDeparture, setFlightDeparture] = useState("2025-06-20");
  const [flightReturn, setFlightReturn] = useState("2025-06-25");

  const totalAmount = useMemo(() => {
    return Number(baseAmount) - Number(discount) + Number(tax);
  }, [baseAmount, discount, tax]);

  const balance = useMemo(() => {
    return totalAmount - Number(amountPaid);
  }, [totalAmount, amountPaid]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

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

  const updateTravelerField = (index, field, value) => {
    const updated = [...travelers];
    updated[index][field] = value;
    setTravelers(updated);
  };

  const headerTitle = useMemo(() => {
    return "New Booking";
  }, []);

  const headerSubtitle = useMemo(() => {
    if (step === 1) return "Create a new booking for your customer.";
    if (step === 2) return "Enter traveler details for the booking.";
    if (step === 3) return "Add services and extras for this booking.";
    return "Review your booking details and confirm.";
  }, [step]);

  const actionButton = (
    <button
      className="btn text-white rounded-3 px-3 d-flex align-items-center gap-2"
      style={{ backgroundColor: "#112E24", height: "42px", fontWeight: "400" }}
      onClick={() => router.push("/bookings/new")}
    >
      <i className="bi bi-plus-lg fs-6"></i>
      <span>New Booking</span>
      <i className="bi bi-chevron-down ms-1" style={{ fontSize: "0.75rem" }}></i>
    </button>
  );

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      // Step 4 "Confirm Booking" navigates to confirmed detail screen
      router.push("/bookings/BK-1256");
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    } else {
      router.push("/bookings");
    }
  };

  return (
    <>
      <style>{`
        /* Progress Steps */
        .step-wrapper { display: flex; align-items: center; justify-content: center; width: 100%; margin-bottom: 2rem; flex-wrap: wrap; gap: 0.5rem 1rem; }
        .step-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.88rem; font-weight: 600; color: var(--secondary); cursor: pointer; }
        .step-item.completed { color: #1E6C45; }
        .step-item.active { color: var(--dark); }
        .step-circle { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.78rem; font-weight: 700; }
        .step-circle.completed { background-color: #E9F4EE; color: #1E6C45; }
        .step-circle.active { background-color: #112E24; color: #FFFFFF; }
        .step-circle.pending { background-color: #F3F4F6; color: var(--secondary); border: 1px solid var(--border); }
        .step-line { flex-grow: 1; height: 2px; background-color: var(--border); max-width: 80px; min-width: 20px; }
        .step-line.completed { background-color: #E9F4EE; }

        /* Card Section Styles */
        .section-icon-container { width: 40px; height: 40px; border-radius: 50%; background-color: #E9F4EE; color: #1E6C45; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0; }
        .section-header-title { display: flex; align-items: center; gap: 0.75rem; margin: 0; font-size: 1.05rem; font-weight: 600; color: var(--primary); }
        .form-section-title { font-size: 0.82rem; font-weight: 700; color: var(--secondary); text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem; margin-bottom: 1.25rem; }

        /* Form styling */
        .form-label { font-size: 0.78rem; font-weight: 700; color: var(--secondary); text-transform: uppercase; margin-bottom: 0.4rem; display: block; }
        .form-label .required { color: var(--danger); margin-left: 2px; }
        .form-control, .form-select { border-color: var(--border); border-radius: 10px; font-size: 0.85rem; height: 42px; font-weight: 500; color: var(--dark); padding-left: 1rem; }
        .form-control:focus, .form-select:focus { border-color: var(--secondary); box-shadow: 0 0 0 3px rgba(103, 126, 117, 0.1); }
        textarea.form-control { height: auto; padding-top: 0.75rem; }

        /* Grids & Info Items in Step 4 */
        .review-info-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.25rem 2rem; }
        .review-info-item label { font-size: 0.72rem; font-weight: 700; color: var(--secondary); text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 3px; }
        .review-info-item span { font-size: 0.88rem; font-weight: 600; color: var(--dark); }
        .review-badge { background-color: #F3F4F6; color: #4B5563; font-size: 0.75rem; padding: 0.2rem 0.6rem; border-radius: 6px; font-weight: 700; text-transform: uppercase; }
        .review-badge.paid { background-color: #E9F4EE; color: #1E6C45; }

        /* Travelers Card Style */
        .traveler-detail-card { border: 1px solid var(--border); border-radius: 14px; padding: 1.25rem; background-color: #FFF; }
        .traveler-detail-title { font-size: 0.9rem; font-weight: 700; color: var(--dark); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem; }
        .traveler-detail-num { width: 24px; height: 24px; border-radius: 50%; background-color: #112E24; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; }
        .traveler-item-row { display: flex; align-items: center; gap: 0.75rem; font-size: 0.85rem; color: var(--secondary); margin-bottom: 0.5rem; }
        .traveler-item-row:last-child { margin-bottom: 0; }
        .traveler-item-row i { font-size: 0.95rem; color: var(--secondary); opacity: 0.8; width: 16px; text-align: center; }

        /* Services Tab layout */
        .service-nav-tab { background: none; border: none; border-bottom: 2.5px solid transparent; padding: 0.6rem 1rem; font-size: 0.88rem; font-weight: 700; color: var(--secondary); cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: color 0.15s; }
        .service-nav-tab.active { color: #112E24; border-bottom-color: #112E24; }
        .service-nav-tab:hover:not(.active) { color: var(--dark); }

        /* Flight Results Styles */
        .flight-row { border: 1px solid var(--border); border-radius: 14px; padding: 1.25rem; margin-bottom: 1rem; display: flex; align-items: center; justify-content: space-between; transition: all 0.2s ease; background-color: #fff; flex-wrap: wrap; gap: 1rem; }
        .flight-row.selected { border-color: #1E6C45; background-color: #F4FAF7; box-shadow: 0 4px 15px rgba(30, 108, 69, 0.04); }
        .flight-carrier-logo { width: 50px; height: 50px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; color: #fff; }
        .flight-segment { display: flex; align-items: center; gap: 1.5rem; }
        .flight-time-block h5 { font-size: 1.05rem; font-weight: 700; color: var(--dark); margin: 0; }
        .flight-time-block span { font-size: 0.72rem; color: var(--secondary); font-weight: 600; }
        .flight-duration-line { display: flex; flex-direction: column; align-items: center; position: relative; min-width: 100px; }
        .flight-duration-line span { font-size: 0.68rem; color: var(--secondary); font-weight: 500; }
        .flight-line-visual { width: 100%; height: 1.5px; background-color: var(--border); position: relative; margin: 4px 0; }
        .flight-line-visual::after { content: ''; width: 6px; height: 6px; border-radius: 50%; background-color: var(--secondary); position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); }

        /* Service review rows */
        .service-row { display: flex; align-items: center; justify-content: space-between; padding: 1rem 0; border-bottom: 1px solid var(--border); }
        .service-row:last-child { border-bottom: none; padding-bottom: 0; }
        .service-row:first-child { padding-top: 0; }
        .service-details { display: flex; align-items: center; gap: 1rem; }
        .service-icon-box { width: 36px; height: 36px; border-radius: 10px; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; color: var(--secondary); font-size: 1rem; flex-shrink: 0; }

        /* Sidebar summary card details */
        .sidebar-summary-item { display: flex; align-items: center; gap: 0.75rem; font-size: 0.85rem; color: var(--secondary); margin-bottom: 0.75rem; }
        .sidebar-summary-item:last-child { margin-bottom: 0; }
        .sidebar-summary-item i { font-size: 0.95rem; color: var(--secondary); width: 16px; text-align: center; }

        .price-summary-row { display: flex; justify-content: space-between; font-size: 0.88rem; color: var(--secondary); margin-bottom: 0.6rem; }
        .price-summary-row.total { font-size: 1.15rem; font-weight: 700; color: var(--dark); border-top: 1px dashed var(--border); padding-top: 0.75rem; margin-top: 0.75rem; }

        /* Booking Progress Checklist */
        .progress-timeline { display: flex; flex-direction: column; gap: 1rem; }
        .timeline-step { display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; }
        .timeline-step-label { display: flex; align-items: center; gap: 0.6rem; font-weight: 600; color: var(--secondary); }
        .timeline-step-label.completed { color: #1E6C45; }
        .timeline-step-label.active { color: var(--dark); }
        .timeline-step-status { font-weight: 600; color: var(--secondary); }
        .timeline-step-status.completed { color: var(--secondary); }
        .timeline-step-status.active { color: #1E6C45; }

        /* Tag system */
        .tags-container { display: flex; flex-wrap: wrap; gap: 0.4rem; border: 1px solid var(--border); padding: 0.4rem; border-radius: 10px; min-height: 42px; background-color: #fff; align-items: center; }
        .tag-badge { background-color: #F3F4F6; color: var(--dark); font-size: 0.78rem; font-weight: 600; padding: 0.2rem 0.6rem; border-radius: 6px; display: inline-flex; align-items: center; gap: 0.35rem; }
        .tag-badge i { cursor: pointer; opacity: 0.7; font-size: 0.75rem; }
        .tag-badge i:hover { opacity: 1; color: var(--danger); }
        .tag-input { border: none; outline: none; font-size: 0.82rem; padding: 0.2rem; flex-grow: 1; }
      `}</style>

      <div className="d-flex position-relative">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="app-container w-100 min-vh-100 d-flex flex-column justify-content-between">
          <Header
            toggleSidebar={toggleSidebar}
            title={headerTitle}
            subtitle={headerSubtitle}
            forcePageHeaderLayout={true}
            searchPlaceholder="Search inquiries, customers, bookings, quotations..."
            actionButton={actionButton}
          />

          <main className="main-content d-flex flex-column gap-4 py-4">
            
            {/* Step Progress Tracker */}
            <div className="section-card border border-light p-3">
              <div className="step-wrapper">
                {/* Step 1 */}
                <div className="step-item" onClick={() => setStep(1)}>
                  <span className={`step-circle ${step > 1 ? "completed" : step === 1 ? "active" : "pending"}`}>
                    {step > 1 ? <i className="bi bi-check-lg"></i> : "1"}
                  </span>
                  <span>Booking Details</span>
                </div>
                <div className={`step-line ${step > 1 ? "completed" : ""}`}></div>
                
                {/* Step 2 */}
                <div className="step-item" onClick={() => step > 1 && setStep(2)}>
                  <span className={`step-circle ${step > 2 ? "completed" : step === 2 ? "active" : "pending"}`}>
                    {step > 2 ? <i className="bi bi-check-lg"></i> : "2"}
                  </span>
                  <span>Travelers</span>
                </div>
                <div className={`step-line ${step > 2 ? "completed" : ""}`}></div>

                {/* Step 3 */}
                <div className="step-item" onClick={() => step > 2 && setStep(3)}>
                  <span className={`step-circle ${step > 3 ? "completed" : step === 3 ? "active" : "pending"}`}>
                    {step > 3 ? <i className="bi bi-check-lg"></i> : "3"}
                  </span>
                  <span>Services</span>
                </div>
                <div className={`step-line ${step > 3 ? "completed" : ""}`}></div>

                {/* Step 4 */}
                <div className="step-item" onClick={() => step > 3 && setStep(4)}>
                  <span className={`step-circle ${step === 4 ? "active" : "pending"}`}>
                    4
                  </span>
                  <span>Review & Confirm</span>
                </div>
              </div>
            </div>

            {/* Layout Columns */}
            <div className="row g-3">
              
              {/* Left Column - Active Step Forms (8 Columns) */}
              <div className="col-12 col-xl-8 d-flex flex-column gap-3">
                
                {/* STEP 1: BOOKING DETAILS FORM */}
                {step === 1 && (
                  <>
                    {/* Booking Information */}
                    <div className="section-card border border-light p-4">
                      <h4 className="form-section-title">Booking Information</h4>
                      <div className="row g-3">
                        <div className="col-12 col-md-6">
                          <label className="form-label">Booking Type <span className="required">*</span></label>
                          <select className="form-select" value={bookingType} onChange={e => setBookingType(e.target.value)}>
                            <option value="Leisure Trip">Leisure Trip</option>
                            <option value="Business Trip">Business Trip</option>
                            <option value="Family Vacation">Family Vacation</option>
                            <option value="Honeymoon">Honeymoon</option>
                          </select>
                        </div>
                        <div className="col-12 col-md-6">
                          <label className="form-label">Booking Date <span className="required">*</span></label>
                          <input type="date" className="form-control" value={bookingDate} onChange={e => setBookingDate(e.target.value)} />
                        </div>
                        <div className="col-12 col-md-6">
                          <label className="form-label">Status <span className="required">*</span></label>
                          <select className="form-select" value={bookingStatus} onChange={e => setBookingStatus(e.target.value)}>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                        <div className="col-12 col-md-6">
                          <label className="form-label">Booking ID</label>
                          <input type="text" className="form-control" value="AUTO-GENERATED" disabled style={{ backgroundColor: "#F3F4F6" }} />
                        </div>
                        <div className="col-12 col-md-6">
                          <label className="form-label">Source <span className="required">*</span></label>
                          <select className="form-select" value={source} onChange={e => setSource(e.target.value)}>
                            <option value="Website">Website</option>
                            <option value="Referral">Referral</option>
                            <option value="Cold Call">Cold Call</option>
                          </select>
                        </div>
                        <div className="col-12 col-md-6">
                          <label className="form-label">Sales Executive <span className="required">*</span></label>
                          <select className="form-select" value={salesExecutive} onChange={e => setSalesExecutive(e.target.value)}>
                            <option value="Sarah Johnson">Sarah Johnson</option>
                            <option value="John Smith">John Smith</option>
                            <option value="Michael Lee">Michael Lee</option>
                          </select>
                        </div>
                        <div className="col-12 col-md-6">
                          <label className="form-label">Priority</label>
                          <select className="form-select" value={priority} onChange={e => setPriority(e.target.value)}>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Low">Low</option>
                          </select>
                        </div>
                        <div className="col-12 col-md-6">
                          <label className="form-label">Customer <span className="required">*</span></label>
                          <select className="form-select" value={customerName} onChange={e => setCustomerName(e.target.value)}>
                            <option value="John Doe">John Doe (CUST-1024)</option>
                            <option value="Emma Watson">Emma Watson (CUST-0987)</option>
                            <option value="Sarah Mitchell">Sarah Mitchell (CUST-0598)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Trip Information */}
                    <div className="section-card border border-light p-4">
                      <h4 className="form-section-title">Trip Information</h4>
                      <div className="row g-3">
                        <div className="col-12 col-md-6">
                          <label className="form-label">Destination(s) <span className="required">*</span></label>
                          <div className="input-group">
                            <input type="text" className="form-control" value={destination} onChange={e => setDestination(e.target.value)} />
                            <button className="btn btn-outline-secondary border-light-subtle" type="button" onClick={() => setDestination("")}><i className="bi bi-x-lg text-secondary"></i></button>
                            <button className="btn text-white px-3" type="button" style={{ backgroundColor: "#112E24", fontSize: "0.82rem" }}>+ Add More</button>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <label className="form-label">Travel Dates <span className="required">*</span></label>
                          <div className="input-group">
                            <input type="text" className="form-control" value={travelDates} onChange={e => setTravelDates(e.target.value)} />
                            <span className="input-group-text bg-light text-secondary fw-700" style={{ fontSize: "0.78rem" }}>5D / 4N</span>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <label className="form-label">Purpose of Travel</label>
                          <select className="form-select" value={bookingType} onChange={e => setBookingType(e.target.value)}>
                            <option value="Leisure Trip">Leisure Trip</option>
                            <option value="Business">Business</option>
                            <option value="Vacation">Vacation</option>
                          </select>
                        </div>
                        <div className="col-12 col-md-6">
                          <label className="form-label">Trip Name (For Internal Use)</label>
                          <input type="text" className="form-control" value={tripName} onChange={e => setTripName(e.target.value)} />
                        </div>
                        <div className="col-12 col-md-6">
                          <label className="form-label">Group / Family Name</label>
                          <input type="text" className="form-control" value={groupName} onChange={e => setGroupName(e.target.value)} />
                        </div>
                        <div className="col-12">
                          <label className="form-label">Special Requests</label>
                          <textarea className="form-control" rows="3" value={specialRequests} onChange={e => setSpecialRequests(e.target.value)} maxLength={500}></textarea>
                          <div className="text-end small text-secondary mt-1">{specialRequests.length} / 500</div>
                        </div>
                      </div>
                    </div>

                    {/* Financial Information */}
                    <div className="section-card border border-light p-4">
                      <h4 className="form-section-title">Financial Information</h4>
                      <div className="row g-3">
                        <div className="col-12 col-md-6">
                          <label className="form-label">Currency <span className="required">*</span></label>
                          <select className="form-select" value={currency} onChange={e => setCurrency(e.target.value)}>
                            <option value="USD - US Dollar">USD - US Dollar</option>
                            <option value="EUR - Euro">EUR - Euro</option>
                            <option value="IDR - Indonesian Rupiah">IDR - Indonesian Rupiah</option>
                          </select>
                        </div>
                        <div className="col-12 col-md-6">
                          <label className="form-label">Base Amount <span className="required">*</span></label>
                          <input type="number" className="form-control" value={baseAmount} onChange={e => setBaseAmount(Number(e.target.value))} />
                        </div>
                        <div className="col-12 col-md-6">
                          <label className="form-label">Discount</label>
                          <input type="number" className="form-control" value={discount} onChange={e => setDiscount(Number(e.target.value))} />
                        </div>
                        <div className="col-12 col-md-6">
                          <label className="form-label">Tax</label>
                          <input type="number" className="form-control" value={tax} onChange={e => setTax(Number(e.target.value))} />
                        </div>
                        <div className="col-12 col-md-6">
                          <label className="form-label">Total Amount</label>
                          <div className="p-3 bg-light border rounded-3 fw-700 text-success" style={{ fontSize: "1.1rem" }}>
                            ${totalAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <label className="form-label">Payment Method</label>
                          <select className="form-select" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Cash">Cash</option>
                          </select>
                        </div>
                        <div className="col-12 col-md-6">
                          <label className="form-label">Payment Status <span className="required">*</span></label>
                          <select className="form-select" value={paymentStatus} onChange={e => setPaymentStatus(e.target.value)}>
                            <option value="Paid">Paid</option>
                            <option value="Pending">Pending</option>
                            <option value="Partially Paid">Partially Paid</option>
                          </select>
                        </div>
                        <div className="col-12 col-md-6">
                          <label className="form-label">Amount Paid</label>
                          <input type="number" className="form-control" value={amountPaid} onChange={e => setAmountPaid(Number(e.target.value))} />
                        </div>
                      </div>
                    </div>

                    {/* Other Information */}
                    <div className="section-card border border-light p-4">
                      <h4 className="form-section-title">Other Information</h4>
                      <div className="row g-3">
                        <div className="col-12 col-md-6">
                          <label className="form-label">Tags</label>
                          <div className="tags-container">
                            {tags.map(tag => (
                              <span key={tag} className="tag-badge">
                                {tag}
                                <i className="bi bi-x" onClick={() => handleRemoveTag(tag)}></i>
                              </span>
                            ))}
                            <input
                              type="text"
                              className="tag-input"
                              placeholder="+ Add Tag (Press Enter)"
                              value={tagInput}
                              onChange={e => setTagInput(e.target.value)}
                              onKeyDown={handleAddTag}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <label className="form-label">Next Follow Up</label>
                          <input type="date" className="form-control" value={nextFollowUp} onChange={e => setNextFollowUp(e.target.value)} />
                        </div>
                        <div className="col-12">
                          <label className="form-label">Notes</label>
                          <textarea className="form-control" rows="3" value={notes} onChange={e => setNotes(e.target.value)} maxLength={500}></textarea>
                          <div className="text-end small text-secondary mt-1">{notes.length} / 500</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* STEP 2: TRAVELERS FORM */}
                {step === 2 && (
                  <>
                    <div className="section-card border border-light p-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="m-0 text-dark fw-700" style={{ fontSize: "1.05rem" }}>Traveler Information</h4>
                        <button className="btn text-white rounded-3 px-3 d-flex align-items-center gap-2" style={{ backgroundColor: "#112E24", height: "38px", fontSize: "0.85rem" }}>
                          <i className="bi bi-plus-lg"></i>
                          <span>Add New Traveler</span>
                          <i className="bi bi-chevron-right ms-1" style={{ fontSize: "0.7rem" }}></i>
                        </button>
                      </div>

                      {/* Travelers Table list (mock) */}
                      <div className="table-responsive mb-4" style={{ border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden" }}>
                        <table className="table table-hover align-middle mb-0 text-start">
                          <thead className="bg-light">
                            <tr className="border-bottom border-light">
                              <th className="py-3 px-3" style={{ width: 40 }}><input type="checkbox" className="form-check-input shadow-none" checked readOnly /></th>
                              <th className="py-3 lablename">Traveler Name</th>
                              <th className="py-3 lablename">Gender</th>
                              <th className="py-3 lablename">DOB</th>
                              <th className="py-3 lablename">Passport No.</th>
                              <th className="py-3 lablename">Nationality</th>
                              <th className="py-3 lablename text-end px-3">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {travelers.map(t => (
                              <tr key={t.id} className="border-bottom border-light">
                                <td className="px-3"><input type="checkbox" className="form-check-input shadow-none" checked readOnly /></td>
                                <td className="fw-700 text-dark" style={{ fontSize: "0.85rem" }}>{t.title} {t.firstName} {t.lastName} {t.isLead && <span className="badge bg-light text-success border border-success-subtle ms-1 fw-700" style={{ fontSize: "0.62rem" }}>Lead</span>}</td>
                                <td className="text-secondary fw-500" style={{ fontSize: "0.82rem" }}>{t.title === "Mr." ? "Male" : "Female"}</td>
                                <td className="text-secondary fw-500" style={{ fontSize: "0.82rem" }}>{t.dob}</td>
                                <td className="text-dark fw-600" style={{ fontSize: "0.82rem" }}>{t.passportNo}</td>
                                <td className="text-dark fw-600" style={{ fontSize: "0.82rem" }}>{t.issuingCountry}</td>
                                <td className="text-end px-3">
                                  <div className="d-inline-flex gap-2">
                                    <button className="btn btn-link p-0 text-secondary fw-600 d-flex align-items-center gap-1 text-decoration-none" style={{ fontSize: "0.82rem" }}>
                                      <i className="bi bi-pencil" style={{ fontSize: "0.75rem" }}></i> Edit
                                    </button>
                                    <span className="text-secondary" style={{ opacity: 0.4 }}>|</span>
                                    <button className="btn btn-link p-0 text-danger fw-600 d-flex align-items-center gap-1 text-decoration-none" style={{ fontSize: "0.82rem" }}>
                                      <i className="bi bi-trash" style={{ fontSize: "0.75rem" }}></i> Remove
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Side-by-Side Traveler details forms */}
                      <div className="row g-3">
                        {travelers.map((t, idx) => (
                          <div className="col-12 col-md-6" key={t.id}>
                            <div className="traveler-detail-card">
                              <h5 className="traveler-detail-title">
                                <span className="traveler-detail-num">{idx + 1}</span>
                                <span>Traveler Details Form</span>
                              </h5>

                              <div className="row g-2">
                                <div className="col-12">
                                  <label className="form-label">Title</label>
                                  <select className="form-select" value={t.title} onChange={e => updateTravelerField(idx, "title", e.target.value)}>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Mrs.">Mrs.</option>
                                    <option value="Ms.">Ms.</option>
                                  </select>
                                </div>
                                <div className="col-6">
                                  <label className="form-label">First Name</label>
                                  <input type="text" className="form-control" value={t.firstName} onChange={e => updateTravelerField(idx, "firstName", e.target.value)} />
                                </div>
                                <div className="col-6">
                                  <label className="form-label">Last Name</label>
                                  <input type="text" className="form-control" value={t.lastName} onChange={e => updateTravelerField(idx, "lastName", e.target.value)} />
                                </div>
                                <div className="col-12">
                                  <label className="form-label">Email</label>
                                  <input type="email" className="form-control" value={t.email} onChange={e => updateTravelerField(idx, "email", e.target.value)} />
                                </div>
                                <div className="col-12">
                                  <label className="form-label">Phone</label>
                                  <input type="text" className="form-control" value={t.phone} onChange={e => updateTravelerField(idx, "phone", e.target.value)} />
                                </div>
                                <div className="col-12">
                                  <label className="form-label">DOB</label>
                                  <input type="date" className="form-control" value={t.dob} onChange={e => updateTravelerField(idx, "dob", e.target.value)} />
                                </div>
                                <div className="col-12">
                                  <label className="form-label">Passport Details</label>
                                  <input type="text" className="form-control" value={t.passportNo} onChange={e => updateTravelerField(idx, "passportNo", e.target.value)} />
                                </div>
                                <div className="col-6">
                                  <label className="form-label">Issuing Country</label>
                                  <select className="form-select" value={t.issuingCountry} onChange={e => updateTravelerField(idx, "issuingCountry", e.target.value)}>
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="UAE">UAE</option>
                                    <option value="Singapore">Singapore</option>
                                  </select>
                                </div>
                                <div className="col-6">
                                  <label className="form-label">Expiry Date</label>
                                  <input type="date" className="form-control" value={t.expiryDate} onChange={e => updateTravelerField(idx, "expiryDate", e.target.value)} />
                                </div>
                                <div className="col-6">
                                  <label className="form-label">Dietary Request</label>
                                  <select className="form-select" value={t.dietary} onChange={e => updateTravelerField(idx, "dietary", e.target.value)}>
                                    <option value="None">None</option>
                                    <option value="Vegetarian">Vegetarian</option>
                                    <option value="Halal">Halal</option>
                                    <option value="Kosher">Kosher</option>
                                  </select>
                                </div>
                                <div className="col-6">
                                  <label className="form-label">Mobility Request</label>
                                  <select className="form-select" value={t.mobility} onChange={e => updateTravelerField(idx, "mobility", e.target.value)}>
                                    <option value="None">None</option>
                                    <option value="Wheelchair">Wheelchair Required</option>
                                    <option value="Dietary request">Dietary request</option>
                                    <option value="Mobility requests">Mobility requests</option>
                                  </select>
                                </div>
                              </div>

                              <button className="btn btn-outline-secondary w-100 mt-3 rounded-3 fw-700" style={{ height: "42px", fontSize: "0.85rem" }}>
                                Save Traveler
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  </>
                )}

                {/* STEP 3: SERVICES FORM */}
                {step === 3 && (
                  <>
                    <div className="section-card border border-light p-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="m-0 text-dark fw-700" style={{ fontSize: "1.05rem" }}>Select Services</h4>
                      </div>

                      {/* Services Navigation Tabs */}
                      <div className="d-flex border-bottom border-light mb-3 overflow-auto">
                        {[
                          { name: "Flights", icon: "bi-airplane-fill" },
                          { name: "Hotels", icon: "bi-house-door-fill" },
                          { name: "Transfers", icon: "bi-car-front-fill" },
                          { name: "Activities", icon: "bi-calendar3-range" },
                          { name: "Insurance", icon: "bi-shield-check" },
                          { name: "Visa", icon: "bi-passport" },
                          { name: "Others", icon: "bi-file-earmark-text" }
                        ].map(t => (
                          <button
                            key={t.name}
                            className={`service-nav-tab ${serviceTab === t.name ? "active" : ""}`}
                            onClick={() => setServiceTab(t.name)}
                          >
                            <i className={t.icon}></i>
                            <span>{t.name}</span>
                          </button>
                        ))}
                      </div>

                      {/* Active Tab Content (Flights as per design) */}
                      {serviceTab === "Flights" && (
                        <div>
                          {/* Round trip / One Way choices */}
                          <div className="d-flex gap-4 mb-3">
                            {["Round Trip", "One Way", "Multi City"].map(o => (
                              <div className="form-check" key={o}>
                                <input
                                  className="form-check-input shadow-none"
                                  type="radio"
                                  name="flightTripType"
                                  id={`flight-opt-${o}`}
                                  checked={flightTripType === o}
                                  onChange={() => setFlightTripType(o)}
                                />
                                <label className="form-check-label text-dark fw-600" htmlFor={`flight-opt-${o}`} style={{ fontSize: "0.85rem" }}>
                                  {o}
                                </label>
                              </div>
                            ))}
                          </div>

                          {/* Flight Search inputs */}
                          <div className="row g-2 align-items-end mb-4">
                            <div className="col-12 col-md-3">
                              <label className="form-label">From <span className="required">*</span></label>
                              <input type="text" className="form-control" value={flightFrom} onChange={e => setFlightFrom(e.target.value)} />
                            </div>
                            <div className="col-12 col-md-3">
                              <label className="form-label">To <span className="required">*</span></label>
                              <input type="text" className="form-control" value={flightTo} onChange={e => setFlightTo(e.target.value)} />
                            </div>
                            <div className="col-6 col-md-2">
                              <label className="form-label">Departure <span className="required">*</span></label>
                              <input type="date" className="form-control" value={flightDeparture} onChange={e => setFlightDeparture(e.target.value)} />
                            </div>
                            <div className="col-6 col-md-2">
                              <label className="form-label">Return <span className="required">*</span></label>
                              <input type="date" className="form-control" value={flightReturn} onChange={e => setFlightReturn(e.target.value)} />
                            </div>
                            <div className="col-12 col-md-2">
                              <label className="form-label">Travelers & Class <span className="required">*</span></label>
                              <select className="form-select">
                                <option>2 Adults, Economy</option>
                                <option>1 Adult, Business</option>
                              </select>
                            </div>
                            <div className="col-12 d-flex justify-content-end mt-2">
                              <button className="btn text-white rounded-3 px-3 d-flex align-items-center gap-2" style={{ backgroundColor: "#112E24", height: "42px", fontSize: "0.85rem" }}>
                                <i className="bi bi-search"></i>
                                <span>Search Flights</span>
                              </button>
                            </div>
                          </div>

                          {/* Flight Search Results */}
                          <div className="mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <span className="text-secondary fw-500" style={{ fontSize: "0.82rem" }}>Showing 12 flights found</span>
                              <div className="d-flex align-items-center gap-2">
                                <span className="text-secondary fw-600" style={{ fontSize: "0.82rem" }}>Sort by:</span>
                                <select className="form-select py-1 height-auto shadow-none" style={{ height: "32px", fontSize: "0.82rem", width: "auto" }}>
                                  <option>Recommended</option>
                                  <option>Cheapest</option>
                                </select>
                                <button className="btn btn-outline-light border rounded-3 p-1 text-secondary d-flex align-items-center gap-1" style={{ height: "32px", fontSize: "0.82rem" }}>
                                  <i className="bi bi-funnel"></i> Filters
                                </button>
                              </div>
                            </div>

                            {/* Flight List Rows */}
                            {[
                              {
                                id: "flight-1",
                                carrier: "Emirates",
                                logoBg: "#D71921",
                                depTime: "09:15",
                                depAirport: "DPS",
                                arrTime: "16:50",
                                arrAirport: "DXB",
                                duration: "09h 35m",
                                stop: "1 Stop DXB",
                                returnTimeDep: "23:15",
                                returnAirportDep: "DXB",
                                returnTimeArr: "15:25",
                                returnAirportArr: "DPS",
                                returnPlusOne: true,
                                price: "$1,250",
                              },
                              {
                                id: "flight-2",
                                carrier: "Qatar Airways",
                                logoBg: "#5C0632",
                                depTime: "10:40",
                                depAirport: "DPS",
                                arrTime: "16:30",
                                arrAirport: "DXB",
                                duration: "08h 50m",
                                stop: "1 Stop DOH",
                                returnTimeDep: "02:20",
                                returnAirportDep: "DXB",
                                returnTimeArr: "14:40",
                                returnAirportArr: "DPS",
                                price: "$1,180",
                              },
                              {
                                id: "flight-3",
                                carrier: "Garuda Indonesia",
                                logoBg: "#0B3C5D",
                                depTime: "14:25",
                                depAirport: "DPS",
                                arrTime: "19:10",
                                arrAirport: "DXB",
                                duration: "07h 45m",
                                stop: "Non Stop",
                                returnTimeDep: "20:35",
                                returnAirportDep: "DXB",
                                returnTimeArr: "09:15",
                                returnAirportArr: "DPS",
                                returnPlusOne: true,
                                price: "$1,320",
                              }
                            ].map(flight => {
                              const isSelected = selectedFlightId === flight.id;
                              return (
                                <div key={flight.id} className={`flight-row ${isSelected ? "selected" : ""}`}>
                                  {/* Carrier Logo */}
                                  <div className="flight-carrier-logo" style={{ backgroundColor: flight.logoBg }}>
                                    {flight.carrier.substring(0, 2).toUpperCase()}
                                  </div>

                                  {/* Outbound Info */}
                                  <div className="flight-segment">
                                    <div className="flight-time-block">
                                      <h5>{flight.depTime}</h5>
                                      <span>{flight.depAirport}</span>
                                    </div>
                                    <div className="flight-duration-line">
                                      <span>{flight.duration}</span>
                                      <div className="flight-line-visual"></div>
                                      <span>{flight.stop}</span>
                                    </div>
                                    <div className="flight-time-block">
                                      <h5>{flight.arrTime}</h5>
                                      <span>{flight.arrAirport}</span>
                                    </div>
                                  </div>

                                  {/* Inbound Info */}
                                  <div className="flight-segment">
                                    <div className="flight-time-block">
                                      <h5>{flight.returnTimeDep}</h5>
                                      <span>{flight.returnAirportDep}</span>
                                    </div>
                                    <div className="flight-duration-line">
                                      <span>{flight.duration}</span>
                                      <div className="flight-line-visual"></div>
                                      <span>{flight.stop}</span>
                                    </div>
                                    <div className="flight-time-block">
                                      <h5>{flight.returnTimeArr} {flight.returnPlusOne && <span className="text-danger fw-700" style={{ fontSize: "0.65rem", position: "relative", top: "-5px" }}>+1</span>}</h5>
                                      <span>{flight.returnAirportArr}</span>
                                    </div>
                                  </div>

                                  {/* Price Summary */}
                                  <div className="text-end">
                                    <span className="fw-700 text-success d-block" style={{ fontSize: "1.1rem" }}>{flight.price}</span>
                                    <span className="text-secondary small d-block" style={{ fontSize: "0.68rem" }}>per adult</span>
                                  </div>

                                  {/* Selector Button */}
                                  <div>
                                    <button
                                      className="btn text-white rounded-3 px-3 fw-600"
                                      style={{
                                        backgroundColor: isSelected ? "#1E6C45" : "#112E24",
                                        height: "38px",
                                        fontSize: "0.82rem"
                                      }}
                                      onClick={() => setSelectedFlightId(flight.id)}
                                    >
                                      {isSelected ? "Selected" : "Select"}
                                    </button>
                                    <a href="#" className="small d-block text-center mt-1 text-secondary text-decoration-none fw-600" style={{ fontSize: "0.72rem" }} onClick={e => e.preventDefault()}>View Details v</a>
                                  </div>

                                </div>
                              );
                            })}
                          </div>

                          {/* Preferences checkboxes */}
                          <div className="border-top border-light pt-3">
                            <h5 className="text-secondary font-monospace uppercase mb-3 text-uppercase" style={{ fontSize: "0.72rem", letterSpacing: "0.7px", fontWeight: "700" }}>Flight Preferences</h5>
                            <div className="d-flex flex-wrap gap-4">
                              {[
                                "Non Stop Only",
                                "Morning Departure (Before 12 PM)",
                                "Include Low Cost Airlines"
                              ].map((pref, pIdx) => (
                                <div className="form-check" key={pIdx}>
                                  <input className="form-check-input shadow-none" type="checkbox" id={`pref-${pIdx}`} />
                                  <label className="form-check-label text-dark fw-600" htmlFor={`pref-${pIdx}`} style={{ fontSize: "0.85rem" }}>
                                    {pref}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>

                        </div>
                      )}

                    </div>
                  </>
                )}

                {/* STEP 4: REVIEW & CONFIRM PANEL */}
                {step === 4 && (
                  <>
                    {/* Trip Overview */}
                    <div className="section-card border border-light p-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="section-header-title">
                          <div className="section-icon-container">
                            <i className="bi bi-send-fill"></i>
                          </div>
                          <span>Trip Overview</span>
                        </h3>
                        <button className="btn btn-outline-light border rounded-3 text-secondary px-3 py-1 fw-600 d-flex align-items-center gap-2" style={{ fontSize: "0.82rem", height: "36px" }} onClick={() => setStep(1)}>
                          <i className="bi bi-pencil" style={{ fontSize: "0.75rem" }}></i>
                          <span>Edit</span>
                        </button>
                      </div>

                      <div className="review-info-grid">
                        <div className="review-info-item">
                          <label>Trip Type</label>
                          <span>{bookingType}</span>
                        </div>
                        <div className="review-info-item">
                          <label>Destination</label>
                          <span>{destination}</span>
                        </div>
                        <div className="review-info-item">
                          <label>Travel Dates</label>
                          <span>{travelDates}</span>
                        </div>
                        <div className="review-info-item">
                          <label>Duration</label>
                          <span>{duration}</span>
                        </div>
                        <div className="review-info-item">
                          <label>Travelers</label>
                          <span>{travelersCount}</span>
                        </div>
                        <div className="review-info-item">
                          <label>Class</label>
                          <span>Economy</span>
                        </div>
                        <div className="review-info-item">
                          <label>Sales Executive</label>
                          <span>{salesExecutive}</span>
                        </div>
                        <div className="review-info-item">
                          <label>Booking ID</label>
                          <span className="review-badge mt-1 d-inline-block">Auto-Generated</span>
                        </div>
                      </div>
                    </div>

                    {/* Travelers Card */}
                    <div className="section-card border border-light p-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="section-header-title">
                          <div className="section-icon-container">
                            <i className="bi bi-people-fill"></i>
                          </div>
                          <span>Travelers ({travelers.length} Adults)</span>
                        </h3>
                        <button className="btn btn-outline-light border rounded-3 text-secondary px-3 py-1 fw-600 d-flex align-items-center gap-2" style={{ fontSize: "0.82rem", height: "36px" }} onClick={() => setStep(2)}>
                          <i className="bi bi-pencil" style={{ fontSize: "0.75rem" }}></i>
                          <span>Edit</span>
                        </button>
                      </div>

                      <div className="row g-3">
                        {travelers.map((t, idx) => (
                          <div className="col-12 col-md-6" key={t.id}>
                            <div className="traveler-detail-card h-100">
                              <h4 className="traveler-detail-title">
                                <span className="traveler-detail-num">{idx + 1}</span>
                                <span>{t.title} {t.firstName} {t.lastName}</span>
                                {t.isLead && <span className="badge px-2 py-1 rounded-1 text-success bg-light fw-700" style={{ fontSize: "0.68rem" }}>Lead Traveler</span>}
                              </h4>
                              
                              <div className="traveler-item-row">
                                <i className="bi bi-card-heading"></i>
                                <span>Passport: {t.passportNo}</span>
                              </div>
                              <div className="traveler-item-row">
                                <i className="bi bi-globe"></i>
                                <span>Nationality: {t.issuingCountry}</span>
                              </div>
                              <div className="traveler-item-row">
                                <i className="bi bi-envelope"></i>
                                <span>{t.email}</span>
                              </div>
                              <div className="traveler-item-row">
                                <i className="bi bi-telephone"></i>
                                <span>{t.phone}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Services & Extras */}
                    <div className="section-card border border-light p-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="section-header-title">
                          <div className="section-icon-container">
                            <i className="bi bi-calendar-check-fill"></i>
                          </div>
                          <span>Services & Extras</span>
                        </h3>
                        <button className="btn btn-outline-light border rounded-3 text-secondary px-3 py-1 fw-600 d-flex align-items-center gap-2" style={{ fontSize: "0.82rem", height: "36px" }} onClick={() => setStep(3)}>
                          <i className="bi bi-pencil" style={{ fontSize: "0.75rem" }}></i>
                          <span>Edit</span>
                        </button>
                      </div>

                      <div className="d-flex flex-column">
                        {/* Flights */}
                        <div className="service-row">
                          <div className="service-details">
                            <div className="service-icon-box">
                              <i className="bi bi-airplane-fill text-dark"></i>
                            </div>
                            <div>
                              <span className="fw-700 text-dark d-block" style={{ fontSize: "0.88rem", lineHeight: "1.2" }}>Flights</span>
                              <span className="text-secondary d-block fw-500 mt-1" style={{ fontSize: "0.82rem" }}>DPS (Bali) <i className="bi bi-arrow-left-right text-secondary mx-1" style={{ fontSize: "0.72rem" }}></i> DXB (Dubai)</span>
                              <span className="text-secondary d-block" style={{ fontSize: "0.68rem", opacity: 0.8 }}>{travelDates} | {travelersCount}, Economy</span>
                            </div>
                          </div>
                          <div className="d-flex align-items-center gap-3">
                            <span className="fw-700 text-dark" style={{ fontSize: "0.88rem" }}>$2,430.00</span>
                            <i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.85rem" }}></i>
                          </div>
                        </div>

                        {/* Hotels */}
                        <div className="service-row">
                          <div className="service-details">
                            <div className="service-icon-box">
                              <i className="bi bi-house-door-fill text-dark"></i>
                            </div>
                            <div>
                              <span className="fw-700 text-dark d-block" style={{ fontSize: "0.88rem", lineHeight: "1.2" }}>Hotels</span>
                              <span className="text-secondary d-block fw-500 mt-1" style={{ fontSize: "0.82rem" }}>Deluxe Sea View | 1 Room, {duration.split(" / ")[1]?.split(" ")[0] || "4"} Nights</span>
                              <span className="text-secondary d-block" style={{ fontSize: "0.68rem", opacity: 0.8 }}>{travelDates.split(" - ")[0]} - {travelDates.split(" - ")[0]}</span>
                            </div>
                          </div>
                          <div className="d-flex align-items-center gap-3">
                            <span className="fw-700 text-dark" style={{ fontSize: "0.88rem" }}></span>
                            <i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.85rem" }}></i>
                          </div>
                        </div>

                        {/* Transfers */}
                        <div className="service-row">
                          <div className="service-details">
                            <div className="service-icon-box">
                              <i className="bi bi-car-front-fill text-dark"></i>
                            </div>
                            <div>
                              <span className="fw-700 text-dark d-block" style={{ fontSize: "0.88rem", lineHeight: "1.2" }}>Transfers</span>
                              <span className="text-secondary d-block fw-500 mt-1" style={{ fontSize: "0.82rem" }}>Airport Transfer (DXB) - Private</span>
                              <span className="text-secondary d-block" style={{ fontSize: "0.68rem", opacity: 0.8 }}>{travelDates.split(" - ")[1]}</span>
                            </div>
                          </div>
                          <div className="d-flex align-items-center gap-3">
                            <span className="fw-700 text-dark" style={{ fontSize: "0.88rem" }}>$120.00</span>
                            <i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.85rem" }}></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Info */}
                    <div className="section-card border border-light p-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="section-header-title">
                          <div className="section-icon-container">
                            <i className="bi bi-credit-card-fill"></i>
                          </div>
                          <span>Payment Information</span>
                        </h3>
                        <button className="btn btn-outline-light border rounded-3 text-secondary px-3 py-1 fw-600 d-flex align-items-center gap-2" style={{ fontSize: "0.82rem", height: "36px" }} onClick={() => setStep(1)}>
                          <i className="bi bi-pencil" style={{ fontSize: "0.75rem" }}></i>
                          <span>Edit</span>
                        </button>
                      </div>

                      <div className="review-info-grid">
                        <div className="review-info-item">
                          <label>Payment Method</label>
                          <span>{paymentMethod}</span>
                        </div>
                        <div className="review-info-item">
                          <label>Payment Status</label>
                          <span className="review-badge paid mt-1 d-inline-block">{paymentStatus}</span>
                        </div>
                        <div className="review-info-item">
                          <label>Amount Paid</label>
                          <span>${Number(amountPaid).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                        </div>
                        <div className="review-info-item">
                          <label>Currency</label>
                          <span>{currency}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Wizard Navigation Footer */}
                <div className="d-flex justify-content-between align-items-center mt-3 pt-3 flex-wrap gap-2">
                  <button 
                    className="btn btn-outline-secondary bg-white border border-light shadow-sm rounded-3 d-flex align-items-center gap-2 fw-600" 
                    style={{ height: "42px", fontSize: "0.85rem", paddingLeft: "1.25rem", paddingRight: "1.25rem" }}
                    onClick={handlePrevStep}
                  >
                    <i className="bi bi-arrow-left"></i>
                    <span>{step === 1 ? "Cancel" : "Back"}</span>
                  </button>
                  
                  <div className="d-flex flex-column align-items-end">
                    <button 
                      className="btn text-white rounded-3 px-4 fw-600 d-flex align-items-center gap-2" 
                      style={{ backgroundColor: "#112E24", height: "42px", fontSize: "0.85rem" }}
                      onClick={handleNextStep}
                    >
                      <span>{step === 4 ? "Confirm Booking" : "Save & Continue"}</span>
                      <i className={`bi ${step === 4 ? "bi-lock-fill" : "bi-arrow-right"}`}></i>
                    </button>
                    {step === 4 && (
                      <span className="text-secondary mt-1" style={{ fontSize: "0.68rem", opacity: 0.8 }}>You will be able to download invoice after confirmation.</span>
                    )}
                  </div>
                </div>

              </div>

              {/* Right Summary Columns (4 Columns) */}
              <div className="col-12 col-xl-4 d-flex flex-column gap-3">
                
                {/* 1. Customer Summary Card */}
                <div className="section-card border border-light p-4">
                  <h4 className="text-secondary uppercase mb-3 text-uppercase font-monospace" style={{ fontSize: "0.72rem", letterSpacing: "0.7px", fontWeight: "700" }}>Customer Summary</h4>
                  <div className="d-flex align-items-start gap-3">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center fw-700" 
                      style={{ width: "48px", height: "48px", backgroundColor: "#E9F4EE", color: "#1E6C45", fontSize: "1.05rem" }}
                    >
                      {customerName.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-2">
                        <span className="fw-700 text-dark fs-6">{customerName}</span>
                        <span className="badge rounded-pill text-success bg-light border border-success-subtle fw-700" style={{ fontSize: "0.65rem", padding: "0.15rem 0.4rem" }}>Active</span>
                      </div>
                      
                      <div className="mt-2">
                        <div className="sidebar-summary-item">
                          <i className="bi bi-envelope"></i>
                          <span>john.doe@gmail.com</span>
                        </div>
                        <div className="sidebar-summary-item">
                          <i className="bi bi-telephone"></i>
                          <span className="d-flex align-items-center gap-1">
                            <span>+62 812 3456 7890</span>
                            <i className="bi bi-whatsapp text-success" style={{ fontSize: "0.85rem", cursor: "pointer" }}></i>
                          </span>
                        </div>
                        <div className="sidebar-summary-item">
                          <i className="bi bi-geo-alt"></i>
                          <span>Indonesia</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Trip Summary Card */}
                <div className="section-card border border-light p-4">
                  <h4 className="text-secondary uppercase mb-3 text-uppercase font-monospace" style={{ fontSize: "0.72rem", letterSpacing: "0.7px", fontWeight: "700" }}>Trip Summary</h4>
                  
                  <div className="d-flex flex-column gap-2">
                    <div className="sidebar-summary-item">
                      <i className="bi bi-geo-alt"></i>
                      <div>
                        <span className="text-secondary d-block" style={{ fontSize: "0.68rem" }}>Destination</span>
                        <span className="text-dark fw-600" style={{ fontSize: "0.85rem" }}>{destination || "—"}</span>
                      </div>
                    </div>

                    <div className="sidebar-summary-item">
                      <i className="bi bi-calendar3"></i>
                      <div>
                        <span className="text-secondary d-block" style={{ fontSize: "0.68rem" }}>Travel Dates</span>
                        <span className="text-dark fw-600" style={{ fontSize: "0.85rem" }}>{travelDates || "—"}</span>
                      </div>
                    </div>

                    <div className="sidebar-summary-item">
                      <i className="bi bi-clock"></i>
                      <div>
                        <span className="text-secondary d-block" style={{ fontSize: "0.68rem" }}>Duration</span>
                        <span className="text-dark fw-600" style={{ fontSize: "0.85rem" }}>{duration || "—"}</span>
                      </div>
                    </div>

                    <div className="sidebar-summary-item">
                      <i className="bi bi-people"></i>
                      <div>
                        <span className="text-secondary d-block" style={{ fontSize: "0.68rem" }}>Travelers</span>
                        <span className="text-dark fw-600" style={{ fontSize: "0.85rem" }}>{travelersCount || "—"}</span>
                      </div>
                    </div>

                    <div className="sidebar-summary-item">
                      <i className="bi bi-compass"></i>
                      <div>
                        <span className="text-secondary d-block" style={{ fontSize: "0.68rem" }}>Trip Type</span>
                        <span className="text-dark fw-600" style={{ fontSize: "0.85rem" }}>{bookingType || "—"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Price Summary Card */}
                <div className="section-card border border-light p-4">
                  <h4 className="text-secondary uppercase mb-3 text-uppercase font-monospace" style={{ fontSize: "0.72rem", letterSpacing: "0.7px", fontWeight: "700" }}>Price Summary</h4>
                  
                  <div className="d-flex flex-column">
                    <div className="price-summary-row">
                      <span>Base Amount</span>
                      <span className="text-dark fw-600">${Number(baseAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="price-summary-row">
                      <span>Discount</span>
                      <span className="text-success fw-700">-${Number(discount).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="price-summary-row">
                      <span>Tax</span>
                      <span className="text-dark fw-600">${Number(tax).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                    </div>
                    
                    <div className="price-summary-row total">
                      <span>Total Amount</span>
                      <span>${totalAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>

                    <div className="price-summary-row mt-2" style={{ fontSize: "0.82rem" }}>
                      <span>Amount Paid</span>
                      <span className="text-success fw-700">${Number(amountPaid).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="price-summary-row" style={{ fontSize: "0.82rem" }}>
                      <span>Balance</span>
                      <span className={`fw-700 ${balance === 0 ? "text-success" : "text-danger"}`}>
                        ${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 4. Booking Progress Checklist or Quick Actions depending on steps */}
                {step <= 2 ? (
                  <div className="section-card border border-light p-4">
                    <h4 className="text-secondary uppercase mb-3 text-uppercase font-monospace" style={{ fontSize: "0.72rem", letterSpacing: "0.7px", fontWeight: "700" }}>Quick Actions</h4>
                    <div className="d-flex flex-column gap-2">
                      <button className="btn btn-outline-light border rounded-3 p-2 text-dark text-start fw-600 d-flex justify-content-between align-items-center" style={{ fontSize: "0.82rem" }}>
                        <span className="d-flex align-items-center gap-2"><i className="bi bi-calendar3 text-secondary"></i> Add Itinerary</span>
                        <i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.7rem" }}></i>
                      </button>
                      <button className="btn btn-outline-light border rounded-3 p-2 text-dark text-start fw-600 d-flex justify-content-between align-items-center" style={{ fontSize: "0.82rem" }}>
                        <span className="d-flex align-items-center gap-2"><i className="bi bi-file-earmark-text text-secondary"></i> Add Quotation</span>
                        <i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.7rem" }}></i>
                      </button>
                      <button className="btn btn-outline-light border rounded-3 p-2 text-dark text-start fw-600 d-flex justify-content-between align-items-center" style={{ fontSize: "0.82rem" }}>
                        <span className="d-flex align-items-center gap-2"><i className="bi bi-upload text-secondary"></i> Upload Documents</span>
                        <i className="bi bi-chevron-right text-secondary" style={{ fontSize: "0.7rem" }}></i>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="section-card border border-light p-4">
                    <h4 className="text-secondary uppercase mb-3 text-uppercase font-monospace" style={{ fontSize: "0.72rem", letterSpacing: "0.7px", fontWeight: "700" }}>Booking Progress</h4>
                    
                    <div className="progress-timeline">
                      <div className="timeline-step">
                        <div className="timeline-step-label completed">
                          <i className="bi bi-check-circle-fill me-2"></i>
                          <span>Booking Details</span>
                        </div>
                        <span className="timeline-step-status completed small">Completed</span>
                      </div>

                      <div className="timeline-step">
                        <div className="timeline-step-label completed">
                          <i className="bi bi-check-circle-fill me-2"></i>
                          <span>Travelers</span>
                        </div>
                        <span className="timeline-step-status completed small">Completed</span>
                      </div>

                      <div className="timeline-step">
                        <div className={`timeline-step-label ${step > 3 ? "completed" : "active"}`}>
                          <i className={`bi ${step > 3 ? "bi-check-circle-fill me-2" : "bi-check-circle me-2"}`}></i>
                          <span>Services</span>
                        </div>
                        <span className={`timeline-step-status ${step > 3 ? "completed" : "active"} small`}>
                          {step > 3 ? "Completed" : "In Progress"}
                        </span>
                      </div>

                      <div className="timeline-step">
                        <div className={`timeline-step-label ${step === 4 ? "active" : ""}`}>
                          <span className="badge rounded-circle bg-light text-dark border border-secondary-subtle d-inline-flex align-items-center justify-content-center me-2" style={{ width: "18px", height: "18px", fontSize: "0.65rem", fontWeight: "700" }}>4</span>
                          <span>Review & Confirm</span>
                        </div>
                        <span className={`timeline-step-status ${step === 4 ? "active" : ""} small`}>
                          {step === 4 ? "Current Step" : "Pending"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

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
