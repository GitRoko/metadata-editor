import { useEffect, useState } from 'react';
import './App.css';
import YAML from 'yaml';
import { JsonTable } from './JsonTable/JsonTable';
import { NewJsonTable } from './NewJsonTable/NewJsonTable';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ScrollTop } from './ScrollTop/ScrollTop';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';

function App(props) {

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
      // console.log('saveContent', saveContent);
      const parseToYamlData = YAML.stringify(saveContent);
      // console.log('parseToYamlData', parseToYamlData);

      setParseSaveContent(parseToYamlData);
      // console.log('parseSaveContent', parseSaveContent);
      // console.log('YAML.stringify(saveContent)', YAML.stringify(saveContent));

      setTextArea(JSON.stringify(saveContent, null, 2));
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
      <>
        <CssBaseline />

        <Container>
          <AppBar>
            <Toolbar>
              <ButtonGroup variant="contained" aria-label="outlined button group">
                <Button
                  //variant="outlined"
                  onClick={filePicker}
                >
                  Open file
                </Button>
                <Button
                  // variant="text"
                  onClick={fileSaver}
                >
                  Save file
                </Button>
              </ButtonGroup>
            </Toolbar>
          </AppBar>
        </Container>

        <Toolbar id="back-to-top-anchor" />

        <Container>
          <Box sx={{ my: 2 }}>
            <>
              <TextareaAutosize
                maxRows={10}
                aria-label="maximum height"
                placeholder="Load file"
                value={textArea}
                readOnly
                onChange={(event) => {
                  setTextArea(event.target.value);
                }}

                style={{ width: '100%' }}
              />

              <NewJsonTable
                parseLoadContent={parseLoadContent}
                setSaveContent={setSaveContent}
              />

              {/* <JsonTable
                parseLoadContent={parseLoadContent}
                setSaveContent={setSaveContent}
              /> */}
            </>
          </Box>
        </Container>

        <ScrollTop {...props}>
          <Fab color="primary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>

      </>
    </div>
  );
}

export default App;
