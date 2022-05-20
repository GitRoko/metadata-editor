import { useEffect, useState } from 'react';
import { Row } from '../Row/Row';
// import { CheckBox } from '../CheckBox/CheckBox';
import { InputText } from '../InputText/InputText';
import { JsonTypeSelect } from '../SelectType/JsonTypeSelect';
import { TdTypeSelect } from '../SelectType/TdTypeSelect';
import { PydanticTypeSelect } from '../SelectType/PydanticTypeSelect';
import { json_typeMapping, pydantic_typeMapping, td_typeMapping } from '../types/types';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';


function getKeys(data) {
  return Object.keys(data);
}

const getRowData = (data) => {
  const newData = [];
  // console.log(data);

  getKeys(data).forEach(item => {
    newData.push({
      field: item,
      json_type: data[item].json_type,
      mandatory: data[item].mandatory,
      td_type: data[item].td_type,
      pydantic_type: data[item].pydantic_type,
      example: data[item].example,
      faker: data[item].faker,
    })
  })

  return newData;
}

export function NewJsonTable({
  parseLoadContent,
  setSaveContent,
}) {
  const [jsonData, setJsonData] = useState(null);
  const [rowData, setRowData] = useState([]);



  useEffect(() => {
    if (parseLoadContent) {
      setJsonData(parseLoadContent);
      // console.log(rowData(parseLoadContent));
      setRowData(getRowData(parseLoadContent));
    }
  }, [parseLoadContent]);

  useEffect(() => {
    if (jsonData) {
      setSaveContent(jsonData);
    }

  }, [jsonData, setSaveContent]);

  


  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">

          <TableBody>
            {rowData.map((row) => (
              <Row key={row.field} row={row} />
            ))}
          </TableBody>

        </Table>
      </TableContainer>

      {/* {jsonData !== null && (
        <>
          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Required</th>
                <th>TreasureData type</th>
                <th>Pydantic type</th>
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
                          value={{ key: key, generalType: jsonData[key].json_type, value: jsonData[key].td_type }}
                          jsonData={jsonData}
                          setJsonData={setJsonData}
                        />
                      </td>
                      <td>
                        <PydanticTypeSelect
                          jsonDataKey={key}
                          value={{ key: key, generalType: jsonData[key].json_type, value: jsonData[key].pydantic_type }}
                          jsonData={jsonData}
                          setJsonData={setJsonData}
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
        </>
      )} */}
    </div>
  );
}
