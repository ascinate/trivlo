"use client";

import { useState, useMemo, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Register Chart.js elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  ArcElement,
  Legend
);

// Flag mapping for destinations
const FLAG_URLS = {
  "Bali, Indonesia": "https://flagcdn.com/w40/id.png",
  "Dubai, UAE": "https://flagcdn.com/w40/ae.png",
  "Singapore": "https://flagcdn.com/w40/sg.png",
  "Bangkok, Thailand": "https://flagcdn.com/w40/th.png",
  "Sydney, Australia": "https://flagcdn.com/w40/au.png",
  "Tokyo, Japan": "https://flagcdn.com/w40/jp.png",
  "London, UK": "https://flagcdn.com/w40/gb.png",
  "Switzerland": "https://flagcdn.com/w40/ch.png",
  "Custom": "https://flagcdn.com/w40/un.png"
};

// Hotel image presets
const HOTEL_IMAGES = {
  "H-1001": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=120&auto=format&fit=crop&q=80",
  "H-1002": "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=120&auto=format&fit=crop&q=80",
  "H-1003": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=120&auto=format&fit=crop&q=80",
  "H-1004": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=120&auto=format&fit=crop&q=80",
  "H-1005": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=120&auto=format&fit=crop&q=80",
  "H-1006": "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=120&auto=format&fit=crop&q=80",
  "H-1007": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=120&auto=format&fit=crop&q=80",
  "H-1008": "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=120&auto=format&fit=crop&q=80",
  "H-1009": "https://images.unsplash.com/photo-1529290130-4ca3753253ae?w=120&auto=format&fit=crop&q=80",
  "H-1010": "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=120&auto=format&fit=crop&q=80"
};

// Base 10 hotels from screenshot
const baseHotels = [
  {
    id: "H-1001",
    name: "The Ubud Village Resort & Spa",
    location: "Bali, Indonesia",
    category: "Resort",
    rooms: 120,
    rating: 5,
    status: "Active",
    priority: "High"
  },
  {
    id: "H-1002",
    name: "Burj Al Arab Jumeirah",
    location: "Dubai, UAE",
    category: "Luxury",
    rooms: 202,
    rating: 5,
    status: "Active",
    priority: "High"
  },
  {
    id: "H-1003",
    name: "Marina Bay Sands",
    location: "Singapore",
    category: "Luxury",
    rooms: 2561,
    rating: 5,
    status: "Active",
    priority: "Medium"
  },
  {
    id: "H-1004",
    name: "Swissôtel The Stamford",
    location: "Singapore",
    category: "Business",
    rooms: 1261,
    rating: 5,
    status: "Active",
    priority: "Medium"
  },
  {
    id: "H-1005",
    name: "The Peninsula Bangkok",
    location: "Bangkok, Thailand",
    category: "Luxury",
    rooms: 370,
    rating: 5,
    status: "Expiring Soon",
    priority: "High"
  },
  {
    id: "H-1006",
    name: "Raffles Hotel Singapore",
    location: "Singapore",
    category: "Heritage",
    rooms: 115,
    rating: 5,
    status: "Active",
    priority: "Medium"
  },
  {
    id: "H-1007",
    name: "Hilton Sydney",
    location: "Sydney, Australia",
    category: "Business",
    rooms: 587,
    rating: 4.5,
    status: "Active",
    priority: "Low"
  },
  {
    id: "H-1008",
    name: "Four Seasons Hotel Tokyo",
    location: "Tokyo, Japan",
    category: "Luxury",
    rooms: 190,
    rating: 5,
    status: "Inactive",
    priority: "Low"
  },
  {
    id: "H-1009",
    name: "The Ritz London",
    location: "London, UK",
    category: "Luxury",
    rooms: 136,
    rating: 5,
    status: "Active",
    priority: "High"
  },
  {
    id: "H-1010",
    name: "Atlantis The Palm",
    location: "Dubai, UAE",
    category: "Resort",
    rooms: 1539,
    rating: 5,
    status: "Active",
    priority: "Medium"
  }
];

// Generate 1238 mock hotels to make the 1248 Total paginated items fully functional
const generateMockHotels = () => {
  const list = [...baseHotels];
  const hotelBrands = ["Grand Hyatt", "Marriott Resort", "InterContinental", "Sheraton", "Sofitel", "Novotel", "Shangri-La", "Crowne Plaza", "Kempinski", "Westin", "Radisson Blu", "Mandarin Oriental", "Rosewood", "Aman Resort", "Banyan Tree"];
  const locations = [
    "Bali, Indonesia",
    "Dubai, UAE",
    "Singapore",
    "Bangkok, Thailand",
    "Sydney, Australia",
    "Tokyo, Japan",
    "London, UK",
    "Switzerland"
  ];
  const categories = ["Resort", "Luxury", "Business", "Heritage", "Boutique"];
  const statuses = ["Active", "Expiring Soon", "Inactive", "Terminated", "Draft"];
  const priorities = ["High", "Medium", "Low"];

  const getRandomStatus = () => {
    const r = Math.random() * 100;
    // Align with doughnut legend weight (Active ~68%, Expiring Soon ~12.5%, Inactive ~8%, Terminated ~5.5%, Draft ~6%)
    if (r < 68) return "Active";
    if (r < 80.5) return "Expiring Soon";
    if (r < 88.5) return "Inactive";
    if (r < 94) return "Terminated";
    return "Draft";
  };

  let idNum = 1011;
  for (let i = 0; i < 1238; i++) {
    const brand = hotelBrands[Math.floor(Math.random() * hotelBrands.length)];
    const loc = locations[Math.floor(Math.random() * locations.length)];
    const city = loc.split(",")[0];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const priority = priorities[Math.floor(Math.random() * priorities.length)];
    const rating = Math.random() > 0.3 ? 5 : (Math.random() > 0.5 ? 4.5 : 4);
    
    list.push({
      id: `H-${idNum}`,
      name: `${brand} ${city}`,
      location: loc,
      category: category,
      rooms: Math.floor(Math.random() * 600) + 50,
      rating: rating,
      status: getRandomStatus(),
      priority: priority
    });
    idNum++;
  }
  return list;
};

