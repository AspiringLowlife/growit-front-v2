import './App.css';
import './custom.css'
import "bootstrap/dist/css/bootstrap.min.css";
import {Route,Routes} from 'react-router-dom'; 
import Navbar from './Navigation/Navbar';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Support from './Pages/Support';
import Register from './Pages/Register';

function App() {    
  return (
      <div className='App'>
        <Navbar/>
        <Routes>
        <Route exact path='/' element={< Home />}></Route>
        <Route exact path='/Login' element={< Login />}></Route>     
        <Route exact path='/Support' element={<Support/>}></Route>
        <Route exact path='/Register' element={<Register/>}></Route>
      </Routes>
      </div>     
    )
}
export default App;
