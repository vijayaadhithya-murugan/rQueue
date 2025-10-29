
import React, { useState, useMemo, useCallback } from 'react';
import type { RawTicket, TriageResult } from './types';
import { triageTickets } from './services/geminiService';
import TicketImporter from './components/TicketImporter';
import TicketList from './components/TicketList';
import Header from './components/Header';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import { HowItWorksModal } from './components/HowItWorksModal';
import { DownloadIcon } from './components/icons';

const App: React.FC = () => {
  const [rawTickets, setRawTickets] = useState<RawTicket[]>([]);
  const [triagedTickets, setTriagedTickets] = useState<TriageResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState<boolean>(false);

  const handleFileLoaded = async (tickets: RawTicket[]) => {
    setRawTickets(tickets);
    setTriagedTickets([]);
    setError(null);
    setIsLoading(true);
    try {
      const results = await triageTickets(tickets);
      setTriagedTickets(results);
    } catch (e: any) {
      console.error(e);
      setError('Failed to triage tickets. Please check the console for details.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const categoryCounts = useMemo(() => {
    if (triagedTickets.length === 0) return [];
    const counts: { [key: string]: number } = {};
    triagedTickets.forEach(ticket => {
      counts[ticket.category] = (counts[ticket.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [triagedTickets]);

  const urgencyCounts = useMemo(() => {
    if (triagedTickets.length === 0) return [];
    const counts: { [key: string]: number } = {};
    triagedTickets.forEach(ticket => {
      counts[ticket.urgency] = (counts[ticket.urgency] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [triagedTickets]);

  const exportToCSV = useCallback(() => {
    if (triagedTickets.length === 0) return;

    const headers = [
      'id', 'subject', 'category', 'urgency', 
      'suggestedAssignee', 'confidence', 'reasoning'
    ];
    const csvRows = [headers.join(',')];

    triagedTickets.forEach(ticket => {
      const originalTicket = rawTickets.find(rt => rt.id === ticket.id) || { subject: 'N/A' };
      const values = [
        ticket.id,
        `"${originalTicket.subject.replace(/"/g, '""')}"`,
        ticket.category,
        ticket.urgency,
        ticket.suggestedAssignee,
        ticket.confidence,
        `"${ticket.reasoning.replace(/"/g, '""')}"`
      ];
      csvRows.push(values.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'triaged-tickets.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [triagedTickets, rawTickets]);


  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header onHelpClick={() => setIsModalOpen(true)} />
      
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-4 space-y-6">
            <TicketImporter onFileLoaded={handleFileLoaded} isLoading={isLoading} />
            {/* {triagedTickets.length > 0 && ( */}
                 <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                 <div className="flex justify-between items-center mb-4">
                  <button
                    onClick={() => setIsAnalyticsOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors duration-200 text-sm font-semibold disabled:bg-gray-600 disabled:cursor-not-allowed"
                    disabled={triagedTickets.length === 0}
                  >
                    Analytics
                   </button>
                   <button
                    onClick={exportToCSV}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors duration-200 text-sm font-semibold disabled:bg-gray-600 disabled:cursor-not-allowed"
                    disabled={triagedTickets.length === 0}
                   >
                     <DownloadIcon />
                     Export CSV
                   </button>
                 </div>
                  <AnalyticsDashboard categoryData={categoryCounts} urgencyData={urgencyCounts} isOpen={isAnalyticsOpen} onClose={() => setIsAnalyticsOpen(false)} />
               </div>
            {/* )} */}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-8">
            <div className="bg-gray-800 rounded-xl shadow-lg min-h-[600px] p-1">
              {error && <div className="m-6 p-4 text-center text-red-400 bg-red-900/50 rounded-lg">{error}</div>}
              <TicketList tickets={triagedTickets} rawTickets={rawTickets} isLoading={isLoading} />
            </div>
          </div>

        </div>
      </main>

      <HowItWorksModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;
