import { useEffect, useState } from 'react';
import { SelectType } from './SelectType';

export function JsonTable({
  parseContent,
}) {
  const [data, setData] = useState([]);

  function getKeys(data) {
    return Object.keys(data);
  }

  useEffect(() => {
    setData(parseContent);
  }, [parseContent]);

  return (
    <div>
      {data.length !== 0 && (
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {
              getKeys(data).map((key) => {
                return (
                  <tr>
                    <td className='p20'>
                      {`${JSON.stringify(key)} : ${JSON.stringify(data[key].json_type)}`}
                    </td>
                    <td>
                      <SelectType typeValue={data[key].json_type} />
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
