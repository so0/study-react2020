import React, { useCallback, useEffect, useRef, memo } from 'react';
import { CLICK_CELL } from './TicTacToe';
const Td = memo(({ rowIndex, cellIndex, cellData, dispatch }) => {
  console.log('td rendered');

  const ref = useRef([]);
  useEffect(() => {
    console.log(
      rowIndex === ref.current[0],
      cellIndex === ref.current[1],
      dispatch === ref.current[2],
      cellData === ref.current[3]
    );
    console.log(cellData, ref.current[3]);
    ref.current = [rowIndex, cellIndex, dispatch, cellData];
  }, [rowIndex, cellIndex, dispatch, cellData]);
  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    if (cellData) {
      // 이미 클릭한 곳 클릭 못하게함
      return;
    }
    // state가 비동기적으로 변경됨
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
    // dispatch({ type: CHANGE_TURN });
  }, [cellData]);
  return <td onClick={onClickTd}>{cellData}</td>;
});

export default React.memo(Td);
