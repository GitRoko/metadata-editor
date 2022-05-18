import { useEffect, useState } from 'react';
import { JsonTextField } from '../JsonTextField/JsonTextField';
import { NewJsonTypeSelect } from '../SelectType/NewJsonTypeSelect';


import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export function Row({ row }) {
  // console.log('row - ', row);
  const [fieldData, setFieldData] = useState(row);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setFieldData(row);
  }, [row]);

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
            <TableCell align="left" size="small">
              {/* {'json_type : '}
              {fieldData.json_type} */}

              <NewJsonTypeSelect />

            </TableCell>
            <TableCell align="right">
            <FormControlLabel control={<Checkbox defaultChecked />} label="Required" />
              {/* {'required : '}
              {`${fieldData.mandatory}`} */}
            </TableCell>
            <TableCell align="right" size="small">
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

                        <TableCell component="th" scope="row">
                          {'td_type : '}
                          {`${fieldData.td_type}`}
                        </TableCell>

                        <TableCell>
                          {'pydantic_type : '}
                          {`${fieldData.pydantic_type}`}
                        </TableCell>

                        <TableCell align="right">
                          {'example : '}
                          {`${fieldData.example}`}
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