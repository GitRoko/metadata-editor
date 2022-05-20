import { useEffect, useState } from 'react';
import { JsonTextField } from '../JsonTextField/JsonTextField';
import { ExampleTextField } from '../ExampleTextField/ExampleTextField';
import { NewJsonTypeSelect } from '../SelectType/NewJsonTypeSelect';
import { NewTdTypeSelect } from '../SelectType/NewTdTypeSelect';
import { NewPydanticTypeSelect } from '../SelectType/NewPydanticTypeSelect';
import { RequiredCheckbox } from '../RequiredCheckbox/RequiredCheckbox';


import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


export function Row({ row }) {
  const [fieldData, setFieldData] = useState(row);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setFieldData(row);
  }, [row]);
  useEffect(() => {
    console.log(fieldData);
  }, [fieldData]);

  return (
    <>
      {fieldData !== null &&
        <>
          <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell component="th" scope="row" size="small">

              <JsonTextField
                jsonField={fieldData.field}
                fieldData={fieldData}
                setFieldData={setFieldData}
              />

            </TableCell>
            <TableCell align="left" size="small" width="10%">

              <NewJsonTypeSelect
                json_type={fieldData.json_type}
                fieldData={fieldData}
                setFieldData={setFieldData}
              />

            </TableCell>
            <TableCell align="right" width="40%">

              <RequiredCheckbox
                ischecked={fieldData.mandatory}
                fieldData={fieldData}
                setFieldData={setFieldData}
              />

            </TableCell>
            <TableCell align="right" size="small" width="5%">
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>

                  <Table aria-label="purchases">

                    <TableBody>
                      <TableRow>

                        <TableCell component="th" scope="row" align="center">
                          {/* {'td_type : '}
                          {`${fieldData.td_type}`} */}
                          <NewTdTypeSelect
                            td_type={fieldData.td_type}
                            json_type={fieldData.json_type}
                            fieldData={fieldData}
                            setFieldData={setFieldData}
                          />
                        </TableCell>

                        <TableCell align="center">
                          {/* {'pydantic_type : '}
                          {`${fieldData.pydantic_type}`} */}
                          <NewPydanticTypeSelect
                            pydantic_type={fieldData.pydantic_type}
                            json_type={fieldData.json_type}
                            fieldData={fieldData}
                            setFieldData={setFieldData}
                          />
                        </TableCell>

                        <TableCell align="center">
                          {/* {'example : '}
                          {`${fieldData.example}`} */}
                          <ExampleTextField
                            example={fieldData.example}
                            fieldData={fieldData}
                            setFieldData={setFieldData}
                          />
                        </TableCell>

                      </TableRow>
                    </TableBody>

                  </Table>

                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </>
      }
    </>
  );
}