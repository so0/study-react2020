const React = require('react');
const { useState, useRef } = React;

const GuGuDan = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const onChangeInput = e => {
    setValue(e.target.value);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    if (parseInt(value) === first * second) {
      // 함수형
      setResult(prevResult => {
        return '정답' + value;
      });
      // setResult('정답' + value);
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue('');
      inputRef.current.focus();
    } else {
      setResult('땡');
      setValue('');
      inputRef.current.focus();
    }
  };
  console.log('렌더링');
  return (
    <>
      <div>
        {first} 곱하기 {second} 는 ?
      </div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputRef} type="number" value={value} onChange={onChangeInput} />
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = GuGuDan;
