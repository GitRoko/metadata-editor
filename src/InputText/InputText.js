import { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';


export function InputText({ exampleData, jsonDataKey, jsonData, setJsonData }) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (exampleData) {
      setText(exampleData)
    }
  }, [exampleData]);

  function handleTextChange(event) {
    setText(event.target.value);

    Object.keys(jsonData[jsonDataKey]).forEach((item) => {
      if (item === 'example') {
        jsonData[jsonDataKey][item] = JSON.parse(event.target.value);
      }
    });

    const newJsonData = cloneDeep(jsonData);
    
    setJsonData(newJsonData);
  }

  return (
    <label>
      <input
        name="exempleText"
        type="text"
        value={text}
        onChange={handleTextChange}
      />
    </label>
  )
}