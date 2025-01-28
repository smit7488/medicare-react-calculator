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
      <div className="chart-wrapper">
      <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        {selectedChart === 'bar' ? (
          <BarChart data={chartData}   margin={{ top: 20, right: 30, left: 50, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(tick) => `$${tick.toLocaleString()}`} />
            <Tooltip
    formatter={(value) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value)
    }
    contentStyle={{
      color: 'var(--tooltip-text-color)', 
      backgroundColor: 'var(--tooltip-background-color)',
      borderRadius: '.5rem',
      padding: '1rem',
    }}
    labelStyle={{
      color: 'var(--tooltip-text-color)', 
      fontWeight: 'bold', 
    }}
    itemStyle={{
      color: 'var(--tooltip-text-color)', 
    }}
  />
                  <Legend
    wrapperStyle={{
      color: 'var(--output-text-color)', 
      fontSize: '1rem', 
      fontWeight: 'bold', 
    }}
    
  />
            <Bar dataKey="compensation" stroke="var(--chart-border-color)" fill="var(--chart-background-color)" name="Compensation"/>
          </BarChart>
        ) : (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(tick) => `$${tick.toLocaleString()}`} />
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            <Legend />
            <Line type="monotone" dataKey="compensation" stroke="var(--chart-border-color)" />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
    </div>
    </div>
  );
};

export default MultiChartToggle;
