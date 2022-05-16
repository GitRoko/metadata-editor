import React, { useState, useEffect } from 'react';
import Select, { components } from 'react-select';
import { cloneDeep } from 'lodash';

export function TdTypeSelect({ value, jsonData, setJsonData, typeMapping, jsonDataKey }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [typeValue, setTypeValue] = useState(value);
  const [optionsData, setOptionsData] = useState([]);

  const { SingleValue, Option, } = components;

  const getOptions = (key) => {
    switch (key) {
      case 'string':
        return [{
          generalType: 'string',
          value: 'varchar',
          text: 'varchar',
          icon: 'abc',
        }];

      case 'number':
        return [{
          generalType: 'number',
          value: 'bigint',
          text: 'bigint',
          icon: '123',
        },
        {
          generalType: 'number',
          value: 'double',
          text: 'double',
          icon: '1.01',
        }];

      case 'array':
        return [{
          generalType: 'array',
          value: 'string',
          text: 'string',
          icon: '[ ]',
        },
        {
          generalType: 'array',
          value: 'array(varchar)',
          text: 'array(varchar)',
          icon: '[ ]',
        }];

        case 'object':
        return [{
          generalType: 'object',
          value: 'varchar',
          text: 'varchar',
          icon: '{ }',
        }];

        case 'boolean':
        return [{
          generalType: 'boolean',
          value: 'varchar',
          text: 'varchar',
          icon: '0/1', 
        }];

    default: return;
    }
  }

  // console.log('optionsData - ', optionsData);


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
      if (key === 'td_type') {
        jsonData[jsonDataKey][key] = e.value;
      }
    });

    const newJsonData = cloneDeep(jsonData);
    
    setJsonData(newJsonData);
  }

  const ValueOption = (props) => (
    <SingleValue {...props}>
      <div style={{
        width: '110px',
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



  // const optionsData = getOptions(typeValue.value);
  // const optionsData = [
  //   {
  //     value: 'string',
  //     text: 'string',
  //     icon: 'abc',
  //     rule: ["varchar"],
  //   },
  //   {
  //     value: 'number',
  //     text: 'number',
  //     icon: '123',
  //     rule: ["bigint","double"],
  //   },
  //   {
  //     value: 'array',
  //     text: 'array',
  //     icon: '[ ]',
  //     rule: ["string","array(varchar)"],
  //   },
  //   {
  //     value: 'object',
  //     text: 'object',
  //     icon: '{ }',
  //     rule: ["varchar"],
  //   },
  //   {
  //     value: 'boolean',
  //     text: 'boolean',
  //     icon: '0/1',
  //     rule: ["varchar"],
  //   },
  // ];

  return (
    <Select
      value={selectedOption}
      options={optionsData}
      onChange={handleChange}
      components={{ Option: IconOption, SingleValue: ValueOption }}
    />
  );
}
