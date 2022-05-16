import { useEffect, useState } from 'react';

export function InputText({ exampleText: exampleData }) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (exampleData) {
      setText(exampleData)
    }
  }, [exampleData]);

  function handleTextChange(event) {
    setText(event.target.value);
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