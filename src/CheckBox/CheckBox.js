import { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';

export function CheckBox({ jsonDataKey, isChecked, jsonData, setJsonData }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (isChecked) {
      setChecked(isChecked);
    }
  }, [isChecked]);

  function handleCheckboxChange() {
    setChecked(!checked);

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
        value='mandatory'
        checked={checked}
        onChange={handleCheckboxChange}
      />
    </label>
  )
}