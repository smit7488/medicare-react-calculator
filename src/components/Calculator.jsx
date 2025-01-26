import { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import questionIcon from '../assets/images/question.svg';

// Register Chart.js components
ChartJS.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Calculator = () => {
  const [inputs, setInputs] = useState({
    avgPremium: 2400,
    avgContract: 18,
    appsPerMonth: 8,
    monthsOfProduction: 10,
    avgPersistency: 90,
    avgGrowth: 10,
    years: 3,
  });

  const chartRef = useRef(null);
  let compChartInstance = useRef(null);

  const updateInput = (key, value) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const calculateCompensation = () => {
    const yearLabels = [];
    const yearData = [];
    const tableRows = [];

    for (let i = 1; i <= inputs.years; i++) {
      const yearRev = computeYearRev(i);
      yearLabels.push(`Year ${i}`);
      yearData.push(yearRev);
      tableRows.push({ year: i, compensation: yearRev });
    }

    if (compChartInstance.current) {
      compChartInstance.current.destroy(); // Destroy the previous chart
    }

    const getRootCSSVariable = (variableName) =>
      getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
    
    const backgroundColor = getRootCSSVariable('--chart-background-color');
    const borderColor = getRootCSSVariable('--chart-border-color');

    compChartInstance.current = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: yearLabels,
        datasets: [
          {
            label: '$ USD',
            data: yearData,
            backgroundColor: [backgroundColor], // Use the CSS variable for the background color
        borderColor: [borderColor], // Use the CSS variable for the border color
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1, // Ensure a 1:1 aspect ratio
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return tableRows;
  };

  const computeYearRev = (year) => {
    const { avgPremium, appsPerMonth, monthsOfProduction, avgGrowth, avgPersistency, avgContract } = inputs;

    let rev = appsPerMonth * monthsOfProduction * (avgPremium * (avgContract / 100));
    for (let i = 2; i <= year; i++) {
      rev +=
        appsPerMonth *
        monthsOfProduction *
        (1 + avgGrowth / 100) *
        (avgPremium * (avgContract / 100)) *
        (avgPersistency / 100);
    }
    return rev;
  };

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const rows = calculateCompensation();
    setTableData(rows); // Update the table data
    initializeChart(); // Initialize or reinitialize the chart when inputs change
  }, [inputs]);

  useEffect(() => {
    const handleResize = () => {
      initializeChart(); // Reinitialize the chart on window resize
    };

    window.addEventListener('resize', handleResize); // Add resize listener

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup listener on unmount
      if (compChartInstance.current) {
        compChartInstance.current.destroy(); // Destroy the chart instance on unmount
      }
    };
  }, []);

  const initializeChart = () => {
    const yearLabels = [];
    const yearData = [];

    for (let i = 1; i <= inputs.years; i++) {
      const yearRev = computeYearRev(i);
      yearLabels.push(`Year ${i}`);
      yearData.push(yearRev);
    }

    if (compChartInstance.current) {
      compChartInstance.current.destroy(); // Destroy existing chart instance
    }

    const getRootCSSVariable = (variableName) =>
      getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
    
    const backgroundColor = getRootCSSVariable('--chart-background-color');
    const borderColor = getRootCSSVariable('--chart-border-color');
    
    compChartInstance.current = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: yearLabels,
        datasets: [
          {
            label: '$ USD',
            data: yearData,
            backgroundColor: [backgroundColor], // Use the CSS variable for the background color
        borderColor: [borderColor], // Use the CSS variable for the border color
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1, // Keep 1:1 aspect ratio
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-green-100">
    
        <h1 className="text-green-900 text-5xl bg-heading-bg mb-8 text-center font-black">
          Medicare Agent Compensation Calculator
        </h1>
     
      <div className="grid md:grid-cols-[1fr_3fr] rounded-lg border border-input-border bg-white shadow">
        <form className="form flex flex-col gap-4 p-6">
          {/* Avg Annualized Premium */}
          <InputWithLabel
            label="Avg Annualized Premium ($)"
            value={inputs.avgPremium}
            onChange={(e) => updateInput('avgPremium', parseFloat(e.target.value) || 0)}
            tooltip="The average premium amount collected annually, calculated across all active policies."
          />

          {/* Avg Contract Level (%) */}
          <InputWithLabel
            label="Avg Contract Level (%)"
            value={inputs.avgContract}
            onChange={(e) => updateInput('avgContract', parseFloat(e.target.value) || 0)}
            tooltip="The average percentage of the total contract value that has been activated."
          />

          {/* Issued Apps Per Month */}
          <InputWithLabel
            label="Issued Apps Per Month"
            value={inputs.appsPerMonth}
            onChange={(e) => updateInput('appsPerMonth', parseFloat(e.target.value) || 0)}
            tooltip="The average number of applications issued each month."
          />

          {/* Months of Production */}
          <InputWithLabel
            label="Months of Production"
            value={inputs.monthsOfProduction}
            onChange={(e) => updateInput('monthsOfProduction', parseFloat(e.target.value) || 0)}
            tooltip="The total number of months during which production occurred."
          />

          {/* Avg Persistency (%) */}
          <InputWithLabel
            label="Avg Persistency (%)"
            value={inputs.avgPersistency}
            onChange={(e) => updateInput('avgPersistency', parseFloat(e.target.value) || 0)}
            tooltip="The percentage of policyholders who continue to pay their renewal premium."
          />

          {/* Avg Annual Growth (%) */}
          <InputWithLabel
            label="Avg Annual Growth (%)"
            value={inputs.avgGrowth}
            onChange={(e) => updateInput('avgGrowth', parseFloat(e.target.value) || 0)}
            tooltip="The average percentage increase in key metrics over the year."
          />

          {/* Years to Calculate */}
          <InputWithLabel
            label="Years to Calculate"
            value={inputs.years}
            onChange={(e) => updateInput('years', parseInt(e.target.value) || 0)}
            tooltip="The number of years to include in the calculation."
          />
        </form>

        <div className="grid md:grid-cols-[1fr_2fr]">
        <div className="table-wrapper w-full max-w-4xl bg-green-900 p-6">
        <div className="flex flex-row gap-4 text-white font-bold text-lg border-b-2 border-lime-600 pb-2">
          <div className="min-w-16">Year</div>
          <div>Total Compensation</div>
        </div>
        {tableData.map((row) => (
          <div
            key={row.year}
            className="flex flex-row gap-4 border-b border-lime-700 py-2 text-white"
          >
            <div className="min-w-16">{row.year}</div>
            <div>${row.compensation.toLocaleString()}</div>
          </div>
        ))}
      </div>
          <div className="p-6 flex flex-col justify-center">
          
          <canvas id="compChart" ref={chartRef}></canvas></div>
        </div>
        

      </div>

    </div>
    
  );
};

const InputWithLabel = ({ label, value, onChange, tooltip }) => (
  <div className="ts-input">
    <div className="label-wrapper flex items-center gap-2">
      <label className="font-bold">{label}</label>
      <div className="tooltip relative group">
        <img className="question-mark w-5 h-5" src={questionIcon} alt="?" />
        <span className="tooltiptext absolute left-0 invisible group-hover:visible bg-tooltip-bg text-white text-sm rounded-lg p-2 z-10 w-64">
          {tooltip}
        </span>
      </div>
    </div>
    <input
      className="calculation-input rounded-lg p-2 border border-input-border focus:outline-none focus:border-input-focus"
      type="number"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default Calculator;
