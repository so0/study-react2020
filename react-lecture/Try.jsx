import React, { PureComponent, memo, useState } from 'react';

// class Try extends PureComponent {
//   // 부모로 부터 받은 props 는 변경하면 안됨.  props로 state 로 만들어서 state를 바꾸어야함.
//   constructor(props) {
//     super(props);
//     const filtered = this.props.filter(() => {});
//     this.state = {
//       result: filtered,
//       try: this.props.try
//     };
//   }
//   render() {
//     const { tryInfo } = this.props;
//     return (
//       <li>
//         <div>{tryInfo.try}</div>
//         <div>{tryInfo.result}</div>
//       </li>
//     );
//   }
// }

// React.memo 적용
const Try = memo(({ tryInfo }) => {
  // 부모로 부터 받은 props 는 변경하면 안됨.  props로 state 로 만들어서 state를 바꾸어야함.
  const [result, setResult] = useState(tryInfo.result);
  const onClick = () => {
    setResult('1');
  };

  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
});

export default Try;
