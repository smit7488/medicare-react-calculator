import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const MultiChartToggle = ({ chartData }) => {
  const [selectedChart, setSelectedChart] = useState('bar');

  return (
    <div>
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${selectedChart === 'bar' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedChart('bar')}
        >
          Bar Chart
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${selectedChart === 'line' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedChart('line')}
        >
          Line Chart
        </button>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        {selectedChart === 'bar' ? (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(tick) => `$${tick.toLocaleString()}`} />
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            <Legend />
            <Bar dataKey="compensation" fill="#65a30d" />
          </BarChart>
        ) : (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(tick) => `$${tick.toLocaleString()}`} />
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            <Legend />
            <Line type="monotone" dataKey="compensation" stroke="#0288d1" />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default MultiChartToggle;
