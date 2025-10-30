import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../../src/components/Header';

describe('Header', () => {
  const mockOnHelpClick = jest.fn();

  beforeEach(() => {
    mockOnHelpClick.mockClear();
  });

  it('renders the header with correct title', () => {
    render(<Header onHelpClick={mockOnHelpClick} />);
    
    expect(screen.getByText('rQueue')).toBeInTheDocument();
  });

  it('calls onHelpClick when help button is clicked', () => {
    render(<Header onHelpClick={mockOnHelpClick} />);
    
    const helpButton = screen.getByRole('button', { name: /how it works/i });
    fireEvent.click(helpButton);
    
    expect(mockOnHelpClick).toHaveBeenCalledTimes(1);
  });

  it('has correct CSS classes for styling', () => {
    render(<Header onHelpClick={mockOnHelpClick} />);
    
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-gray-800/50', 'backdrop-blur-sm', 'sticky', 'top-0', 'z-10', 'border-b', 'border-gray-700');
  });

  it('renders the help button with correct styling', () => {
    render(<Header onHelpClick={mockOnHelpClick} />);
    
    const helpButton = screen.getByRole('button', { name: /how it works/i });
    expect(helpButton).toHaveClass('flex', 'items-center', 'gap-2', 'px-3', 'py-2');
  });
});