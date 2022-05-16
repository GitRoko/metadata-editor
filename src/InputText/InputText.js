import { useEffect, useState } from 'react';

export function InputText({ exampleText }) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (exampleText) {
      setText(exampleText)
    }
  }, [exampleText]);

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