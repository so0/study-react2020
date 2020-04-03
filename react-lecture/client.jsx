import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
// const React = require('react');
// const ReactDOM = require('react-dom');
// const { hot } = require('react-hot-loader/root');

import TicTacToe from './TicTacToe';
import Lotto from './Lotto';
import RSP from './RSP';
import ResponseCheck from './ResponseCheck';
import WordRelay from './WordRelay';
import NumberBaseball from './NumberBaseball';
import RenderTest from './RenderTest';
const Hot = hot(TicTacToe);
// const Hot = hot(Lotto);
// const WordRelay = require('./WordRelay');
// const Hot = hot(ResponseCheck);
// const Hot = hot(NumberBaseball);
// const Hot = hot(RenderTest); // PureComponent
ReactDOM.render(<Hot />, document.querySelector('#root'));
