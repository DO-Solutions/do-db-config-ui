import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import GeneratedCommands from '../components/GeneratedCommands';

describe('GeneratedCommands', () => {
  const mockCommands = {
    curl: 'curl -X PATCH ...',
    doctl: 'doctl databases ...'
  };

  const mockOnCopy = vi.fn();

  beforeEach(() => {
    mockOnCopy.mockClear();
  });

  it('renders both commands', () => {
    render(<GeneratedCommands commands={mockCommands} />);
    
    // Use a more specific selector for the command headers
    expect(screen.getByRole('heading', { name: /generated.*curl.*command/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /generated.*doctl.*command/i })).toBeInTheDocument();
    expect(screen.getByText(mockCommands.curl)).toBeInTheDocument();
    expect(screen.getByText(mockCommands.doctl)).toBeInTheDocument();
  });

  it('copies commands to clipboard when clicking copy button', async () => {
    render(<GeneratedCommands commands={mockCommands} onCopy={mockOnCopy} />);
    
    const copyButtons = screen.getAllByRole('button', { name: /copy/i });
    
    // Test copying curl command
    await fireEvent.click(copyButtons[0]);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockCommands.curl);
    expect(mockOnCopy).toHaveBeenCalled();
    
    // Test copying doctl command
    await fireEvent.click(copyButtons[1]);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockCommands.doctl);
    expect(mockOnCopy).toHaveBeenCalled();
  });

  it('shows "Copied!" text after copying', async () => {
    render(<GeneratedCommands commands={mockCommands} />);
    
    const copyButtons = screen.getAllByRole('button', { name: /copy/i });
    await fireEvent.click(copyButtons[0]);
    
    // Wait for the "Copied!" text to appear
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i })).toBeInTheDocument();
    });
  });
}); 