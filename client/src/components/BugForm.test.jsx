import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BugForm from './BugForm';
import * as api from '../api/bugs';

jest.mock('../api/bugs');

describe('BugForm', () => {
  it('renders form fields', () => {
    render(<BugForm />);
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
  });

  it('shows error if title is missing', async () => {
    render(<BugForm />);
    fireEvent.click(screen.getByText(/report bug/i));
    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
  });

  it('calls createBug and resets form on success', async () => {
    api.createBug.mockResolvedValueOnce({});
    const onBugCreated = jest.fn();
    render(<BugForm onBugCreated={onBugCreated} />);
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Bug 1' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Desc' } });
    fireEvent.click(screen.getByText(/report bug/i));
    await waitFor(() => expect(api.createBug).toHaveBeenCalledWith({
      title: 'Bug 1',
      description: 'Desc',
      status: 'open'
    }));
    expect(onBugCreated).toHaveBeenCalled();
    await waitFor(() => expect(screen.getByLabelText(/title/i)).toHaveValue(''));
  });
}); 