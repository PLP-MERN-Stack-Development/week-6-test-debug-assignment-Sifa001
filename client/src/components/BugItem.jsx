import React, { useState } from 'react';
import { updateBug, deleteBug } from '../api/bugs';

const BugItem = ({ bug, onUpdate, onDelete }) => {
  const [status, setStatus] = useState(bug.status);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setLoading(true);
    setError('');
    try {
      await updateBug(bug._id, { status: newStatus });
      if (onUpdate) onUpdate();
    } catch (err) {
      setError('Failed to update status');
      setStatus(bug.status); // revert
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this bug?')) return;
    setLoading(true);
    setError('');
    try {
      await deleteBug(bug._id);
      if (onDelete) onDelete();
    } catch (err) {
      setError('Failed to delete bug');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', margin: '8px 0', padding: '8px' }}>
      <h3>{bug.title}</h3>
      <p><strong>Description:</strong> {bug.description || 'No description'}</p>
      <p>
        <strong>Status:</strong>{' '}
        <select value={status} onChange={handleStatusChange} disabled={loading}>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </p>
      <button onClick={handleDelete} disabled={loading} style={{ color: 'red' }}>
        Delete
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default BugItem; 