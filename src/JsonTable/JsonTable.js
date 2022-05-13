import { useEffect, useState } from 'react';
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
              <th>Key</th>
              <th>Type</th>
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
                  </tr>
                )
              })}
          </tbody>
        </table>
      )}
    </div>
  );
}
