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
import { Line, Doughnut } from "react-chartjs-2";

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
  "Bali": "https://flagcdn.com/w40/id.png",
  "Dubai": "https://flagcdn.com/w40/ae.png",
  "Switzerland": "https://flagcdn.com/w40/ch.png",
  "Thailand": "https://flagcdn.com/w40/th.png",
  "Singapore": "https://flagcdn.com/w40/sg.png",
  "Maldives": "https://flagcdn.com/w40/mv.png",
  "Europe Trip": "https://flagcdn.com/w40/eu.png",
  "Japan": "https://flagcdn.com/w40/jp.png",
  "Australia": "https://flagcdn.com/w40/au.png",
  "Turkey": "https://flagcdn.com/w40/tr.png",
  "Custom": "https://flagcdn.com/w40/un.png" // United Nations/generic flag for custom
};

// Preset images for destinations
const DEST_IMAGES = {
  "Bali": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=120&auto=format&fit=crop&q=80",
  "Dubai": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=120&auto=format&fit=crop&q=80",
  "Switzerland": "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=120&auto=format&fit=crop&q=80",
  "Thailand": "https://images.unsplash.com/photo-1528181304800-2f5333a2028f?w=120&auto=format&fit=crop&q=80",
  "Singapore": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=120&auto=format&fit=crop&q=80",
  "Maldives": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=120&auto=format&fit=crop&q=80",
  "Europe Trip": "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=120&auto=format&fit=crop&q=80",
  "Japan": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=120&auto=format&fit=crop&q=80",
  "Australia": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=120&auto=format&fit=crop&q=80",
  "Turkey": "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=120&auto=format&fit=crop&q=80",
};

// Agent image presets
const AGENT_PRESETS = {
  "Sarah Johnson": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
  "Michael Lee": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
  "David Brown": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"
};

