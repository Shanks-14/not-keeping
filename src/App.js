import './App.css';
import SignUp from './components/signup';
import Login from './components/login';
import Notes from './components/notes';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Dashboard from './components/dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard}></Route>
          <Route exact path="/signup" component={SignUp}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/notes" component={Notes}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
