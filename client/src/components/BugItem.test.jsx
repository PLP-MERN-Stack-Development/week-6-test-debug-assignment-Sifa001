import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BugItem from './BugItem';
import * as api from '../api/bugs';

jest.mock('../api/bugs');

const bug = { _id: '1', title: 'Bug 1', description: 'Desc', status: 'open' };

describe('BugItem', () => {
  it('renders bug details', () => {
    render(<BugItem bug={bug} />);
    expect(screen.getByText(/bug 1/i)).toBeInTheDocument();
    expect(screen.getByText('Desc')).toBeInTheDocument();
    expect(screen.getByDisplayValue(/open/i)).toBeInTheDocument();
  });

  it('calls updateBug on status change', async () => {
    api.updateBug.mockResolvedValueOnce({});
    const onUpdate = jest.fn();
    render(<BugItem bug={bug} onUpdate={onUpdate} />);
    fireEvent.change(screen.getByDisplayValue(/open/i), { target: { value: 'resolved' } });
    await waitFor(() => expect(api.updateBug).toHaveBeenCalledWith('1', { status: 'resolved' }));
    expect(onUpdate).toHaveBeenCalled();
  });

  it('calls deleteBug on delete', async () => {
    api.deleteBug.mockResolvedValueOnce({});
    const onDelete = jest.fn();
    window.confirm = jest.fn(() => true); // mock confirm dialog
    render(<BugItem bug={bug} onDelete={onDelete} />);
    fireEvent.click(screen.getByText(/delete/i));
    await waitFor(() => expect(api.deleteBug).toHaveBeenCalledWith('1'));
    expect(onDelete).toHaveBeenCalled();
  });
}); 