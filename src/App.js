import { useEffect, useState } from 'react';
import './App.css';
import YAML from 'yaml';
import { JsonTable } from './JsonTable';

function App() {
  const [textArea, setTextArea] = useState('');
  const [parseContent, setParseContent] = useState('');
  const [loadContent, setLoadContent] = useState(null);

  useEffect(() => {
    if (loadContent) {
      setParseContent(YAML.parse(loadContent));
    }
  }, [loadContent]);

  useEffect(() => {
    setTextArea(JSON.stringify(parseContent, null, 2))
  }, [parseContent]);

  const options = {
    types: [
      {
        description: 'Text',
        accept: {
          'text/plain': '.yaml',
        }
      }
    ],
    excludeAcceptAllOption: true,
  };

  const filePicker = async () => {
    const [fileHandle] = await window.showOpenFilePicker(options)

    const file = await fileHandle.getFile()
    const fileContent = await file.text()

    setLoadContent(fileContent);
  }

  return (
    <div className="App">
      <div>
        <button
          className="openFile"
          onClick={filePicker}
        >
          Open file
        </button>
      </div>
      <textarea
        name="text"
        className="fileTextArea"
        value={textArea}
        readOnly
        onChange={(event) => {
          setTextArea(event.target.value);
        }}
        cols="30"
        rows="10"
      >
      </textarea>

      <JsonTable
        parseContent={parseContent}
      />

    </div>
  );
}

export default App;


