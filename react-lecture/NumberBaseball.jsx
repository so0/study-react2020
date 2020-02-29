import React, { Component } from 'react';
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
class NumberBaseball extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(), //ex [1,3,5,7]
    tries: []
  };

  onChangeInput = e => {
    this.setState({
      value: e.target.value
    });
  };
  onSubmitForm = e => {
    console.log('onSubmitForm');
    e.preventDefault();
    if (this.state.value === this.state.answer.join('')) {
      this.setState(prevState => {
        return {
          results: '홈런!',
          tries: [...prevState.tries, { try: prevState.value, result: '홈런!' }]
        };
      });
      alert('게임을 다시 시작합니다!');
      this.setState({
        value: '',
        answer: getNumbers(),
        tries: []
      });
    } else {
      // 틀렸을 때
      const answerArray = this.state.value.split('').map(v => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (this.state.tries.length >= 9) {
        this.setState({
          result: `10번 넘게 틀려서 실패 답은 ${this.state.answer.join(',')} 입니다.`
        });
        alert('게임을 다시 시작합니다!');
        this.setState({
          value: '',
          answer: getNumbers(),
          tries: []
        });
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === this.state.answer[i]) {
            strike += 1;
          } else if (this.state.answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState(prevState => {
          return {
            tries: [...prevState.tries, { try: prevState.value, result: `${strike} 스트라이크, ${ball} 볼입니다.` }]
          };
        });
      }
    }
  };
  render() {
    console.log(this.state.fruits);
    return (
      <div>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}></input>
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          {this.state.tries.map((v, i) => {
            return <Try key={`${i + 1}차 시도 : `} tryInfo={v} />;
          })}
        </ul>
      </div>
    );
  }
}

// export const hello = 'hello'; // import { hello } 이런식으로 가져옴, 여러 번 쓸 수 있다.
// export const bye = 'bye'; // import { hello, bye }
export default NumberBaseball; // default 로 export 한거는 import NumberBaseball , default 는 한번만 써야함

// node 에서는 require 을 씀
// const React = require('react');
// exports.hello = 'hello'
// module.exports = NumberBaseball;
