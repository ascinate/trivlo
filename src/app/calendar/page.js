"use client";

import { useState, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CalendarPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("Month");

  const datePickerRef = useRef(null);

  // Hardcoded events for demo purposes (May 2025)
  const demoEvents = {
    "2025-05-01": [{ id: "BK-1253", time: "10:00 AM", title: "Flight to Dubai", type: "flight" }],
    "2025-05-02": [{ id: "BK-1254", time: "02:00 PM", title: "Hotel Check-in", type: "hotel" }],
    "2025-05-05": [{ id: "BK-1252", time: "11:30 AM", title: "Visa Appointment", type: "visa" }],
    "2025-05-07": [{ id: "BK-1255", time: "09:00 AM", title: "Airport Transfer", type: "transfer" }],
    "2025-05-09": [{ id: "BK-1256", time: "05:00 PM", title: "Bali Trip (5 Days)", type: "payment" }],
    "2025-05-13": [{ id: "BK-1257", time: "01:00 PM", title: "Flight to Singapore", type: "hotel" }],
    "2025-05-15": [{ id: "BK-1258", time: "12:00 PM", title: "Hotel Check-in", type: "visa" }],
    "2025-05-18": [{ id: "BK-1256", title: "Bali Trip", sub: "(Travelling)", type: "activity" }],
    "2025-05-20": [{ id: "BK-1259", time: "10:00 AM", title: "Travel Insurance", type: "payment" }],
    "2025-05-23": [{ id: "BK-1260", time: "03:00 PM", title: "City Tour", type: "activity" }],
    "2025-05-26": [{ id: "BK-1261", time: "11:00 AM", title: "Document Upload", type: "hotel" }],
    "2025-05-29": [{ id: "BK-1262", time: "04:30 PM", title: "Hotel Check-out", type: "transfer" }],
  };

  const getCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay(); // 0 is Sunday
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    const days = [];
    const today = new Date();
    
    // Previous month days
    for (let i = 0; i < firstDay; i++) {
      const day = daysInPrevMonth - firstDay + i + 1;
      days.push({ date: day, currentMonth: false, events: [], isToday: false });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === i;
      days.push({ 
        date: i, 
        currentMonth: true, 
        events: demoEvents[dateString] || [], 
        isToday 
      });
    }
    
    // Next month days to fill up to 35 or 42 (5 or 6 weeks)
    const totalDays = days.length;
    const remainingDays = (Math.ceil(totalDays / 7) * 7) - totalDays;
    
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: i, currentMonth: false, events: [], isToday: false });
    }
    
    return days;
  };

  const calendarDays = getCalendarDays(currentDate);

  const handlePrev = () => {
    if (currentView === "Month") setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    else if (currentView === "Week") setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7));
    else if (currentView === "Day") setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1));
    else if (currentView === "Agenda") setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate()));
  };

  const handleNext = () => {
    if (currentView === "Month") setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    else if (currentView === "Week") setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7));
    else if (currentView === "Day") setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1));
    else if (currentView === "Agenda") setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  let currentHeader = "";
  if (currentView === "Month" || currentView === "Agenda") {
    currentHeader = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  } else if (currentView === "Day") {
    currentHeader = `${currentDate.getDate()} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  } else if (currentView === "Week") {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
      currentHeader = `${startOfWeek.getDate()} - ${endOfWeek.getDate()} ${monthNames[startOfWeek.getMonth()]} ${startOfWeek.getFullYear()}`;
    } else {
      currentHeader = `${startOfWeek.getDate()} ${monthNames[startOfWeek.getMonth()].substring(0,3)} - ${endOfWeek.getDate()} ${monthNames[endOfWeek.getMonth()].substring(0,3)} ${endOfWeek.getFullYear()}`;
    }
  }

  // Get events for week
  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const current = new Date(startOfWeek);
      current.setDate(startOfWeek.getDate() + i);
      const dateString = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`;
      const isToday = today.getFullYear() === current.getFullYear() && today.getMonth() === current.getMonth() && today.getDate() === current.getDate();
      days.push({
        date: current.getDate(),
        fullDate: current,
        events: demoEvents[dateString] || [],
        isToday
      });
    }
    return days;
  };
  const weekDays = getWeekDays(currentDate);

  // Get events for day
  const dateStringForDay = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
  const dayEvents = demoEvents[dateStringForDay] || [];

  // Get events for Agenda
  const agendaEvents = Object.keys(demoEvents)
    .filter(dateStr => new Date(dateStr) >= new Date(currentDate.getFullYear(), currentDate.getMonth(), 1))
    .sort()
    .map(dateStr => ({ dateStr, events: demoEvents[dateStr] }));

  return (
    <>
      <style>{`
        .calendar-grid {
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
        }
        .calendar-header-row {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          border-bottom: 1px solid var(--border);
          background-color: #FAFAFA;
        }
        .calendar-header-cell {
          padding: 1rem 0.5rem;
          text-align: center;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--secondary);
        }
        .calendar-days-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          grid-auto-rows: 125px;
        }
        .calendar-day-cell {
          border-right: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 0.6rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .calendar-day-cell:nth-child(7n) {
          border-right: none;
        }
        .calendar-day-cell:nth-last-child(-n+7) {
          border-bottom: none;
        }
        .calendar-day-cell.inactive {
          background-color: #FDFDFD;
        }
        .calendar-day-num {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--secondary);
          margin-bottom: 0.2rem;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .calendar-day-cell.active .calendar-day-num {
          color: var(--dark);
          font-weight: 600;
        }
        .calendar-day-cell.today .calendar-day-num {
          background-color: #112E24;
          color: #FFF;
          border-radius: 50%;
        }
        .calendar-event {
          font-size: 0.72rem;
          padding: 0.35rem 0.5rem;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          border-left: 3px solid transparent;
          line-height: 1.3;
        }
        
        .event-flight { background-color: #FEF3EB; color: #D36C45; border-left-color: #D36C45; }
        .event-hotel { background-color: #E6F0FF; color: #0A58CA; border-left-color: #0A58CA; }
        .event-transfer { background-color: #FDF0F0; color: #D05E5E; border-left-color: #D05E5E; }
        .event-visa { background-color: #E9F4EE; color: #1E6C45; border-left-color: #1E6C45; }
        .event-payment { background-color: #F3E8FF; color: #6D28D9; border-left-color: #6D28D9; }
        .event-activity { background-color: #FEF7ED; color: #B97C2B; border-left-color: #B97C2B; }
        
        .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
        }
        
        .upcoming-event-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }
        
        .summary-box {
          background-color: #F9FAFB;
          border-radius: 12px;
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .summary-box-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
        }
      `}</style>

      <div className="d-flex position-relative">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="app-container w-100 min-vh-100 d-flex flex-column justify-content-between">
          <Header toggleSidebar={toggleSidebar} />

          <main className="main-content d-flex flex-column gap-4">
            {/* Header info */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mt-2">
              <div>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-2" style={{ fontSize: "0.85rem" }}>
                    <li className="breadcrumb-item"><a href="#" className="text-secondary text-decoration-none">Home</a></li>
                    <li className="breadcrumb-item active fw-600" aria-current="page">Calendar</li>
                  </ol>
                </nav>
                <h2 className="fw-bold mb-1" style={{ color: "var(--primary)" }}>Calendar</h2>
                <p className="text-secondary fs-7 mt-1 mb-0">View and manage all bookings, activities, and important events.</p>
              </div>
              <div className="d-flex align-items-center gap-3">
                <button className="btn btn-light border border-light shadow-sm rounded-3 fw-600 d-flex align-items-center gap-2" style={{ height: "42px", fontSize: "0.85rem" }}>
                  <i className="bi bi-funnel"></i> Filter
                </button>
                <button className="btn btn-light border border-light shadow-sm rounded-3 fw-600 d-flex align-items-center gap-2" style={{ height: "42px", fontSize: "0.85rem" }}>
                  <i className="bi bi-arrow-repeat"></i> Sync Calendar <i className="bi bi-chevron-down ms-1" style={{ fontSize: "0.75rem" }}></i>
                </button>
              </div>
            </div>

            <div className="row g-4">
              {/* Main Calendar Area */}
              <div className="col-12 col-xl-9">
                <div className="section-card border border-light p-4 d-flex flex-column h-100">
                  
                  {/* Calendar Top Controls */}
                  <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
                    
                    {/* View Toggle */}
                    <div className="btn-group border border-light rounded-3 shadow-sm p-1">
                      {["Month", "Week", "Day", "Agenda"].map(view => (
                        <button 
                          key={view}
                          onClick={() => setCurrentView(view)}
                          className={`btn btn-sm ${currentView === view ? 'btn-light bg-white border-light shadow-sm fw-600 text-success' : 'btn-light bg-transparent border-0 fw-600 text-secondary'} rounded-2 px-3`}
                        >
                          {view}
                        </button>
                      ))}
                    </div>
                    
                    {/* Month Nav */}
                    <div className="d-flex align-items-center gap-4">
                      <button className="btn btn-sm text-dark p-0" onClick={handlePrev}><i className="bi bi-chevron-left fs-5"></i></button>
                      <span className="fw-bold fs-5 text-dark" style={{ minWidth: "120px", textAlign: "center", whiteSpace: "nowrap" }}>{currentHeader}</span>
                      <button className="btn btn-sm text-dark p-0" onClick={handleNext}><i className="bi bi-chevron-right fs-5"></i></button>
                    </div>
                    
                    {/* Today & Mini Calendar */}
                    <div className="d-flex align-items-center gap-2 position-relative">
                      <button className="btn btn-sm btn-outline-secondary bg-white border border-light shadow-sm rounded-3 fw-600 px-4" onClick={goToToday} style={{ height: "36px", color: "var(--dark)" }}>Today</button>
                      <button 
                        className="btn btn-sm btn-outline-secondary bg-white border border-light shadow-sm rounded-3 d-flex align-items-center justify-content-center" 
                        style={{ width: "36px", height: "36px", color: "var(--dark)" }}
                        onClick={() => datePickerRef.current?.showPicker()}
                      >
                        <i className="bi bi-calendar3"></i>
                      </button>
                      <input 
                        type="date" 
                        ref={datePickerRef}
                        style={{ position: 'absolute', opacity: 0, width: '1px', height: '1px', pointerEvents: 'none', bottom: 0, right: 0 }}
                        onChange={(e) => {
                          if (e.target.value) {
                            const [year, month, day] = e.target.value.split('-');
                            setCurrentDate(new Date(year, month - 1, day));
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Calendar View Area */}
                  {currentView === "Month" && (
                    <div className="calendar-grid flex-grow-1">
                      <div className="calendar-header-row">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                          <div key={day} className="calendar-header-cell">{day}</div>
                        ))}
                      </div>
                      <div className="calendar-days-grid">
                        {calendarDays.map((dayObj, idx) => (
                          <div key={idx} className={`calendar-day-cell ${dayObj.currentMonth ? 'active' : 'inactive'} ${dayObj.isToday ? 'today' : ''}`}>
                            <div className="calendar-day-num">{dayObj.date}</div>
                            {dayObj.events.map((evt, eIdx) => (
                              <div key={eIdx} className={`calendar-event event-${evt.type}`}>
                                <span className="d-block" style={{ fontSize: "0.65rem", opacity: 0.8 }}>
                                  <span className="fw-700 text-dark me-1">•</span>
                                  {evt.id} {evt.time ? ` - ${evt.time}` : ""}
                                </span>
                                <span className="d-block">{evt.title}</span>
                                {evt.sub && <span className="d-block">{evt.sub}</span>}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentView === "Week" && (
                    <div className="calendar-grid flex-grow-1">
                      <div className="calendar-header-row">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                          <div key={day} className="calendar-header-cell">{day}</div>
                        ))}
                      </div>
                      <div className="calendar-days-grid" style={{ gridAutoRows: "1fr", minHeight: "400px" }}>
                        {weekDays.map((dayObj, idx) => (
                          <div key={idx} className={`calendar-day-cell active ${dayObj.isToday ? 'today' : ''}`} style={{ minHeight: "400px" }}>
                            <div className="calendar-day-num">{dayObj.date}</div>
                            {dayObj.events.map((evt, eIdx) => (
                              <div key={eIdx} className={`calendar-event event-${evt.type}`}>
                                <span className="d-block" style={{ fontSize: "0.65rem", opacity: 0.8 }}>
                                  <span className="fw-700 text-dark me-1">•</span>
                                  {evt.id} {evt.time ? ` - ${evt.time}` : ""}
                                </span>
                                <span className="d-block">{evt.title}</span>
                                {evt.sub && <span className="d-block">{evt.sub}</span>}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentView === "Day" && (
                    <div className="calendar-grid flex-grow-1 p-4" style={{ backgroundColor: "#FAFAFA" }}>
                      <h5 className="fw-bold mb-4" style={{ color: "var(--primary)" }}>Events for {currentDate.toDateString()}</h5>
                      {dayEvents.length === 0 ? (
                        <div className="text-secondary text-center my-5 py-5">No events for this day.</div>
                      ) : (
                        <div className="d-flex flex-column gap-3">
                          {dayEvents.map((evt, eIdx) => (
                            <div key={eIdx} className={`p-3 border rounded-3 bg-white event-${evt.type}`} style={{ borderLeftWidth: "4px" }}>
                              <div className="d-flex justify-content-between">
                                <div className="fw-bold fs-6">{evt.title}</div>
                                <div className="fw-600">{evt.time || "All Day"}</div>
                              </div>
                              <div className="text-secondary fs-7 mt-1">{evt.id} {evt.sub ? `- ${evt.sub}` : ""}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {currentView === "Agenda" && (
                    <div className="calendar-grid flex-grow-1 p-4 overflow-auto" style={{ backgroundColor: "#FAFAFA", maxHeight: "600px" }}>
                      <h5 className="fw-bold mb-4" style={{ color: "var(--primary)" }}>Agenda (Upcoming)</h5>
                      {agendaEvents.length === 0 ? (
                        <div className="text-secondary text-center my-5 py-5">No upcoming events found.</div>
                      ) : (
                        <div className="d-flex flex-column gap-4">
                          {agendaEvents.map((agenda, aIdx) => (
                            <div key={aIdx}>
                              <h6 className="fw-bold text-dark border-bottom pb-2 mb-3">{new Date(agenda.dateStr).toDateString()}</h6>
                              <div className="d-flex flex-column gap-3">
                                {agenda.events.map((evt, eIdx) => (
                                  <div key={eIdx} className={`p-3 border rounded-3 bg-white event-${evt.type}`} style={{ borderLeftWidth: "4px" }}>
                                    <div className="d-flex justify-content-between">
                                      <div className="fw-bold fs-6">{evt.title}</div>
                                      <div className="fw-600">{evt.time || "All Day"}</div>
                                    </div>
                                    <div className="text-secondary fs-7 mt-1">{evt.id} {evt.sub ? `- ${evt.sub}` : ""}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Legends & Total */}
                  <div className="d-flex flex-wrap justify-content-between align-items-center mt-4 gap-3">
                    <div className="d-flex align-items-center flex-wrap gap-4" style={{ fontSize: "0.8rem", fontWeight: "600", color: "var(--secondary)" }}>
                      <div className="d-flex align-items-center gap-2"><span className="legend-dot" style={{ backgroundColor: "#B97C2B" }}></span> Flight</div>
                      <div className="d-flex align-items-center gap-2"><span className="legend-dot" style={{ backgroundColor: "#0A58CA" }}></span> Hotel</div>
                      <div className="d-flex align-items-center gap-2"><span className="legend-dot" style={{ backgroundColor: "#D05E5E" }}></span> Transfer</div>
                      <div className="d-flex align-items-center gap-2"><span className="legend-dot" style={{ backgroundColor: "#1E6C45" }}></span> Visa & Docs</div>
                      <div className="d-flex align-items-center gap-2"><span className="legend-dot" style={{ backgroundColor: "#6D28D9" }}></span> Payment</div>
                      <div className="d-flex align-items-center gap-2"><span className="legend-dot" style={{ backgroundColor: "#D36C45" }}></span> Activity</div>
                      <div className="d-flex align-items-center gap-2"><span className="legend-dot" style={{ backgroundColor: "#9CA3AF" }}></span> Other</div>
                    </div>
                    <div className="fw-600 text-dark" style={{ fontSize: "0.85rem" }}>
                      Total Bookings: 10
                    </div>
                  </div>

                </div>
                
                {/* Banner */}
                <div className="d-flex align-items-center gap-2 p-3 mt-3 rounded-3" style={{ backgroundColor: "#F4F8FF", border: "1px solid #E5EFFF", color: "#3B82F6", fontSize: "0.85rem", fontWeight: "500" }}>
                  <i className="bi bi-info-circle"></i> Click on any event to view booking details or drag to reschedule.
                </div>
              </div>

              {/* Right Sidebar Area */}
              <div className="col-12 col-xl-3 d-flex flex-column gap-3">
                
                {/* Upcoming Events */}
                <div className="section-card border border-light p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h6 className="fw-bold m-0" style={{ color: "var(--primary)" }}>Upcoming Events</h6>
                    <a href="#" className="text-decoration-none fw-600" style={{ fontSize: "0.8rem", color: "#3B82F6" }}>View All</a>
                  </div>
                  
                  <div className="d-flex flex-column gap-4">
                    <div className="d-flex gap-3">
                      <div className="upcoming-event-icon" style={{ backgroundColor: "#FEF3EB", color: "#D36C45" }}>
                        <i className="bi bi-airplane-fill"></i>
                      </div>
                      <div>
                        <div className="fw-700 text-dark mb-1" style={{ fontSize: "0.85rem" }}>BK-1256 - Bali Trip (5 Days)</div>
                        <div className="text-secondary mb-1" style={{ fontSize: "0.8rem" }}>Flight to Bali (DPS)</div>
                        <div className="text-secondary" style={{ fontSize: "0.75rem", fontWeight: "500" }}><i className="bi bi-calendar3 me-1"></i> 18 May 2025 • 05:00 PM</div>
                      </div>
                    </div>
                    
                    <div className="d-flex gap-3">
                      <div className="upcoming-event-icon" style={{ backgroundColor: "#E6F0FF", color: "#0A58CA" }}>
                        <i className="bi bi-building"></i>
                      </div>
                      <div>
                        <div className="fw-700 text-dark mb-1" style={{ fontSize: "0.85rem" }}>BK-1258 - Hotel Check-in</div>
                        <div className="text-secondary mb-1" style={{ fontSize: "0.8rem" }}>Deluxe Sea View</div>
                        <div className="text-secondary" style={{ fontSize: "0.75rem", fontWeight: "500" }}><i className="bi bi-calendar3 me-1"></i> 15 May 2025 • 12:00 PM</div>
                      </div>
                    </div>
                    
                    <div className="d-flex gap-3">
                      <div className="upcoming-event-icon" style={{ backgroundColor: "#E9F4EE", color: "#1E6C45" }}>
                        <i className="bi bi-journal-text"></i>
                      </div>
                      <div>
                        <div className="fw-700 text-dark mb-1" style={{ fontSize: "0.85rem" }}>BK-1252 - Visa Appointment</div>
                        <div className="text-secondary mb-1" style={{ fontSize: "0.8rem" }}>Bali Visa Submission</div>
                        <div className="text-secondary" style={{ fontSize: "0.75rem", fontWeight: "500" }}><i className="bi bi-calendar3 me-1"></i> 05 May 2025 • 11:30 AM</div>
                      </div>
                    </div>
                    
                    <div className="d-flex gap-3">
                      <div className="upcoming-event-icon" style={{ backgroundColor: "#FDF0F0", color: "#D05E5E" }}>
                        <i className="bi bi-car-front-fill"></i>
                      </div>
                      <div>
                        <div className="fw-700 text-dark mb-1" style={{ fontSize: "0.85rem" }}>BK-1255 - Airport Transfer</div>
                        <div className="text-secondary mb-1" style={{ fontSize: "0.8rem" }}>Pickup from Airport</div>
                        <div className="text-secondary" style={{ fontSize: "0.75rem", fontWeight: "500" }}><i className="bi bi-calendar3 me-1"></i> 07 May 2025 • 09:00 AM</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Calendar Sync */}
                <div className="section-card border border-light p-4">
                  <h6 className="fw-bold mb-2" style={{ color: "var(--primary)" }}>Calendar Sync</h6>
                  <p className="text-secondary mb-4" style={{ fontSize: "0.8rem", lineHeight: 1.5 }}>
                    Sync your calendar with Google Calendar or Outlook to stay updated.
                  </p>
                  <div className="d-flex gap-2">
                    <button className="btn btn-white border border-light shadow-sm rounded-3 flex-grow-1 fw-600 d-flex justify-content-center align-items-center gap-2" style={{ fontSize: "0.8rem", height: "42px" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="Google" width="16" height="16" />
                      Google Calendar
                    </button>
                    <button className="btn btn-white border border-light shadow-sm rounded-3 flex-grow-1 fw-600 d-flex justify-content-center align-items-center gap-2" style={{ fontSize: "0.8rem", height: "42px" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg/2048px-Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg.png" alt="Outlook" width="16" height="16" />
                      Outlook Calendar
                    </button>
                  </div>
                </div>

                {/* Calendar Summary */}
                <div className="section-card border border-light p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h6 className="fw-bold m-0" style={{ color: "var(--primary)" }}>Calendar Summary</h6>
                    <button className="btn btn-sm btn-white border border-light shadow-sm rounded-2 fw-600 d-flex align-items-center gap-2" style={{ fontSize: "0.75rem" }}>
                      This Month <i className="bi bi-chevron-down"></i>
                    </button>
                  </div>
                  
                  <div className="row g-3">
                    <div className="col-6">
                      <div className="summary-box">
                        <div>
                          <div className="fw-bold fs-5 text-dark mb-1">10</div>
                          <div className="text-secondary" style={{ fontSize: "0.75rem", fontWeight: "500" }}>Total Bookings</div>
                        </div>
                        <div className="summary-box-icon" style={{ backgroundColor: "#E9F4EE", color: "#1E6C45" }}>
                          <i className="bi bi-calendar3"></i>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="summary-box">
                        <div>
                          <div className="fw-bold fs-5 text-dark mb-1">4</div>
                          <div className="text-secondary" style={{ fontSize: "0.75rem", fontWeight: "500" }}>Flights</div>
                        </div>
                        <div className="summary-box-icon" style={{ backgroundColor: "#FEF3EB", color: "#D36C45" }}>
                          <i className="bi bi-airplane-fill"></i>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="summary-box">
                        <div>
                          <div className="fw-bold fs-5 text-dark mb-1">3</div>
                          <div className="text-secondary" style={{ fontSize: "0.75rem", fontWeight: "500" }}>Hotels</div>
                        </div>
                        <div className="summary-box-icon" style={{ backgroundColor: "#E6F0FF", color: "#0A58CA" }}>
                          <i className="bi bi-building"></i>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="summary-box">
                        <div>
                          <div className="fw-bold fs-5 text-dark mb-1">3</div>
                          <div className="text-secondary" style={{ fontSize: "0.75rem", fontWeight: "500" }}>Other Services</div>
                        </div>
                        <div className="summary-box-icon" style={{ backgroundColor: "#F3E8FF", color: "#6D28D9" }}>
                          <i className="bi bi-journal-check"></i>
                        </div>
                      </div>
                    </div>
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
