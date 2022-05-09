import { useEffect, useState } from 'react';

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

  function formatedData(obj, keys) {
    return keys.map((key) => {
      if (obj[key] != null && obj[key].constructor.name === "Object") {
        console.log('KEY - ', key);
        console.log('OBJECT - ', obj[key]);

        return formatedData(obj[key], getKeys(obj[key]));
      }

      console.log('Key - ', key);
      console.log('Value - ', obj[key]);

      return (
        <tr>
          <td>{JSON.stringify(key)}</td>
          {(obj[key] != null && obj[key].constructor.name === "Object") 
          ? (<td>{'{'}</td>) : (<td>{JSON.stringify(obj[key])}</td>)}
        </tr>
      );
    })
  };

  return (
    <div>
      <table>
        <tbody>
          {(data) && formatedData(data, getKeys(data))}
          </tbody>
      </table>
    </div>
  );
}
