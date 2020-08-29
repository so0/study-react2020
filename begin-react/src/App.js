import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './hooks/useInputs';
import produce from 'immer';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  console.log(users);
  return users.filter((user) => user.active).length;
}
const initialState = {
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false,
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false,
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_USER':
      return produce(state, (draft) => {
        draft.users.push(action.user);
      });
    // return {
    //   users: state.users.concat(action.user),
    // };
    case 'TOGGLE_USER':
      return produce(state, (draft) => {
        const user = draft.users.find((user) => user.id === action.id);
        user.active = !user.active;
      });

    // return {
    //   users: state.users.map((user) =>
    //     user.id === action.id ? { ...user, active: !user.active } : user
    //   ),
    // };
    case 'REMOVE_USER':
      return produce(state, (draft) => {
        const idx = draft.users.findIndex((user) => user.id === action.id);
        draft.users.splice(idx, 1);
      });
    // return {
    //   users: state.users.filter((user) => user.id !== action.id),
    // };
    default:
      return state;
  }
}

export const UserDispatch = React.createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);
  console.log(state);
  const { users } = state;
  console.log(users);

  // const onCreate = useCallback(() => {
  //   dispatch({
  //     type: 'CREATE_USER',
  //     user: {
  //       id: nextId.current,
  //       username,
  //       email,
  //     },
  //   });
  //   reset();
  //   // nextId.current += 1;
  // }, [username, email, reset]);

  // const onToggle = useCallback((id) => {
  //   dispatch({
  //     type: 'TOGGLE_USER',
  //     id,
  //   });
  // }, []);

  // const onRemove = useCallback((id) => {
  //   dispatch({
  //     type: 'REMOVE_USER',
  //     id,
  //   });
  // }, []);

  // const count = useMemo(() => countActiveUsers(users), [users]);
  console.log('users', users);
  const count = countActiveUsers(users);
  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser
      // username={username}
      // email={email}
      // onChange={onChange}
      // onCreate={onCreate}
      />
      <UserList users={users} />
      <div>활성사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;

// import React, {
//   useRef,
//   useState,
//   useMemo,
//   useCallback,
//   useReducer,
// } from 'react';
// import UserList from './UserList';
// import CreateUser from './CreateUser';

// function countActiveUsers(users) {
//   console.log('활성 사용자 수를 세는중...');
//   return users.filter((user) => user.active).length;
// }

// const initialState = {
//   inputs: {
//     username: '',
//     email: '',
//   },
//   users: [
//     {
//       id: 1,
//       username: 'velopert',
//       email: 'public.velopert@gmail.com',
//       active: true,
//     },
//     {
//       id: 2,
//       username: 'tester',
//       email: 'tester@example.com',
//       active: false,
//     },
//     {
//       id: 3,
//       username: 'liz',
//       email: 'liz@example.com',
//       active: false,
//     },
//   ],
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case 'CHANGE_INPUT':
//       return {
//         ...state,
//         inputs: {
//           ...state.inputs,
//           [action.name]: action.value,
//         },
//       };
//     case 'CREATE_USER':
//       return {
//         users: state.users.concat(action.user),
//         inputs: initialState.inputs,
//       };
//     case 'TOGGLE_USER':
//       return {
//         ...state,
//         users: state.users.map((user) =>
//           user.id === action.id
//             ? {
//                 ...user,
//                 active: !user.active,
//               }
//             : user
//         ),
//       };
//     case 'REMOVE_USER':
//       return {
//         ...state,
//         users: state.users.filter((user) => user.id !== action.id),
//       };
//     default:
//       return state;
//   }
//   return state;
// }

