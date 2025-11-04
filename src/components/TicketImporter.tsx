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
        </div>
    </div>
  );
};

export default TicketImporter;