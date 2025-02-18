import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { act } from '@testing-library/react';

// Mock clipboard API
Object.defineProperty(window.navigator, 'clipboard', {
  value: {
    writeText: vi.fn().mockImplementation(() => Promise.resolve()),
  },
});

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Helper to wait for state updates
export const waitForStateUpdate = () => act(() => new Promise(resolve => setTimeout(resolve, 0))); 