import React, { useState, useEffect, useCallback } from 'react';
import BugForm from './components/BugForm';
import BugList from './components/BugList';
import ErrorBoundary from './components/ErrorBoundary';
import { fetchBugs } from './api/bugs';
import './App.css';

function App() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadBugs = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetchBugs();
      setBugs(res.data);
    } catch (err) {
      setError('Failed to load bugs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBugs();
  }, [loadBugs]);

  return (
    <ErrorBoundary>
      <div className="App">
        <h1>Bug Tracker</h1>
        <BugForm onBugCreated={loadBugs} />
        <BugList
          bugs={bugs}
          loading={loading}
          error={error}
          onUpdate={loadBugs}
          onDelete={loadBugs}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App; 