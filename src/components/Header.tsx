
import React from 'react';
import { SparklesIcon, QuestionMarkCircleIcon } from './icons';

interface HeaderProps {
  onHelpClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHelpClick }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* <SparklesIcon className="h-8 w-8 text-indigo-400" /> */}
            <h1 className="ml-3 text-2xl font-bold text-white">rQueue</h1>
          </div>
          <button 
            onClick={onHelpClick}
            className="flex items-center gap-2 px-3 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm font-semibold"
            aria-label="How it works"
          >
            <QuestionMarkCircleIcon />
            <span>How It Works</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
