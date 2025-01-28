import React, { useState, useEffect } from 'react';
import InputForm from './InputForm';
import OutputTable from './OutputTable';
import MultiChartToggle from './MultiChartToggle';

const Calculator = () => {
  const [inputs, setInputs] = useState({
    avgPremium: 2400,
    avgContract: 18,
    appsPerMonth: 8,
    monthsOfProduction: 10,
    avgPersistency: 85,
    avgGrowth: 10,
    years: 10,
  });

  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const updateInput = (key, value) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const calculateCompensation = () => {
    const yearData = [];
    for (let i = 1; i <= inputs.years; i++) {
      const yearRev = computeYearRev(i);
      yearData.push({ year: `Year ${i}`, compensation: yearRev });
    }
    return yearData;
  };
  
  const computeYearRev = (year) => {
    const {
      avgPremium,
      appsPerMonth,
      monthsOfProduction,
      avgGrowth,
      avgPersistency,
      avgContract
    } = inputs;
  
    // Base units for monthly apps, months, and contract %
    const baseFactor =
      appsPerMonth * monthsOfProduction * (avgPremium * (avgContract / 100));
  
    let total = 0;
  
    for (let i = 1; i <= year; i++) {
      // For year 1, the "growth factor" is (1 + growth)^0 = 1, so no change
      const growthFactor = Math.pow(1 + avgGrowth / 100, i - 1);
  
      // Many organizations also apply persistency each year,
      // but the exact interpretation varies.
      // You could do (avgPersistency / 100)^(i - 1), 
      // or apply (avgPersistency / 100) for years > 1 only.
      // Here's an example applying persistency each year except the first:
      const persistFactor = i === 1 ? 1 : (avgPersistency / 100);
  
      // Yearly revenue for year i
      const yearlyRev = baseFactor * growthFactor * persistFactor;
      total += yearlyRev;
    }
  
    return total;
  };
  

  useEffect(() => {
    const rows = calculateCompensation();
    setTableData(rows);
    setChartData(rows);
  }, [inputs]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 profitpath-bg">
      <h1 className="profitpath-heading text-6xl font-black -mb-2">ProfitPath</h1>
      <p className="profitpath-green-text text-center font-bold mb-4">Calculate your premiums, commissions, and production metrics.</p>
      <div className="grid md:grid-cols-[1fr_3fr] max-w-5xl w-full rounded-lg border border-input-border bg-white shadow">
        <InputForm inputs={inputs} updateInput={updateInput} />
        <div className="grid md:grid-cols-[1fr_2fr]">
          <OutputTable tableData={tableData} />
          <MultiChartToggle chartData={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Calculator;
