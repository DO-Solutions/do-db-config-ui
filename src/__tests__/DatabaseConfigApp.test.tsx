import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DatabaseConfigApp from '../components/DatabaseConfigApp';

describe('DatabaseConfigApp', () => {
  it('renders without crashing', () => {
    render(<DatabaseConfigApp />);
    expect(screen.getByText(/Configure Advanced Settings/i)).toBeInTheDocument();
  });

  it('allows switching between database types', () => {
    render(<DatabaseConfigApp />);
    
    // Check if all database type tabs are present
    expect(screen.getByText('MySQL')).toBeInTheDocument();
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
    expect(screen.getByText('Valkey')).toBeInTheDocument();
    expect(screen.getByText('MongoDB')).toBeInTheDocument();
    expect(screen.getByText('Kafka')).toBeInTheDocument();
    expect(screen.getByText('OpenSearch')).toBeInTheDocument();

    // Test tab switching
    fireEvent.click(screen.getByText('PostgreSQL'));
    // Use getAllByText and check the first occurrence
    expect(screen.getAllByText('PostgreSQL Core Settings')[0]).toBeInTheDocument();

    fireEvent.click(screen.getByText('MongoDB'));
    // Find the container with the Default Read Concern field
    const label = screen.getByText('Default Read Concern');
    const container = label.closest('.space-y-2');
    expect(container).toBeInTheDocument();
    // Find the select element within the container
    const select = within(container!).getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  it('updates database ID input', () => {
    render(<DatabaseConfigApp />);
    const input = screen.getByPlaceholderText(/Enter your database ID/i);
    
    fireEvent.change(input, { target: { value: 'test-db-123' } });
    expect(input).toHaveValue('test-db-123');
  });
}); 