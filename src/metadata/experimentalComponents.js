import { useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { cloneDeep } from 'lodash';

const Json_types = [
  {
    value: "string",
    text: "string",
    icon: "abc"
  },
  {
    value: "number",
    text: "number",
    icon: "123"
  },
  {
    value: "array",
    text: "array",
    icon: "[...]"
  },
  {
    value: "object",
    text: "object",
    icon: "{...}"
  },
  {
    value: "boolean",
    text: "boolean",
    icon: "0/1"
  }
];

export function NewTdTypeSelect({ json_type, fieldData, setFieldData }) {
  const [jsonType, setJsonType] = useState([json_type]);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setJsonType(
      typeof value === "string" ? value.split(",") : value
    );

    Object.keys(fieldData).forEach((item) => {
      if (fieldData[item] === json_type) {
        fieldData[item] = event.target.value;
      }
    })

    let newFieldData = cloneDeep(fieldData);

    setFieldData(newFieldData);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
          p: 0,
        },
      }}
    >
      <ButtonGroup aria-label="outlined button group">
        <Typography
          sx={{
            p: 0.9,
            border: '1px solid grey',
            borderRadius: 1.5,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          TD type
        </Typography>
        <FormControl
          variant="standard"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            m: 0,
            width: 100,
            border: '1px solid lightgrey',
            borderLeft: 0,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
          }}  >
          <Select
            disableUnderline
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            value={jsonType}
            onChange={handleChange}
            renderValue={(selected) => {
              let selectedTypeObject = Json_types.find((item => item.value === selected[0]));

              return (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
                  <Chip key={selectedTypeObject.icon} label={selectedTypeObject.icon} color="primary" sx={{ width: 50, p: 0, height: '22px', borderRadius: '4px' }} />
                </Box>
              );
            }}
          >
            {Json_types.map((item) => (
              <MenuItem
                key={item.value}
                value={item.value}
              >
                <Box sx={{ display: "flex", flexWrap: "no-wrap", gap: 0.5 }}>
                  <Chip key={item.icon} label={item.icon} color="primary" sx={{ width: 50, p: 0, height: '22px', borderRadius: '4px' }} />
                </Box>
                <Box sx={{ display: "flex", flexWrap: "no-wrap", gap: 0.5, ml: 1 }}>
                  <span>{item.value}</span>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ButtonGroup>
    </Box>
  );
}
