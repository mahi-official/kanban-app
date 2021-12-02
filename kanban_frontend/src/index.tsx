import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Page404 from './screens/Page404';
import { Provider } from 'react-redux';
import { store } from './app/store';
import HomePage from './screens/Home';
import { ThemeProvider, useTheme } from '@mui/material';

export default function App() {
  const theme = useTheme()
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route component={Page404} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  )
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
