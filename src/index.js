import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter} from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

import AuthContainer from './container/AuthContainer';

import './fonts/Rubik-Medium.ttf';
import './fonts/Rubik-Regular.ttf'
import './fonts/Rubik-Bold.ttf';
import './fonts/Rubik-Black.ttf';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Rubik, sans-serif'
  },
})

const app = (
  <BrowserRouter>
    <CssBaseline>
      <MuiThemeProvider theme={theme}>
        <AuthContainer.Provider>
          <App />
        </AuthContainer.Provider>
      </MuiThemeProvider>
    </CssBaseline>
  </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
