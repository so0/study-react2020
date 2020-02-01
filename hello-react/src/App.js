import React, { Fragment } from 'react';
import './App.css';
function App() {
  const name = '리액트';
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: '48px',
    fontWeight: 'bold',
    padding: 16
  };
  return (
    <Fragment>
      <h1> 리액트 안녕</h1>
      <h2>잘 작동하니?</h2>
      {/* 조건부 렌더링 */}
      <div>
        {name === '리액트' ? (
          <h1>리액트입니다.</h1>
        ) : (
          <h1>리액트가 아닙니다.</h1>
        )}
      </div>

      <div> {name === '리액트' ? <h1>리액트</h1> : null}</div>
      <div style={style}>{name}</div>
      <div className="react">{name}</div>
    </Fragment>
  );
}

export default App;
