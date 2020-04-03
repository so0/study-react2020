import React, { useEffect, useRef, useMemo, memo } from 'react';
import Td from './Td';

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
  console.log('tr rendered');
  const ref = useRef([]);
  useEffect(() => {
    console.log(
      rowData === ref.current[0],
      rowIndex === ref.current[1],
      dispatch === ref.current[2]
    );
    console.log(rowData, ref.current[0]);
    ref.current = [rowData, rowIndex, dispatch];
  }, [rowData, rowIndex, dispatch]);

  return (
    <tr>
      {Array(rowData.length)
        .fill()
        .map((td, i) =>
          // 컴포넌트도 useMemo로 기억할 수 있음
          useMemo(
            () => (
              <Td
                key={i}
                dispatch={dispatch}
                rowIndex={rowIndex}
                cellIndex={i}
                cellData={rowData[i]}>
                {''}
              </Td>
            ),
            [rowData[i]]
          )
        )}
    </tr>
  );
});

export default Tr;
