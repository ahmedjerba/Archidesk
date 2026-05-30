// src/components/StatCard.jsx

export function StatCard({ title, value, icon, colorClass }) {
  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="card-body d-flex align-items-center justify-content-between p-4">
        <div>
          {/* Titre de la carte */}
          <span className="text-secondary small text-uppercase fw-bold">{title}</span>
          {/* Chiffre statistique */}
          <h2 className="display-6 fw-bold text-dark mt-1 mb-0">{value}</h2>
        </div>
        {/* Icône avec son fond de couleur Bootstrap dynamique */}
        <div className={`p-3 rounded-3 fs-3 ${colorClass}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
