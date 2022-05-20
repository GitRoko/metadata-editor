import * as React from 'react';
import TextField from '@mui/material/TextField';
import { cloneDeep } from 'lodash';

export function JsonTextField({ jsonField, setFieldData, fieldData }) {
  const [text, setText] = React.useState('');

  React.useEffect(() => {
    if (jsonField) {
      setText(jsonField);
    }
  }, [jsonField]);

  const handleChange = (event) => {
    setText(event.target.value);

    Object.keys(fieldData).forEach((item) => {
      if (fieldData[item] === jsonField) {
        fieldData[item] = event.target.value;
      }
    })

    let newFieldData = cloneDeep(fieldData);

    setFieldData(newFieldData);
  };

  return (
    <TextField
      fullWidth
      size="small"
      variant="outlined"
      id="outlined-name"
      label="Field"
      value={text}
      onChange={handleChange}
    />
  );
}