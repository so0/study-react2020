import React, { useState } from 'react';
import Try from './Try';

function getNumbers() {
  // 숫자 네개를 겹치지 않고 랜덤하게 뽑는 함수.
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const choosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(choosen);
  }
  return array;
}
const NumberBaseball = () => {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);

  console.log('tries', tries);
  const onChangeInput = e => {
    setValue(e.target.value);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    if (value === answer.join('')) {
      setResult('홈런');
      setTries(prevTries => {
        return [...prevTries, { try: value, result: '홈런!' }];
      });
      alert('게임을 다시 시작합니다!');
      setValue('');
      setAnswer(getNumbers());
      setTries([]);
    } else {
      // 틀렸을 때
      console.log('tries', tries);
      const answerArray = value.split('').map(v => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        setResult(`10번 넘게 틀려서 실패 답은 ${answer.join(',')} 입니다.`);

        alert('게임을 다시 시작합니다!');
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        setTries(prevTries => {
          return [...prevTries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.` }];
        });
      }
    }
  };

  return (
    <div>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input maxLength={4} value={value} onChange={onChangeInput}></input>
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((v, i) => {
          return <Try key={`${i + 1}차 시도 : `} tryInfo={v} />;
        })}
      </ul>
    </div>
  );
};

// export const hello = 'hello'; // import { hello } 이런식으로 가져옴, 여러 번 쓸 수 있다.
// export const bye = 'bye'; // import { hello, bye }
export default NumberBaseball; // default 로 export 한거는 import NumberBaseball , default 는 한번만 써야함

// node 에서는 require 을 씀
// const React = require('react');
// exports.hello = 'hello'
// module.exports = NumberBaseball;
