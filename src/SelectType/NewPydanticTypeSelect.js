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
        icon: '0.1',
      }];

    case 'array':
      return [{
        generalType: 'array',
        value: 'List',
        text: 'List',
        icon: '[...]',
      }];

    case 'object':
      return [{
        generalType: 'object',
        value: 'Dict',
        text: 'Dict',
        icon: '{...}',
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

export function NewPydanticTypeSelect({ json_type,  pydantic_type, fieldData, setFieldData }) {
  const [tdType, setTdType] = useState('');
  const [options, setOptions] = useState(optionsData(json_type));
  // console.log('optionsData(json_type) - ', optionsData(json_type));

  useEffect(() => {
    setOptions(optionsData(json_type));

    let hasType = options.find(item => item.value === pydantic_type);

    (hasType && json_type === hasType.generalType) ? setTdType(hasType.value) : setTdType('');

    // console.log('td_type - ', td_type);
    // console.log('hasType - ', hasType);
    // setTdType('');
    // optionsData(tdType);
    // console.log('tdType - ', tdType);
  }, [json_type])

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    // console.log('value - ', value);
    setTdType(value);

    Object.keys(fieldData).forEach((item) => {
      if (fieldData[item] === pydantic_type) {
        fieldData[item] = event.target.value;
      }
    })

    let newFieldData = cloneDeep(fieldData);

    setFieldData(newFieldData);
  };

  return (

    <FormControl sx={{ m: 0, width: 120 }} size="small" variant="outlined" >
        <InputLabel id="demo-multiple-chip-label">pydantic</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        input={<OutlinedInput id="select-multiple-chip" label="pydantic" />}

        value={tdType}
        onChange={handleChange}
        renderValue={(selected) => {
          // console.log('selected - ', selected);
          // console.log('options - ', options);

          let selectedTypeObject = options.find((item => item.value === selected));

          // console.log('selectedTypeObject - ', selectedTypeObject);

          return (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
              <Chip key={selectedTypeObject.icon} label={selectedTypeObject.icon ? selectedTypeObject.icon : 'TD'} color="primary" sx={{ width: 50, p: 0, height: '22px', borderRadius: '4px' }} />
            </Box>
          );

          // if (selectedTypeObject) {
          //   return (
          //     <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
          //       <Chip key={selectedTypeObject.icon} label={selectedTypeObject.icon ? selectedTypeObject.icon : 'TD'} color="primary" sx={{ width: 50, p: 0, height: '22px', borderRadius: '4px' }} />
          //     </Box>
          //   );
          // } else {
          //   return ('no value');
          // }
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
