import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock the service before importing App
jest.mock('../../src/services/geminiService', () => ({
  triageTickets: jest.fn().mockResolvedValue([])
}));

import App from '../../src/App';

// Mock the child components
jest.mock('../../src/components/Header', () => {
  return function MockHeader({ onHelpClick }: { onHelpClick: () => void }) {
    return <div data-testid="header">Header Component</div>;
  };
});

jest.mock('../../src/components/TicketImporter', () => {
  return function MockTicketImporter({ onTicketsImported }: { onTicketsImported: (tickets: any[]) => void }) {
    return <div data-testid="ticket-importer">Ticket Importer Component</div>;
  };
});

jest.mock('../../src/components/TicketList', () => {
  return function MockTicketList({ tickets, triageResults }: { tickets: any[], triageResults: any[] }) {
    return <div data-testid="ticket-list">Ticket List Component</div>;
  };
});

jest.mock('../../src/components/AnalyticsDashboard', () => {
  return function MockAnalyticsDashboard({ triageResults }: { triageResults: any[] }) {
    return <div data-testid="analytics-dashboard">Analytics Dashboard Component</div>;
  };
});

jest.mock('../../src/components/HowItWorksModal', () => {
  return function MockHowItWorksModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    return isOpen ? <div data-testid="how-it-works-modal">How It Works Modal</div> : null;
  };
});

describe('App', () => {
  it('renders all main components', () => {
    render(<App />);
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('ticket-importer')).toBeInTheDocument();
    expect(screen.getByTestId('ticket-list')).toBeInTheDocument();
    expect(screen.getByTestId('analytics-dashboard')).toBeInTheDocument();
  });

  it('has correct layout structure', () => {
    render(<App />);
    
    const mainContainer = screen.getByTestId('header').parentElement;
    expect(mainContainer).toHaveClass('min-h-screen', 'bg-gradient-to-br');
  });

  it('does not show modal initially', () => {
    render(<App />);
    
    expect(screen.queryByTestId('how-it-works-modal')).not.toBeInTheDocument();
  });
});