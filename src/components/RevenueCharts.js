"use client";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement
);

export default function RevenueCharts() {
  // Line Chart Data: Revenue Overview
  // We'll generate slightly more data points to make the curve organic
  const lineLabels = [
    "01 May", "", "06 May", "", "11 May", "", "16 May", "", "21 May", "", "26 May", "", "31 May"
  ];

  const lineData = {
    labels: lineLabels,
    datasets: [
      {
        fill: true,
        label: "Revenue",
        data: [32000, 28000, 39000, 31000, 52000, 42000, 58000, 41000, 72450, 55000, 83000, 71000, 94000],
        borderColor: "#112E24",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 220);
          gradient.addColorStop(0, "rgba(17, 46, 36, 0.15)");
          gradient.addColorStop(1, "rgba(17, 46, 36, 0.0)");
          return gradient;
        },
        borderWidth: 2,
        tension: 0.45,
        pointBackgroundColor: "#112E24",
        pointBorderColor: "#FFFFFF",
        pointBorderWidth: 2,
        pointRadius: (context) => (context.dataIndex === 8 ? 6 : 0), // Only show point at 21 May
        pointHoverRadius: 8,
      }
    ]
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => `$${context.raw.toLocaleString()}`
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: "#677E75",
          font: {
            family: "Outfit",
            size: 10,
            weight: "600"
          }
        }
      },
      y: {
        grid: {
          color: "#EFECE6",
          drawBorder: false
        },
        ticks: {
          color: "#677E75",
          font: {
            family: "Outfit",
            size: 10,
            weight: "600"
          },
          callback: (value) => {
            if (value === 0) return "$0";
            return `$${value / 1000}K`;
          }
        },
        min: 0,
        max: 100000,
        stepSize: 20000
      }
    }
  };

  // Doughnut Chart Data: Revenue by Source
  const doughnutData = {
    labels: ["Website", "Referral", "Walk In", "Social Media", "Others"],
    datasets: [
      {
        data: [45.2, 25.6, 15.3, 9.1, 4.8],
        backgroundColor: [
          "#112E24", // Website (dark forest green)
          "#B97C2B", // Referral (gold/orange)
          "#677E75", // Walk In (slate green)
          "#D8B589", // Social Media (beige/brown)
          "#BDC8C3"  // Others (greyish-green)
        ],
        borderWidth: 0,
        weight: 1
      }
    ]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "75%",
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.label}: ${context.raw}%`
        }
      }
    }
  };

  const sources = [
    { name: "Website", percentage: "45.2%", color: "#112E24" },
    { name: "Referral", percentage: "25.6%", color: "#B97C2B" },
    { name: "Walk In", percentage: "15.3%", color: "#677E75" },
    { name: "Social Media", percentage: "9.1%", color: "#D8B589" },
    { name: "Others", percentage: "4.8%", color: "#BDC8C3" }
  ];

  return (
    <div className="row g-3">
      {/* Revenue Overview Line Chart */}
      <div className="col-12 col-lg-8">
        <div className="section-card position-relative">
          <div className="section-card-header">
            <h3 className="section-card-title">Revenue Overview</h3>
            <select class="form-select widthsds" aria-label="Default select example">
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

          <div className="chart-container mt-3" style={{ height: "245px" }}>
            <Line data={lineData} options={lineOptions} />

            {/* Custom Tooltip Annotation Overlay matching 21 May data point */}
            <div
              className="position-absolute d-flex flex-column align-items-center text-center p-2 rounded-3 text-white"
              style={{
                top: "14%",
                left: "60.5%",
                backgroundColor: "#112E24",
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                fontSize: "0.72rem",
                width: "80px",
                zIndex: 10,
                transform: "translateX(-50%)"
              }}
            >
              <div className="fw-700">$72,450</div>
              <div className="opacity-75" style={{ fontSize: "0.62rem" }}>21 May 2025</div>
              {/* Little downward arrow anchor */}
              <div
                className="position-absolute start-50 translate-middle-x"
                style={{
                  bottom: "-6px",
                  width: "0",
                  height: "0",
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderTop: "6px solid #112E24"
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue by Source Donut Chart */}
      <div className="col-12 col-lg-4">
        <div className="section-card">
          <div className="section-card-header">
            <h3 className="section-card-title">Revenue by Source</h3>
          </div>

          <div className="row align-items-center mt-3">
            {/* Donut column */}
            <div className="col-7 position-relative">
              <div style={{ height: "160px" }}>
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
              {/* Centered label inside Doughnut */}
              <div
                className="position-absolute top-50 start-50 translate-middle text-center"
                style={{ pointerEvents: "none" }}
              >
                <div className="fs-6 fw-800 text-dark" style={{ lineHeight: "1.1" }}>$532,450</div>
                <div className="text-secondary small fw-600" style={{ fontSize: "0.68rem" }}>Total</div>
              </div>
            </div>

            {/* Labels column */}
            <div className="col-5">
              <div className="d-flex flex-column gap-2">
                {sources.map((src, idx) => (
                  <div className="d-flex align-items-center justify-content-between" key={idx} style={{ fontSize: "0.76rem" }}>
                    <div className="d-flex align-items-center gap-1.5 overflow-hidden">
                      <span
                        className="rounded-circle d-inline-block flex-shrink-0"
                        style={{
                          width: "8px",
                          height: "8px",
                          backgroundColor: src.color,
                          marginRight: "4px"
                        }}
                      ></span>
                      <span className="text-secondary fw-500 text-truncate">{src.name}</span>
                    </div>
                    <span className="fw-700 text-dark ms-2">{src.percentage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
