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
    return keys.map((key, i) => {
      return (
        <>
          {(obj[key] != null && obj[key].constructor.name === "Object")
            ? (
              <tr>
                <table>
                  <tbody>
                    <tr>
                      <td
                        className='p0'
                      >
                        {`${JSON.stringify(key)} : {`}
                      </td>
                    </tr>
                    {formatedData(obj[key], getKeys(obj[key]))}
                    <tr>
                      <td
                        className='p0'
                      >{'},'}</td>
                    </tr>
                  </tbody>
                </table>
              </tr>
            ) : (
              <tr>
                <td
                  className='p20'
                >
                  {`${JSON.stringify(key)} : ${JSON.stringify(obj[key])},`}
                </td>
              </tr>
            )}
        </>
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
