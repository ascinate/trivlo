"use client";

import { useState } from "react";

export default function BookingsMap() {
  const [selectedDest, setSelectedDest] = useState(null);

  const destinations = [
    { name: "Canada", bookings: 64, x: 180, y: 110, countColor: "#1E6C45" },
    { name: "USA", bookings: 128, x: 150, y: 160, countColor: "#1E6C45" },
    { name: "Brazil", bookings: 32, x: 260, y: 280, countColor: "#5CA880" },
    { name: "UK", bookings: 45, x: 380, y: 110, countColor: "#82C1A2" },
    { name: "UAE", bookings: 85, x: 500, y: 190, countColor: "#1E6C45" },
    { name: "Thailand", bookings: 96, x: 620, y: 220, countColor: "#1E6C45" },
    { name: "Australia", bookings: 78, x: 700, y: 310, countColor: "#3B8F62" }
  ];

  return (
    <div className="section-card">
      <div className="section-card-header">
        <h3 className="section-card-title">Bookings by Destination</h3>
        <select class="form-select widthsd" aria-label="Default select example">
          <option selected>This month</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>

      <div className="world-map-wrapper">
        <svg
          viewBox="0 0 800 380"
          className="map-svg"
          style={{ backgroundColor: "#FCFAF6", borderRadius: "12px" }}
        >
          {/* Subtle grid pattern / dots represent landmasses */}
          <g fill="#EAE5DC" opacity="0.6">
            {/* North America */}
            <circle cx="100" cy="80" r="15" />
            <circle cx="120" cy="90" r="25" />
            <circle cx="140" cy="100" r="30" />
            <circle cx="150" cy="130" r="28" />
            <circle cx="170" cy="110" r="20" />
            <circle cx="180" cy="140" r="25" />
            <circle cx="110" cy="130" r="18" />
            <circle cx="130" cy="160" r="20" />
            <circle cx="155" cy="180" r="15" />

            {/* South America */}
            <circle cx="220" cy="220" r="15" />
            <circle cx="240" cy="240" r="22" />
            <circle cx="260" cy="260" r="25" />
            <circle cx="270" cy="290" r="28" />
            <circle cx="280" cy="320" r="20" />
            <circle cx="290" cy="340" r="10" />

            {/* Europe */}
            <circle cx="390" cy="90" r="20" />
            <circle cx="410" cy="100" r="25" />
            <circle cx="420" cy="120" r="22" />
            <circle cx="400" cy="120" r="15" />
            <circle cx="370" cy="110" r="15" />

            {/* Africa */}
            <circle cx="410" cy="190" r="22" />
            <circle cx="430" cy="180" r="25" />
            <circle cx="450" cy="200" r="28" />
            <circle cx="460" cy="230" r="20" />
            <circle cx="480" cy="250" r="15" />
            <circle cx="490" cy="280" r="12" />
            <circle cx="500" cy="300" r="8" />

            {/* Asia */}
            <circle cx="510" cy="120" r="20" />
            <circle cx="530" cy="110" r="25" />
            <circle cx="560" cy="100" r="35" />
            <circle cx="600" cy="90" r="38" />
            <circle cx="640" cy="110" r="30" />
            <circle cx="680" cy="120" r="25" />
            <circle cx="540" cy="150" r="25" />
            <circle cx="570" cy="140" r="30" />
            <circle cx="600" cy="150" r="35" />
            <circle cx="630" cy="160" r="32" />
            <circle cx="660" cy="150" r="25" />
            <circle cx="520" cy="180" r="22" />
            <circle cx="550" cy="190" r="20" />
            <circle cx="580" cy="190" r="25" />
            <circle cx="610" cy="200" r="28" />
            <circle cx="640" cy="210" r="22" />
            <circle cx="670" cy="200" r="15" />
            <circle cx="590" cy="230" r="15" />
            <circle cx="620" cy="240" r="18" />

            {/* Australia */}
            <circle cx="700" cy="300" r="22" />
            <circle cx="730" cy="310" r="25" />
            <circle cx="740" cy="340" r="15" />
            <circle cx="710" cy="330" r="18" />
          </g>

          {/* Dotted grid connector paths to destinations */}
          {destinations.map((dest, idx) => (
            <g key={idx} className="map-marker" onMouseEnter={() => setSelectedDest(dest)} onMouseLeave={() => setSelectedDest(null)}>
              {/* Ripple Effect ring */}
              <circle
                cx={dest.x}
                cy={dest.y}
                r="10"
                fill={dest.countColor}
                opacity="0.2"
              >
                <animate attributeName="r" values="6;16;6" dur="2s" repeatCount="indefinite" />
              </circle>
              {/* Inner Pin */}
              <circle
                cx={dest.x}
                cy={dest.y}
                r="6"
                fill={dest.countColor}
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />

              {/* Label Group */}
              <g transform={`translate(${dest.x - 40}, ${dest.y - 35})`}>
                {/* Background Card */}
                <rect width="80" height="24" rx="6" fill="#112E24" opacity="0.9" />
                {/* Text name */}
                <text x="40" y="10" fill="#FFFFFF" fontSize="7" fontWeight="bold" textAnchor="middle">{dest.name}</text>
                {/* Text bookings */}
                <text x="40" y="19" fill="#F8EFE4" fontSize="7" textAnchor="middle">{dest.bookings} Bookings</text>
              </g>
            </g>
          ))}
        </svg>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3 border-top pt-2">
        <div className="map-legend">
          <span>Low</span>
          <div className="map-legend-bar"></div>
          <span>High</span>
        </div>
      </div>
    </div>
  );
}