export default function HotelsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hotels, setHotels] = useState(() => generateMockHotels());
  const [showModal, setShowModal] = useState(false);

  // Filters
  const [countryFilter, setCountryFilter] = useState("All Countries");
  const [cityFilter, setCityFilter] = useState("All Cities");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [searchQuery, setSearchQuery] = useState("");

  // Sorting
  const [sortKey, setSortKey] = useState("id");
  const [sortDir, setSortDir] = useState("asc");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedIds, setSelectedIds] = useState([]);

  // Form states
  const [formValidated, setFormValidated] = useState(false);
  const [formName, setFormName] = useState("");
  const [formLocation, setFormLocation] = useState("Bali, Indonesia");
  const [formCustomLocation, setFormCustomLocation] = useState("");
  const [formCustomCountry, setFormCustomCountry] = useState("");
  const [formCategory, setFormCategory] = useState("Resort");
  const [formRooms, setFormRooms] = useState("");
  const [formRating, setFormRating] = useState("5");
  const [formStatus, setFormStatus] = useState("Active");
  const [formPriority, setFormPriority] = useState("Medium");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setCurrentPage(1);
  };

  const getSortValue = (hotel, key) => {
    switch (key) {
      case "id":
        return hotel.id;
      case "name":
        return hotel.name.toLowerCase();
      case "location":
        return hotel.location.toLowerCase();
      case "category":
        return hotel.category.toLowerCase();
      case "rooms":
        return hotel.rooms;
      case "rating":
        return hotel.rating;
      case "status":
        return hotel.status;
      case "priority":
        return hotel.priority;
      default:
        return "";
    }
  };

  // Filter calculations
  const filteredHotels = useMemo(() => {
    return hotels.filter((h) => {
      // Country Filter
      if (countryFilter !== "All Countries") {
        const country = h.location.split(",")[1]?.trim() || h.location;
        if (country !== countryFilter) return false;
      }
      // City Filter
      if (cityFilter !== "All Cities") {
        const city = h.location.split(",")[0]?.trim();
        if (city !== cityFilter) return false;
      }
      // Category Filter
      if (categoryFilter !== "All Categories" && h.category !== categoryFilter) return false;
      // Status Filter
      if (statusFilter !== "All Status" && h.status !== statusFilter) return false;
      // Search Box Query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        return (
          h.id.toLowerCase().includes(query) ||
          h.name.toLowerCase().includes(query) ||
          h.location.toLowerCase().includes(query) ||
          h.category.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [hotels, countryFilter, cityFilter, categoryFilter, statusFilter, searchQuery]);

  // Sort calculations
  const sortedHotels = useMemo(() => {
    const copy = [...filteredHotels];
    copy.sort((a, b) => {
      const va = getSortValue(a, sortKey);
      const vb = getSortValue(b, sortKey);
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  }, [filteredHotels, sortKey, sortDir]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(sortedHotels.length / rowsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const pagedHotels = useMemo(() => {
    const start = (safePage - 1) * rowsPerPage;
    return sortedHotels.slice(start, start + rowsPerPage);
  }, [sortedHotels, safePage, rowsPerPage]);

  const getPageNumbers = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = [];
    pages.push(1);
    if (safePage > 3) pages.push("...");
    for (let p = Math.max(2, safePage - 1); p <= Math.min(totalPages - 1, safePage + 1); p++) {
      pages.push(p);
    }
    if (safePage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  const handleResetFilters = () => {
    setCountryFilter("All Countries");
    setCityFilter("All Cities");
    setCategoryFilter("All Categories");
    setStatusFilter("All Status");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleSelectAll = () => {
    const pageIds = pagedHotels.map(h => h.id);
    const allSelected = pageIds.length > 0 && pageIds.every(id => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds(selectedIds.filter(id => !pageIds.includes(id)));
    } else {
      setSelectedIds(Array.from(new Set([...selectedIds, ...pageIds])));
    }
  };

  const handleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(x => x !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleExport = () => {
    alert(`Successfully exported ${sortedHotels.length} hotels to CSV!`);
  };

  const handleCreateHotelSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setFormValidated(true);
      return;
    }

    setFormValidated(false);

    let finalLoc = formLocation;
    if (formLocation === "Other") {
      finalLoc = `${formCustomLocation}, ${formCustomCountry}`;
    }

    const nextIdNum = hotels.reduce((max, h) => {
      const num = parseInt(h.id.replace("H-", ""), 10);
      return num > max ? num : max;
    }, 1000) + 1;

    const newHotel = {
      id: `H-${nextIdNum}`,
      name: formName,
      location: finalLoc,
      category: formCategory,
      rooms: parseInt(formRooms, 10),
      rating: parseFloat(formRating),
      status: formStatus,
      priority: formPriority
    };

    setHotels([newHotel, ...hotels]);
    setShowModal(false);

    // Reset fields
    setFormName("");
    setFormLocation("Bali, Indonesia");
    setFormCustomLocation("");
    setFormCustomCountry("");
    setFormCategory("Resort");
    setFormRooms("");
    setFormRating("5");
    setFormStatus("Active");
    setFormPriority("Medium");
  };

  // Dynamic calculations for Stats
  const stats = useMemo(() => {
    const total = hotels.length;
    const active = hotels.filter(h => h.status === "Active").length;
    const rooms = hotels.reduce((acc, h) => acc + h.rooms, 0);
    
    // Average Rate is hardcoded in mockup, but we will make it look authentic
    return [
      {
        label: "Total Hotels",
        value: total,
        trend: "↑ 14.6%",
        trendUp: true,
        icon: "bi-building",
        bgColor: "#E9F4EE",
        iconColor: "#1E6C45"
      },
      {
        label: "Active Contracts",
        value: active,
        trend: "↑ 11.2%",
        trendUp: true,
        icon: "bi-file-earmark-check",
        bgColor: "#FEF7ED",
        iconColor: "#B97C2B"
      },
      {
        label: "Total Rooms",
        value: rooms,
        trend: "↑ 8.5%",
        trendUp: true,
        icon: "bi-door-open",
        bgColor: "#ECEFFE",
        iconColor: "#5D59E1"
      },
      {
        label: "Average Rate",
        value: "$128",
        trend: "↓ 2.4%",
        trendUp: false,
        icon: "bi-currency-dollar",
        bgColor: "#FDF0F0",
        iconColor: "#D05E5E"
      }
    ];
  }, [hotels]);

  // Doughnut Chart data
  const summaryChartData = useMemo(() => {
    const active = hotels.filter(h => h.status === "Active").length;
    const expiring = hotels.filter(h => h.status === "Expiring Soon").length;
    const inactive = hotels.filter(h => h.status === "Inactive").length;
    const terminated = hotels.filter(h => h.status === "Terminated").length;
    const draft = hotels.filter(h => h.status === "Draft").length;

    return {
      labels: ["Active", "Expiring Soon", "Inactive", "Terminated", "Draft"],
      datasets: [
        {
          data: [active, expiring, inactive, terminated, draft],
          backgroundColor: ["#1E6C45", "#B97C2B", "#677E75", "#D05E5E", "#5D59E1"],
          borderWidth: 2,
          borderColor: "#FFFFFF",
          hoverOffset: 4
        }
      ]
    };
  }, [hotels]);

  const summaryChartOptions = {
    cutout: "70%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const val = context.raw;
            const percentage = ((val / hotels.length) * 100).toFixed(1);
            return `${context.label}: ${val} (${percentage}%)`;
          }
        }
      }
    }
  };

  // Unique list of Countries and Cities for filter selectors
  const uniqueCountries = useMemo(() => {
    const countries = hotels.map(h => h.location.split(",")[1]?.trim() || h.location);
    return Array.from(new Set(countries)).sort();
  }, [hotels]);

  const uniqueCities = useMemo(() => {
    const cities = hotels.map(h => h.location.split(",")[0]?.trim());
    return Array.from(new Set(cities)).sort();
  }, [hotels]);

  const renderStatusBadge = (status) => {
    let styles = {};
    switch (status) {
      case "Active":
        styles = { backgroundColor: "#E9F4EE", color: "#1E6C45" };
        break;
      case "Expiring Soon":
        styles = { backgroundColor: "#FFF6EE", color: "#B97C2B" };
        break;
      case "Inactive":
        styles = { backgroundColor: "#F5F5F5", color: "#777777" };
        break;
      case "Terminated":
        styles = { backgroundColor: "#FCEAEA", color: "#D05E5E" };
        break;
      case "Draft":
        styles = { backgroundColor: "#ECEFFE", color: "#5D59E1" };
        break;
      default:
        styles = { backgroundColor: "#F5F5F5", color: "#777" };
    }
    return (
      <span className="badge px-3 py-2 rounded-2 fw-700 fs-8" style={styles}>
        {status}
      </span>
    );
  };

  const renderPriorityBadge = (priority) => {
    let dotColor = "";
    switch (priority) {
      case "High":
        dotColor = "#D05E5E";
        break;
      case "Medium":
        dotColor = "#B97C2B";
        break;
      case "Low":
        dotColor = "#1E6C45";
        break;
      default:
        dotColor = "#777";
    }
    return (
      <span className="d-flex align-items-center gap-1 text-dark fw-600 fs-8">
        <span className="rounded-circle" style={{ width: "6px", height: "6px", backgroundColor: dotColor }}></span>
        {priority}
      </span>
    );
  };

  const renderStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="bi bi-star-fill text-warning" style={{ fontSize: "0.85rem", marginRight: "2px" }}></i>);
    }
    if (hasHalf) {
      stars.push(<i key="half" className="bi bi-star-half text-warning" style={{ fontSize: "0.85rem", marginRight: "2px" }}></i>);
    }
    const emptyCount = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyCount; i++) {
      stars.push(<i key={`empty-${i}`} className="bi bi-star text-secondary opacity-25" style={{ fontSize: "0.85rem", marginRight: "2px" }}></i>);
    }
    return <div className="d-flex">{stars}</div>;
  };

  const newHotelButton = (
    <button
      className="btn text-white rounded-3 px-3 d-flex align-items-center gap-2"
      style={{ backgroundColor: "#112E24", height: "42px", fontWeight: "600" }}
      onClick={() => setShowModal(true)}
      aria-label="Add new hotel"
    >
      <i className="bi bi-plus-lg fs-6"></i>
      <span>New Hotel</span>
      <i className="bi bi-chevron-down ms-1" style={{ fontSize: "0.75rem" }}></i>
    </button>
  );

  return (
    <div className="d-flex position-relative">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Workspace Container */}
      <div className="app-container w-100 min-vh-100 d-flex flex-column justify-content-between">
        
        {/* Header */}
        <Header
          toggleSidebar={toggleSidebar}
          hideWelcome={true}
          forcePageHeaderLayout={true}
          searchPlaceholder="Search inquiries, customers, bookings, quotations..."
          actionButton={newHotelButton}
        />

        {/* Main Contents */}
        <main className="main-content d-flex flex-column gap-4 py-4">
          
          {/* Sub-Header Row */}
          <div>
            <span className="text-secondary fs-7 fw-500 d-block">Home &gt; Suppliers &gt; Hotels</span>
            <h1 className="fs-3 fw-800 text-dark m-0 mt-1">Hotels</h1>
            <p className="text-secondary fs-7 mt-1">Manage your hotel database and contracts.</p>
          </div>

          {/* 1. Stats Counter Cards Section */}
          <section className="stats-section">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
              {stats.map((card, idx) => (
                <div className="col" key={idx}>
                  <div className="dashboard-card border border-light">
                    <div
                      className="dashboard-card-icon"
                      style={{ backgroundColor: card.bgColor, color: card.iconColor }}
                    >
                      <i className={`bi ${card.icon}`}></i>
                    </div>
                    <div className="dashboard-card-info">
                      <span className="dashboard-card-label">{card.label}</span>
                      <span className="dashboard-card-val">
                        {typeof card.value === "number" ? card.value.toLocaleString() : card.value}
                      </span>
                      <span className={`dashboard-card-trend ${card.trendUp ? "trend-up" : "trend-down"}`}>
                        <i className={`bi ${card.trendUp ? "bi-arrow-up-short" : "bi-arrow-down-short"}`}></i>
                        {card.trend}
                        <span className="trend-label ms-1">vs last month</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 2. Filter toolbar row */}
          <section className="filter-toolbar-section">
            <div className="section-card border border-light p-3">
              <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
                
                <div className="d-flex flex-wrap gap-2 flex-grow-1">
                  
                  {/* Countries Select */}
                  <select
                    className="form-select rounded-3 border-light shadow-sm text-dark bg-white py-2 px-3 fw-600"
                    style={{ width: "auto", minWidth: "150px", height: "42px", fontSize: "0.85rem" }}
                    value={countryFilter}
                    onChange={(e) => { setCountryFilter(e.target.value); setCurrentPage(1); }}
                  >
                    <option value="All Countries">All Countries</option>
                    {uniqueCountries.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>

                  {/* Cities Select */}
                  <select
                    className="form-select rounded-3 border-light shadow-sm text-dark bg-white py-2 px-3 fw-600"
                    style={{ width: "auto", minWidth: "130px", height: "42px", fontSize: "0.85rem" }}
                    value={cityFilter}
                    onChange={(e) => { setCityFilter(e.target.value); setCurrentPage(1); }}
                  >
                    <option value="All Cities">All Cities</option>
                    {uniqueCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>

                  {/* Category Select */}
                  <select
                    className="form-select rounded-3 border-light shadow-sm text-dark bg-white py-2 px-3 fw-600"
                    style={{ width: "auto", minWidth: "150px", height: "42px", fontSize: "0.85rem" }}
                    value={categoryFilter}
                    onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
                  >
                    <option value="All Categories">All Categories</option>
                    <option value="Resort">Resort</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Business">Business</option>
                    <option value="Heritage">Heritage</option>
                    <option value="Boutique">Boutique</option>
                  </select>

                  {/* Status Select */}
                  <select
                    className="form-select rounded-3 border-light shadow-sm text-dark bg-white py-2 px-3 fw-600"
                    style={{ width: "auto", minWidth: "135px", height: "42px", fontSize: "0.85rem" }}
                    value={statusFilter}
                    onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                  >
                    <option value="All Status">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Expiring Soon">Expiring Soon</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Terminated">Terminated</option>
                    <option value="Draft">Draft</option>
                  </select>

                  {/* More Filters */}
                  <button
                    className="btn btn-outline-secondary bg-white border border-light shadow-sm rounded-3 py-2 px-3 d-flex align-items-center justify-content-center fw-600"
                    style={{ height: "42px", borderColor: "var(--border)", fontSize: "0.85rem" }}
                  >
                    <i className="bi bi-funnel text-secondary fs-6 me-1"></i>
                    <span>More Filters</span>
                  </button>

                  {/* Reset Filter Button */}
                  {(countryFilter !== "All Countries" || cityFilter !== "All Cities" || categoryFilter !== "All Categories" || statusFilter !== "All Status" || searchQuery !== "") && (
                    <button
                      onClick={handleResetFilters}
                      className="btn text-secondary bg-transparent border-0 py-2 px-2 d-flex align-items-center justify-content-center fw-700 hover:text-dark transition-all"
                      style={{ height: "42px", fontSize: "0.88rem" }}
                    >
                      <i className="bi bi-arrow-counterclockwise fs-6 me-1"></i>
                      Reset
                    </button>
                  )}

                </div>

                <div className="d-flex align-items-center gap-2 flex-grow-1 flex-md-grow-0 justify-content-md-end w-100 w-md-auto mt-2 mt-md-0">
                  <div className="position-relative flex-grow-1 flex-md-grow-0" style={{ maxWidth: "240px" }}>
                    <i className="bi bi-search text-secondary position-absolute" style={{ left: "12px", top: "50%", transform: "translateY(-50%)" }}></i>
                    <input
                      type="text"
                      className="form-control rounded-3 border-light shadow-sm py-2 text-dark bg-white ps-4"
                      style={{ height: "42px", fontSize: "0.85rem", paddingLeft: "2.25rem" }}
                      placeholder="Search hotels, codes, locations..."
                      value={searchQuery}
                      onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    />
                  </div>

                  <button
                    className="btn text-white rounded-3 px-3 d-flex align-items-center gap-2"
                    style={{ backgroundColor: "#112E24", height: "42px", fontWeight: "600", fontSize: "0.85rem" }}
                    onClick={handleExport}
                  >
                    <i className="bi bi-download"></i>
                    <span>Export</span>
                  </button>
                </div>

              </div>
            </div>
          </section>

          {/* 3. Main content row */}
          <section className="main-grids-section">
            <div className="row g-3">
              
              {/* Left Column: Hotels Table */}
              <div className="col-12 col-xl-8">
                <div className="section-card border border-light p-4">
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="bg-light-subtle">
                        <tr className="border-bottom border-light">
                          <th style={{ width: "40px", paddingBottom: "1rem" }}>
                            <input
                              type="checkbox"
                              className="form-check-input shadow-none"
                              checked={pagedHotels.length > 0 && pagedHotels.every(h => selectedIds.includes(h.id))}
                              onChange={handleSelectAll}
                            />
                          </th>
                          {[
                            { label: "Hotel Name", key: "name" },
                            { label: "Location", key: "location" },
                            { label: "Category", key: "category" },
                            { label: "Rooms", key: "rooms" },
                            { label: "Star Rating", key: "rating" },
                            { label: "Contract Status", key: "status" },
                            { label: "Priority", key: "priority" }
                          ].map(({ label, key }) => (
                            <th
                              key={label}
                              className="lablename pb-3"
                              style={{
                                textTransform: "uppercase",
                                cursor: "pointer",
                                userSelect: "none",
                                whiteSpace: "nowrap"
                              }}
                              onClick={() => handleSort(key)}
                            >
                              {label}
                              <span className="ms-1" style={{ opacity: sortKey === key ? 1 : 0.3 }}>
                                {sortKey === key ? (
                                  sortDir === "asc" ? <i className="bi bi-chevron-up" style={{ fontSize: "0.65rem" }}></i> : <i className="bi bi-chevron-down" style={{ fontSize: "0.65rem" }}></i>
                                ) : (
                                  <i className="bi bi-chevron-expand" style={{ fontSize: "0.65rem" }}></i>
                                )}
                              </span>
                            </th>
                          ))}
                          <th className="lablename uppercase text-end pb-3 pe-3" style={{ textTransform: "uppercase" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pagedHotels.length > 0 ? (
                          pagedHotels.map((hotel) => {
                            const flagUrl = FLAG_URLS[hotel.location] || FLAG_URLS["Custom"];
                            // Image falls back to Generic Hotel image if code is not present
                            const imageUrl = HOTEL_IMAGES[hotel.id] || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=120&auto=format&fit=crop&q=80";

                            return (
                              <tr key={hotel.id} className="border-bottom border-light">
                                <td style={{ padding: "1rem 0.5rem" }}>
                                  <input
                                    type="checkbox"
                                    className="form-check-input shadow-none"
                                    checked={selectedIds.includes(hotel.id)}
                                    onChange={() => handleSelectRow(hotel.id)}
                                  />
                                </td>
                                <td style={{ padding: "1rem 0.5rem" }}>
                                  <div className="d-flex align-items-center gap-2">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={imageUrl}
                                      alt={hotel.name}
                                      className="rounded-2 border"
                                      style={{ width: "42px", height: "42px", objectFit: "cover" }}
                                    />
                                    <div>
                                      <span className="fw-700 text-dark d-block bd-labe" style={{ lineHeight: "1.2" }}>{hotel.name}</span>
                                      <span className="bd-labe d-block small-text01" style={{ marginTop: "2px" }}>{hotel.id}</span>
                                    </div>
                                  </div>
                                </td>
                                <td style={{ padding: "1rem 0.5rem" }}>
                                  <div className="d-flex align-items-center gap-2">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={flagUrl}
                                      alt={hotel.location}
                                      className="rounded-1 border"
                                      style={{ width: "20px", height: "13px", objectFit: "cover" }}
                                    />
                                    <span className="fw-600 text-dark bd-labe">{hotel.location}</span>
                                  </div>
                                </td>
                                <td className="text-secondary fw-600 bd-labe" style={{ padding: "1rem 0.5rem" }}>{hotel.category}</td>
                                <td className="fw-700 text-dark bd-labe" style={{ padding: "1rem 0.5rem" }}>{hotel.rooms.toLocaleString()}</td>
                                <td style={{ padding: "1rem 0.5rem" }}>{renderStarRating(hotel.rating)}</td>
                                <td style={{ padding: "1rem 0.5rem" }}>{renderStatusBadge(hotel.status)}</td>
                                <td style={{ padding: "1rem 0.5rem" }}>{renderPriorityBadge(hotel.priority)}</td>
                                <td className="text-end pe-3" style={{ padding: "1rem 0.5rem" }}>
                                  <div className="d-inline-flex gap-2">
                                    <button className="btn btn-outline-light border rounded-3 p-1 text-secondary" style={{ width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="View hotel details">
                                      <i className="bi bi-eye" style={{ fontSize: "0.85rem" }}></i>
                                    </button>
                                    <button className="btn btn-outline-light border rounded-3 p-1 text-secondary" style={{ width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="More actions">
                                      <i className="bi bi-three-dots-vertical" style={{ fontSize: "0.85rem" }}></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="9" className="text-center py-5 text-secondary">
                              <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                              No hotels found matching your filters.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination footer */}
                  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-4 pt-3 border-top border-light gap-3 inq-pagination">
                    <span className="text-secondary fs-8 fw-500">
                      Showing {sortedHotels.length === 0 ? 0 : (safePage - 1) * rowsPerPage + 1}
                      {" "}to {Math.min(safePage * rowsPerPage, sortedHotels.length)}
                      {" "}of {sortedHotels.length} entries
                    </span>
                    <div className="d-flex align-items-center gap-3">
                      <nav aria-label="Page navigation" className="shadow-none">
                        <ul className="pagination pagination-sm m-0 border-0">
                          <li className={`page-item ${safePage === 1 ? "disabled" : ""}`}>
                            <button
                              className="page-link border-0 text-secondary bg-transparent rounded-2 px-2"
                              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                              disabled={safePage === 1}
                            >
                              <i className="bi bi-chevron-left"></i>
                            </button>
                          </li>
                          {getPageNumbers().map((item, idx) =>
                            item === "..." ? (
                              <li className="page-item disabled" key={`ellipsis-${idx}`}>
                                <span className="page-link border-0 bg-transparent text-secondary px-2">…</span>
                              </li>
                            ) : (
                              <li className="page-item" key={item}>
                                <button
                                  className="page-link border-0 rounded-2 mx-1 fw-600"
                                  style={
                                    safePage === item
                                      ? { backgroundColor: "#112E24", color: "#fff" }
                                      : { backgroundColor: "transparent", color: "var(--dark)" }
                                  }
                                  onClick={() => setCurrentPage(item)}
                                >
                                  {item}
                                </button>
                              </li>
                            )
                          )}
                          <li className={`page-item ${safePage === totalPages ? "disabled" : ""}`}>
                            <button
                              className="page-link border-0 text-secondary bg-transparent rounded-2 px-2"
                              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                              disabled={safePage === totalPages}
                            >
                              <i className="bi bi-chevron-right"></i>
                            </button>
                          </li>
                        </ul>
                      </nav>

                      <select
                        className="form-select form-select-sm border rounded-2"
                        style={{ width: "100px", height: "30px", fontSize: "0.78rem" }}
                        value={rowsPerPage}
                        onChange={(e) => {
                          setRowsPerPage(parseInt(e.target.value, 10));
                          setCurrentPage(1);
                        }}
                      >
                        <option value="5">5 / page</option>
                        <option value="10">10 / page</option>
                        <option value="25">25 / page</option>
                        <option value="50">50 / page</option>
                      </select>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column: Widgets */}
              <div className="col-12 col-xl-4">
                <div className="d-flex flex-column gap-3">
                  
                  {/* Doughnut Card */}
                  <div className="section-card border border-light p-4">
                    <h3 className="section-card-title mb-4">Hotels by Status</h3>
                    
                    <div className="row align-items-center">
                      <div className="col-6 position-relative d-flex justify-content-center align-items-center" style={{ height: "130px" }}>
                        <div style={{ height: "130px", width: "130px" }}>
                          <Doughnut data={summaryChartData} options={summaryChartOptions} />
                        </div>
                        <div className="position-absolute text-center" style={{ pointerEvents: "none", zIndex: 10 }}>
                          <span className="fw-800 text-dark d-block" style={{ fontSize: "1.3rem", lineHeight: 1.1 }}>
                            {hotels.length.toLocaleString()}
                          </span>
                          <span className="text-secondary fw-600" style={{ fontSize: "0.65rem", letterSpacing: "0.5px" }}>
                            TOTAL
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="d-flex flex-column gap-2" style={{ fontSize: "0.8rem" }}>
                          {[
                            { label: "Active", val: hotels.filter(h => h.status === "Active").length, color: "#1E6C45" },
                            { label: "Expiring Soon", val: hotels.filter(h => h.status === "Expiring Soon").length, color: "#B97C2B" },
                            { label: "Inactive", val: hotels.filter(h => h.status === "Inactive").length, color: "#677E75" },
                            { label: "Terminated", val: hotels.filter(h => h.status === "Terminated").length, color: "#D05E5E" },
                            { label: "Draft", val: hotels.filter(h => h.status === "Draft").length, color: "#5D59E1" }
                          ].map((item, idx) => {
                            const pct = ((item.val / hotels.length) * 100).toFixed(1);
                            return (
                              <div key={idx} className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center gap-2">
                                  <span className="rounded-circle d-inline-block" style={{ width: "8px", height: "8px", backgroundColor: item.color }}></span>
                                  <span className="text-secondary fw-500">{item.label}</span>
                                </div>
                                <span className="fw-700 text-dark">{item.val.toLocaleString()} ({pct}%)</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Destinations progress list */}
                  <div className="section-card border border-light p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h3 className="section-card-title">Top Hotel Destinations</h3>
                      <a href="#" className="section-card-link" onClick={e => e.preventDefault()}>View All</a>
                    </div>
                    
                    <div className="d-flex flex-column gap-3">
                      {[
                        { dest: "Dubai, UAE", flag: "https://flagcdn.com/w40/ae.png", count: 245, pct: 100 },
                        { dest: "Singapore", flag: "https://flagcdn.com/w40/sg.png", count: 198, pct: 80.8 },
                        { dest: "Bali, Indonesia", flag: "https://flagcdn.com/w40/id.png", count: 176, pct: 71.8 },
                        { dest: "Bangkok, Thailand", flag: "https://flagcdn.com/w40/th.png", count: 142, pct: 58.0 },
                        { dest: "London, UK", flag: "https://flagcdn.com/w40/gb.png", count: 110, pct: 44.9 }
                      ].map((item, idx) => (
                        <div key={idx} className="dest-item-row d-flex flex-column gap-1">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-2">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={item.flag}
                                alt={item.dest}
                                className="rounded-1"
                                style={{ width: "18px", height: "12px", objectFit: "cover" }}
                              />
                              <span className="fw-700 text-dark" style={{ fontSize: "0.85rem" }}>{item.dest}</span>
                            </div>
                            <span className="fw-800 text-dark" style={{ fontSize: "0.85rem" }}>{item.count}</span>
                          </div>
                          <div className="progress rounded-pill bg-light" style={{ height: "6px" }}>
                            <div className="progress-bar rounded-pill" style={{ width: `${item.pct}%`, backgroundColor: "#1C3F35" }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Activities Widget */}
                  <div className="section-card border border-light p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h3 className="section-card-title">Recent Activities</h3>
                      <a href="#" className="section-card-link" onClick={e => e.preventDefault()}>View All</a>
                    </div>

                    <div className="d-flex flex-column gap-3">
                      {[
                        { id: 1, text: "New hotel added: Atlantis The Palm, Dubai", time: "10 min ago", type: "add" },
                        { id: 2, text: "Contract updated: The Peninsula Bangkok", time: "35 min ago", type: "update" },
                        { id: 3, text: "Hotel deactivated: Four Seasons Hotel Tokyo", time: "1 hour ago", type: "deactivate" },
                        { id: 4, text: "Room rates updated: Marina Bay Sands", time: "2 hours ago", type: "rate" }
                      ].map((act) => {
                        let iconClass = "";
                        let colorClass = "";
                        switch (act.type) {
                          case "add":
                            iconClass = "bi-plus-lg";
                            colorClass = "text-success bg-success-subtle border border-success-subtle";
                            break;
                          case "update":
                            iconClass = "bi-arrow-repeat";
                            colorClass = "text-warning bg-warning-subtle border border-warning-subtle";
                            break;
                          case "deactivate":
                            iconClass = "bi-x-lg";
                            colorClass = "text-danger bg-danger-subtle border border-danger-subtle";
                            break;
                          case "rate":
                            iconClass = "bi-info-lg";
                            colorClass = "text-primary bg-light-subtle border border-primary-subtle";
                            break;
                        }
                        return (
                          <div key={act.id} className="d-flex align-items-start gap-2 fs-8">
                            <div className={`rounded-circle d-flex align-items-center justify-content-center ${colorClass}`} style={{ width: "24px", height: "24px", flexShrink: 0 }}>
                              <i className={`bi ${iconClass}`} style={{ fontSize: "0.75rem" }}></i>
                            </div>
                            <div className="flex-grow-1">
                              <p className="m-0 text-dark fw-500">{act.text}</p>
                            </div>
                            <span className="text-secondary opacity-75 fs-9 whitespace-nowrap">{act.time}</span>
                          </div>
                        );
                      })}
                    </div>
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

      {/* Interactive modal for New Hotel */}
      {showModal && (
        <>
          <div className="modal-backdrop fade show" style={{ zIndex: 1060 }} onClick={() => setShowModal(false)}></div>
          <div className="modal fade show d-block" style={{ zIndex: 1070 }} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div className="modal-content border-0 rounded-4 shadow-lg">
                
                <div className="modal-header border-bottom border-light px-4 py-3 bg-light rounded-top-4 d-flex justify-content-between align-items-center">
                  <h5 className="modal-title fw-700 text-dark m-0">Add New Hotel</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                  ></button>
                </div>

                <form className={formValidated ? "was-validated" : ""} noValidate onSubmit={handleCreateHotelSubmit}>
                  <div className="modal-body p-4" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
                    
                    <h6 className="fw-700 text-primary mb-3">General Information</h6>
                    <div className="row g-3 mb-4">
                      <div className="col-md-6">
                        <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>Hotel Name</label>
                        <input
                          type="text"
                          className="form-control rounded-3 py-2 border-light shadow-sm text-dark bg-white"
                          required
                          placeholder="e.g. Burj Al Arab Jumeirah"
                          value={formName}
                          onChange={e => setFormName(e.target.value)}
                        />
                        <div className="invalid-feedback" style={{ fontSize: "0.75rem" }}>
                          Please enter the hotel name.
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>Category</label>
                        <select
                          className="form-select rounded-3 py-2 border-light shadow-sm text-dark bg-white"
                          value={formCategory}
                          onChange={e => setFormCategory(e.target.value)}
                        >
                          <option value="Resort">Resort</option>
                          <option value="Luxury">Luxury</option>
                          <option value="Business">Business</option>
                          <option value="Heritage">Heritage</option>
                          <option value="Boutique">Boutique</option>
                        </select>
                      </div>
                    </div>

                    <h6 className="fw-700 text-primary mb-3">Location & Details</h6>
                    <div className="row g-3 mb-4">
                      <div className="col-md-6">
                        <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>Location Preset</label>
                        <select
                          className="form-select rounded-3 py-2 border-light shadow-sm text-dark bg-white"
                          value={formLocation}
                          onChange={e => setFormLocation(e.target.value)}
                        >
                          <option value="Bali, Indonesia">Bali, Indonesia</option>
                          <option value="Dubai, UAE">Dubai, UAE</option>
                          <option value="Singapore">Singapore</option>
                          <option value="Bangkok, Thailand">Bangkok, Thailand</option>
                          <option value="Sydney, Australia">Sydney, Australia</option>
                          <option value="Tokyo, Japan">Tokyo, Japan</option>
                          <option value="London, UK">London, UK</option>
                          <option value="Switzerland">Switzerland</option>
                          <option value="Other">Other / Custom Location</option>
                        </select>
                      </div>

                      {formLocation === "Other" && (
                        <>
                          <div className="col-md-6">
                            <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>City</label>
                            <input
                              type="text"
                              className="form-control rounded-3 py-2 border-light shadow-sm text-dark bg-white"
                              required
                              placeholder="e.g. Paris"
                              value={formCustomLocation}
                              onChange={e => setFormCustomLocation(e.target.value)}
                            />
                            <div className="invalid-feedback" style={{ fontSize: "0.75rem" }}>
                              Please specify the city.
                            </div>
                          </div>
                          <div className="col-md-6">
                            <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>Country</label>
                            <input
                              type="text"
                              className="form-control rounded-3 py-2 border-light shadow-sm text-dark bg-white"
                              required
                              placeholder="e.g. France"
                              value={formCustomCountry}
                              onChange={e => setFormCustomCountry(e.target.value)}
                            />
                            <div className="invalid-feedback" style={{ fontSize: "0.75rem" }}>
                              Please specify the country.
                            </div>
                          </div>
                        </>
                      )}

                      <div className="col-md-4 col-6">
                        <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>Total Rooms</label>
                        <input
                          type="number"
                          min="1"
                          className="form-control rounded-3 py-2 border-light shadow-sm text-dark bg-white"
                          required
                          placeholder="e.g. 150"
                          value={formRooms}
                          onChange={e => setFormRooms(e.target.value)}
                        />
                        <div className="invalid-feedback" style={{ fontSize: "0.75rem" }}>
                          Please specify the room count.
                        </div>
                      </div>

                      <div className="col-md-4 col-6">
                        <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>Star Rating</label>
                        <select
                          className="form-select rounded-3 py-2 border-light shadow-sm text-dark bg-white"
                          value={formRating}
                          onChange={e => setFormRating(e.target.value)}
                        >
                          <option value="5">5 Stars</option>
                          <option value="4.5">4.5 Stars</option>
                          <option value="4">4 Stars</option>
                          <option value="3">3 Stars</option>
                        </select>
                      </div>
                    </div>

                    <h6 className="fw-700 text-primary mb-3">Priority & Status</h6>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>Contract Status</label>
                        <select
                          className="form-select rounded-3 py-2 border-light shadow-sm text-dark bg-white"
                          value={formStatus}
                          onChange={e => setFormStatus(e.target.value)}
                        >
                          <option value="Active">Active</option>
                          <option value="Expiring Soon">Expiring Soon</option>
                          <option value="Inactive">Inactive</option>
                          <option value="Terminated">Terminated</option>
                          <option value="Draft">Draft</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>Priority Level</label>
                        <select
                          className="form-select rounded-3 py-2 border-light shadow-sm text-dark bg-white"
                          value={formPriority}
                          onChange={e => setFormPriority(e.target.value)}
                        >
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </div>
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
                      Submit Hotel
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
