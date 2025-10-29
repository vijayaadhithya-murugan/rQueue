
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { XMarkIcon } from './icons';

interface AnalyticsDashboardProps {
  categoryData: { name: string; value: number }[];
  urgencyData: { name: string; value: number }[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];
const URGENCY_COLORS: { [key: string]: string } = {
  'P1 - Critical': '#ef4444',
  'P2 - High': '#f97316',
  'P3 - Medium': '#eab308',
  'P4 - Low': '#3b82f6',
};


const CustomTooltip = ({ active, payload, label }: any) => {
  console.log('Tooltip payload:', payload,active, label);
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-700/80 backdrop-blur-sm p-2 border border-gray-600 rounded-md text-sm">
        <p className="label text-white">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ categoryData, urgencyData, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
          <div className="bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 sticky top-0 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Analytics</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <XMarkIcon />
              </button>
            </div>
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-300 mb-2 text-center">Tickets by Urgency</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={urgencyData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
            <XAxis type="number" stroke="#a0aec0" />
            <YAxis type="category" dataKey="name" width={80} stroke="#a0aec0" fontSize={12} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(136, 132, 216, 0.1)' }} />
            <Bar dataKey="value" barSize={20}>
              {urgencyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={URGENCY_COLORS[entry.name] || COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-300 text-center">Tickets by Category</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />}  />
            <Legend wrapperStyle={{ fontSize: '12px' }}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
    </div>
    </div>
  );
};

export default AnalyticsDashboard;
