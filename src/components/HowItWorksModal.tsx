
import React from 'react';
import { XMarkIcon } from './icons';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 sticky top-0 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">How It Works</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XMarkIcon />
          </button>
        </div>
        <div className="p-6 space-y-6 text-gray-300">
          <section>
            <h3 className="text-lg font-semibold text-indigo-400 mb-2">1. Import Your Tickets</h3>
              <strong>Upload file:</strong> 
              <p>Supports CSV or plain text (.txt) files. For CSVs, ensure you have columns named <code>id</code>, <code>subject</code>, <code>body</code>, and <code>createdAt</code></p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-indigo-400 mb-2">2. AI-Powered Queue</h3>
            <p>Once imported, the data is sent to a powerful AI model which analyzes each ticket based on a specific set of rules.</p>
            <div className="mt-3 bg-gray-900/50 p-4 rounded-lg border border-gray-700">
              <h4 className="font-semibold text-white">The AI assesses:</h4>
              <ul className="list-disc list-inside mt-2 pl-2 space-y-1 text-sm">
                <li><strong>Category:</strong> Assigns labels like 'Bug Report', 'Feature Request', etc.</li>
                <li><strong>Urgency (P1-P4):</strong> Prioritizes based on keywords (e.g., "outage" vs. "suggestion") and the age of the ticket.</li>
                <li><strong>Suggested Assignee:</strong> Recommends the best team (e.g., 'Frontend', 'DevOps') to handle the issue.</li>
                <li><strong>Confidence:</strong> Flags tickets that are ambiguous or lack detail, so you can give them a closer look.</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-indigo-400 mb-2">3. Review and Export</h3>
            <p>The tickets are displayed in a clean, easy-to-read list. You can quickly see the AI's suggestions and reasoning.</p>
             <ul className="list-disc list-inside mt-2 pl-2 space-y-1">
              <li><strong>Analytics Dashboard:</strong> View charts that break down your tickets by category and urgency.</li>
              <li><strong>Export to CSV:</strong> Once you're happy with the triage, you can export the results, including all the AI's suggestions, as a CSV file for your records or to import into another system.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
