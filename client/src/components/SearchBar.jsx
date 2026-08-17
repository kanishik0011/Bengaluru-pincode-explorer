import { Search } from 'lucide-react';

const SearchBar = ({
  value,
  onChange,
  onSubmit,
  validationError,
  isLoading
}) => (
  <form className="search-panel" onSubmit={onSubmit} noValidate>
    <label htmlFor="pincode">Enter 6-digit pincode</label>
    <div className="search-row">
      <input
        id="pincode"
        name="pincode"
        type="text"
        inputMode="numeric"
        autoComplete="postal-code"
        maxLength="6"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="560001"
        aria-describedby={validationError ? 'validation-error' : undefined}
        aria-invalid={Boolean(validationError)}
      />
      <button type="submit" disabled={isLoading}>
        <Search size={18} aria-hidden="true" />
        <span>{isLoading ? 'Searching' : 'Search'}</span>
      </button>
    </div>
    {validationError ? (
      <p className="validation-message" id="validation-error">
        {validationError}
      </p>
    ) : null}
  </form>
);

export default SearchBar;
