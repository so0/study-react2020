// import React, { Component } from 'react';
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import Ball from './Ball';

function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.splice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  console.log('Lotto');
  // 함수 컴포넌트는 전체가 재 실행됨
  const [winBalls, setWinBalls] = useState([]);
  const lottoNumbers = useMemo(() => getWinNumbers(), []); // 함수 결과값 기억, 두번째 인자값의 요소가 바뀔 때 호출됨
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]); // 일반 값 기억

  // useEffect(() => {
  //   runTimeouts();
  // }, []); // 빈 배열이면 componentDidMount

  // useEffect 를 componentDidUpdate처럼 쓰는 패턴
  // const mounted = useRef(false);
  // useEffect(() => {
  //   if (!mounted.current) {
  //     mounted.current = true;
  //   } else {
  //     // ajax
  //   }
  // }, [바뀌는 값]); // componentDidMount X,  componentDidUpdate O

  useEffect(() => {
    console.log('useEffect');
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls(prevBalls => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }

    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
    return () => {
      // componentWillUnmount
      timeouts.current.forEach(v => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]); // 배열에 요소가 있으면 componentDidMount, componentDidUpdate 둘 다 수행
  const onClickRedo = useCallback(() => {
    // useCallback 함수 생성 비용이 클때 함수 자체를 기억해둠
    console.log('onClickRedo');
    console.log('winNumbers', winNumbers);
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]); // 두번째 인자가 바뀌면 새로 실행
  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map(v => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
      {/* 자식 컴포넌트에 props 로 함수를 넘길 때는 useCallback 사용하기.  새로운 함수 매번 생성되기 때문에 */}
    </>
  );
};

// class Lotto extends Component {
//   state = {
//     winNumbers: getWinNumbers(), // 당첨 숫자들
//     winBalls: [],
//     bonus: null, // 보너스 공
//     redo: false,
//   };
//   timeouts = [];
//   onClickRedo = () => {
//     console.log('onClickRedo');
//     this.setState({
//       winNumbers: getWinNumbers(),
//       winBalls: [],
//       bonus: null,
//       redo: false,
//     });
//     this.timeouts = [];
//   };
//   runTimeouts = () => {
//     console.log('runTimeouts');
//     const { winNumbers } = this.state;
//     for (let i = 0; i < winNumbers.length - 1; i++) {
//       this.timeouts[i] = setTimeout(() => {
//         this.setState(prevState => {
//           return {
//             winBalls: [...prevState.winBalls, winNumbers[i]],
//           };
//         });
//       }, (i + 1) * 1000);
//     }

//     this.timeouts[6] = setTimeout(() => {
//       this.setState({
//         bonus: winNumbers[6],
//         redo: true,
//       });
//     }, 7000);
//   };
//   componentDidMount() {
//     console.log('componentDidMount');
//     this.runTimeouts();
//   }
//   componentDidUpdate(prevProps, prevState) {
//     console.log('componentDidUpdate');
//     if (this.state.winBalls.length === 0) {
//       this.runTimeouts();
//     }
//   }
//   componentWillUnmount() {
//     this.timeouts.forEach(v => clearTimeout(v));
//   }
//   render() {
//     const { winBalls, bonus, redo } = this.state;
//     return (
//       <>
//         <div>당첨 숫자</div>
//         <div id="결과창">
//           {winBalls.map(v => (
//             <Ball key={v} number={v} />
//           ))}
//         </div>
//         <div>보너스!</div>
//         {bonus && <Ball number={bonus} />}
//         {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
//       </>
//     );
//   }
// }

export default Lotto;
