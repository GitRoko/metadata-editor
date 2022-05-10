import { useState } from 'react';
import { types } from './types/types';

export function SelectType({ typeValue }) {
  const [SelectedType, setSelectedType] = useState(typeValue);

  return (
    <select
      className="types"
      onChange={(e) => {
        setSelectedType(e.target.value);
      }}
      defaultValue={SelectedType}
    >
      {Object.keys(types).map(key => (
        <option
          value={key}
          key={key}
        >
          {types[key]}
        </option>
      ))}
    </select>
  );
}
