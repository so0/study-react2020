import React, { useContext, useRef } from 'react';
import { UserDispatch, UserInputs } from './App';
import useInputs from './hooks/useInputs';

function CreateUser() {
  // console.log('create user');
  const dispatch = useContext(UserDispatch);
  const [{ username, email }, onChange, reset] = useInputs({
    username: '',
    email: '',
  });
  const nextId = useRef(4);
  const onCreate = () => {
    dispatch({
      type: 'CREATE_USER',
      user: { username, email, id: nextId.current, active: false },
    });
    nextId.current += 1;
    reset();
  };
  return (
    <div>
      <input
        name="username"
        placeholder="계정명"
        onChange={onChange}
        value={username}
      />
      <input
        name="email"
        placeholder="이메일"
        value={email}
        onChange={onChange}
      />
      <button onClick={onCreate}>등록</button>
    </div>
  );
}

export default React.memo(CreateUser);
