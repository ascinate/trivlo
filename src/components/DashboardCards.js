export default function DashboardCards() {
  const cards = [
    {
      label: "Total Inquiries",
      value: "1,356",
      trend: "+ 16.3%",
      trendUp: true,
      timeframe: "vs last month",
      iconClass: "bi-briefcase-fill",
      bgClass: "bg-inquiries"
    },
    {
      label: "Total Bookings",
      value: "1,248",
      trend: "+ 12.8%",
      trendUp: true,
      timeframe: "vs last month",
      iconClass: "bi-calendar3-event-fill",
      bgClass: "bg-bookings"
    },
    {
      label: "Total Revenue",
      value: "$532,450",
      trend: "+ 8.6%",
      trendUp: true,
      timeframe: "vs last month",
      iconClass: "bi-currency-dollar",
      bgClass: "bg-revenue",
      isBoldIcon: true
    },
    {
      label: "Conversion Rate",
      value: "24.5%",
      trend: "+ 3.6%",
      trendUp: true,
      timeframe: "vs last month",
      iconClass: "bi-graph-up-arrow",
      bgClass: "bg-conversion"
    },
    {
      label: "Upcoming Trips",
      value: "89",
      trend: "+ 7.2%",
      trendUp: true,
      timeframe: "vs last month",
      iconClass: "bi-airplane-fill",
      bgClass: "bg-trips"
    }
  ];

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
      {cards.map((card, idx) => (
        <div className="col" key={idx}>
          <div className="dashboard-card">
            <div className={`dashboard-card-icon ${card.bgClass}`}>
              <i className={`bi ${card.iconClass}`} style={{ fontWeight: card.isBoldIcon ? "bold" : "normal" }}></i>
            </div>
            <div className="dashboard-card-info">
              <span className="dashboard-card-label">{card.label}</span>
              <span className="dashboard-card-val">{card.value}</span>
              <div className="dashboard-card-trend">
                <span className={card.trendUp ? "trend-up" : "trend-down"}>
                  <i className={`bi ${card.trendUp ? "bi-arrow-up-short" : "bi-arrow-down-short"}`}></i>
                  {card.trend}
                </span>
                <span className="trend-label">{card.timeframe}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
