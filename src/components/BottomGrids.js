export default function BottomGrids() {
  const agents = [
    { rank: 1, name: "Sarah Johnson", bookings: "48 Bookings", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80" },
    { rank: 2, name: "Michael Lee", bookings: "36 Bookings", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80" },
    { rank: 3, name: "David Brown", bookings: "28 Bookings", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80" },
    { rank: 4, name: "Emma Watson", bookings: "22 Bookings", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80" }
  ];

  const destinations = [
    { name: "Bali", bookings: "128 Bookings", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=120&auto=format&fit=crop&q=80" },
    { name: "Dubai", bookings: "96 Bookings", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=120&auto=format&fit=crop&q=80" },
    { name: "Thailand", bookings: "88 Bookings", img: "https://images.unsplash.com/photo-1528181304800-2f5333a2028f?w=120&auto=format&fit=crop&q=80" },
    { name: "Singapore", bookings: "72 Bookings", img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=120&auto=format&fit=crop&q=80" },
    { name: "Europe", bookings: "64 Bookings", img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=120&auto=format&fit=crop&q=80" }
  ];

  const activities = [
    {
      text: <>New inquiry received from <strong>John Doe</strong></>,
      time: "10 min ago",
      icon: "bi-file-earmark-plus",
      class: "activity-icon-inquiry"
    },
    {
      text: <>Quotation QT-1250 sent to <strong>Emma Watson</strong></>,
      time: "1 hour ago",
      icon: "bi-file-earmark-check",
      class: "activity-icon-quotation"
    },
    {
      text: <>Booking <strong>BK-1248</strong> confirmed</>,
      time: "2 hours ago",
      icon: "bi-calendar3-check",
      class: "activity-icon-booking"
    },
    {
      text: <>Payment received from <strong>Michael Lee</strong></>,
      time: "3 hours ago",
      icon: "bi-currency-dollar",
      class: "activity-icon-payment"
    },
    {
      text: <>New itinerary created for <strong>Bali Trip</strong></>,
      time: "4 hours ago",
      icon: "bi-map",
      class: "activity-icon-itinerary"
    }
  ];

  return (
    <div className="row g-3">
      {/* Top Performing Agents */}
      <div className="col-12 col-md-4">
        <div className="section-card">
          <div className="section-card-header">
            <h3 className="section-card-title">Top Performing Agents</h3>
            <a href="#" className="section-card-link" onClick={(e) => e.preventDefault()}>View All</a>
          </div>
          
          <div className="row row-cols-2 g-2 mt-2">
            {agents.map((agent) => (
              <div className="col" key={agent.rank}>
                <div className="agent-item">
                  <span className={`agent-rank agent-rank-${agent.rank}`}>{agent.rank}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={agent.avatar} alt={agent.name} className="agent-avatar" />
                  <span className="agent-name text-truncate w-100">{agent.name}</span>
                  <span className="agent-bookings">{agent.bookings}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Destinations */}
      <div className="col-12 col-md-4">
        <div className="section-card">
          <div className="section-card-header">
            <h3 className="section-card-title">Top Destinations</h3>
            <a href="#" className="section-card-link" onClick={(e) => e.preventDefault()}>View All</a>
          </div>

          <div className="row row-cols-5 row-cols-sm-5 row-cols-md-5 g-2 mt-2">
            {destinations.map((dest, idx) => (
              <div className="col" key={idx}>
                <div className="dest-item">
                  <div className="dest-img-wrapper">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={dest.img} alt={dest.name} className="dest-img" />
                  </div>
                  <div className="dest-name text-truncate">{dest.name}</div>
                  <div className="dest-bookings text-truncate" style={{ fontSize: "0.6rem" }}>{dest.bookings.split(" ")[0]} Bookings</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="col-12 col-md-4">
        <div className="section-card">
          <div className="section-card-header">
            <h3 className="section-card-title">Recent Activities</h3>
            <a href="#" className="section-card-link" onClick={(e) => e.preventDefault()}>View All</a>
          </div>

          <div className="activity-list mt-2">
            {activities.map((act, idx) => (
              <div className="activity-item" key={idx}>
                <div className="activity-detail">
                  <div className={`activity-icon ${act.class}`}>
                    <i className={`bi ${act.icon}`}></i>
                  </div>
                  <p className="activity-text">{act.text}</p>
                </div>
                <span className="activity-time">{act.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
