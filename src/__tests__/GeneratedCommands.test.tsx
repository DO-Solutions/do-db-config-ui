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

  it('renders only curl command by default', () => {
    render(<GeneratedCommands commands={mockCommands} />);
    
    expect(screen.getByRole('heading', { name: /generated.*curl.*command/i })).toBeInTheDocument();
    expect(screen.getByText(mockCommands.curl)).toBeInTheDocument();
    
    // doctl command should not be visible
    expect(screen.queryByRole('heading', { name: /generated.*doctl.*command/i })).not.toBeInTheDocument();
    expect(screen.queryByText(mockCommands.doctl)).not.toBeInTheDocument();
  });

  it('renders both commands when showDoctlCommand is true', () => {
    render(<GeneratedCommands commands={mockCommands} showDoctlCommand={true} />);
    
    expect(screen.getByRole('heading', { name: /generated.*curl.*command/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /generated.*doctl.*command/i })).toBeInTheDocument();
    expect(screen.getByText(mockCommands.curl)).toBeInTheDocument();
    expect(screen.getByText(mockCommands.doctl)).toBeInTheDocument();
  });

  it('copies curl command to clipboard when clicking copy button', async () => {
    render(<GeneratedCommands commands={mockCommands} onCopy={mockOnCopy} />);
    
    const copyButton = screen.getByRole('button', { name: /copy/i });
    
    // Test copying curl command
    await fireEvent.click(copyButton);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockCommands.curl);
    expect(mockOnCopy).toHaveBeenCalled();
  });

  it('copies both commands when showDoctlCommand is true', async () => {
    render(<GeneratedCommands commands={mockCommands} onCopy={mockOnCopy} showDoctlCommand={true} />);
    
    const copyButtons = screen.getAllByRole('button', { name: /copy/i });
    
    // Test copying curl command
    await fireEvent.click(copyButtons[0]);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockCommands.curl);
    expect(mockOnCopy).toHaveBeenCalled();
    
    mockOnCopy.mockClear();
    
    // Test copying doctl command
    await fireEvent.click(copyButtons[1]);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockCommands.doctl);
    expect(mockOnCopy).toHaveBeenCalled();
  });

  it('shows "Copied!" text after copying', async () => {
    render(<GeneratedCommands commands={mockCommands} />);
    
    const copyButton = screen.getByRole('button', { name: /copy/i });
    await fireEvent.click(copyButton);
    
    // Wait for the "Copied!" text to appear
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i })).toBeInTheDocument();
    });
  });
}); 