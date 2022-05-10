// import { useState } from 'react';
// import { types } from '../types/types';

// export function SelectType({ typeValue }) {
//   const [SelectedType, setSelectedType] = useState(typeValue);

//   return (
//     <select
//       className="types"
//       onChange={(e) => {
//         setSelectedType(e.target.value);
//       }}
//       defaultValue={SelectedType}
//     >
//       {Object.keys(types).map(key => (
//         <option
//           value={key}
//           key={key}
//         >
//           {`${types[key]} ${key}`}
//         </option>
//       ))}
//     </select>
//   );
// }

import React, { useState, useEffect } from 'react';
import Select from 'react-select';


export function SelectType({ typeValue }) {
  const data = [
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

  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setSelectedOption(data.find((item) => item.value === typeValue));
  }, [typeValue]);

  // handle onChange event of the dropdown
  const handleChange = e => {
    setSelectedOption(e);
  }

  return (
      <Select
        // placeholder="Select Option"
        defaultValue={data[0]}
        value={selectedOption}
        options={data}
        onChange={handleChange}
        getOptionLabel={e => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ 
              width: '25px',
              padding: 5,
              display: 'inline-block',
              border: '1px solid blue',
              textAlign: 'center',
              fontSize: '12px',
              color: 'blue',

            }}>{e.icon}</span>
            <span style={{ marginLeft: 5 }}>{e.text}</span>
          </div>
        )}
      />
  );
}

// export default App;
