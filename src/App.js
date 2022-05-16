import { useEffect, useState } from 'react';
import './App.css';
import YAML from 'yaml';
import { JsonTable } from './JsonTable/JsonTable';

function App() {
  const [textArea, setTextArea] = useState('');
  const [loadContent, setLoadContent] = useState(null);
  const [parseLoadContent, setLoadParseContent] = useState('');
  const [saveContent, setSaveContent] = useState(null);
  const [parseSaveContent, setParseSaveContent] = useState(null);

  // Когда получили данные из файла парсим YAML => JSON
  useEffect(() => {
    if (loadContent) {
      setLoadParseContent(YAML.parse(loadContent));
    }
  }, [loadContent]);

  // Выводим JSON в <textArea>
  useEffect(() => {
    setTextArea(JSON.stringify(parseLoadContent, null, 2))
  }, [parseLoadContent]);

  // Когда получаем изменения типа в JSON, парсим JSON => YAML
  useEffect(() => {
    if (saveContent) {

      console.log('saveContent', saveContent);

      const parseToYamlData = YAML.stringify(saveContent);
      console.log('parseToYamlData', parseToYamlData);

      setParseSaveContent(parseToYamlData);
      console.log('parseSaveContent', parseSaveContent);
      console.log('YAML.stringify(saveContent)', YAML.stringify(saveContent));


    }
  }, [saveContent]);

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
    const [fileHandle] = await window.showOpenFilePicker(options);
    const file = await fileHandle.getFile();
    const fileContent = await file.text();

    setLoadContent(fileContent);
  }

  const fileSaver = async () => {
    const fileHandle = await window.showSaveFilePicker();
    const writableStream = await fileHandle.createWritable();
    await writableStream.write(parseSaveContent);
    await writableStream.close();
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
        <button
          className="saveFile"
          onClick={fileSaver}
        >
          Save file
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
        parseLoadContent={parseLoadContent}
        setSaveContent={setSaveContent}
      />

    </div>
  );
}

export default App;


