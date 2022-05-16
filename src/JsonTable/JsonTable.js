import { useEffect, useState } from 'react';
import { CheckBox } from '../CheckBox/CheckBox';
import { InputText } from '../InputText/InputText';
import { SelectType } from '../SelectType/SelectType';

export function JsonTable({
  parseLoadContent,
  setSaveContent,
}) {
  const [jsonData, setJsonData] = useState([]);

  function getKeys(data) {
    return Object.keys(data);
  }

  useEffect(() => {
    setJsonData(parseLoadContent);
  }, [parseLoadContent]);

  useEffect(() => {
    setSaveContent(jsonData);
  }, [jsonData]);

  
  
  return (
    <div>
      {jsonData.length !== 0 && (
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Type</th>
              <th>Required</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            {
              getKeys(jsonData).map((key) => {
                return (
                  <tr key={key}>
                    <td className='p20'>
                      {key}
                    </td>
                    <td>
                      <SelectType
                        value={{key: key, value: jsonData[key].json_type}}
                        jsonData={jsonData}
                        setJsonData={setJsonData}
                      />
                    </td>
                    <td>
                      <CheckBox isChecked={jsonData[key].mandatory} />
                    </td>
                    <td>
                      <InputText exampleText={JSON.stringify(jsonData[key].example)} />
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      )}
    </div>
  );
}
