import { MapPin } from 'lucide-react';

const Header = () => (
  <header className="app-header">
    <div className="header-icon" aria-hidden="true">
      <MapPin size={32} />
    </div>
    <div>
      <p className="eyebrow">Bengaluru Urban, Karnataka</p>
      <h1>Bangalore Pincode Explorer</h1>
      <p className="header-copy">Find area details using a Bangalore PIN</p>
    </div>
  </header>
);

export default Header;
