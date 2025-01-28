import React from 'react';
import InputWithLabel from './InputWithLabel';
import CurrencyInput from 'react-currency-input-field';
import QuestionIcon from './QuestionIcon';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const InputForm = ({ inputs, updateInput }) => (
  <form className="form flex flex-col gap-4 p-6">
       {/* Avg Annualized Premium (formatted as USD) */}
       <div className="ts-input">
            <div className="label-wrapper flex items-center gap-2">
              <label>Avg Annualized Premium</label>
              <Tippy content=" The average premium amount collected annually, calculated across all active policies.">
                <div class="tooltip">
              <QuestionIcon className="w-4 h-4 question-icon" />
              </div>
              </Tippy>
             
            
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
    <InputWithLabel
      label="Avg Contract Level"
      value={inputs.avgContract}
      onChange={(e) => updateInput('avgContract', parseFloat(e.target.value) || 0)}
      tooltip="The average percentage of the total contract value that has been activated."
      type="range"
      min={1}
      max={100}
      step={1}
      units="%"
    />
    <InputWithLabel
      label="Issued Apps Per Month"
      value={inputs.appsPerMonth}
      onChange={(e) => updateInput('appsPerMonth', parseFloat(e.target.value) || 0)}
      tooltip="The average number of applications issued each month."
      type="number"
    />
    <InputWithLabel
      label="Months of Production"
      value={inputs.monthsOfProduction}
      onChange={(e) => updateInput('monthsOfProduction', parseFloat(e.target.value) || 0)}
      tooltip="The total number of months during which production occurred."
      type="range"
      min={1}
      max={12}
      step={1}
      units=" months"
    />
    <InputWithLabel
      label="Avg Persistency"
      value={inputs.avgPersistency}
      onChange={(e) => updateInput('avgPersistency', parseFloat(e.target.value) || 0)}
      tooltip="The percentage of policyholders who continue to pay their renewal premium."
      type="range"
      min={0}
      max={100}
      step={1}
      units="%"
    />
    <InputWithLabel
      label="Avg Annual Growth"
      value={inputs.avgGrowth}
      onChange={(e) => updateInput('avgGrowth', parseFloat(e.target.value) || 0)}
      tooltip="The average percentage increase in key metrics over the year."
      type="range"
      min={0}
      max={500}
      step={1}
      units="%"
    />
    <InputWithLabel
      label="Years to Calculate"
      value={inputs.years}
      onChange={(e) => updateInput('years', parseInt(e.target.value) || 0)}
      tooltip="The number of years to include in the calculation."
      type="range"
      min={1}
      max={40}
      step={1}
      units=" years"
    />
  </form>
);

export default InputForm;
