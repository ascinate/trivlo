export default function SalesPipeline() {
  const steps = [
    {
      label: "New Inquiries",
      value: "356",
      iconClass: "bi-geo-alt-fill",
      colorClass: "pipeline-icon-inquiries"
    },
    {
      label: "In Progress",
      value: "156",
      iconClass: "bi-arrow-repeat",
      colorClass: "pipeline-icon-progress"
    },
    {
      label: "Quotation Sent",
      value: "127",
      iconClass: "bi-file-earmark-check",
      colorClass: "pipeline-icon-quotation"
    },
    {
      label: "Booking Confirmed",
      value: "96",
      iconClass: "bi-check2",
      colorClass: "pipeline-icon-confirmed"
    },
    {
      label: "Completed",
      value: "72",
      iconClass: "bi-check2-all",
      colorClass: "pipeline-icon-completed"
    }
  ];

  return (
    <div className="section-card">
      <div className="section-card-header">
        <h3 className="section-card-title">Sales Pipeline</h3>
        <div className="dropdown">
          <button className="btn btn-sm btn-outline-light border text-dark dropdown-toggle py-1 px-2 rounded-3 text-secondary bg-white fw-600" type="button" style={{ fontSize: "0.82rem" }}>
            All Pipeline
          </button>
        </div>
      </div>

      <div className="pipeline-list position-relative mt-2">
        {/* Dash connector line */}
        <div className="pipeline-line"></div>

        {steps.map((step, idx) => (
          <div className="pipeline-item" key={idx}>
            <div className="pipeline-left">
              <div className={`pipeline-icon ${step.colorClass}`}>
                <i className={`bi ${step.iconClass}`}></i>
              </div>
              <span className="pipeline-label">{step.label}</span>
            </div>
            <span className="pipeline-value">{step.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
