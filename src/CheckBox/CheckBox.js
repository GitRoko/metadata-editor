// import { useEffect, useState } from 'react';
// import { cloneDeep } from 'lodash';

// export function CheckBox({ isChecked, fieldData, setFieldData }) {
//   const [checked, setChecked] = useState(isChecked);
//   console.log(isChecked, fieldData, setFieldData);
//   // useEffect(() => {
//   //   if (isChecked) {
//   //     setChecked(isChecked);
//   //   }
//   // }, [isChecked]);

//   function handleCheckboxChange() {
//     setChecked(!checked);

//     Object.keys(fieldData).forEach((item) => {
//       if (fieldData[item] === 'mandatory') {
//         fieldData[item] = !checked;
//       }
//     })

//     let newFieldData = cloneDeep(fieldData);

//     setFieldData(newFieldData);
//   }

//   return (
//     <label
//     style={{
//       display: 'flex',
//       justifyContent: 'center',
//     }}
//     >
//       <input
//         name="mandatoryType"
//         type="checkbox"
//         value='mandatory'
//         checked={checked}
//         onChange={handleCheckboxChange}
//       />
//     </label>
//   )
// }