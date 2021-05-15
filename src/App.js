import Dashboard from './components/Dashboard';
import { BrowserRouter,Route,Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Edit from './components/Edit';
import Add from './components/Add';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route  path='/'  exact component={Dashboard} />          
          <Route  path='/edit/:id'  exact component={Edit} />
          <Route  path='/add'  exact component={Add} />       
        </Switch>      
      </BrowserRouter>

    </div>
  );
}

export default App;
