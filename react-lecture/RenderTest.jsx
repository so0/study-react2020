import React, { PureComponent } from 'react';

class Test extends PureComponent {
  state = {
    counter: 0,
    string: 'hello',
    number: 1,
    boolean: true,
    object: {},
    array: []
  };
  // PureComponent : shouldComponentUpdate 를 알아서 구현한 컴포넌트 . 단점 : 객체나 배열 등은 판단이 어렵다.

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   if (this.state.counter !== nextState.counter) {
  //     return true;
  //   }
  //   return false;
  // }

  onClick = () => {
    // PureComponent 단점 : 객체나 배열 등은 판단이 어렵다. 불변성 유지해주어야함
    // const array = this.state.array;
    // array.push(5);
    // this.setState({
    //   array: array
    // });

    this.setState({
      array: [...this.state.array, 1]
    });
  };
  render() {
    console.log('렌더링', this.state);
    return (
      <div>
        <button onClick={this.onClick}>클릭</button>
      </div>
    );
  }
}

export default Test;
