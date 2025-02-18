import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfigField from '../components/ConfigField';

describe('ConfigField', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders text input correctly', () => {
    render(
      <ConfigField
        name="test_field"
        field={{
          type: 'text',
          description: 'Test description',
          example: 'example value'
        }}
        onChange={mockOnChange}
        value=""
      />
    );

    expect(screen.getByText('Test Field')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Example: example value')).toBeInTheDocument();
  });

  it('renders number input correctly', () => {
    render(
      <ConfigField
        name="test_number"
        field={{
          type: 'number',
          min: 0,
          max: 100,
          description: 'Test number field'
        }}
        onChange={mockOnChange}
        value={50}
      />
    );

    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('min', '0');
    expect(input).toHaveAttribute('max', '100');
    expect(screen.getByText('Valid range: (0 - 100)')).toBeInTheDocument();
  });

  it('renders select input correctly', () => {
    render(
      <ConfigField
        name="test_select"
        field={{
          type: 'select',
          options: ['option1', 'option2'],
          description: 'Test select field'
        }}
        onChange={mockOnChange}
        value=""
      />
    );

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('option1')).toBeInTheDocument();
    expect(screen.getByText('option2')).toBeInTheDocument();
  });

  it('renders checkbox input correctly', () => {
    render(
      <ConfigField
        name="test_checkbox"
        field={{
          type: 'checkbox',
          description: 'Test checkbox field'
        }}
        onChange={mockOnChange}
        value={false}
      />
    );

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByText('Enable')).toBeInTheDocument();
  });

  it('calls onChange with correct values', () => {
    render(
      <ConfigField
        name="test_field"
        field={{
          type: 'text',
          description: 'Test field'
        }}
        onChange={mockOnChange}
        value=""
      />
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });
    expect(mockOnChange).toHaveBeenCalledWith('test_field', 'new value');
  });
}); 