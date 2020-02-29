const React = require('react');
const { Component } = React;
const { useState, useRef } = React;

const WordRelay = () => {
  const [word, setWord] = useState('끝말잇기');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const onSubmitForm = e => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setResult('딩동댕');
      setWord(value);
      setValue('');
    } else {
      setResult('땡');
      setValue('');
    }
    inputRef.current.focus();
  };
  const onChangeInput = e => {
    setValue(e.target.value);
  };
  const onRefInput = c => {
    this.input = c;
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <label htmlFor="wordInput">글자를 입력하세요.</label>
        <input className="클래스입니다" ref={inputRef} value={value} onChange={onChangeInput} />
        <button>클릭 !!</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = WordRelay;

// class WordRelay extends Component {
//   state = {
//     word: '끝말잇기',
//     value: '',
//     result: ''
//   };
//   onSubmitForm = e => {
//     e.preventDefault();
//     if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
//       this.setState({
//         result: '딩동댕',
//         word: this.state.value,
//         value: ''
//       });
//     } else {
//       this.setState({
//         result: '땡',
//         value: ''
//       });
//     }
//     this.input.focus();
//   };
//   onChangeInput = e => {
//     this.setState({
//       value: e.target.value
//     });
//   };
//   onRefInput = c => {
//     this.input = c;
//   };
//   render() {
//     return (
//       <>
//         <div>{this.state.word}</div>
//         <form onSubmit={this.onSubmitForm}>
//           <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
//           <button>클릭 !!</button>
//         </form>
//         <div>{this.state.result}</div>
//       </>
//     );
//   }
// }
