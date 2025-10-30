import React, { useState, useCallback } from 'react';
import type { RawTicket } from '../types';
import { UploadIcon, ClipboardIcon, DownloadIcon } from './icons';

interface TicketImporterProps {
  onFileLoaded: (tickets: RawTicket[]) => void;
  isLoading: boolean;
}

const TicketImporter: React.FC<TicketImporterProps> = ({ onFileLoaded, isLoading }) => {
  // const [isPasting, setIsPasting] = useState(false);
  // const [pastedText, setPastedText] = useState('');

  const parseContent = useCallback((content: string): RawTicket[] => {
    // Try parsing as CSV first
    try {
      const rows = content.trim().split('\n');
      const headers = rows[0].split(',').map(h => h.trim().replace(/"/g, ''));
      const idIndex = headers.indexOf('id');
      const subjectIndex = headers.indexOf('subject');
      const bodyIndex = headers.indexOf('body');
      const createdAtIndex = headers.indexOf('createdAt');

      if ([idIndex, subjectIndex, bodyIndex, createdAtIndex].includes(-1)) {
        throw new Error("Missing required CSV headers: id, subject, body, createdAt");
      }
      
      return rows.slice(1).map(row => {
        const values = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/); // handle commas inside quotes
        return {
          id: values[idIndex]?.replace(/"/g, '').trim() || `ticket-${Math.random()}`,
          subject: values[subjectIndex]?.replace(/"/g, '').trim() || '',
          body: values[bodyIndex]?.replace(/"/g, '').trim() || '',
          createdAt: values[createdAtIndex]?.replace(/"/g, '').trim() || new Date().toISOString(),
        };
      }).filter(t => t.id && t.subject);
    } catch (e) {
      // If CSV parsing fails, treat as plain text
      return [{
        id: `text-${Date.now()}`,
        subject: content.slice(0, 100) + (content.length > 100 ? '...' : ''),
        body: content,
        createdAt: new Date().toISOString()
      }];
    }
  }, []);


  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (content) {
          const tickets = parseContent(content);
          onFileLoaded(tickets);
        }
      };
      reader.readAsText(file);
    }
  }, [onFileLoaded, parseContent]);

  // const handlePasteSubmit = () => {
  //   if (pastedText.trim()) {
  //     const tickets = parseContent(pastedText);
  //     onFileLoaded(tickets);
  //     setIsPasting(false);
  //     setPastedText('');
  //   }
  // };
  
  // const handleDownloadTemplate = () => {
  //   const headers = ['id', 'subject', 'body', 'createdAt'];
  //   const dummyData = [
  //     ['BUG-101', 'Login button not working on Chrome', "When I click the login button on the latest version of Google Chrome, nothing happens. The console shows a JavaScript error: 'TypeError: cannot read property 'xyz' of null'. This is blocking our entire team.", new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()],
  //     ['FR-202', 'Request for Dark Mode', 'The UI is very bright. It would be great to have a dark mode option to reduce eye strain, especially for users who work at night.', new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()],
  //     ['BILL-303', 'Incorrect invoice for October', "Hi, I just received my invoice for October and it seems to be double the usual amount. I haven't changed my plan. Can you please check this?", new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()],
  //     ['Q-404', 'How do I reset my password?', "I forgot my password and I can't find the option to reset it. Can you please guide me?", new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()],
  //     ['BUG-102', 'Critical: Production server is down', 'Our main production server is unresponsive. All services are down. This is an urgent outage affecting all customers.', new Date().toISOString()],
  //     ['MISC-505', 'it is broken', 'the thing is not working please fix it.', new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()]
  //   ];

  //   const csvContent = [
  //     headers.join(','),
  //     ...dummyData.map(row => 
  //       row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(',')
  //     )
  //   ].join('\n');
    
  //   const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  //   const link = document.createElement('a');
  //   if (link.download !== undefined) {
  //     const url = URL.createObjectURL(blob);
  //     link.setAttribute('href', url);
  //     link.setAttribute('download', 'ticket-template.csv');
  //     link.style.visibility = 'hidden';
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //     URL.revokeObjectURL(url);
  //   }
  // };


  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 space-y-4">
      <h2 className="text-xl font-bold text-white">Import Tickets</h2>
      
      {/* {!isPasting ? ( */}
        <div className="space-y-4">
          <label htmlFor="file-upload" className="relative cursor-pointer block w-full text-center p-6 border-2 border-dashed border-gray-600 rounded-lg hover:border-indigo-500 transition-colors">
            <UploadIcon className="mx-auto h-12 w-12 text-gray-500" />
            <span className="mt-2 block text-sm font-semibold text-gray-300">Upload a CSV or text file</span>
            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".csv,.txt" disabled={isLoading} />
          </label>
          
          {/* <button
            onClick={handleDownloadTemplate}
            className="w-full flex justify-center items-center gap-2 py-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
          >
            <DownloadIcon className="h-4 w-4" />
            Download CSV Template
          </button> */}
          
          {/* <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-800 px-2 text-sm text-gray-400">OR</span>
            </div>
          </div>
          <button onClick={() => setIsPasting(true)} className="w-full flex justify-center items-center gap-2 py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-semibold transition-colors">
            <ClipboardIcon /> Paste Text
          </button> */}
        </div>
      {/* ) : (
        <div className="space-y-4">
          <textarea
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder="Paste ticket content here (can be CSV format or plain text)."
            className="w-full h-40 p-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            disabled={isLoading}
          />
          <div className="flex gap-2">
            <button onClick={handlePasteSubmit} className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors disabled:bg-gray-600" disabled={isLoading || !pastedText.trim()}>
              {isLoading ? 'Processing...' : 'Triage Pasted Text'}
            </button>
            <button onClick={() => setIsPasting(false)} className="py-2 px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default TicketImporter;