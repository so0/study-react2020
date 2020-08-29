import React, { useState, useRef } from 'react';

function InputSample() {
  const [inputs, setInputs] = useState({ name: '', nickname: '' });
  const { name, nickname } = inputs;
  const nameInput = useRef();
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onReset = (e) => {
    setInputs({
      name: '',
      nickname: '',
    });
    nameInput.current.focus();
  };

  return (
    <div>
      <input
        placeholder="이름"
        name="name"
        value={name}
        onChange={onChange}
        ref={nameInput}
      />
      <input
        placeholder="닉네임"
        name="nickname"
        value={nickname}
        onChange={onChange}
      />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  );
}

export default InputSample;
