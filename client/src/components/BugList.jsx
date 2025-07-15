import React from 'react';
import BugItem from './BugItem';

const BugList = ({ bugs, loading, error, onUpdate, onDelete }) => {
  if (loading) return <div>Loading bugs...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!bugs || bugs.length === 0) return <div>No bugs reported yet.</div>;

  return (
    <div>
      <h2>Reported Bugs</h2>
      {bugs.map(bug => (
        <BugItem key={bug._id} bug={bug} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default BugList; 