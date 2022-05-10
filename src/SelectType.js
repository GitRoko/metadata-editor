import { useState } from 'react';
import { types } from './types/types';

export function SelectType() {
  const [SelectedType, setSelectedType] = useState('');


  const onUserType = (event) => {
    setSelectedType(types[event.target.value]);
  };

  return (
    <select
      className="types"
      onChange={onUserType}
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
