import React from 'react';
import {Router, Switch} from 'react-router-dom';
import './App.scss';
import {browserHistory} from './helpers';
import AppLayout from "./containers/AppLayout";
import DirectRoute from "./routes/DirectRoute";


function App() {
  return (
    <Router history={browserHistory}>
      <Switch>
        {/*<Route exact path="/403" component={Page403} />*/}
        {/*<Route exact path="/404" component={Page404} />*/}
        {/*<Route exact path="/500" component={Page500} />*/}
        <DirectRoute path="/" name={('Home')} component={AppLayout}/>
      </Switch>
    </Router>
  );
}

export default App;
