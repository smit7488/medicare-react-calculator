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
    avgPersistency: 90,
    avgGrowth: 10,
    years: 3,
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
