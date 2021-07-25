import './App.css';
import NavbarMenu from './Components/Navbar/NavbarMenu';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route} from 'react-router-dom';
import Add from './Components/Add/Add';
import Todo from './Components/Todo/Todo';
import SingleAutopart from './Components/SingleAutopart/SingleAutopart';

function App() {
  return (
    <div className="App">
      <NavbarMenu />
      <Route 
        path='/'
        component={Todo}
        exact={true}
      />
      <Route 
        path='/autopart/:id'
        component={SingleAutopart}
        exact={true}
      />
      <Route 
        component={Add}
        path='/add'
        exact={true}
      />
    </div>
  );
}

export default App;
