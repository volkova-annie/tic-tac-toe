import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Container} from './components';

let target = document.getElementById('app');
ReactDOM.render(<Container/>, target);
