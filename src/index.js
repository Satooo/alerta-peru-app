import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './components/screens/home/HomePage';
import SimpleMap from './components/screens/home/HomePage';
import HomePage from './components/screens/home/HomePage';
import { createPopper } from '@popperjs/core';
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.css";
import 'animate.css';
import Base from './components/Base';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import "react-datepicker/dist/react-datepicker.css";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Base/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
