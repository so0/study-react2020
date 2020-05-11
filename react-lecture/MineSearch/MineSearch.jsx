import React, { useReducer, createContext, useMemo } from 'react';
import Table from './Table';
import Form from './Form';

export const CODE = {
  MINE: -7, // 지뢰
  NORMAL: -1, // 정상
  /// 클릭
  QUESTION: -2, // 물음표
  FLAG: -3, // 깃발
  QUESTION_MINE: -4, // 물음표 + 지뢰
  FLAG_MINE: -5, // 깃발 + 지뢰
  CLICKED_MINE: -6, // 지뢰 클릭
  OPENED: 0, // 0 이상이면 opend (성공적으로 연거, 주변 지뢰 정보 )
};

const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);
  const candidate = Array(row * cell)
    .fill()
    .map((arr, i) => {
      return i;
    });
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0];
    shuffle.push(chosen);
  }
  console.log('shuffle', shuffle);
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }
  console.log('data', data);
  return data;
};
export const TableContext = createContext({
  // -1 -7
  tableData: [[], [], [], []],
  dispatch: () => {},
  halted: true,
});

const initialState = {
  tableData: [],
  timer: 0,
  result: '',
  halted: false,
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false,
      };
    case OPEN_CELL: {
      const tableData = [...state.tableData];
      tableData.forEach((row, i) => {
        tableData[i] = [...state.tableData[i]];
      });
      const checked = [];
      const checkAround = (row, cell) => {
        if (
          [
            CODE.OPENED,
            CODE.FLAG_MINE,
            CODE.FLAG_MINE,
            CODE.QUESTION_MINE,
            CODE.QUESTION,
          ].includes(tableData[(row, cell)])
        ) {
          // 닫힌 칸만 열기
          return;
        }
        if (
          row < 0 ||
          row > tableData.length ||
          cell < 0 ||
          cell >= tableData[0].length
        ) {
          // 상하좌우 칸이 아닌경우 필터링
          return;
        }
        if (checked.includes(row + ',' + cell)) {
          return;
        } else {
          checked.push(row + ',' + cell);
        }
        let around = [];
        if (tableData[row - 1]) {
          around.push(
            tableData[row - 1][cell - 1],
            tableData[row - 1][cell],
            tableData[row - 1][cell + 1]
          );
        }
        around.push(
          tableData[row][cell - 1],
          tableData[row][cell],
          tableData[row][cell + 1]
        );
        if (tableData[row + 1]) {
          around.push(
            tableData[row + 1][cell - 1],
            tableData[row + 1][cell],
            tableData[row + 1][cell + 1]
          );
        }
        const count = around.filter((v) =>
          [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)
        ).length;
        console.log('count', count);
        tableData[row][cell] = count;
        if (count === 0) {
          // 주변칸 오픈
          const near = [];
          if (row > 0) {
            near.push([row - 1, cell - 1]);
            near.push([row - 1, cell]);
            near.push([row - 1, cell + 1]);
          }
          near.push([row, cell - 1]);
          near.push([row, cell + 1]);
          if (row + 1 > tableData.length) {
            near.push([row + 1, cell - 1]);
            near.push([row + 1, cell]);
            near.push([row + 1, cell + 1]);
          }
          near
            .filter((v) => !!v)
            .forEach((n) => {
              if (tableData[n[0]][n[1]] !== CODE.OPENED) {
                // 주변칸 열기
                checkAround(n[0], n[1]);
              }
            });
        }
      };
      checkAround(action.row, action.cell);
      // tableData[action.row] = [...state.tableData[action.row]];
      // tableData[action.row][action.cell] = CODE.OPENED;

      return {
        ...state,
        tableData,
      };
    }
    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        halted: true,
      };
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
      };
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      };
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
        tableData[action.row][action.cell] = CODE.MINE;
      } else {
        tableData[action.row][action.cell] = CODE.NORMAL;
      }
      return {
        ...state,
        tableData,
      };
    }
    default:
      return state;
  }
};
const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, halted, timer, result } = state;
  // 매번 새로운 객체가 생기지 않게 useMemo 로  value 객체 기억함
  const value = useMemo(() => {
    return {
      tableData: tableData,
      dispatch, // dispatch 는 바뀌지 않음
      halted: halted,
    };
  }, [tableData, halted]);
  return (
    <TableContext.Provider value={value}>
      <Form dispatch={dispatch} />
      <div>{timer}</div>
      <Table></Table>
      <div>{result}</div>
    </TableContext.Provider>
  );
};

export default MineSearch;