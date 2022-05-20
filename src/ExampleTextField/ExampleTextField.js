import * as React from 'react';
import TextField from '@mui/material/TextField';
import { cloneDeep } from 'lodash';

export function ExampleTextField({ example, setFieldData, fieldData }) {
  const [text, setText] = React.useState('');

  React.useEffect(() => {
    if (example === null && Object.is(example, null)) {
      return setText(JSON.stringify(example));
    }
    if (Array.isArray(example)) {
      return setText(JSON.stringify(example));
    }
    if (example != null && example.constructor.name === "Object") {
      return setText(JSON.stringify(example));
    }

    setText(example);
  }, [example]);

  const parsedValue = (e) => {
    try {
      JSON.parse(e);

      return JSON.parse(e);
    } catch {
     return e;
    }
  };

  const handleChange = (event) => {
    const { value: nextValue } = event.target;

    setText(parsedValue(nextValue));
    
    Object.keys(fieldData).forEach((item) => {
      if (fieldData[item] === example) {
        fieldData[item] = parsedValue(nextValue);
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
      label="example"
      value={text}
      onChange={handleChange}
    />
  );
}