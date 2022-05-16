import React, { useState, useEffect } from 'react';
import Select, { components } from 'react-select';
import { cloneDeep } from 'lodash';

export function PydanticTypeSelect({ value, jsonData, setJsonData, jsonDataKey }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [typeValue, setTypeValue] = useState(value);
  const [optionsData, setOptionsData] = useState([]);

  const { SingleValue, Option, } = components;

  const getOptions = (key) => {
    switch (key) {
      case 'string':
        return [{
          generalType: 'string',
          value: 'StrictStr',
          text: 'StrictStr',
          icon: 'abc',
        }];

      case 'number':
        return [{
          generalType: 'number',
          value: 'StrictInt',
          text: 'StrictInt',
          icon: '123',
        },
        {
          generalType: 'number',
          value: 'StrictFloat',
          text: 'StrictFloat',
          icon: '1.01',
        }];

      case 'array':
        return [{
          generalType: 'array',
          value: 'List',
          text: 'List',
          icon: '[ ]',
        }];

      case 'object':
        return [{
          generalType: 'object',
          value: 'Dict',
          text: 'Dict',
          icon: '{ }',
        }];

      case 'boolean':
        return [{
          generalType: 'boolean',
          value: 'StrictBool',
          text: 'StrictBool',
          icon: '0/1',
        }];

      default: return;
    }
  }

  useEffect(() => {
    setOptionsData(getOptions(typeValue.generalType));
  }, [typeValue]);

  useEffect(() => {
    setSelectedOption(optionsData.find((item) => item.value === typeValue.value));
  }, [optionsData]);

  const handleChange = e => {
    setSelectedOption(e);

    setTypeValue({ ...typeValue, value: e.value });

    Object.keys(jsonData[jsonDataKey]).forEach((key) => {
      if (key === 'pydantic_type') {
        jsonData[jsonDataKey][key] = e.value;
      }
    });

    const newJsonData = cloneDeep(jsonData);

    setJsonData(newJsonData);
  }

  const ValueOption = (props) => (
    <SingleValue {...props}>
      <div style={{
        width: '80px',
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

  return (
    <Select
      value={selectedOption}
      options={optionsData}
      onChange={handleChange}
      components={{ Option: IconOption, SingleValue: ValueOption }}
    />
  );
}
