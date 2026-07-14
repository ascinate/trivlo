export default function Footer() {
  return (
    <footer className="w-100 py-3 mt-auto border-top border-light text-center text-secondary" style={{ fontSize: "0.8rem", backgroundColor: "var(--light)" }}>
      <div className="container-fluid d-flex flex-column flex-sm-row justify-content-between align-items-center px-4">
        <span className="fw-500">© 2025 TRIVLO Travel CRM & Booking Management.</span>
        <div className="d-flex gap-3 mt-2 mt-sm-0">
          <a href="#" className="text-secondary text-decoration-none hover-dark fw-600" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
          <a href="#" className="text-secondary text-decoration-none hover-dark fw-600" onClick={(e) => e.preventDefault()}>Terms of Service</a>
          <a href="#" className="text-secondary text-decoration-none hover-dark fw-600" onClick={(e) => e.preventDefault()}>Support</a>
        </div>
      </div>
    </footer>
  );
}
