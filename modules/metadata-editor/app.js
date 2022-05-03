
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

const filePicker = document.getElementById('read-dir');
const fileTextArea = document.getElementById('fileTextArea');

let fileContent;

filePicker.addEventListener('click', async () => {
  const [fileHandle] = await window.showOpenFilePicker(options);

  const file = await fileHandle.getFile();
  fileContent = await file.text();
  fileTextArea.innerText = fileContent;
});


console.log(fileContent);