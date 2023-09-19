// App.js
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import BlockDetail from './BlockDetail';
import Saldo from './Saldo';

function App() {
  return (
    <Router>
      <div className="App container mt-5" style={{ maxWidth: '70%', marginLeft: '15%', marginRight: '15%' }}>
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <Link to="/blockdetail" className="nav-link">BlockDetail</Link>
            </li>
            <li className="nav-item">
              <Link to="/saldo" className="nav-link">Saldo</Link>
            </li>
          </ul>
        </nav>
        
        <Switch>
          <Route path="/blockdetail">
            <BlockDetail />
          </Route>
          <Route path="/saldo">
            <Saldo />
          </Route>
          <Route path="/">
            <div>Seleccione uno de los dos items</div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
