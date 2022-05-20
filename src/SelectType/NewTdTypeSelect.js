import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import { cloneDeep } from 'lodash';

const optionsData = (type) => getOptions(type);

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
        icon: '0.1',
      }];

    case 'array':
      return [{
        generalType: 'array',
        value: 'string',
        text: 'string',
        icon: '[...]',
      },
      {
        generalType: 'array',
        value: 'array(varchar)',
        text: 'array(varchar)',
        icon: '[...]',
      }];

    case 'object':
      return [{
        generalType: 'object',
        value: 'varchar',
        text: 'varchar',
        icon: '{...}',
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

export function NewTdTypeSelect({ json_type, td_type, fieldData, setFieldData }) {
  const [tdType, setTdType] = useState('');
  const [options, setOptions] = useState(optionsData(json_type));

  useEffect(() => {
    setOptions(optionsData(json_type));

    let hasType = options.find(item => item.value === td_type);

    (hasType && json_type === hasType.generalType) ? setTdType(hasType.value) : setTdType('');

  }, [json_type])

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setTdType(value);

    Object.keys(fieldData).forEach((item) => {
      if (fieldData[item] === td_type) {
        fieldData[item] = event.target.value;
      }
    })

    let newFieldData = cloneDeep(fieldData);

    setFieldData(newFieldData);
  };

  return (

    <FormControl sx={{ m: 0, width: 100 }} size="small" variant="outlined" >
      <InputLabel id="demo-multiple-chip-label">td</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        input={<OutlinedInput id="select-multiple-chip" label="td" />}
        value={tdType}
        onChange={handleChange}
        renderValue={(selected) => {
          let selectedTypeObject = options.find((item => item.value === selected));

          return (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
              <Chip key={selectedTypeObject.icon} label={selectedTypeObject.icon ? selectedTypeObject.icon : 'TD'} color="primary" sx={{ width: 50, p: 0, height: '22px', borderRadius: '4px' }} />
            </Box>
          );
        }}
      >
        {options.map((item) => (
          <MenuItem
            key={item.value}
            value={item.value}
          >
            <Box sx={{ display: "flex", flexWrap: "no-wrap", gap: 0.5 }}>
              <Chip key={item.icon} label={item.icon} color="primary" sx={{ width: 50, p: 0, height: '22px', borderRadius: '4px' }} />
            </Box>
            <Box sx={{ display: "flex", flexWrap: "no-wrap", gap: 0.5, ml: 1 }}>
              <span>{item.text}</span>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
