import React, { useCallback } from 'react';
import { CLICK_CELL } from './TicTacToe';
const Td = ({ rowIndex, cellIndex, cellData, dispatch }) => {
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
};

export default Td;
