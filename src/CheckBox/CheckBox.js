import { useEffect, useState } from 'react';

export function CheckBox({ isChecked }) {
  const [checked, setChecked] = useState(null);

  useEffect(() => {
    if (isChecked) {
      setChecked(isChecked);
    }
  }, [isChecked]);

  function handleCheckboxChange(event) {
    setChecked(!event.target.checked);
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