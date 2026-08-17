import { Clock } from 'lucide-react';

const RecentSearches = ({ searches, onSelect }) => {
  if (searches.length === 0) return null;

  return (
    <section className="chip-section" aria-labelledby="recent-title">
      <div className="chip-title">
        <Clock size={18} aria-hidden="true" />
        <h2 id="recent-title">Recent Searches</h2>
      </div>
      <div className="chip-list">
        {searches.map((pincode) => (
          <button type="button" className="chip" key={pincode} onClick={() => onSelect(pincode)}>
            {pincode}
          </button>
        ))}
      </div>
    </section>
  );
};

export default RecentSearches;
