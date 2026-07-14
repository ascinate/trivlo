"use client";

import { useState, useMemo, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { FaRegEye } from "react-icons/fa6";

// Preset data for destinations to make dropdown selections easy and render beautiful details
const DESTINATION_PRESETS = {
  "Dubai": { country: "United Arab Emirates", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=120&auto=format&fit=crop&q=80" },
  "Bali": { country: "Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=120&auto=format&fit=crop&q=80" },
  "Thailand": { country: "Thailand", image: "https://images.unsplash.com/photo-1528181304800-2f5333a2028f?w=120&auto=format&fit=crop&q=80" },
  "Singapore": { country: "Singapore", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=120&auto=format&fit=crop&q=80" },
  "Europe": { country: "Multiple Countries", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=120&auto=format&fit=crop&q=80" },
  "Maldives": { country: "Maldives", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=120&auto=format&fit=crop&q=80" }
};

const AGENT_PRESETS = {
  "Sarah Johnson": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
  "Michael Lee": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
  "David Brown": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"
};

const initialInquiries = [
  {
    id: "INQ-1025",
    customer: {
      name: "John Doe",
      email: "john@email.com",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80"
    },
    destination: {
      name: "Dubai",
      country: "United Arab Emirates",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=120&auto=format&fit=crop&q=80"
    },
    travelDate: "20 May 2025 - 25 May 2025",
    pax: "2 Adults, 1 Child",
    budget: "$2,500",
    status: "New",
    assignedTo: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80"
    },
    createdOn: "20 May 2025 10:30 AM"
  },
  {
    id: "INQ-1024",
    customer: {
      name: "Emma Watson",
      email: "emma@email.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80"
    },
    destination: {
      name: "Bali",
      country: "Indonesia",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=120&auto=format&fit=crop&q=80"
    },
    travelDate: "15 Jun 2025 - 22 Jun 2025",
    pax: "2 Adults",
    budget: "$1,800",
    status: "In Progress",
    assignedTo: {
      name: "Michael Lee",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
    },
    createdOn: "15 May 2025 02:15 PM"
  },
  {
    id: "INQ-1023",
    customer: {
      name: "Michael Lee",
      email: "michael@email.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
    },
    destination: {
      name: "Thailand",
      country: "Thailand",
      image: "https://images.unsplash.com/photo-1528181304800-2f5333a2028f?w=120&auto=format&fit=crop&q=80"
    },
    travelDate: "10 Jul 2025 - 18 Jul 2025",
    pax: "4 Adults, 1 Child",
    budget: "$3,200",
    status: "In Progress",
    assignedTo: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80"
    },
    createdOn: "14 May 2025 11:45 AM"
  },
  {
    id: "INQ-1022",
    customer: {
      name: "Sophia Kim",
      email: "sophia@email.com",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80"
    },
    destination: {
      name: "Singapore",
      country: "Singapore",
      image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=120&auto=format&fit=crop&q=80"
    },
    travelDate: "05 Jun 2025 - 09 Jun 2025",
    pax: "2 Adults",
    budget: "$1,650",
    status: "Converted",
    assignedTo: {
      name: "David Brown",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"
    },
    createdOn: "05 May 2025 09:20 AM"
  },
  {
    id: "INQ-1021",
    customer: {
      name: "Sophia Kirn",
      email: "sophia.k@email.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
    },
    destination: {
      name: "Europe",
      country: "Multiple Countries",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=120&auto=format&fit=crop&q=80"
    },
    travelDate: "12 Aug 2025 - 25 Aug 2025",
    pax: "2 Adults",
    budget: "$5,500",
    status: "In Progress",
    assignedTo: {
      name: "Michael Lee",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
    },
    createdOn: "12 May 2025 04:10 PM"
  },
  {
    id: "INQ-1020",
    customer: {
      name: "Olivia Wilson",
      email: "olivia@email.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80"
    },
    destination: {
      name: "Maldives",
      country: "Maldives",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=120&auto=format&fit=crop&q=80"
    },
    travelDate: "20 Jun 2025 - 25 Jun 2025",
    pax: "2 Adults",
    budget: "$2,900",
    status: "New",
    assignedTo: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80"
    },
    createdOn: "20 May 2025 01:05 PM"
  },
  {
    id: "INQ-1019",
    customer: {
      name: "Daniel Martinez",
      email: "daniel@email.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"
    },
    destination: {
      name: "Dubai",
      country: "United Arab Emirates",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=120&auto=format&fit=crop&q=80"
    },
    travelDate: "18 May 2025 - 22 May 2025",
    pax: "2 Adults, 2 Children",
    budget: "$2,200",
    status: "Lost",
    assignedTo: {
      name: "David Brown",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"
    },
    createdOn: "18 May 2025 12:20 PM"
  }
];

const ROWS_PER_PAGE = 7;

export default function InquiriesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  // Sorting state
  const [sortKey, setSortKey] = useState("id");      // column key to sort by
  const [sortDir, setSortDir] = useState("desc");    // "asc" | "desc"

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Datepicker ref for programmatic open
  const datePickerRef = useRef(null);
  const [datePickerValue, setDatePickerValue] = useState("");

  // New Inquiry Form States
  const [showModal, setShowModal] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formDest, setFormDest] = useState("Dubai");
  const [formCustomDest, setFormCustomDest] = useState("");
  const [formCustomCountry, setFormCustomCountry] = useState("");
  const [formStartDate, setFormStartDate] = useState("2025-05-20");
  const [formEndDate, setFormEndDate] = useState("2025-05-25");
  const [formAdults, setFormAdults] = useState(2);
  const [formChildren, setFormChildren] = useState(0);
  const [formBudget, setFormBudget] = useState("2500");
  const [formAgent, setFormAgent] = useState("Sarah Johnson");
  const [formStatus, setFormStatus] = useState("New");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Sorting handler — toggles direction if same column, else resets to asc
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setCurrentPage(1);
  };

  // Helper to extract a comparable value for a given sortKey
  const getSortValue = (inquiry, key) => {
    switch (key) {
      case "id": return inquiry.id;
      case "customer": return inquiry.customer.name.toLowerCase();
      case "destination": return inquiry.destination.name.toLowerCase();
      case "travelDate": return inquiry.travelDate;
      case "budget": return parseFloat(inquiry.budget.replace(/[$,]/g, "")) || 0;
      case "status": return inquiry.status;
      case "assignedTo": return inquiry.assignedTo.name.toLowerCase();
      case "createdOn": return inquiry.createdOn;
      default: return "";
    }
  };

  // Datepicker wrapper click handler
  const handleDatePickerWrapperClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.showPicker();
    }
  };

  // Stat calculations based on local inquiries + offset offsets to match user's mockup initial stats
  const stats = useMemo(() => {
    const offsetTotal = 349;
    const offsetNew = 87;
    const offsetInProgress = 153;
    const offsetConverted = 71;
    const offsetLost = 38;

    const countNew = inquiries.filter(i => i.status === "New").length;
    const countInProgress = inquiries.filter(i => i.status === "In Progress").length;
    const countConverted = inquiries.filter(i => i.status === "Converted").length;
    const countLost = inquiries.filter(i => i.status === "Lost").length;

    return [
      {
        label: "Total Inquiries",
        value: inquiries.length + offsetTotal,
        trend: "↑ 15.2%",
        trendUp: true,
        icon: "bi-folder2",
        bgColor: "#F1EEFE",
        iconColor: "#5D59E1"
      },
      {
        label: "New Inquiries",
        value: countNew + offsetNew,
        trend: "↑ 12.5%",
        trendUp: true,
        icon: "bi-file-earmark-plus",
        bgColor: "#EBF7F2",
        iconColor: "#1AA06A"
      },
      {
        label: "In Progress",
        value: countInProgress + offsetInProgress,
        trend: "↑ 8.4%",
        trendUp: true,
        icon: "bi-arrow-right-circle",
        bgColor: "#FFF6EE",
        iconColor: "#D37B1B"
      },
      {
        label: "Converted",
        value: countConverted + offsetConverted,
        trend: "↑ 10.3%",
        trendUp: true,
        icon: "bi-graph-up-arrow",
        bgColor: "#EBF4EF",
        iconColor: "#1E6C45"
      },
      {
        label: "Lost",
        value: countLost + offsetLost,
        trend: "↓ 4.1%",
        trendUp: false,
        icon: "bi-envelope",
        bgColor: "#FDF0F0",
        iconColor: "#D05E5E"
      }
    ];
  }, [inquiries]);

  // 1. Filter Logic (status tab + search)
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inquiry) => {
      if (activeTab !== "All" && inquiry.status !== activeTab) return false;
      if (searchTerm.trim() !== "") {
        const query = searchTerm.toLowerCase();
        return (
          inquiry.customer.name.toLowerCase().includes(query) ||
          inquiry.customer.email.toLowerCase().includes(query) ||
          inquiry.destination.name.toLowerCase().includes(query) ||
          inquiry.id.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [inquiries, activeTab, searchTerm]);

  // 2. Sort the filtered results
  const sortedInquiries = useMemo(() => {
    const copy = [...filteredInquiries];
    copy.sort((a, b) => {
      const va = getSortValue(a, sortKey);
      const vb = getSortValue(b, sortKey);
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredInquiries, sortKey, sortDir]);

  // 3. Paginate the sorted results
  const totalPages = Math.max(1, Math.ceil(sortedInquiries.length / ROWS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const pagedInquiries = useMemo(() => {
    const start = (safePage - 1) * ROWS_PER_PAGE;
    return sortedInquiries.slice(start, start + ROWS_PER_PAGE);
  }, [sortedInquiries, safePage]);

  // Generate compact page number list with ellipsis
  const getPageNumbers = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
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

  // Page change helper (also resets selection)
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    setSelectedIds([]);
  };

  // Checkbox handlers — operate on current page only
  const handleToggleSelectAll = () => {
    const pageIds = pagedInquiries.map(i => i.id);
    const allPageSelected = pageIds.length > 0 && pageIds.every(id => selectedIds.includes(id));
    if (allPageSelected) {
      setSelectedIds(selectedIds.filter(id => !pageIds.includes(id)));
    } else {
      setSelectedIds(Array.from(new Set([...selectedIds, ...pageIds])));
    }
  };

  const handleToggleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(x => x !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Form Submit Action
  const handleNewInquirySubmit = (e) => {
    e.preventDefault();

    // Determine destination and country
    let destName = formDest;
    let destCountry = "";
    let destImage = "";

    if (formDest === "Other") {
      destName = formCustomDest || "Adventure";
      destCountry = formCustomCountry || "Global Destination";
      destImage = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=120&auto=format&fit=crop&q=80";
    } else {
      const preset = DESTINATION_PRESETS[formDest];
      destCountry = preset.country;
      destImage = preset.image;
    }

    // Date formatting (convert YYYY-MM-DD to DD MMM YYYY)
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    const formattedStart = formatDate(formStartDate);
    const formattedEnd = formatDate(formEndDate);
    const dateRange = formattedStart && formattedEnd ? `${formattedStart} - ${formattedEnd}` : "TBD";

    // PAX formatting
    const paxText = `${formAdults} Adult${formAdults > 1 ? "s" : ""}` + (formChildren > 0 ? `, ${formChildren} Child${formChildren > 1 ? "ren" : ""}` : "");

    // Get next ID
    const nextNum = inquiries.reduce((max, item) => {
      const num = parseInt(item.id.replace("INQ-", ""), 10);
      return num > max ? num : max;
    }, 1000) + 1;

    const newInquiry = {
      id: `INQ-${nextNum}`,
      customer: {
        name: formName,
        email: formEmail,
        avatar: `https://images.unsplash.com/photo-${1530000000000 + Math.floor(Math.random() * 900000)}?w=120&auto=format&fit=crop&q=80`
      },
      destination: {
        name: destName,
        country: destCountry,
        image: destImage
      },
      travelDate: dateRange,
      pax: paxText,
      budget: `$${Number(formBudget).toLocaleString()}`,
      status: formStatus,
      assignedTo: {
        name: formAgent,
        avatar: AGENT_PRESETS[formAgent]
      },
      createdOn: `${formatDate(new Date())} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    };

    setInquiries([newInquiry, ...inquiries]);
    setShowModal(false);

    // Reset Form fields
    setFormName("");
    setFormEmail("");
    setFormDest("Dubai");
    setFormCustomDest("");
    setFormCustomCountry("");
    setFormStartDate("2025-05-20");
    setFormEndDate("2025-05-25");
    setFormAdults(2);
    setFormChildren(0);
    setFormBudget("2500");
    setFormAgent("Sarah Johnson");
    setFormStatus("New");
  };

  // Helper function to render status badges
  const renderStatusBadge = (status) => {
    let styles = {};
    switch (status) {
      case "New":
        styles = { backgroundColor: "#ECEFFE", color: "#5D59E1" };
        break;
      case "In Progress":
        styles = { backgroundColor: "#E6F0FF", color: "#0A58CA" };
        break;
      case "Converted":
        styles = { backgroundColor: "#E9F4EE", color: "#1E6C45" };
        break;
      case "Lost":
        styles = { backgroundColor: "#FCEAEA", color: "#D05E5E" };
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

  return (
    <>
      <style>{`
      /* ── Inquiries Page – Responsive Overrides ───────────────────────── */

      /* Sub-header action bar: stack nicely on small screens */
      .inq-toolbar {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        align-items: center;
        gap: 0.75rem;
      }
      .inq-toolbar .datepicker-wrapper {
        min-width: 0;
        flex-shrink: 1;
        max-width: 100%;
      }

      /* Tabs: scrollable single line, no wrapping */
      .inq-tabs-row {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1.25rem;
        padding-bottom: 0.75rem;
        border-bottom: 1px solid var(--border);
      }
      .inq-tabs {
        display: flex;
        flex-direction: row;
        gap: 0;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        flex-shrink: 1;
        min-width: 0;
      }
      .inq-tabs::-webkit-scrollbar { display: none; }
      .inq-tabs .nav-item { flex-shrink: 0; }

      /* Table search bar: always fluid */
      .inq-search-wrap {
        min-width: 0 !important;
        flex: 1 1 160px;
        max-width: 260px;
      }

      /* ── Mobile card view: shown only below md ────────────────────────── */
      .inq-card-list { display: none; }
      .inq-card {
        background: var(--card-bg);
        border: 1px solid var(--border);
        border-radius: 14px;
        padding: 1rem;
        margin-bottom: 0.75rem;
        transition: box-shadow 0.2s;
      }
      .inq-card:hover { box-shadow: 0 4px 16px rgba(17,46,36,0.06); }
      .inq-card-top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
      }
      .inq-card-customer { display: flex; align-items: center; gap: 0.6rem; }
      .inq-card-customer img {
        width: 36px; height: 36px;
        border-radius: 50%; object-fit: cover;
        border: 1.5px solid var(--border);
        flex-shrink: 0;
      }
      .inq-card-name {
        font-size: 0.88rem; font-weight: 700;
        color: var(--dark); line-height: 1.2;
      }
      .inq-card-email {
        font-size: 0.72rem; color: var(--secondary);
      }
      .inq-card-id {
        font-size: 0.72rem; font-weight: 700;
        color: #5D59E1; background: #ECEFFE;
        border-radius: 6px; padding: 0.15rem 0.45rem;
        white-space: nowrap; flex-shrink: 0;
      }
      .inq-card-dest {
        display: flex; align-items: center; gap: 0.5rem;
        margin-bottom: 0.65rem;
      }
      .inq-card-dest img {
        width: 40px; height: 30px;
        border-radius: 6px; object-fit: cover;
      }
      .inq-card-dest-name {
        font-size: 0.82rem; font-weight: 700; color: var(--dark);
      }
      .inq-card-dest-country {
        font-size: 0.7rem; color: var(--secondary);
      }
      .inq-card-meta {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.35rem 1rem;
        margin-bottom: 0.75rem;
      }
      .inq-card-meta-item {
        display: flex; flex-direction: column;
      }
      .inq-card-meta-label {
        font-size: 0.65rem; font-weight: 700;
        color: var(--secondary); text-transform: uppercase;
        letter-spacing: 0.5px; margin-bottom: 0.1rem;
      }
      .inq-card-meta-value {
        font-size: 0.8rem; font-weight: 600; color: var(--dark);
      }
      .inq-card-footer {
        display: flex; align-items: center;
        justify-content: space-between; gap: 0.5rem;
        border-top: 1px solid var(--border);
        padding-top: 0.65rem; margin-top: 0.1rem;
      }
      .inq-card-agent {
        display: flex; align-items: center; gap: 0.4rem;
      }
      .inq-card-agent img {
        width: 22px; height: 22px;
        border-radius: 50%; object-fit: cover;
      }
      .inq-card-agent-name {
        font-size: 0.75rem; font-weight: 600; color: var(--dark);
      }
      .inq-card-actions {
        display: flex; gap: 0.25rem;
      }
      .inq-card-actions button {
        border: none; background: none; padding: 0.3rem 0.4rem;
        color: var(--secondary); border-radius: 6px;
        transition: background 0.15s;
      }
      .inq-card-actions button:hover { background: var(--border); }
      .inq-card-checkbox {
        position: absolute; top: 0.9rem; left: 0.9rem;
      }

      /* Modal full-width on phones */
      @media (max-width: 575.98px) {
        .inq-modal-dialog {
          margin: 0 !important;
          max-width: 100% !important;
          width: 100% !important;
          min-height: 100dvh;
        }
        .inq-modal-dialog .modal-content {
          border-radius: 0 !important;
          min-height: 100dvh;
        }
        .inq-modal-dialog .modal-body {
          max-height: calc(100dvh - 130px) !important;
        }
      }

      /* Switch to card view below md (768px) */
      @media (max-width: 767.98px) {
        .inq-table-wrap { display: none !important; }
        .inq-card-list  { display: block !important; }
        .inq-search-wrap { max-width: 100%; }
      }

      /* Datepicker label: hide date text on very small screens */
      @media (max-width: 380px) {
        .inq-date-label { display: none; }
        .inq-toolbar .datepicker-wrapper { min-width: 42px; padding: 0.5rem 0.75rem; }
      }

      /* Pagination: tighten on phones */
      @media (max-width: 575.98px) {
        .inq-pagination .page-link { padding: 0.3rem 0.45rem; min-width: 30px; }
      }

      /* Section card padding on phones */
      @media (max-width: 575.98px) {
        .inq-section-card { padding: 1rem !important; }
      }
    `}</style>
      <div className="d-flex position-relative">

        {/* Sidebar Navigation */}
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content Layout Container */}
        <div className="app-container w-100 min-vh-100 d-flex flex-column justify-content-between">

          {/* Header Navigation with breadcrumbs & titles mapping */}
          <Header
            toggleSidebar={toggleSidebar}
            title="Inquiries"
            subtitle="CRM > Inquiries"
            searchPlaceholder="Search for inquiries, customers, bookings..."
          />

          {/* Main Workspace */}
          <main className="main-content d-flex flex-column gap-4 py-4">

            {/* Sub-Header Actions Row (Filter, Date, Add New Floating Right) */}
            <div className="inq-toolbar">
              <button
                className="btn btn-outline-secondary bg-white border border-light shadow-sm rounded-3 py-2 px-3 d-flex align-items-center justify-content-center"
                style={{ height: "42px", borderColor: "var(--border)", flexShrink: 0 }}
                aria-label="Toggle Advanced Filter"
              >
                <i className="bi bi-funnel text-secondary fs-6"></i>
              </button>

              {/* Datepicker wrapper — clicking anywhere opens the hidden native date input */}
              <div
                className="datepicker-wrapper position-relative"
                style={{ height: "42px", cursor: "pointer" }}
                onClick={handleDatePickerWrapperClick}
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
                {/* Hidden native date input — programmatically opened via ref */}
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

              <button
                className="btn text-white rounded-3 px-3 px-md-4 d-flex align-items-center gap-2"
                style={{ backgroundColor: "#5D59E1", height: "42px", fontWeight: "600", flexShrink: 0 }}
                onClick={() => setShowModal(true)}
              >
                <i className="bi bi-plus-lg fs-6"></i>
                <span>New Inquiry</span>
              </button>
            </div>

            {/* 1. Stats Counter Cards Section */}
            <section className="stats-section">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
                {stats.map((card, idx) => (
                  <div className="col" key={idx}>
                    <div className="dashboard-card">
                      <div
                        className="dashboard-card-icon"
                        style={{ backgroundColor: card.bgColor, color: card.iconColor }}
                      >
                        <i className={`bi ${card.icon}`}></i>
                      </div>
                      <div className="dashboard-card-info">
                        <span className="dashboard-card-label">{card.label}</span>
                        <span className="dashboard-card-val text-dark">{card.value}</span>
                        <div className="dashboard-card-trend">
                          <span className={card.trendUp ? "trend-up" : "trend-down"}>
                            <i className={`bi ${card.trendUp ? "bi-arrow-up-short" : "bi-arrow-down-short"}`}></i>
                            {card.trend}
                          </span>
                          <span className="trend-label">vs last month</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 2. Main Section Card Containing Tabs, Search, and Inquiries Table */}
            <section className="table-section">
              <div className="section-card inq-section-card p-4">

                {/* Tab navigation headers & Table toolbar actions */}
                <div className="inq-tabs-row">
                  {/* Tabs — horizontally scrollable on mobile */}
                  <div className="inq-tabs">
                    <ul className="nav nav-tabs border-0 flex-nowrap" style={{ gap: "0.5rem" }}>
                      {["All", "New", "In Progress", "Converted", "Lost"].map((tab) => (
                        <li className="nav-item" key={tab}>
                          <button
                            className={`nav-link border-0 bg-transparent px-0 pb-2 fw-600 position-relative ${activeTab === tab ? "active" : ""}`}
                            onClick={() => {
                              setActiveTab(tab);
                              setSelectedIds([]);
                              setCurrentPage(1);
                            }}
                            style={{
                              fontSize: "0.9rem",
                              color: activeTab === tab ? "var(--primary) !important" : "var(--secondary)",
                              borderBottom: activeTab === tab ? "2px solid #5D59E1" : "none",
                              borderRadius: 0,
                              whiteSpace: "nowrap",
                              paddingRight: "1rem"
                            }}
                          >
                            {tab}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions (Search, Filter, Export) */}
                  <div className="d-flex align-items-center gap-2 flex-grow-1 flex-md-grow-0 justify-content-end" style={{ minWidth: 0 }}>
                    <div className="position-relative inq-search-wrap">
                      <i className="bi bi-search position-absolute start-3 top-50 translate-middle-y text-secondary" style={{ left: "12px" }}></i>
                      <input
                        type="text"
                        placeholder="Search inquiries..."
                        className="form-control ps-5 py-2 rounded-3 border-light shadow-sm bg-light-subtle"
                        style={{ fontSize: "0.88rem", height: "38px", borderColor: "var(--border)" }}
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                      />
                    </div>

                    <button className="btn btn-light bg-white border border-light shadow-sm rounded-3 py-2 px-3 d-flex align-items-center gap-2" style={{ fontSize: "0.88rem", height: "38px", flexShrink: 0 }}>
                      <i className="bi bi-box-arrow-up-right text-secondary"></i>
                      <span className="text-secondary fw-600 d-none d-sm-inline">Export</span>
                    </button>
                  </div>
                </div>

                {/* ── Desktop Table (hidden below md) ── */}
                <div className="inq-table-wrap table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="bg-light-subtle">
                      <tr className="border-bottom border-light">
                        <th style={{ width: "40px", paddingBottom: "1rem" }}>
                          <input
                            type="checkbox"
                            className="form-check-input shadow-none"
                            checked={pagedInquiries.length > 0 && pagedInquiries.every(i => selectedIds.includes(i.id))}
                            onChange={handleToggleSelectAll}
                          />
                        </th>
                        {[
                          { label: "Inquiry ID", key: "id" },
                          { label: "Customer", key: "customer" },
                          { label: "Destination", key: "destination" },
                          { label: "Travel Date", key: "travelDate" },
                          { label: "Pax", key: null },
                          { label: "Budget", key: "budget" },
                          { label: "Status", key: "status" },
                          { label: "Assigned To", key: "assignedTo" },
                          { label: "Created On", key: "createdOn" },
                        ].map(({ label, key }) => (
                          <th
                            key={label}
                            className="lablename pb-3"
                            style={{
                              textTransform: "uppercase",
                              cursor: key ? "pointer" : "default",
                              userSelect: "none",
                              whiteSpace: "nowrap"
                            }}
                            onClick={() => key && handleSort(key)}
                          >
                            {label}
                            {key && (
                              <span className="ms-1" style={{ opacity: sortKey === key ? 1 : 0.3 }}>
                                {sortKey === key
                                  ? (sortDir === "asc" ? <i className="bi bi-chevron-up" style={{ fontSize: "0.65rem" }}></i>
                                    : <i className="bi bi-chevron-down" style={{ fontSize: "0.65rem" }}></i>)
                                  : <i className="bi bi-chevron-expand" style={{ fontSize: "0.65rem" }}></i>}
                              </span>
                            )}
                          </th>
                        ))}
                        <th className="lablename uppercase text-end pb-3 pe-3" style={{ textTransform: "uppercase" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pagedInquiries.length > 0 ? (
                        pagedInquiries.map((inquiry) => (
                          <tr key={inquiry.id} className="border-bottom border-light">
                            <td style={{ padding: "1.25rem 0.5rem" }}>
                              <input
                                type="checkbox"
                                className="form-check-input shadow-none"
                                checked={selectedIds.includes(inquiry.id)}
                                onChange={() => handleToggleSelectRow(inquiry.id)}
                              />
                            </td>
                            <td className="fw-700 text-primary bd-labe" style={{ padding: "1.25rem 0.5rem" }}>{inquiry.id}</td>
                            <td style={{ padding: "1.25rem 0.5rem" }}>
                              <div className="d-flex align-items-center gap-2">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={inquiry.customer.avatar}
                                  alt={inquiry.customer.name}
                                  className="rounded-circle border"
                                  style={{ width: "28px", height: "28px", objectFit: "cover" }}
                                />
                                <div>
                                  <span className="fw-700 text-dark d-block bd-labe" style={{ lineHeight: "1.2" }}>{inquiry.customer.name}</span>
                                  <span className="bd-labe d-block small-text01" style={{ marginTop: "2px" }}>{inquiry.customer.email}</span>
                                </div>
                              </div>
                            </td>
                            <td style={{ padding: "1.25rem 0.5rem" }}>
                              <div className="d-flex align-items-center gap-2">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={inquiry.destination.image}
                                  alt={inquiry.destination.name}
                                  className="rounded-2"
                                  style={{ width: "36px", height: "43px", objectFit: "cover" }}
                                />
                                <div>
                                  <span className="fw-700 text-dark d-block bd-labe" style={{ lineHeight: "1.2" }}>{inquiry.destination.name}</span>
                                  <span className="bd-labe d-block small-text01" style={{ marginTop: "2px" }}>{inquiry.destination.country}</span>
                                </div>
                              </div>
                            </td>
                            <td className="text-dark fw-500 bd-labe" style={{ padding: "1.25rem 0.5rem" }}>{inquiry.travelDate}</td>
                            <td className="text-secondary fw-500 bd-labe" style={{ padding: "1.25rem 0.5rem" }}>
                              <div className="d-flex align-items-center gap-1">
                                <i className="bi bi-people text-secondary"></i>
                                <span>{inquiry.pax}</span>
                              </div>
                            </td>
                            <td className="fw-700 text-dark bd-labe" style={{ padding: "1.25rem 0.5rem" }}>{inquiry.budget}</td>
                            <td style={{ padding: "1.25rem 0.5rem" }}>{renderStatusBadge(inquiry.status)}</td>
                            <td style={{ padding: "1.25rem 0.5rem" }}>
                              <div className="d-flex align-items-center gap-2">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={inquiry.assignedTo.avatar}
                                  alt={inquiry.assignedTo.name}
                                  className="rounded-circle"
                                  style={{ width: "24px", height: "24px", objectFit: "cover" }}
                                />
                                <span className="fw-600 text-dark bd-labe">{inquiry.assignedTo.name}</span>
                              </div>
                            </td>
                            <td className="text-secondary fw-500 bd-labe" style={{ padding: "1.25rem 0.5rem" }}>{inquiry.createdOn}</td>
                            <td className="text-end pe-3" style={{ padding: "1.25rem 0.5rem" }}>
                              <div className="d-flex align-items-center justify-content-end gap-2 text-secondary">
                                <button className="btn btn-link eye-links text-secondary p-1 border bg-transparent" aria-label="View Details">
                                  <FaRegEye />
                                </button>
                                <button className="btn btn-link text-secondary p-1 border bg-transparent" aria-label="More Actions">
                                  <i className="bi bi-three-dots-vertical fs-6"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="11" className="text-center py-5 text-secondary">
                            <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                            No inquiries found matching your query.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* ── Mobile Card List (hidden above md) ── */}
                <div className="inq-card-list">
                  {pagedInquiries.length > 0 ? (
                    pagedInquiries.map((inquiry) => (
                      <div key={inquiry.id} className="inq-card position-relative">
                        <div className="inq-card-top">
                          <div className="inq-card-customer">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={inquiry.customer.avatar} alt={inquiry.customer.name} />
                            <div>
                              <div className="inq-card-name">{inquiry.customer.name}</div>
                              <div className="inq-card-email">{inquiry.customer.email}</div>
                            </div>
                          </div>
                          <div className="d-flex flex-column align-items-end gap-2">
                            <span className="inq-card-id">{inquiry.id}</span>
                            {renderStatusBadge(inquiry.status)}
                          </div>
                        </div>

                        <div className="inq-card-dest">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={inquiry.destination.image} alt={inquiry.destination.name} />
                          <div>
                            <div className="inq-card-dest-name">{inquiry.destination.name}</div>
                            <div className="inq-card-dest-country">{inquiry.destination.country}</div>
                          </div>
                        </div>

                        <div className="inq-card-meta">
                          <div className="inq-card-meta-item">
                            <span className="inq-card-meta-label">Travel Date</span>
                            <span className="inq-card-meta-value">{inquiry.travelDate}</span>
                          </div>
                          <div className="inq-card-meta-item">
                            <span className="inq-card-meta-label">Budget</span>
                            <span className="inq-card-meta-value">{inquiry.budget}</span>
                          </div>
                          <div className="inq-card-meta-item">
                            <span className="inq-card-meta-label">Pax</span>
                            <span className="inq-card-meta-value">{inquiry.pax}</span>
                          </div>
                          <div className="inq-card-meta-item">
                            <span className="inq-card-meta-label">Created</span>
                            <span className="inq-card-meta-value">{inquiry.createdOn}</span>
                          </div>
                        </div>

                        <div className="inq-card-footer">
                          <div className="inq-card-agent">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={inquiry.assignedTo.avatar} alt={inquiry.assignedTo.name} />
                            <span className="inq-card-agent-name">{inquiry.assignedTo.name}</span>
                          </div>
                          <div className="inq-card-actions">
                            <button aria-label="View Details">
                              <i className="bi bi-eye"></i>
                            </button>
                            <button aria-label="More Actions">
                              <i className="bi bi-three-dots-vertical"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-5 text-secondary">
                      <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                      No inquiries found matching your query.
                    </div>
                  )}
                </div>

                {/* Table Pagination footer block */}
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-4 pt-3 border-top border-light gap-3 inq-pagination">
                  <span className="text-secondary fs-8 fw-500">
                    Showing {sortedInquiries.length === 0 ? 0 : (safePage - 1) * ROWS_PER_PAGE + 1}
                    {" "}to {Math.min(safePage * ROWS_PER_PAGE, sortedInquiries.length)}
                    {" "}of {sortedInquiries.length} {activeTab !== "All" ? `${activeTab} ` : ""}entries
                  </span>
                  <nav aria-label="Page navigation" className="shadow-none">
                    <ul className="pagination pagination-sm m-0 border-0">

                      {/* Prev button */}
                      <li className={`page-item ${safePage === 1 ? "disabled" : ""}`}>
                        <button
                          className="page-link border-0 text-secondary bg-transparent rounded-2 px-2"
                          onClick={() => handlePageChange(safePage - 1)}
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
                                  ? { backgroundColor: "#5D59E1", color: "#fff" }
                                  : { backgroundColor: "transparent", color: "var(--dark)" }
                              }
                              onClick={() => handlePageChange(item)}
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
                          onClick={() => handlePageChange(safePage + 1)}
                          disabled={safePage === totalPages}
                          aria-label="Next"
                        >
                          <i className="bi bi-chevron-right"></i>
                        </button>
                      </li>

                    </ul>
                  </nav>
                </div>

              </div>
            </section>

          </main>

          {/* Page Footer */}
          <Footer />
        </div>

        {/* Overlay to click-close sidebar on mobile viewports */}
        {sidebarOpen && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-lg-none"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)", zIndex: 995 }}
            onClick={toggleSidebar}
          ></div>
        )}

        {/* 3. New Inquiry Interactive Modal component */}
        {showModal && (
          <>
            <div className="modal-backdrop fade show" style={{ zIndex: 1060 }} onClick={() => setShowModal(false)}></div>
            <div className="modal fade show d-block" style={{ zIndex: 1070 }} tabIndex="-1" role="dialog">
              <div className="modal-dialog modal-dialog-centered modal-lg inq-modal-dialog" role="document">
                <div className="modal-content border-0 rounded-4 shadow-lg">

                  <div className="modal-header border-bottom border-light px-4 py-3 bg-light rounded-top-4 d-flex justify-content-between align-items-center">
                    <h5 className="modal-title fw-700 text-dark m-0">Create New Inquiry</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                      aria-label="Close"
                      style={{ filter: "none" }}
                    ></button>
                  </div>

                  <form onSubmit={handleNewInquirySubmit}>
                    <div className="modal-body p-4" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>

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
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>Email Address</label>
                          <input
                            type="email"
                            className="form-control rounded-3 py-2 border-light shadow-sm text-dark bg-white"
                            required
                            placeholder="e.g. john@email.com"
                            value={formEmail}
                            onChange={e => setFormEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <h6 className="fw-700 text-primary mb-3">Trip & Destination Details</h6>
                      <div className="row g-3 mb-4">
                        <div className="col-md-6">
                          <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>Destination Preset</label>
                          <select
                            className="form-select rounded-3 py-2 border-light shadow-sm text-dark bg-white"
                            value={formDest}
                            onChange={e => setFormDest(e.target.value)}
                          >
                            <option value="Dubai">Dubai (UAE)</option>
                            <option value="Bali">Bali (Indonesia)</option>
                            <option value="Thailand">Thailand</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Europe">Europe (Multi)</option>
                            <option value="Maldives">Maldives</option>
                            <option value="Other">Other / Custom Destination</option>
                          </select>
                        </div>

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

                      <h6 className="fw-700 text-primary mb-3">Budget & Assignment</h6>
                      <div className="row g-3">
                        <div className="col-md-4">
                          <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>Budget (USD)</label>
                          <div className="input-group shadow-sm rounded-3 overflow-hidden">
                            <span className="input-group-text border-light bg-light">$</span>
                            <input
                              type="number"
                              className="form-control border-light py-2 text-dark bg-white"
                              required
                              placeholder="e.g. 2500"
                              value={formBudget}
                              onChange={e => setFormBudget(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>Assign To Agent</label>
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
                        <div className="col-md-4">
                          <label className="form-label fw-600 text-secondary" style={{ fontSize: "0.78rem" }}>Initial Status</label>
                          <select
                            className="form-select rounded-3 py-2 border-light shadow-sm text-dark bg-white"
                            value={formStatus}
                            onChange={e => setFormStatus(e.target.value)}
                          >
                            <option value="New">New</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Converted">Converted</option>
                            <option value="Lost">Lost</option>
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
                        style={{ backgroundColor: "#5D59E1", fontSize: "0.9rem", fontWeight: "600" }}
                      >
                        Submit Inquiry
                      </button>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </>
        )}

      </div>
    </>
  );
}
