import { useEffect, useState } from 'react';
import { CheckBox } from '../CheckBox/CheckBox';
import { InputText } from '../InputText/InputText';
import { JsonTypeSelect } from '../SelectType/JsonTypeSelect';
import { TdTypeSelect } from '../SelectType/TdTypeSelect';
import { json_typeMapping, pydantic_typeMapping, td_typeMapping } from '../types/types';

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
              <th>TreasureData type</th>
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
                      <JsonTypeSelect
                        value={{ key: key, value: jsonData[key].json_type }}
                        jsonData={jsonData}
                        setJsonData={setJsonData}
                        typeMapping={json_typeMapping}
                      />
                    </td>
                    <td>
                      <CheckBox
                        jsonDataKey={key}
                        isChecked={jsonData[key].mandatory}
                        jsonData={jsonData}
                        setJsonData={setJsonData}
                      />
                    </td>
                    <td>
                      <TdTypeSelect
                        jsonDataKey={key}
                        value={{ key: key, generalType: jsonData[key].json_type, value: jsonData[key].td_type}}
                        jsonData={jsonData}
                        setJsonData={setJsonData}
                        typeMapping={td_typeMapping}
                      />
                    </td>
                    <td>
                      <InputText
                        jsonDataKey={key}
                        exampleData={JSON.stringify(jsonData[key].example)}
                        jsonData={jsonData}
                        setJsonData={setJsonData}
                      />
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
