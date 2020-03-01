import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
// const React = require('react');
// const ReactDOM = require('react-dom');
// const { hot } = require('react-hot-loader/root');

import WordRelay from './WordRelay';
import NumberBaseball from './NumberBaseball';
import RenderTest from './RenderTest';
// const WordRelay = require('./WordRelay');
const Hot = hot(NumberBaseball);
// const Hot = hot(RenderTest); // PureComponent
ReactDOM.render(<Hot />, document.querySelector('#root'));
