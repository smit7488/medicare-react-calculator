import React from 'react';

const OutputTable = ({ tableData }) => (
  <div className="table-wrapper w-full p-6">
    <div className="flex flex-row gap-4 text-white font-bold text-lg border-b-2 table-heading pb-2">
      <div className="min-w-16">Year</div>
      <div>Compensation</div>
    </div>
    {tableData.map((row) => (
      <div key={row.year} className="flex flex-row gap-4 border-b table-row-content py-2 text-white">
        <div className="min-w-16">{row.year}</div>
        <div>${row.compensation.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
      </div>
    ))}
  </div>
);

export default OutputTable;
