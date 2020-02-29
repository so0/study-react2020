import React, { Component } from 'react';

class NumberBaseball extends Component {}

export const hello = 'hello'; // import { hello } 이런식으로 가져옴, 여러 번 쓸 수 있다.
export const bye = 'bye'; // import { hello, bye }
export default NumberBaseball; // default 로 export 한거는 import NumberBaseball , default 는 한번만 써야함

// node 에서는 require 을 씀
// const React = require('react');
// exports.hello = 'hello'
// module.exports = NumberBaseball;
