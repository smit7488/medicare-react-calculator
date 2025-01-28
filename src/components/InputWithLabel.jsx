import React from 'react';
import QuestionIcon from './QuestionIcon';
import { Range } from 'react-range';
import CurrencyInput from 'react-currency-input-field';

const InputWithLabel = ({ 
  label, 
  value, 
  onChange, 
  tooltip, 
  type = 'number', 
  min, 
  max, 
  step, 
  units, 
  prefix 
}) => (
  <div className="ts-input">
    <div className="label-wrapper flex items-center gap-2">
      <label>{label}</label>
      <div className="tooltip relative group">
      <QuestionIcon className="w-4 h-4 question-icon" />
        <span className="tooltiptext absolute left-0 invisible group-hover:visible bg-tooltip-bg text-white text-sm rounded-lg p-2 z-10 w-64">
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
              style={{
                ...props.style,
                height: '6px',
                width: '100%',
                background: `linear-gradient(to right, var(--slider-thumb-color) ${(value - min) / (max - min) * 100}%, var(--slider-track-unselected) ${(value - min) / (max - min) * 100}%)`,
                borderRadius: '4px',
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '20px',
                width: '20px',
                borderRadius: '50%',
                backgroundColor: 'var(--slider-track-selected)',
                boxShadow: '0px 2px 6px #aaa',
              }}
            />
          )}
        />
        <div className="text-sm text-gray-700 mt-1">{value}{units}</div>
      </div>
    ) : type === 'currency' ? (
      <CurrencyInput
        value={value}
        onValueChange={(val) => onChange({ target: { value: parseFloat(val) || 0 } })}
        prefix={prefix || "$"}
        decimalsLimit={2}
        className="calculation-input rounded-lg p-2 border border-input-border focus:outline-none focus:border-input-focus"
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
