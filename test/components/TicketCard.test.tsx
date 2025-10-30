import React from 'react';
import { render, screen } from '@testing-library/react';
import TicketCard from '../../src/components/TicketCard';
import type { TriageResult, RawTicket } from '../../src/types';

const mockTicket: TriageResult = {
  id: '1',
  category: 'Bug Report',
  urgency: 'P2 - High',
  confidence: 'High',
  reasoning: 'Test reasoning',
  suggestedAssignee: 'Engineering'
};

const mockRawTicket: RawTicket = {
  id: '1',
  subject: 'Test Ticket Subject',
  body: 'This is a test ticket body with some description',
  createdAt: '2025-10-30T12:00:00Z'
};

describe('TicketCard', () => {
  it('renders ticket information correctly', () => {
    render(<TicketCard ticket={mockTicket} rawTicket={mockRawTicket} />);
    
    expect(screen.getByText('Test Ticket Subject')).toBeInTheDocument();
    expect(screen.getByText('This is a test ticket body with some description')).toBeInTheDocument();
    expect(screen.getByText('P2 - High')).toBeInTheDocument();
  });

  it('displays fallback text when rawTicket is not provided', () => {
    render(<TicketCard ticket={mockTicket} />);
    
    expect(screen.getByText('Ticket Subject Not Found')).toBeInTheDocument();
  });

  it('renders urgency badge with correct styling', () => {
    render(<TicketCard ticket={mockTicket} rawTicket={mockRawTicket} />);
    
    const urgencyBadge = screen.getByText('P2 - High');
    expect(urgencyBadge).toHaveClass('px-3', 'py-1', 'text-xs', 'font-bold', 'rounded-full');
  });

  it('displays suggested assignee when provided', () => {
    render(<TicketCard ticket={mockTicket} rawTicket={mockRawTicket} />);
    
    expect(screen.getByText('Engineering')).toBeInTheDocument();
  });

  it('applies hover effects with correct CSS classes', () => {
    render(<TicketCard ticket={mockTicket} rawTicket={mockRawTicket} />);
    
    const cardElement = screen.getByText('Test Ticket Subject').closest('div')?.parentElement;
    expect(cardElement).toHaveClass('transition-all', 'hover:bg-gray-700/50', 'hover:border-indigo-500/50');
  });
});