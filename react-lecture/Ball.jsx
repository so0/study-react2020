// import React, { PureComponent } from 'react';

// class Ball extends PureComponent {
//   render() {
//     const { number } = this.props;
//     let background;
//     if (number <= 10) {
//       background = 'red';
//     } else if (number <= 20) {
//       background = 'orange';
//     } else if (number <= 30) {
//       background = 'yello';
//     } else if (number <= 40) {
//       background = 'blue';
//     } else {
//       background = 'green';
//     }
//     return (
//       <div className="ball" style={{ background }}>
//         {number}
//       </div>
//     );
//   }
// }

// export default Ball;

import React, { memo } from 'react';
// memo 를 넣으면 pure component 역할을 함

const Ball = memo(({ number }) => {
  let background;
  if (number <= 10) {
    background = 'red';
  } else if (number <= 20) {
    background = 'orange';
  } else if (number <= 30) {
    background = 'yellow';
  } else if (number <= 40) {
    background = 'blue';
  } else {
    background = 'green';
  }
  return (
    <div className="ball" style={{ background }}>
      {number}
    </div>
  );
});

export default Ball;
