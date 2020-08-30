import React, { useState, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
// import useAsync from './useAsync';
import { useAsync } from 'react-async';

import User from './User';
import { getUsers, useUsersState, useUsersDispatch } from './UsersContext';
// async function getUsers() {
//   const response = await axios.get(
//     `https://jsonplaceholder.typicode.com/users`
//   );
//   return response.data;
// }

function Users({ id }) {
  // const { data: users, error, isLoading, run } = useAsync({
  //   deferFn: getUsers,
  // });
  // const [state, refetch] = useAsync(() => getUsers(id), [id]);
  const [userId, setUserId] = useState('');

  const {
    users: { loading: isLoading, data: users, error },
  } = useUsersState();
  const dispatch = useUsersDispatch();
  // const { loading, error, data: users } = state;

  if (isLoading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users)
    return <button onClick={() => getUsers(dispatch)}>불러오기</button>;
  return (
    <>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => setUserId(user.id)}
            style={{ cursor: 'pointer' }}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      fetchUsers{' '}
      <button onClick={() => getUsers(dispatch)}>다시 불러오기</button>
      {userId && <User id={userId}></User>}
    </>
  );
}

export default Users;