import React, { useState, useEffect } from 'react';
import Select, { components } from 'react-select';
import { cloneDeep } from 'lodash';

export function SelectType({ value, jsonData, setJsonData }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [typeValue, setTypeValue] = useState(value);

  const { SingleValue, Option, } = components;
  useEffect(() => {
    setSelectedOption(optionsData.find((item) => item.value === typeValue.value));
  }, [typeValue]);

  const handleChange = e => {
    setSelectedOption(e);

    setTypeValue({ ...typeValue, value: e.value });

    Object.keys(jsonData[typeValue.key]).forEach((key) => {
      if (key === 'json_type') {
        jsonData[typeValue.key][key] = e.value;
      }
    });

    const newJsonData = cloneDeep(jsonData);
    
    setJsonData(newJsonData);
  }

  const ValueOption = (props) => (
    <SingleValue {...props}>
      <div style={{
        width: '70px',
      }}>

      <span style={{
        width: '25px',
        padding: 3,
        display: 'inline-block',
        border: '1px solid',
        backgroundColor: '#6495ED',
        borderRadius: '10%',
        textAlign: 'center',
        fontSize: '14px',
        color: '#FFF',
      }}>{props.data.icon}</span>
      </div>
    </SingleValue>
  );

  const IconOption = (props) => (
    <Option {...props}>
      <div style={{
        width: '100%',
      }}>
        <span style={{
          width: '25px',
          padding: 3,
          display: 'inline-block',
          border: '1px solid',
          backgroundColor: '#6495ED',
          borderRadius: '10%',
          textAlign: 'center',
          fontSize: '14px',
          color: '#FFF',
          marginRight: 10,
        }}>{props.data.icon}</span>
        <span>{props.data.text}</span>
      </div>
    </Option>
  );

  const optionsData = [
    {
      value: 'string',
      text: 'string',
      icon: 'abc'
    },
    {
      value: 'number',
      text: 'number',
      icon: '123'
    },
    {
      value: 'array',
      text: 'array',
      icon: '[ ]'
    },
    {
      value: 'object',
      text: 'object',
      icon: '{ }'
    },
    {
      value: 'boolean',
      text: 'boolean',
      icon: '0/1'
    },
  ];

  return (
    <Select
      value={selectedOption}
      options={optionsData}
      onChange={handleChange}
      components={{ Option: IconOption, SingleValue: ValueOption }}
    />
  );
}
