import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CurrencyInput from 'react-currency-input-field';
import questionIcon from '../assets/images/question.svg';


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
      yearData.push({ year: `Year ${i}`, compensation: yearRev });
      tableRows.push({ year: i, compensation: yearRev });
    }

    return yearData;
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
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const rows = calculateCompensation();
    setTableData(rows); // Update the table data
    setChartData(rows); // Set the chart data
  }, [inputs]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-green-100">
      <h1 className="text-green-900 -mb-2 zain-black text-7xl bg-heading-bg text-center font-black">
        ProfitPath
      </h1>
      <p className="text-green-900 text-center font-bold mb-4">Calculate your premiums, commissions, and production metrics.</p>

      <div className="grid md:grid-cols-[1fr_3fr] max-w-7xl w-full rounded-lg border border-input-border bg-white shadow">
        <form className="form flex flex-col gap-4 p-6">
          {/* Avg Annualized Premium (formatted as USD) */}
          <div className="ts-input">
            <div className="label-wrapper flex items-center gap-2">
              <label>Avg Annualized Premium</label>
              <div className="tooltip relative group">
                <img className="question-mark w-5 h-5" src={questionIcon} alt="?" />
                <span className="tooltiptext absolute left-0 invisible group-hover:visible bg-tooltip-bg text-white text-sm rounded-lg p-2 z-10 w-64">
                  The average premium amount collected annually, calculated across all active policies.
                </span>
              </div>
            </div>
            <CurrencyInput
              name="avgPremium"
              value={inputs.avgPremium}
              onValueChange={(value) => updateInput('avgPremium', value)}
              prefix="$"
              decimalsLimit={2}
              className="calculation-input rounded-lg p-2 border border-input-border focus:outline-none focus:border-input-focus"
            />
          </div>
          {/* Avg Contract Level */}
          <InputWithLabel
            label="Avg Contract Level"
            value={inputs.avgContract}
            onChange={(e) => updateInput('avgContract', parseFloat(e.target.value) || 0)}
            tooltip="The average percentage of the total contract value that has been activated."
            type="range"
            units="%"
            min={1}
            max={100}
            step={1}
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
            type="range"
            units=" months"
            min={1}
            max={12}
            step={1}
          />
          {/* Avg Persistency */}
          <InputWithLabel
            label="Avg Persistency"
            value={inputs.avgPersistency}
            onChange={(e) => updateInput('avgPersistency', parseFloat(e.target.value) || 0)}
            tooltip="The percentage of policyholders who continue to pay their renewal premium."
            type="range"
            units="%"
            min={0}
            max={100}
            step={1}
          />
          {/* Avg Annual Growth */}
          <InputWithLabel
            label="Avg Annual Growth"
            value={inputs.avgGrowth}
            onChange={(e) => updateInput('avgGrowth', parseFloat(e.target.value) || 0)}
            tooltip="The average percentage increase in key metrics over the year."
            type="range"
            units="%"
            min={0}
            max={100}
            step={1}
          />
          {/* Years to Calculate */}
          <InputWithLabel
            label="Years to Calculate"
            value={inputs.years}
            onChange={(e) => updateInput('years', parseInt(e.target.value) || 0)}
            tooltip="The number of years to include in the calculation."
            type="range"
            units=" years"
            min={1}
            max={40}
            step={1}
          />
        </form>

        <div className="grid md:grid-cols-[1fr_2fr]">
          <div className="table-wrapper w-full bg-green-900 p-6">
            <div className="flex flex-row gap-4 text-white font-bold text-lg border-b-2 border-lime-600 pb-2">
              <div className="min-w-16">Year</div>
              <div>Total Compensation</div>
            </div>
            {tableData.map((row) => (
              <div key={row.year} className="flex flex-row gap-4 border-b border-lime-700 py-2 text-white">
                <div className="min-w-16">{row.year}</div>
                <div>${row.compensation.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              </div>
            ))}
          </div>

          {/* Bar Chart using Recharts */}
          <div className="p-6 flex flex-col justify-center">
          <div className="chart-wrapper">
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis 
    tickFormatter={(value) => 
      new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })
        .format(value)
    }
  />
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
              </ResponsiveContainer>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputWithLabel = ({ label, value, units, onChange, tooltip, type = 'number', min, max, step }) => (
  <div className="ts-input">
    <div className="label-wrapper flex items-center gap-2">
      <label>{label}</label>
      <div className="tooltip relative group">
        <img className="question-mark w-5 h-5" src={questionIcon} alt="?" />
        <span className="tooltiptext absolute left-0 invisible group-hover:visible bg-tooltip-bg text-white text-sm rounded-lg p-2 z-10 w-64">
          {tooltip}
        </span>
      </div>
    </div>
    {type === 'range' ? (
      <div>
        <input
          type="range"
          className="calculation-input rounded-lg border border-input-border focus:outline-none focus:border-input-focus w-full"
          value={value}
          units={units}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
        />
        <div className="text-sm text-gray-700 mt-1">{value}{units}</div>
      </div>
    ) : (
      <input
        type={type}
        className="calculation-input rounded-lg p-2 border border-input-border focus:outline-none focus:border-input-focus"
        value={value}
        onChange={onChange}
      />
    )}
  </div>
);

export default Calculator;
