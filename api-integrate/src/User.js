import React, { useState, useEffect, useReducer } from 'react';
// import useAsync from './useAsync';
// import { useAsync } from 'react-async';
import { getUser, useUsersState, useUsersDispatch } from './UsersContext';
import axios from 'axios';

// async function getUser({ id }) {
//   const response = await axios.get(
//     `https://jsonplaceholder.typicode.com/users/${id}`
//   );
//   return response.data;
// }

function User({ id }) {
  // const { data: user, error, isLoading } = useAsync({
  //   promiseFn: getUser,
  //   id,
  //   watch: id,
  // });
  // const [state] = useAsync(() => getUser(id), [id]);
  // const { loading, data: user, error } = state;
  const dispatch = useUsersDispatch();
  const {
    user: { loading: isLoading, data: user, error },
  } = useUsersState();
  useEffect(() => {
    getUser(dispatch, id);
  }, [dispatch, id]);

  if (isLoading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!user) return null;

  return (
    <div>
      <h2>{user.username}</h2>
      <p>
        <b>Email:</b>
        {user.email}
      </p>
    </div>
  );
}

export default User;
