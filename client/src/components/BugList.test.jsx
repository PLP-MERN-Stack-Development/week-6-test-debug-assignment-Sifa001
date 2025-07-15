import React from 'react';
import { render, screen } from '@testing-library/react';
import BugList from './BugList';

const bugs = [
  { _id: '1', title: 'Bug 1', description: 'Desc 1', status: 'open' },
  { _id: '2', title: 'Bug 2', description: 'Desc 2', status: 'resolved' }
];

it('shows loading state', () => {
  render(<BugList loading={true} />);
  expect(screen.getByText(/loading bugs/i)).toBeInTheDocument();
});

it('shows error state', () => {
  render(<BugList error="Failed" />);
  expect(screen.getByText(/failed/i)).toBeInTheDocument();
});

it('shows empty state', () => {
  render(<BugList bugs={[]} />);
  expect(screen.getByText(/no bugs reported/i)).toBeInTheDocument();
});

it('renders bugs', () => {
  render(<BugList bugs={bugs} />);
  expect(screen.getByText(/bug 1/i)).toBeInTheDocument();
  expect(screen.getByText(/bug 2/i)).toBeInTheDocument();
}); 