// Original 10 items from the mockup
const baseQuotations = [
  {
    id: "QT-1256",
    customer: { name: "John Doe", email: "john.doe@email.com", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80" },
    destination: { name: "Bali", country: "Indonesia" },
    amount: 1498.00,
    status: "Sent",
    validUntil: "25 May 2025",
    agent: "Sarah Johnson"
  },
  {
    id: "QT-1255",
    customer: { name: "Emma Watson", email: "emma.w@email.com", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80" },
    destination: { name: "Dubai", country: "UAE" },
    amount: 2350.00,
    status: "Pending",
    validUntil: "30 May 2025",
    agent: "Michael Lee"
  },
  {
    id: "QT-1254",
    customer: { name: "Michael Brown", email: "michael.b@email.com", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80" },
    destination: { name: "Switzerland", country: "Switzerland" },
    amount: 3120.00,
    status: "Sent",
    validUntil: "28 May 2025",
    agent: "David Brown"
  },
  {
    id: "QT-1253",
    customer: { name: "Sophia Davis", email: "sophia.d@email.com", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80" },
    destination: { name: "Thailand", country: "Thailand" },
    amount: 1980.00,
    status: "In Review",
    validUntil: "27 May 2025",
    agent: "Sarah Johnson"
  },
  {
    id: "QT-1252",
    customer: { name: "James Wilson", email: "james.w@email.com", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80" },
    destination: { name: "Singapore", country: "Singapore" },
    amount: 2450.00,
    status: "Converted",
    validUntil: "20 May 2025",
    agent: "Michael Lee"
  },
  {
    id: "QT-1251",
    customer: { name: "Olivia Martinez", email: "olivia.m@email.com", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80" },
    destination: { name: "Maldives", country: "Maldives" },
    amount: 3750.00,
    status: "Sent",
    validUntil: "26 May 2025",
    agent: "David Brown"
  },
  {
    id: "QT-1250",
    customer: { name: "William Taylor", email: "william.t@email.com", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80" },
    destination: { name: "Europe Trip", country: "Multiple Countries" },
    amount: 4890.00,
    status: "Pending",
    validUntil: "02 Jun 2025",
    agent: "Sarah Johnson"
  },
  {
    id: "QT-1249",
    customer: { name: "Ava Anderson", email: "ava.a@email.com", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80" },
    destination: { name: "Japan", country: "Japan" },
    amount: 2280.00,
    status: "Expired",
    validUntil: "15 May 2025",
    agent: "Michael Lee"
  },
  {
    id: "QT-1248",
    customer: { name: "Ethan Thomas", email: "ethan.t@email.com", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80" },
    destination: { name: "Australia", country: "Australia" },
    amount: 3560.00,
    status: "Converted",
    validUntil: "18 May 2025",
    agent: "David Brown"
  },
  {
    id: "QT-1247",
    customer: { name: "Charlotte White", email: "charlotte.w@email.com", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80" },
    destination: { name: "Turkey", country: "Turkey" },
    amount: 1750.00,
    status: "Declined",
    validUntil: "12 May 2025",
    agent: "Sarah Johnson"
  }
];

// Helper to generate the remaining 554 quotes to make pagination fully operational
const generateMockQuotations = () => {
  const list = [...baseQuotations];
  const firstNames = ["Robert", "Mary", "Patricia", "James", "Jennifer", "David", "Linda", "Elizabeth", "Thomas", "Susan", "Jessica", "Sarah", "Karen", "Nancy", "Lisa", "Betty", "Margaret", "Sandra", "Ashley", "Kimberly", "Emily", "Donna", "Michelle", "Carol", "Amanda"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris"];
  const destinations = [
    { name: "Bali", country: "Indonesia" },
    { name: "Dubai", country: "UAE" },
    { name: "Switzerland", country: "Switzerland" },
    { name: "Thailand", country: "Thailand" },
    { name: "Singapore", country: "Singapore" },
    { name: "Maldives", country: "Maldives" },
    { name: "Europe Trip", country: "Multiple Countries" },
    { name: "Japan", country: "Japan" },
    { name: "Australia", country: "Australia" },
    { name: "Turkey", country: "Turkey" }
  ];
  const statuses = ["Sent", "Pending", "In Review", "Converted", "Expired", "Declined"];
  // Weighted choice to match percentages: Sent ~44%, Pending ~28%, Converted ~22%, Expired ~4%, Declined ~2%
  const getRandomStatus = () => {
    const r = Math.random() * 100;
    if (r < 44) return "Sent";
    if (r < 72) return "Pending";
    if (r < 94) return "Converted";
    if (r < 97.5) return "Expired";
    return "Declined";
  };
  const agents = ["Sarah Johnson", "Michael Lee", "David Brown"];

  let idNum = 1246;
  for (let i = 0; i < 554; i++) {
    const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const dest = destinations[Math.floor(Math.random() * destinations.length)];
    const agent = agents[Math.floor(Math.random() * agents.length)];
    
    // Generate valid date range in mid 2025
    const day = Math.floor(Math.random() * 28) + 1;
    const months = ["May", "Jun", "Jul", "Aug"];
    const month = months[Math.floor(Math.random() * months.length)];
    
    list.push({
      id: `QT-${idNum}`,
      customer: {
        name: `${fName} ${lName}`,
        email: `${fName.toLowerCase()}.${lName.toLowerCase()}@email.com`,
        avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 900000)}?w=120&auto=format&fit=crop&q=80`
      },
      destination: dest,
      amount: Math.floor(Math.random() * 4500) + 1000,
      status: getRandomStatus(),
      validUntil: `${day} ${month} 2025`,
      agent: agent
    });
    idNum--;
  }
  return list;
};

export default function QuotationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quotations, setQuotations] = useState(() => generateMockQuotations());
  const [showModal, setShowModal] = useState(false);

  // Filter states
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [customerFilter, setCustomerFilter] = useState("All Customers");
  const [destFilter, setDestFilter] = useState("All Destinations");
  const [agentFilter, setAgentFilter] = useState("All Agents");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Datepicker states
  const datePickerRef = useRef(null);
  const [datePickerValue, setDatePickerValue] = useState("");
  
  // Sorting states
  const [sortKey, setSortKey] = useState("id");
  const [sortDir, setSortDir] = useState("desc");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedIds, setSelectedIds] = useState([]);

  // Form states
  const [formValidated, setFormValidated] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formDest, setFormDest] = useState("Bali");
  const [formCustomDest, setFormCustomDest] = useState("");
  const [formCustomCountry, setFormCustomCountry] = useState("");
  const [formStartDate, setFormStartDate] = useState("2025-05-20");
  const [formEndDate, setFormEndDate] = useState("2025-05-25");
  const [formAdults, setFormAdults] = useState(2);
  const [formChildren, setFormChildren] = useState(0);
  const [formAmount, setFormAmount] = useState("");
  const [formValidUntil, setFormValidUntil] = useState("2025-05-30");
  const [formAgent, setFormAgent] = useState("Sarah Johnson");
  const [formStatus, setFormStatus] = useState("Sent");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Unique list of customers and destinations for dropdown selectors
  const uniqueCustomers = useMemo(() => {
    const names = quotations.slice(0, 100).map(q => q.customer.name); // limit to top 100 to keep select clean
    return Array.from(new Set(names)).sort();
  }, [quotations]);

  const uniqueDestinations = useMemo(() => {
    const names = quotations.map(q => q.destination.name);
    return Array.from(new Set(names)).sort();
  }, [quotations]);

  const uniqueAgents = useMemo(() => {
    const names = quotations.map(q => q.agent);
    return Array.from(new Set(names)).sort();
  }, [quotations]);

  // Handle advanced column sorting
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc"); // default desc for items like IDs/amounts
    }
    setCurrentPage(1);
  };

  const getSortValue = (quote, key) => {
    switch (key) {
      case "id":
        return quote.id;
      case "customer":
        return quote.customer.name.toLowerCase();
      case "destination":
        return quote.destination.name.toLowerCase();
      case "amount":
        return quote.amount;
      case "status":
        return quote.status;
      case "validUntil":
        return new Date(quote.validUntil).getTime() || 0;
      case "agent":
        return quote.agent.toLowerCase();
      default:
        return "";
    }
  };

  // Filter calculations
  const filteredQuotations = useMemo(() => {
    return quotations.filter((q) => {
      // 1. Status Filter
      if (statusFilter !== "All Status" && q.status !== statusFilter) return false;
      // 2. Customer Filter
      if (customerFilter !== "All Customers" && q.customer.name !== customerFilter) return false;
      // 3. Destination Filter
      if (destFilter !== "All Destinations" && q.destination.name !== destFilter) return false;
      // 4. Agent Filter
      if (agentFilter !== "All Agents" && q.agent !== agentFilter) return false;
      // 5. Search Bar Query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        return (
          q.id.toLowerCase().includes(query) ||
          q.customer.name.toLowerCase().includes(query) ||
          q.customer.email.toLowerCase().includes(query) ||
          q.destination.name.toLowerCase().includes(query) ||
          q.destination.country.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [quotations, statusFilter, customerFilter, destFilter, agentFilter, searchQuery]);

  // Sort calculations
  const sortedQuotations = useMemo(() => {
    const copy = [...filteredQuotations];
    copy.sort((a, b) => {
      const va = getSortValue(a, sortKey);
      const vb = getSortValue(b, sortKey);
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  }, [filteredQuotations, sortKey, sortDir]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(sortedQuotations.length / rowsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const pagedQuotations = useMemo(() => {
    const start = (safePage - 1) * rowsPerPage;
    return sortedQuotations.slice(start, start + rowsPerPage);
  }, [sortedQuotations, safePage, rowsPerPage]);

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

  // Reset all filters
  const handleResetFilters = () => {
    setStatusFilter("All Status");
    setCustomerFilter("All Customers");
    setDestFilter("All Destinations");
    setAgentFilter("All Agents");
    setSearchQuery("");
    setDatePickerValue("");
    setCurrentPage(1);
  };

  // Checkbox interactions
  const handleSelectAll = () => {
    const pageIds = pagedQuotations.map(q => q.id);
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

  // Mock Export handler
  const handleExport = () => {
    alert(`Successfully exported ${sortedQuotations.length} quotations to CSV!`);
  };

  // Add new quotation form submit handler
  const handleCreateQuotationSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setFormValidated(true);
      return;
    }

    setFormValidated(false);

    // Destination and country details
    let destName = formDest;
    let destCountry = "";
    if (formDest === "Other") {
      destName = formCustomDest || "Custom Destination";
      destCountry = formCustomCountry || "Global";
    } else {
      destName = formDest;
      // Extract country name from FLAG_URLS map or default
      const presetDest = baseQuotations.find(q => q.destination.name === formDest);
      destCountry = presetDest ? presetDest.destination.country : formDest;
    }

    // Date formatting (e.g. "25 May 2025")
    const formatDateText = (dateStr) => {
      if (!dateStr) return "";
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    };

    const nextQuoteNum = quotations.reduce((max, q) => {
      const num = parseInt(q.id.replace("QT-", ""), 10);
      return num > max ? num : max;
    }, 1000) + 1;

    const newQuote = {
      id: `QT-${nextQuoteNum}`,
      customer: {
        name: formName,
        email: formEmail,
        avatar: `https://images.unsplash.com/photo-${1530000000000 + Math.floor(Math.random() * 900000)}?w=120&auto=format&fit=crop&q=80`
      },
      destination: {
        name: destName,
        country: destCountry
      },
      amount: parseFloat(formAmount),
      status: formStatus,
      validUntil: formatDateText(formValidUntil),
      agent: formAgent
    };

    // Add to top of list
    setQuotations([newQuote, ...quotations]);
    setShowModal(false);

    // Reset Form fields
    setFormName("");
    setFormEmail("");
    setFormDest("Bali");
    setFormCustomDest("");
    setFormCustomCountry("");
    setFormStartDate("2025-05-20");
    setFormEndDate("2025-05-25");
    setFormAdults(2);
    setFormChildren(0);
    setFormAmount("");
    setFormValidUntil("2025-05-30");
    setFormAgent("Sarah Johnson");
    setFormStatus("Sent");
  };

  // Status statistics calculation based on current dataset
  const stats = useMemo(() => {
    const total = quotations.length;
    const sent = quotations.filter(q => q.status === "Sent").length;
    const pending = quotations.filter(q => q.status === "Pending" || q.status === "In Review").length;
    const converted = quotations.filter(q => q.status === "Converted").length;
    const expiredDeclined = quotations.filter(q => q.status === "Expired" || q.status === "Declined").length;

    return [
      {
        label: "Total Quotations",
        value: total,
        trend: "↑ 14.2%",
        trendUp: true,
        icon: "bi-file-earmark-text",
        bgColor: "#E9F4EE",
        iconColor: "#1E6C45"
      },
      {
        label: "Quotes Sent",
        value: sent,
        trend: "↑ 12.6%",
        trendUp: true,
        icon: "bi-send",
        bgColor: "#FEF7ED",
        iconColor: "#B97C2B"
      },
      {
        label: "Pending",
        value: pending,
        trend: "↑ 8.7%",
        trendUp: true,
        icon: "bi-clock",
        bgColor: "#ECEFFE",
        iconColor: "#5D59E1"
      },
      {
        label: "Converted",
        value: converted,
        trend: "↑ 21.3%",
        trendUp: true,
        icon: "bi-check-circle",
        bgColor: "#EBF4EF",
        iconColor: "#1AA06A"
      },
      {
        label: "Expired / Declined",
        value: expiredDeclined,
        trend: "↓ 5.4%",
        trendUp: false,
        icon: "bi-x-circle",
        bgColor: "#FDF0F0",
        iconColor: "#D05E5E"
      }
    ];
  }, [quotations]);

  // Doughnut Chart data for Quotation Summary
  const summaryChartData = useMemo(() => {
    const sent = quotations.filter(q => q.status === "Sent").length;
    const pending = quotations.filter(q => q.status === "Pending" || q.status === "In Review").length;
    const converted = quotations.filter(q => q.status === "Converted").length;
    const expired = quotations.filter(q => q.status === "Expired").length;
    const declined = quotations.filter(q => q.status === "Declined").length;

    return {
      labels: ["Sent", "Pending", "Converted", "Expired", "Declined"],
      datasets: [
        {
          data: [sent, pending, converted, expired, declined],
          backgroundColor: ["#5D59E1", "#B97C2B", "#1E6C45", "#D05E5E", "#E29578"],
          borderWidth: 2,
          borderColor: "#FFFFFF",
          hoverOffset: 4
        }
      ]
    };
  }, [quotations]);

  const summaryChartOptions = {
    cutout: "70%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const val = context.raw;
            const percentage = ((val / quotations.length) * 100).toFixed(1);
            return `${context.label}: ${val} (${percentage}%)`;
          }
        }
      }
    }
  };

  // Sparkline Chart (Conversion Rate) data
  const sparklineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        fill: false,
        data: [15, 18, 14, 21, 19, 23, 20, 21.6],
        borderColor: "#1E6C45",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 0
      }
    ]
  };

  const sparklineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    },
    scales: {
      x: { display: false },
      y: { display: false }
    }
  };

  // Status badge styles helper
  const renderStatusBadge = (status) => {
    let styles = {};
    switch (status) {
      case "Sent":
        styles = { backgroundColor: "#ECEFFE", color: "#5D59E1" };
        break;
      case "Pending":
        styles = { backgroundColor: "#FFF6EE", color: "#B97C2B" };
        break;
      case "In Review":
        styles = { backgroundColor: "#F3E8FF", color: "#7C3AED" };
        break;
      case "Converted":
        styles = { backgroundColor: "#E9F4EE", color: "#1E6C45" };
        break;
      case "Expired":
        styles = { backgroundColor: "#FCEAEA", color: "#D05E5E" };
        break;
      case "Declined":
        styles = { backgroundColor: "#FFF0F0", color: "#C35858" };
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

  // Add New Quotation button in header
  const newQuotationButton = (
    <button
      className="btn text-white rounded-3 px-3 d-flex align-items-center gap-2"
      style={{ backgroundColor: "#112E24", height: "42px", fontWeight: "600" }}
      onClick={() => setShowModal(true)}
      aria-label="Add new quotation"
    >
      <i className="bi bi-plus-lg fs-6"></i>
      <span>New Quotation</span>
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
          actionButton={newQuotationButton}
        />

        {/* Main Contents */}
        <main className="main-content d-flex flex-column gap-4 py-4">
          
          {/* Sub-Header Row: Breadcrumb & Datepicker */}
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
            <div>
              <span className="text-secondary fs-7 fw-500 d-block">Home &gt; Quotations</span>
              <h1 className="fs-3 fw-800 text-dark m-0 mt-1">Quotations</h1>
            </div>

            {/* Datepicker dropdown */}
            <div
              className="datepicker-wrapper position-relative"
              style={{ height: "42px", cursor: "pointer" }}
              onClick={() => datePickerRef.current && datePickerRef.current.showPicker()}
              role="button"
              aria-label="Select date range"
            >
              <i className="bi bi-calendar3 text-secondary me-2"></i>
              <span className="me-2 text-dark fw-600 inq-date-label">
                {datePickerValue
                  ? new Date(datePickerValue).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
                  : "01 May 2025 - 31 May 2025"}
              </span>
              <i className="bi bi-chevron-down text-secondary" style={{ fontSize: "0.8rem" }}></i>
              <input
                ref={datePickerRef}
                type="date"
                value={datePickerValue}
                onChange={(e) => setDatePickerValue(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: "absolute",
                  opacity: 0,
                  width: "1px",
                  height: "1px",
                  pointerEvents: "none",
                  bottom: 0,
                  left: 0
                }}
                aria-hidden="true"
                tabIndex="-1"
              />
            </div>
          </div>

          {/* 1. Stats Counter Cards Section */}
          <section className="stats-section">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
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
                      <span className="dashboard-card-val">{card.value.toLocaleString()}</span>
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
                
                {/* Filters group */}
                <div className="d-flex flex-wrap gap-2 flex-grow-1">
                  
                  {/* Status Selector */}
                  <select
                    className="form-select rounded-3 border-light shadow-sm text-dark bg-white py-2 px-3 fw-600"
                    style={{ width: "auto", minWidth: "130px", height: "42px", fontSize: "0.85rem" }}
                    value={statusFilter}
                    onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                  >
                    <option value="All Status">All Status</option>
                    <option value="Sent">Sent</option>
                    <option value="Pending">Pending</option>
                    <option value="In Review">In Review</option>
                    <option value="Converted">Converted</option>
                    <option value="Expired">Expired</option>
                    <option value="Declined">Declined</option>
                  </select>

                  {/* Customers Selector */}
                  <select
                    className="form-select rounded-3 border-light shadow-sm text-dark bg-white py-2 px-3 fw-600"
                    style={{ width: "auto", minWidth: "150px", height: "42px", fontSize: "0.85rem" }}
                    value={customerFilter}
                    onChange={(e) => { setCustomerFilter(e.target.value); setCurrentPage(1); }}
                  >
                    <option value="All Customers">All Customers</option>
                    {uniqueCustomers.map(name => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>

                  {/* Destinations Selector */}
                  <select
                    className="form-select rounded-3 border-light shadow-sm text-dark bg-white py-2 px-3 fw-600"
                    style={{ width: "auto", minWidth: "150px", height: "42px", fontSize: "0.85rem" }}
                    value={destFilter}
                    onChange={(e) => { setDestFilter(e.target.value); setCurrentPage(1); }}
                  >
                    <option value="All Destinations">All Destinations</option>
                    {uniqueDestinations.map(name => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>

                  {/* Agents Selector */}
                  <select
                    className="form-select rounded-3 border-light shadow-sm text-dark bg-white py-2 px-3 fw-600"
                    style={{ width: "auto", minWidth: "130px", height: "42px", fontSize: "0.85rem" }}
                    value={agentFilter}
                    onChange={(e) => { setAgentFilter(e.target.value); setCurrentPage(1); }}
                  >
                    <option value="All Agents">All Agents</option>
                    {uniqueAgents.map(name => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>

                  {/* Created Date select */}
                  <select
                    className="form-select rounded-3 border-light shadow-sm text-dark bg-white py-2 px-3 fw-600"
                    style={{ width: "auto", minWidth: "130px", height: "42px", fontSize: "0.85rem" }}
                  >
                    <option value="Created Date">Created Date</option>
                    <option value="Today">Today</option>
                    <option value="Yesterday">Yesterday</option>
                    <option value="Last 7 Days">Last 7 Days</option>
                  </select>

                  {/* More Filters button */}
                  <button
                    className="btn btn-outline-secondary bg-white border border-light shadow-sm rounded-3 py-2 px-3 d-flex align-items-center justify-content-center fw-600"
                    style={{ height: "42px", borderColor: "var(--border)", fontSize: "0.85rem" }}
                  >
                    <i className="bi bi-funnel text-secondary fs-6 me-1"></i>
                    <span>More Filters</span>
                  </button>

                  {/* Reset button */}
                  {(statusFilter !== "All Status" || customerFilter !== "All Customers" || destFilter !== "All Destinations" || agentFilter !== "All Agents" || searchQuery !== "" || datePickerValue !== "") && (
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

                {/* Search & Actions group */}
                <div className="d-flex align-items-center gap-2 flex-grow-1 flex-md-grow-0 justify-content-md-end w-100 w-md-auto mt-2 mt-md-0">
                  <div className="position-relative flex-grow-1 flex-md-grow-0" style={{ maxWidth: "240px" }}>
                    <i className="bi bi-search text-secondary position-absolute" style={{ left: "12px", top: "50%", transform: "translateY(-50%)" }}></i>
                    <input
                      type="text"
                      className="form-control rounded-3 border-light shadow-sm py-2 text-dark bg-white ps-4"
                      style={{ height: "42px", fontSize: "0.85rem", paddingLeft: "2.25rem" }}
                      placeholder="Search Quote ID, Customer..."
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

          {/* 3. Main content row (Table on left, stats widgets on right) */}
          <section className="main-grids-section">
            <div className="row g-3">
              
              {/* Left Column - Table (8 cols) */}
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
                              checked={pagedQuotations.length > 0 && pagedQuotations.every(q => selectedIds.includes(q.id))}
                              onChange={handleSelectAll}
                            />
                          </th>
                          {[
                            { label: "Quote ID", key: "id" },
                            { label: "Customer", key: "customer" },
                            { label: "Destination", key: "destination" },
                            { label: "Amount", key: "amount" },
                            { label: "Status", key: "status" },
                            { label: "Valid Until", key: "validUntil" },
                            { label: "Agent", key: "agent" }
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
                        {pagedQuotations.length > 0 ? (
                          pagedQuotations.map((quote) => {
                            const flagUrl = FLAG_URLS[quote.destination.name] || FLAG_URLS["Custom"];
                            return (
                              <tr key={quote.id} className="border-bottom border-light">
                                <td style={{ padding: "1.25rem 0.5rem" }}>
                                  <input
                                    type="checkbox"
                                    className="form-check-input shadow-none"
                                    checked={selectedIds.includes(quote.id)}
                                    onChange={() => handleSelectRow(quote.id)}
                                  />
                                </td>
                                <td className="fw-700 text-primary bd-labe" style={{ padding: "1.25rem 0.5rem" }}>{quote.id}</td>
                                <td style={{ padding: "1.25rem 0.5rem" }}>
                                  <div className="d-flex align-items-center gap-2">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={quote.customer.avatar}
                                      alt={quote.customer.name}
                                      className="rounded-circle border"
                                      style={{ width: "28px", height: "28px", objectFit: "cover" }}
                                    />
                                    <div>
                                      <span className="fw-700 text-dark d-block bd-labe" style={{ lineHeight: "1.2" }}>{quote.customer.name}</span>
                                      <span className="bd-labe d-block small-text01" style={{ marginTop: "2px" }}>{quote.customer.email}</span>
                                    </div>
                                  </div>
                                </td>
                                <td style={{ padding: "1.25rem 0.5rem" }}>
                                  <div className="d-flex align-items-center gap-2">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={flagUrl}
                                      alt={quote.destination.name}
                                      className="rounded-1 border"
                                      style={{ width: "24px", height: "16px", objectFit: "cover" }}
                                    />
                                    <div>
                                      <span className="fw-700 text-dark d-block bd-labe" style={{ lineHeight: "1.2" }}>{quote.destination.name}</span>
                                      <span className="bd-labe d-block small-text01" style={{ marginTop: "2px" }}>{quote.destination.country}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="fw-700 text-dark bd-labe" style={{ padding: "1.25rem 0.5rem" }}>
                                  ${quote.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </td>
                                <td style={{ padding: "1.25rem 0.5rem" }}>{renderStatusBadge(quote.status)}</td>
                                <td className="text-secondary fw-500 bd-labe" style={{ padding: "1.25rem 0.5rem" }}>{quote.validUntil}</td>
                                <td style={{ padding: "1.25rem 0.5rem" }}>
                                  <div className="d-flex align-items-center gap-2">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={AGENT_PRESETS[quote.agent] || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80"}
                                      alt={quote.agent}
                                      className="rounded-circle border"
                                      style={{ width: "24px", height: "24px", objectFit: "cover" }}
                                    />
                                    <span className="fw-600 text-dark bd-labe">{quote.agent}</span>
                                  </div>
                                </td>
                                <td className="text-end pe-3" style={{ padding: "1.25rem 0.5rem" }}>
                                  <div className="d-inline-flex gap-2">
                                    <button className="btn btn-outline-light border rounded-3 p-1 text-secondary" style={{ width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="View quotation details">
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
                              No quotations found matching your criteria.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination footer */}
                  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-4 pt-3 border-top border-light gap-3 inq-pagination">
                    <span className="text-secondary fs-8 fw-500">
                      Showing {sortedQuotations.length === 0 ? 0 : (safePage - 1) * rowsPerPage + 1}
                      {" "}to {Math.min(safePage * rowsPerPage, sortedQuotations.length)}
                      {" "}of {sortedQuotations.length} entries
                    </span>
                    <div className="d-flex align-items-center gap-3">
                      <nav aria-label="Page navigation" className="shadow-none">
                        <ul className="pagination pagination-sm m-0 border-0">
                          
                          {/* Prev button */}
                          <li className={`page-item ${safePage === 1 ? "disabled" : ""}`}>
                            <button
                              className="page-link border-0 text-secondary bg-transparent rounded-2 px-2"
                              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                              disabled={safePage === 1}
                              aria-label="Previous"
                            >
                              <i className="bi bi-chevron-left"></i>
                            </button>
                          </li>

                          {/* Dynamic page numbers */}
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

                          {/* Next button */}
                          <li className={`page-item ${safePage === totalPages ? "disabled" : ""}`}>
                            <button
                              className="page-link border-0 text-secondary bg-transparent rounded-2 px-2"
                              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                              disabled={safePage === totalPages}
                              aria-label="Next"
                            >
                              <i className="bi bi-chevron-right"></i>
                            </button>
                          </li>

                        </ul>
                      </nav>

                      {/* Rows per page dropdown selector */}
                      <div className="d-flex align-items-center gap-1">
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
              </div>

              {/* Right Column - Stats Widgets (4 cols) */}
              <div className="col-12 col-xl-4">
                <div className="d-flex flex-column gap-3">
                  
                  {/* Card 1: Quotation Summary */}
                  <div className="section-card border border-light p-4">
                    <h3 className="section-card-title mb-4">Quotation Summary</h3>
                    
                    <div className="row align-items-center">
                      <div className="col-6 position-relative d-flex justify-content-center align-items-center" style={{ height: "130px" }}>
                        <div style={{ height: "130px", width: "130px" }}>
                          <Doughnut data={summaryChartData} options={summaryChartOptions} />
                        </div>
                        {/* Centered Total label */}
                        <div className="position-absolute text-center" style={{ pointerEvents: "none", zIndex: 10 }}>
                          <span className="fw-800 text-dark d-block" style={{ fontSize: "1.4rem", lineHeight: 1.1 }}>
                            {quotations.length}
                          </span>
                          <span className="text-secondary fw-600 uppercase" style={{ fontSize: "0.68rem", letterSpacing: "0.5px" }}>
                            TOTAL
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="d-flex flex-column gap-2" style={{ fontSize: "0.8rem" }}>
                          {[
                            { label: "Sent", val: quotations.filter(q => q.status === "Sent").length, color: "#5D59E1" },
                            { label: "Pending", val: quotations.filter(q => q.status === "Pending" || q.status === "In Review").length, color: "#B97C2B" },
                            { label: "Converted", val: quotations.filter(q => q.status === "Converted").length, color: "#1E6C45" },
                            { label: "Expired", val: quotations.filter(q => q.status === "Expired").length, color: "#D05E5E" },
                            { label: "Declined", val: quotations.filter(q => q.status === "Declined").length, color: "#E29578" }
                          ].map((item, index) => {
                            const pct = ((item.val / quotations.length) * 100).toFixed(1);
                            return (
                              <div key={index} className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center gap-2">
                                  <span className="rounded-circle d-inline-block" style={{ width: "8px", height: "8px", backgroundColor: item.color }}></span>
                                  <span className="text-secondary fw-500">{item.label}</span>
                                </div>
                                <span className="fw-700 text-dark">{item.val} ({pct}%)</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Conversion Rate */}
                  <div className="section-card border border-light p-4">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h3 className="section-card-title mb-1">Conversion Rate</h3>
                        <div className="d-flex align-items-baseline gap-2">
                          <span className="fs-3 fw-800 text-dark">21.6%</span>
                          <span className="trend-up fw-700" style={{ fontSize: "0.8rem" }}>
                            <i className="bi bi-arrow-up-short"></i> 3.8%
                          </span>
                        </div>
                        <span className="text-secondary d-block" style={{ fontSize: "0.75rem", marginTop: "-3px" }}>vs last month</span>
                      </div>
                      
                      {/* Mini Sparkline Chart */}
                      <div style={{ width: "90px", height: "45px" }}>
                        <Line data={sparklineData} options={sparklineOptions} />
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Top Destinations */}
                  <div className="section-card border border-light p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h3 className="section-card-title">Top Destinations</h3>
                      <a href="#" className="section-card-link" onClick={e => e.preventDefault()}>View All</a>
                    </div>
                    
                    <div className="d-flex flex-column gap-3">
                      {[
                        { dest: "Bali, Indonesia", flag: "https://flagcdn.com/w40/id.png", amount: 45230, pct: 100 },
                        { dest: "Dubai, UAE", flag: "https://flagcdn.com/w40/ae.png", amount: 38420, pct: 85 },
                        { dest: "Switzerland", flag: "https://flagcdn.com/w40/ch.png", amount: 32150, pct: 71 },
                        { dest: "Thailand", flag: "https://flagcdn.com/w40/th.png", amount: 28910, pct: 64 },
                        { dest: "Singapore", flag: "https://flagcdn.com/w40/sg.png", amount: 27680, pct: 61 }
                      ].map((item, index) => (
                        <div key={index} className="dest-item-row d-flex flex-column gap-1">
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
                            <span className="fw-800 text-dark" style={{ fontSize: "0.85rem" }}>${item.amount.toLocaleString()}</span>
                          </div>
                          <div className="progress rounded-pill bg-light" style={{ height: "6px" }}>
                            <div className="progress-bar rounded-pill" style={{ width: `${item.pct}%`, backgroundColor: "#1C3F35" }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card 4: Recent Activities */}
                  <div className="section-card border border-light p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h3 className="section-card-title">Recent Activities</h3>
                      <a href="#" className="section-card-link" onClick={e => e.preventDefault()}>View All</a>
                    </div>

                    <div className="d-flex flex-column gap-3">
                      {[
                        { id: 1, text: "Quotation QT-1256 sent to John Doe", time: "2 min ago", type: "sent" },
                        { id: 2, text: "Quotation QT-1252 converted", time: "15 min ago", type: "converted" },
                        { id: 3, text: "Quotation QT-1255 status changed to Pending", time: "32 min ago", type: "pending" },
                        { id: 4, text: "Quotation QT-1249 expired", time: "1 hour ago", type: "expired" }
                      ].map((act) => {
                        let iconClass = "";
                        let colorClass = "";
                        switch (act.type) {
                          case "sent":
                            iconClass = "bi-send";
                            colorClass = "text-primary bg-light-subtle border border-primary-subtle";
                            break;
                          case "converted":
                            iconClass = "bi-check2";
                            colorClass = "text-success bg-success-subtle border border-success-subtle";
                            break;
                          case "pending":
                            iconClass = "bi-arrow-repeat";
                            colorClass = "text-warning bg-warning-subtle border border-warning-subtle";
                            break;
                          case "expired":
                            iconClass = "bi-x-lg";
                            colorClass = "text-danger bg-danger-subtle border border-danger-subtle";
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

      {/* Overlay to click-close sidebar on mobile */}
      {sidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-lg-none"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)", zIndex: 995 }}
          onClick={toggleSidebar}
        ></div>
      )}

      {/* 4. New Quotation Interactive Modal Component */}
      {showModal && (
        <>
          <div className="modal-backdrop fade show" style={{ zIndex: 1060 }} onClick={() => setShowModal(false)}></div>
          <div className="modal fade show d-block" style={{ zIndex: 1070 }} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div className="modal-content border-0 rounded-4 shadow-lg">
                
                {/* Modal Header */}
                <div className="modal-header border-bottom border-light px-4 py-3 bg-light rounded-top-4 d-flex justify-content-between align-items-center">
                  <h5 className="modal-title fw-700 text-dark m-0">Create New Quotation</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                  ></button>
                </div>

                {/* Form */}
                <form className={formValidated ? "was-validated" : ""} noValidate onSubmit={handleCreateQuotationSubmit}>
                  
                  {/* Modal Body */}
                  <div className="modal-body p-4" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
                    
                    {/* Block 1: Customer Details */}
                    <h6 className="fw-700 text-primary mb-3">Customer Information</h6>
                    <div className="row g-3 mb-4">
                      <div className="col-md-6">
                        <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>Customer Name</label>
                        <input
                          type="text"
                          className="form-control rounded-3 py-2 border-light shadow-sm text-dark bg-white"
                          required
                          placeholder="e.g. John Doe"
                          value={formName}
                          onChange={e => setFormName(e.target.value)}
                        />
                        <div className="invalid-feedback" style={{ fontSize: "0.75rem" }}>
                          Please enter the customer name.
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>Email Address</label>
                        <input
                          type="email"
                          className="form-control rounded-3 py-2 border-light shadow-sm text-dark bg-white"
                          required
                          placeholder="e.g. john.doe@email.com"
                          value={formEmail}
                          onChange={e => setFormEmail(e.target.value)}
                        />
                        <div className="invalid-feedback" style={{ fontSize: "0.75rem" }}>
                          Please enter a valid email address.
                        </div>
                      </div>
                    </div>

                    {/* Block 2: Destination & Travel Details */}
                    <h6 className="fw-700 text-primary mb-3">Trip & Destination Details</h6>
                    <div className="row g-3 mb-4">
                      
                      {/* Destination preset selection */}
                      <div className="col-md-6">
                        <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>Destination Preset</label>
                        <select
                          className="form-select rounded-3 py-2 border-light shadow-sm text-dark bg-white"
                          value={formDest}
                          onChange={e => setFormDest(e.target.value)}
                        >
                          <option value="Bali">Bali (Indonesia)</option>
                          <option value="Dubai">Dubai (UAE)</option>
                          <option value="Switzerland">Switzerland</option>
                          <option value="Thailand">Thailand</option>
                          <option value="Singapore">Singapore</option>
                          <option value="Maldives">Maldives</option>
                          <option value="Europe Trip">Europe Trip</option>
                          <option value="Japan">Japan</option>
                          <option value="Australia">Australia</option>
                          <option value="Turkey">Turkey</option>
                          <option value="Other">Other / Custom Destination</option>
                        </select>
                      </div>

                      {/* Custom destination details (conditionally shown) */}
                      {formDest === "Other" && (
                        <>
                          <div className="col-md-6">
                            <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>Custom Destination Name</label>
                            <input
                              type="text"
                              className="form-control rounded-3 py-2 border-light shadow-sm text-dark bg-white"
                              required
                              placeholder="e.g. Paris"
                              value={formCustomDest}
                              onChange={e => setFormCustomDest(e.target.value)}
                            />
                            <div className="invalid-feedback" style={{ fontSize: "0.75rem" }}>
                              Please specify the custom destination name.
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

                      <div className="col-md-3 col-6">
                        <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>Start Date</label>
                        <input
                          type="date"
                          className="form-control rounded-3 py-2 border-light shadow-sm text-dark bg-white"
                          required
                          value={formStartDate}
                          onChange={e => setFormStartDate(e.target.value)}
                        />
                      </div>
                      <div className="col-md-3 col-6">
                        <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>End Date</label>
                        <input
                          type="date"
                          className="form-control rounded-3 py-2 border-light shadow-sm text-dark bg-white"
                          required
                          value={formEndDate}
                          onChange={e => setFormEndDate(e.target.value)}
                        />
                      </div>

                      <div className="col-md-3 col-6">
                        <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>Adults</label>
                        <input
                          type="number"
                          min="1"
                          className="form-control rounded-3 py-2 border-light shadow-sm text-dark bg-white"
                          required
                          value={formAdults}
                          onChange={e => setFormAdults(parseInt(e.target.value, 10))}
                        />
                      </div>
                      <div className="col-md-3 col-6">
                        <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>Children</label>
                        <input
                          type="number"
                          min="0"
                          className="form-control rounded-3 py-2 border-light shadow-sm text-dark bg-white"
                          required
                          value={formChildren}
                          onChange={e => setFormChildren(parseInt(e.target.value, 10))}
                        />
                      </div>

                    </div>

                    {/* Block 3: Budget & Assignment */}
                    <h6 className="fw-700 text-primary mb-3">Quote Details & Validation</h6>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>Quote Amount (USD)</label>
                        <div className="input-group shadow-sm rounded-3 overflow-hidden">
                          <span className="input-group-text border-light bg-light">$</span>
                          <input
                            type="number"
                            min="1"
                            step="0.01"
                            className="form-control border-light py-2 text-dark bg-white"
                            required
                            placeholder="e.g. 1498.00"
                            value={formAmount}
                            onChange={e => setFormAmount(e.target.value)}
                          />
                          <div className="invalid-feedback" style={{ fontSize: "0.75rem" }}>
                            Please specify a valid numeric quote amount.
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>Valid Until</label>
                        <input
                          type="date"
                          className="form-control rounded-3 py-2 border-light shadow-sm text-dark bg-white"
                          required
                          value={formValidUntil}
                          onChange={e => setFormValidUntil(e.target.value)}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>Assigned Agent</label>
                        <select
                          className="form-select rounded-3 py-2 border-light shadow-sm text-dark bg-white"
                          value={formAgent}
                          onChange={e => setFormAgent(e.target.value)}
                        >
                          <option value="Sarah Johnson">Sarah Johnson</option>
                          <option value="Michael Lee">Michael Lee</option>
                          <option value="David Brown">David Brown</option>
                        </select>
                      </div>
                      <div className="col-md-4 mt-3">
                        <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>Initial Status</label>
                        <select
                          className="form-select rounded-3 py-2 border-light shadow-sm text-dark bg-white"
                          value={formStatus}
                          onChange={e => setFormStatus(e.target.value)}
                        >
                          <option value="Sent">Sent</option>
                          <option value="Pending">Pending</option>
                          <option value="In Review">In Review</option>
                          <option value="Converted">Converted</option>
                          <option value="Expired">Expired</option>
                          <option value="Declined">Declined</option>
                        </select>
                      </div>
                    </div>

                  </div>

                  {/* Modal Footer */}
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
                      Submit Quotation
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
