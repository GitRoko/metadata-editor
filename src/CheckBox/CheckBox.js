import { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';

export function CheckBox({ jsonDataKey, isChecked, jsonData, setJsonData }) {
  const [checked, setChecked] = useState(null);

  useEffect(() => {
    if (isChecked) {
      setChecked(isChecked);
    }
  }, [isChecked]);

  function handleCheckboxChange() {
    setChecked(!checked);
    console.log('key -', jsonDataKey)

    Object.keys(jsonData[jsonDataKey]).forEach((item) => {
      if (item === 'mandatory') {
        jsonData[jsonDataKey][item] = !checked;
      }
    });

    const newJsonData = cloneDeep(jsonData);
    
    setJsonData(newJsonData);
  }

  return (
    <label>
      Required:
      <input
        name="mandatoryType"
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />
    </label>
  )
}