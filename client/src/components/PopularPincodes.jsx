import { Star } from 'lucide-react';

const POPULAR_PINCODES = [
  '560001',
  '560034',
  '560037',
  '560038',
  '560066',
  '560068',
  '560076',
  '560095',
  '560102'
];

const PopularPincodes = ({ onSelect }) => (
  <section className="chip-section" aria-labelledby="popular-title">
    <div className="chip-title">
      <Star size={18} aria-hidden="true" />
      <h2 id="popular-title">Popular Bangalore Pincodes</h2>
    </div>
    <div className="chip-list">
      {POPULAR_PINCODES.map((pincode) => (
        <button type="button" className="chip chip-strong" key={pincode} onClick={() => onSelect(pincode)}>
          {pincode}
        </button>
      ))}
    </div>
  </section>
);

export default PopularPincodes;
