import React, { useState } from 'react';
import { createBug } from '../api/bugs';

const BugForm = ({ onBugCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('open');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    setLoading(true);
    try {
      await createBug({ title, description, status });
      setTitle('');
      setDescription('');
      setStatus('open');
      if (onBugCreated) onBugCreated(); // Notify parent to refresh list
    } catch (err) {
      setError('Failed to create bug');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Report a New Bug</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        <label htmlFor="bug-title">Title:</label>
        <input
          id="bug-title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="bug-description">Description:</label>
        <textarea
          id="bug-description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="bug-status">Status:</label>
        <select
          id="bug-status"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Reporting...' : 'Report Bug'}
      </button>
    </form>
  );
};

export default BugForm; 