import { Building2, Landmark, MapPinned } from 'lucide-react';

const ResultField = ({ icon: Icon, label, value }) => (
  <div className="result-field">
    <div className="field-icon" aria-hidden="true">
      <Icon size={18} />
    </div>
    <div>
      <dt>{label}</dt>
      <dd>{value || 'Not available'}</dd>
    </div>
  </div>
);

const PincodeResult = ({ data }) => {
  if (!data) return null;

  return (
    <section className="results-section" aria-live="polite">
      <div className="section-heading">
        <p>Pincode</p>
        <h2>{data.pincode}</h2>
      </div>

      <div className="results-grid">
        {data.results.map((result) => (
          <article
            className="result-card"
            key={`${data.pincode}-${result.area}-${result.post_office}`}
          >
            <dl>
              <ResultField icon={MapPinned} label="Area" value={result.area} />
              <ResultField icon={Landmark} label="District" value={result.district} />
              <ResultField icon={Building2} label="State" value={result.state} />
              <ResultField
                icon={MapPinned}
                label="Post office"
                value={result.post_office}
              />
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PincodeResult;
