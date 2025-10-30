
import React from 'react';
import type { TriageResult, RawTicket } from '../types';
import TicketCard from './TicketCard';
import { SparklesIcon } from './icons';

interface TicketListProps {
  tickets: TriageResult[];
  rawTickets: RawTicket[];
  isLoading: boolean;
}

const TicketList: React.FC<TicketListProps> = ({ tickets, rawTickets, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
        <h3 className="text-xl font-semibold text-white">Queuing...</h3>
        <p className="text-gray-400 mt-2">The AI Genie is analyzing your tickets. Please wait a moment.</p>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <SparklesIcon className="h-16 w-16 text-indigo-500 mb-4" />
        <h3 className="text-xl font-semibold text-white">Ready for Queue</h3>
        <p className="text-gray-400 mt-2">Import your support tickets to get started.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4 p-4 sm:p-6 h-[calc(100vh-140px)] overflow-y-auto">
      {tickets.map(ticket => {
        const rawTicket = rawTickets.find(rt => rt.id === ticket.id);
        return <TicketCard key={ticket.id} ticket={ticket} rawTicket={rawTicket} />;
      })}
    </div>
  );
};

export default TicketList;