// function App() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const nextId = useRef(4);
//   const { users } = state;
//   const { username, email } = state.inputs;
//   const onChange = useCallback((e) => {
//     dispatch({
//       type: 'CHANGE_INPUT',
//       name: e.target.name,
//       value: e.target.value,
//     });
//   });
//   const onCreate = useCallback(
//     (e) => {
//       dispatch({
//         type: 'CREATE_USER',
//         user: {
//           id: nextId.current,
//           username,
//           email,
//         },
//       });
//       nextId.current += 1;
//     },
//     [username, email]
//   );
//   const onToggle = useCallback((id) => {
//     dispatch({
//       type: 'TOGGLE_USER',
//       id,
//     });
//   }, []);
//   const onRemove = useCallback((id) => {
//     dispatch({
//       type: 'REMOVE_USER',
//       id,
//     });
//   }, []);
//   const count = useMemo(() => countActiveUsers(users), [users]);

//   return (
//     <>
//       <CreateUser
//         username={username}
//         email={email}
//         onChange={onChange}
//         onCreate={onCreate}
//       />
//       <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
//       <div>활성사용자 수 : {count}</div>
//     </>
//   );
// }
//
// export default App;

// import React, { useRef, useState, useMemo, useCallback } from 'react';
// import InputSample from './InputSample';
// import UserList from './UserList';
// import CreateUser from './CreateUser';

// function countActiveUsers(users) {
//   console.log('활성 사용자 수를 세는중...');
//   return users.filter((user) => user.active).length;
// }

// function App() {
//   const [inputs, setInputs] = useState({
//     username: '',
//     email: '',
//   });
//   const { username, email } = inputs;
//   const onChange = useCallback(
//     (e) => {
//       const { name, value } = e.target;
//       setInputs({
//         ...inputs,
//         [name]: value,
//       });
//     },
//     [inputs]
//   );

//   const [users, setUsers] = useState([
//     {
//       id: 1,
//       username: 'velopert',
//       email: 'public.velopert@gmail.com',
//       active: true,
//     },
//     {
//       id: 2,
//       username: 'tester',
//       email: 'tester@example.com',
//       active: false,
//     },
//     {
//       id: 3,
//       username: 'liz',
//       email: 'liz@example.com',
//       active: false,
//     },
//   ]);

//   const nextId = useRef(4);
//   const onCreate = useCallback(() => {
//     const { username, email } = inputs;
//     // setUsers([...users, { id: nextId.current, username, email }]);
//     setUsers((users) => [...users, { id: nextId.current, username, email }]);
//     nextId.current += 1;
//     setInputs({
//       username: '',
//       email: '',
//       active: false,
//     });
//   }, [username, email]);
//   // const onRemove = useCallback(
//   //   (id) => {
//   //     setUsers(users.filter((user) => user.id !== id));
//   //   },
//   //   [users]
//   // );
//   const onRemove = useCallback((id) => {
//     setUsers((users) => users.filter((user) => user.id !== id));
//   }, []);
//   // const onToggle = useCallback(
//   //   (id) => {
//   //     setUsers(
//   //       users.map((user) =>
//   //         user.id === id
//   //           ? {
//   //               ...user,
//   //               active: !user.active,
//   //             }
//   //           : user
//   //       )
//   //     );
//   //   },
//   //   [users]
//   // );

//   const onToggle = useCallback((id) => {
//     // 함수형 업데이트
//     setUsers((users) =>
//       users.map((user) =>
//         user.id === id
//           ? {
//               ...user,
//               active: !user.active,
//             }
//           : user
//       )
//     );
//   }, []);
//   const count = useMemo(() => countActiveUsers(users), [users]);
//   //  useMemo 의 첫번째 파라미터에는 어떻게 연산할지 정의하는 함수를 넣어주면 되고 두번째 파라미터에는 deps 배열을 넣어주면 되는데, 이 배열 안에 넣은 내용이 바뀌면, 우리가 등록한 함수를 호출해서 값을 연산해주고, 만약에 내용이 바뀌지 않았다면 이전에 연산한 값을 재사용하게 됩니다.
//   return (
//     <>
//       <CreateUser
//         onCreate={onCreate}
//         username={username}
//         email={email}
//         onChange={onChange}
//       />
//       <UserList users={users} onRemove={onRemove} onToggle={onToggle} />;
//       <div>활성 사용자 수 : {count}</div>
//     </>
//   );
// }

// export default App;
