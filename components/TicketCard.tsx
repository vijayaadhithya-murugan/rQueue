
import React from 'react';
import type { TriageResult, RawTicket } from '../types';
import { URGENCY_STYLES, CONFIDENCE_STYLES } from '../constants';
import { TagIcon, UserGroupIcon, LightBulbIcon, CheckCircleIcon, ExclamationTriangleIcon } from './icons';

interface TicketCardProps {
  ticket: TriageResult;
  rawTicket?: RawTicket;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, rawTicket }) => {
  const urgencyClass = URGENCY_STYLES[ticket.urgency] || 'bg-gray-500/20 text-gray-300 border border-gray-500/30';
  const confidenceClass = CONFIDENCE_STYLES[ticket.confidence] || 'text-gray-400';

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-5 transition-all hover:bg-gray-700/50 hover:border-indigo-500/50 shadow-md">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-100 pr-4 flex-1">
          {rawTicket?.subject || 'Ticket Subject Not Found'}
        </h3>
        <div className={`px-3 py-1 text-xs font-bold rounded-full whitespace-nowrap ${urgencyClass}`}>
          {ticket.urgency}
        </div>
      </div>
      
      <p className="text-sm text-gray-400 mt-2 line-clamp-2">
        {rawTicket?.body || ''}
      </p>

      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2 text-gray-300">
          <TagIcon className="h-4 w-4 text-gray-500" />
          <strong>Category:</strong>
          <span>{ticket.category}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <UserGroupIcon className="h-4 w-4 text-gray-500" />
          <strong>Assignee:</strong>
          <span>{ticket.suggestedAssignee}</span>
        </div>
        <div className="flex items-center gap-2">
           {ticket.confidence === 'Low' ? <ExclamationTriangleIcon className={`h-4 w-4 ${confidenceClass}`} /> : <CheckCircleIcon className={`h-4 w-4 ${confidenceClass}`} />}
          <strong className={confidenceClass}>Confidence:</strong>
          <span className={confidenceClass}>{ticket.confidence}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-700 flex items-start gap-3">
        <LightBulbIcon className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-sm text-gray-300">Suggested Action:</h4>
          <p className="text-sm text-gray-400">{ticket.reasoning}</p>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
