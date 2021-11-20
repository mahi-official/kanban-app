import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from './screens/Homepage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Page404 from './screens/Page404';
import { Provider } from 'react-redux';
import { store } from './app/store';
import BoardDialog from './features/boards/BoardDialog';
import BoardsList from './features/boards/Boards';


export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/store/home" component={BoardsList} />
        <Route exact path="/store/addBoard" component={BoardDialog} />
        <Route component={Page404} />
      </Switch>
    </BrowserRouter>
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
