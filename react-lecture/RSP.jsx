import React, { useState, useRef, useEffect, memo } from 'react';

// 클래스 컴포넌트 : constructor -> render -> ref -> componentDidMount
//  setState / props 변경 시 -> shouldComponentUpdate -> render -> componentDidUpdate
// 부모가 없앴을 때 -> componentWillUnmount -> 소멸

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px',
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = imgCoord => {
  return Object.entries(rspCoords).find(function(v) {
    return v[1] === imgCoord;
  })[0];
};

/*
                      result,      imgCoord,    score
componentDidMount 
componentDidUpdate
componentWillUnmount
                      useEffect   useEffect    useEffect
-----------------------------------------------------------------
클래스형 컴포넌트 : 가로
componentDidMount() {
  this.setState({
    imgCoord,
    score,
    result
  })
}

Hooks : 세로 
useEffect(() => {
  setImgCoord();
  setScore();
}, [imgCoord, score]);

useEffect(() => {
  setResult();
}, [result]);

*/
const RSP = () => {
  const [result, setResult] = useState('');
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const [score, setScore] = useState(0);
  const interval = useRef();

  // componentDidMount, componentDidUpdate 와 비슷한 역할 (1대1 대응은 아님)
  useEffect(() => {
    console.log('다시 실행');
    interval.current = setInterval(changeHand, 100);
    return () => {
      console.log('종료');
      // componentWillUnmount 역할
      clearInterval(interval.current);
    };
  }, [imgCoord]); // imgCoord 가 바뀔 때 마다 실행됨 - componentDidUpdate /  [] 빈 배열일 땐 componentDidMount 처럼 실행

  const changeHand = () => {
    if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    } else if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보);
    } else if (imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.바위);
    }
  };
  const onClickBtn = choice => () => {
    clearInterval(interval.current);
    const myScores = scores[choice];
    const cpuScores = scores[computerChoice(imgCoord)];
    const diff = myScores - cpuScores;
    if (diff === 0) {
      setResult('비겼습니다');
    } else if ([-1, 2].includes(diff)) {
      setResult('이겼습니다');
      setScore(prevState => prevState + 1);
    } else {
      setResult('졌습니다!');
      setScore(prevState => prevState - 1);
    }
    setTimeout(() => {
      interval.current = setInterval(changeHand, 100);
    }, 1000);
  };
  return (
    <>
      <div
        id="computer"
        style={{
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
        }}></div>
      <div>
        <button id="rock" className="btn" onClick={onClickBtn('바위')}>
          바위
        </button>
        <button id="scissor" className="btn" onClick={onClickBtn('가위')}>
          가위
        </button>
        <button id="paper" className="btn" onClick={onClickBtn('보')}>
          보
        </button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  );
};

export default RSP;
// class RSP extends Component {
//   state = {
//     result: '',
//     imgCoord: '0',
//     score: 0,
//   };
//   interval = null;
//   changeHand = () => {
//     const { imgCoord } = this.state;
//     if (imgCoord === rspCoords.바위) {
//       this.setState({
//         imgCoord: rspCoords.가위,
//       });
//     } else if (imgCoord === rspCoords.가위) {
//       this.setState({
//         imgCoord: rspCoords.보,
//       });
//     } else if (imgCoord === rspCoords.보) {
//       this.setState({
//         imgCoord: rspCoords.바위,
//       });
//     }
//   };
//   componentDidMount() {
//     // 컴포넌트가 처음 렌더링 된 후  , 여기에 비동기 요청을 많이 함
//     this.interval = setInterval(() => {
//       this.changeHand();
//     }, 100);
//   }

//   componentDidUpdate() {
//     // 리렌더링
//   }

//   componentWillMount() {
//     // 컴포넌트가 제거되기 직전  , 비동기 요청 정리
//     clearInterval(this.interval);
//   }

//   onClickBtn = choice => () => {
//     const { imgCoord } = this.state;
//     clearInterval(this.interval);
//     const myScores = scores[choice];
//     const cpuScores = scores[computerChoice(imgCoord)];
//     const diff = myScores - cpuScores;
//     if (diff === 0) {
//       this.setState({
//         result: '비겼습니다',
//       });
//     } else if ([-1, 2].includes(diff)) {
//       this.setState(prevState => {
//         return {
//           result: '이겼습니다!',
//           score: prevState.score + 1,
//         };
//       });
//     } else {
//       this.setState(prevState => {
//         return {
//           result: '졌습니다!',
//           score: prevState.score - 1,
//         };
//       });
//     }
//     setTimeout(() => {
//       this.interval = setInterval(this.changeHand, 100);
//     }, 1000);
//   };
//   render() {
//     const { result, score, imgCoord } = this.state;
//     return (
//       <>
//         <div
//           id="computer"
//           style={{
//             background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
//           }}></div>
//         <div>
//           <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>
//             바위
//           </button>
//           <button
//             id="scissor"
//             className="btn"
//             onClick={this.onClickBtn('가위')}>
//             가위
//           </button>
//           <button id="paper" className="btn" onClick={this.onClickBtn('보')}>
//             보
//           </button>
//         </div>
//         <div>{result}</div>
//         <div>현재 {score}점</div>
//       </>
//     );
//   }
// }

// export default RSP;
