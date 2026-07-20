import Link from "next/link";

export default function DeparturesList() {
  const departures = [
    {
      title: "Bali Getaway",
      date: "10 May 2025",
      travelers: "2 Travelers",
      status: "Confirmed",
      badgeClass: "badge-confirmed",
      imgUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=120&auto=format&fit=crop&q=80"
    },
    {
      title: "Dubai Experience",
      date: "12 May 2025",
      travelers: "4 Travelers",
      status: "Ticketed",
      badgeClass: "badge-ticketed",
      imgUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=120&auto=format&fit=crop&q=80"
    },
    {
      title: "Europe Explorer",
      date: "15 May 2025",
      travelers: "3 Travelers",
      status: "Visa Pending",
      badgeClass: "badge-visa",
      imgUrl: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=120&auto=format&fit=crop&q=80"
    },
    {
      title: "Singapore Delight",
      date: "18 May 2025",
      travelers: "2 Travelers",
      status: "Pending",
      badgeClass: "badge-pending",
      imgUrl: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=120&auto=format&fit=crop&q=80"
    },
    {
      title: "Maldives Escape",
      date: "20 May 2025",
      travelers: "2 Travelers",
      status: "Confirmed",
      badgeClass: "badge-confirmed",
      imgUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=120&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="section-card">
      <div className="section-card-header">
        <h3 className="section-card-title">Upcoming Departures</h3>
        <Link href="#" className="section-card-link" onClick={(e) => e.preventDefault()}>View All</Link>
      </div>

      <div className="trip-list mt-2">
        {departures.map((trip, idx) => (
          <div className="trip-item" key={idx}>
            <div className="trip-info">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={trip.imgUrl}
                alt={trip.title}
                className="trip-img"
              />
              <div>
                <h6 className="trip-title">{trip.title}</h6>
                <span className="trip-meta">{trip.date} &nbsp;•&nbsp; {trip.travelers}</span>
              </div>
            </div>
            <div>
              <span className={`badge-custom ${trip.badgeClass}`}>{trip.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
