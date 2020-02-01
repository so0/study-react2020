import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      fixedNumber: 0
    };
  }
  render() {
    const { number, fixedNumber } = this.state;
    return (
      <div>
        <h1>{number}</h1>
        <h2>바뀌지 않는 값: {fixedNumber}</h2>
        <button
          onClick={() => {
            this.setState({ number: number + 1 });
            // 비동기적으로 업데이트됨
            this.setState({ number: this.state.number + 1 });
          }}
        >
          +1
        </button>
        <button
          onClick={() => {
            // 객체 대신 함수를 넣어줌
            this.setState(
              prevState => ({
                number: prevState.number + 1
              }),
              () => {
                console.log('방금 setState가 호출되었습니다.');
                console.log(this.state);
              }
            );
          }}
        >
          +1
        </button>
      </div>
    );
  }
}

export default Counter;
