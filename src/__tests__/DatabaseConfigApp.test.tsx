import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
    expect(screen.getByText('Caching')).toBeInTheDocument();
    expect(screen.getByText('MongoDB')).toBeInTheDocument();
    expect(screen.getByText('Kafka')).toBeInTheDocument();
    expect(screen.getByText('OpenSearch')).toBeInTheDocument();

    // Test tab switching
    fireEvent.click(screen.getByText('PostgreSQL'));
    expect(screen.getByText('PostgreSQL Core Settings')).toBeInTheDocument();

    fireEvent.click(screen.getByText('MongoDB'));
    expect(screen.getByText(/default_read_concern/i)).toBeInTheDocument();
  });

  it('updates database ID input', () => {
    render(<DatabaseConfigApp />);
    const input = screen.getByPlaceholderText(/Enter your database ID/i);
    
    fireEvent.change(input, { target: { value: 'test-db-123' } });
    expect(input).toHaveValue('test-db-123');
  });
}); 