import React from 'react';
import questionIcon from '../assets/images/question.svg';
import { Range } from 'react-range';
import CurrencyInput from 'react-currency-input-field';

const InputWithLabel = ({ label, value, units, onChange, tooltip, type = 'number', min, max, step }) => (
  <div className="ts-input">
    <div className="label-wrapper flex items-center gap-2">
      <label>{label}</label>
      <div className="tooltip relative group">
        <img className="question-mark w-5 h-5" src={questionIcon} alt="?" />
        <span className="tooltiptext absolute left-0 invisible group-hover:visible bg-tooltip-background-color text-white text-sm rounded-lg p-2 z-10 w-64">
          {tooltip}
        </span>
      </div>
    </div>
    {type === 'range' ? (
      <div>
        <Range
          values={[value]}
          step={step}
          min={min}
          max={max}
          onChange={(values) => onChange({ target: { value: values[0] } })}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              key="track" // Explicitly set key for the track div
              style={{
                ...props.style,
                height: '6px',
                width: '100%',
                background: `linear-gradient(to right, #65a30d ${(value - min) / (max - min) * 100}%, #d1d5db ${(value - min) / (max - min) * 100}%)`,
                borderRadius: '4px',
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              key="thumb" // Explicitly set key for the thumb div
              style={{
                ...props.style,
                height: '20px',
                width: '20px',
                borderRadius: '50%',
                backgroundColor: '#65a30d',
                boxShadow: '0px 2px 6px #aaa',
              }}
            />
          )}
        />
        <div className="text-sm text-gray-700 mt-1">{value} {units}</div>
      </div>
    ) : label.includes("Premium") ? (
      <CurrencyInput
        className="calculation-input rounded-lg p-2 border border-input-border focus:outline-none focus:border-input-focus"
        value={value}
        decimalsLimit={2}
        prefix="$"
        allowDecimals={true}
        onValueChange={(value) => {
          if (value === null || value === undefined || value === '') {
            onChange({ target: { value: 0 } }); // Reset to 0 on invalid input
          } else {
            onChange({ target: { value: parseFloat(value) } }); // Parse the valid value
          }
        }}
      />
    ) : (
      <input
        type={type}
        className="calculation-input rounded-lg p-2 border border-input-border focus:outline-none focus:border-input-focus"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
      />
    )}
  </div>
);

export default InputWithLabel;
