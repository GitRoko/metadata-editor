import { useState } from "react";
// import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { cloneDeep } from 'lodash';


// const ITEM_HEIGHT = 42;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 160
//     }
//   }
// };

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

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium
//   };
// }

export function NewJsonTypeSelect({ json_type, fieldData, setFieldData }) {
  const [jsonType, setJsonType] = useState([json_type]);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    // console.log('handleChange value - ', value);
    setJsonType(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    // console.log('setJsonType jsonType - ', jsonType);


    Object.keys(fieldData).forEach((item) => {
      if (fieldData[item] === json_type) {
        fieldData[item] = event.target.value;
      }
    })

    let newFieldData = cloneDeep(fieldData);

    setFieldData(newFieldData);
  };

  return (
    <div>
      <FormControl sx={{ m: 0, width: 100 }} size="small" variant="outlined" >
        <InputLabel id="demo-multiple-chip-label">Type</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          // multiple
          value={jsonType}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Type" />}
          renderValue={(selected) => {
            // console.log('renderValue selected - ', selected);
            // console.log('selected === jsonType - ', selected === jsonType);
            let selectedTypeObject = Json_types.find((item => item.value === selected[0]));

            // console.log(selected, selectedTypeObject, Json_type);

            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
                <Chip key={selectedTypeObject.icon} label={selectedTypeObject.icon} color="primary" sx={{width: 50, p: 0, height: '22px', borderRadius: '4px'}}/>
              </Box>
            );
          }}
          // MenuProps={MenuProps}
        >
          {Json_types.map((item) => (
            <MenuItem
              key={item.value}
              value={item.value}
              // style={getStyles(item, jsonType, theme)}
            >
              <Box sx={{ display: "flex", flexWrap: "no-wrap", gap: 0.5 }}>
                <Chip key={item.icon} label={item.icon} color="primary" sx={{width: 50, p: 0, height: '22px', borderRadius: '4px'}} />
              </Box>
              <Box sx={{ display: "flex", flexWrap: "no-wrap", gap: 0.5, ml: 1 }}>
                <span>{item.value}</span>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
