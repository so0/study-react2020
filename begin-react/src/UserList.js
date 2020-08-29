import React, { useEffect, useContext } from 'react';
import { UserDispatch } from './App';

const User = React.memo(function User({ user, onRemove, onToggle }) {
  const dispatch = useContext(UserDispatch);
  // useEffect(() => {
  //   console.log('컴포넌트가 화면에 나타남 - 마운트');
  //   // componentDidmount
  //   // props 로 받은 값을 컴포넌트의 로컬 상태로 설정
  //   // 외부 API 요청 (REST API 등)
  //   // 라이브러리 사용 (D3, Video.js 등...)
  //   // setInterval 을 통한 반복작업 혹은 setTimeout 을 통한 작업 예약
  //   return () => {
  //     console.log('컴포넌트가 화면에서 사라짐 - 언마운트');
  //     // componentWillUnmount
  //     // setInterval, setTimeout 을 사용하여 등록한 작업들 clear 하기 (clearInterval, clearTimeout)
  //     // 라이브러리 인스턴스 제거
  //   };
  // }, []);
  // useEffect(() => {
  //   console.log('리렌더링될때마다 실행', user);
  // });

  // useEffect(() => {
  //   // componentDidUpdate
  //   console.log('user 값이 설정됨');
  //   console.log(user);
  //   return () => {
  //     console.log('user 가 바뀌기 전..');
  //     console.log(user);
  //   };
  // }, [user]); // deps 에 특정 값 (ex user)을 넣게 된다면, 컴포넌트가 처음 마운트 될 때에도 호출이 되고, 지정한 값이 바뀔 때에도 호출이 됩니다. 그리고, deps 안에 특정 값이 있다면 언마운트시에도 호출이되고, 값이 바뀌기 직전에도 호출이 됩니다.
  return (
    <div>
      <b
        onClick={() => dispatch({ type: 'TOGGLE_USER', id: user.id })}
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black',
        }}>
        {user.username}
      </b>{' '}
      <span>({user.email})</span>
      <button onClick={() => dispatch({ type: 'REMOVE_USER', id: user.id })}>
        삭제
      </button>
    </div>
  );
});

function UserList({ users }) {
  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
}

export default React.memo(UserList);
