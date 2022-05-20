import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import FormControl from "@mui/material/FormControl";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import TextField from '@mui/material/TextField';




import { cloneDeep } from 'lodash';


export function RequiredCheckbox({ ischecked, fieldData, setFieldData }) {
  const [checked, setChecked] = React.useState(ischecked);

  const handleChange = () => {
    setChecked(!checked);

    Object.keys(fieldData).forEach((item) => {
      // console.log(fieldData[item]);
      if (item === 'mandatory') {
        console.log(fieldData[item]);
        fieldData[item] = !checked;
      }
    })

    let newFieldData = cloneDeep(fieldData);

    setFieldData(newFieldData);
  };

  return (

  //   <Box
  //   sx={{
  //     display: 'flex',
  //     '& > :not(style)': {
  //       px: 1,
  //       py: 0,
  //     },
  //   }}
  // >
  //   <Paper variant="outlined">
    <FormControlLabel
      
      control={<Checkbox
        size="small"
        color="primary"
        checked={checked}
        onChange={handleChange}
        // input={<OutlinedInput id="select-multiple-chip" label="Type" />}
        inputProps={{ 'aria-label': 'controlled' }}
      />}
      label={
        <Typography sx={{ fontSize: 14 }}>
          Required
        </Typography>
      }
    />

    // {/* <OutlinedInput 
    //   components={<Checkbox
    //     size="small"
    //     color="primary"
    //     checked={checked}
    //     onChange={handleChange}
    //     // input={<OutlinedInput id="select-multiple-chip" label="Type" />}
    //     inputProps={{ 'aria-label': 'controlled' }}
    //   />}
    // /> */}

    // {/* </Paper> */}

  // {/* </Box>  */}
      

  );

}