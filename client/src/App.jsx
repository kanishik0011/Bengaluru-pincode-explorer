import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import PincodeResult from './components/PincodeResult.jsx';
import RecentSearches from './components/RecentSearches.jsx';
import PopularPincodes from './components/PopularPincodes.jsx';
import Loader from './components/Loader.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';
import { fetchPincode } from './services/api.js';

const RECENT_SEARCHES_KEY = 'bangalore-pincode-recent-searches';

const getValidationMessage = (pincode) => {
  if (!pincode.trim()) return 'Pincode is required.';
  if (!/^\d+$/.test(pincode)) return 'Pincode must contain only numbers.';
  if (pincode.length !== 6) return 'Pincode must be exactly 6 digits.';
  return '';
};

const App = () => {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [validationError, setValidationError] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedSearches = JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || '[]');
    setRecentSearches(Array.isArray(savedSearches) ? savedSearches.slice(0, 5) : []);
  }, []);

  const saveRecentSearch = (searchedPincode) => {
    const updatedSearches = [
      searchedPincode,
      ...recentSearches.filter((item) => item !== searchedPincode)
    ].slice(0, 5);

    setRecentSearches(updatedSearches);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedSearches));
  };

  const searchPincode = async (nextPincode) => {
    const cleanedPincode = nextPincode.trim();
    const message = getValidationMessage(cleanedPincode);

    setValidationError(message);
    setError('');

    if (message) {
      setResult(null);
      return;
    }

    setIsLoading(true);

    try {
      const data = await fetchPincode(cleanedPincode);
      setResult(data);
      saveRecentSearch(cleanedPincode);
    } catch (searchError) {
      setResult(null);
      setError(searchError.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchPincode(pincode);
  };

  const handleSelectPincode = (selectedPincode) => {
    setPincode(selectedPincode);
    searchPincode(selectedPincode);
  };

  return (
    <main className="app-shell">
      <div className="app-container">
        <Header />

        <SearchBar
          value={pincode}
          onChange={(value) => {
            setPincode(value);
            if (validationError) setValidationError(getValidationMessage(value));
          }}
          onSubmit={handleSubmit}
          validationError={validationError}
          isLoading={isLoading}
        />

        {isLoading ? <Loader /> : null}
        <ErrorMessage message={error} />
        <PincodeResult data={result} />

        <div className="lower-grid">
          <RecentSearches searches={recentSearches} onSelect={handleSelectPincode} />
          <PopularPincodes onSelect={handleSelectPincode} />
        </div>
      </div>
    </main>
  );
};

export default App;
