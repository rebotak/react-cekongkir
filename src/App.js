import React from 'react';
import './assets/scss/main.css';
// import People from './containers/People';
import CekOngkir from './containers/CekOngkir';
import {BrowserRouter as Router, Route} from 'react-router-dom';

const App = () => (
      <div className="App">
        <Router basename={process.env.PUBLIC_URL}>
          <Route path="/" component={CekOngkir}/>
        </Router>
      </div>
    )
export default App;
