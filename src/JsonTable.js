import { useEffect, useState } from 'react';
import { SelectType } from './SelectType';
import { getTypes } from './types/getTypes';

export function JsonTable({
  parseContent,
}) {
  const [data, setData] = useState([]);
  const [flatData, setFlatData] = useState([]);
  const rowData = [];

  function getKeys(data) {
    return Object.keys(data);
  }

  useEffect(() => {
    setData(parseContent);
  }, [parseContent]);

  useEffect(() => {
    if (data) {
      flatObject(data, getKeys(data));
      setFlatData(rowData);
    }
  }, [data]);

  function flatObject(object, keys) {

    keys.forEach((key, i) => {
      if (object[key] != null && object[key].constructor.name === "Object") {
        rowData.push({ key, value: object[key], typeValue: getTypes(object[key]) });
        flatObject(object[key], getKeys(object[key]));
      } else {
        rowData.push({ key, value: object[key], typeValue: getTypes(object[key]) });
      }
    });
  }


  return (
    <div>
      {flatData.length !== 0 && (
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {
              flatData.map((item) => {
                return (
                  <tr>
                    <td className='p20'>
                      {/* {`${JSON.stringify(item.key)} : ${JSON.stringify(item.value)},`} */}
                      {`${JSON.stringify(item.key)}`}
                    </td>
                    <td>
                      <SelectType typeValue={item.typeValue} />
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

