import './App.css';
import './custom.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navigation/Navbar';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Support from './Pages/Support';
import Register from './Pages/Register';
import MaintainCart from './Pages/MaintainCart';
import MaintainProfile from './Pages/MaintainProfile';
import MaintainWishlist from './Pages/MaintainWishlist';
import NotificationContainer from './Notifications/NotificationsContainer';
import Products from './Pages/Products';

function App() {

  //const CartContext = useContext([]);

  return (
    <div className='App'>
      <NotificationContainer />
      <Navbar />
      <Routes>
        <Route exact path='/' element={< Home />}></Route>
        <Route exact path='/Login' element={< Login />}></Route>
        <Route exact path='/Support' element={<Support />}></Route>
        <Route exact path='/Register' element={<Register />}></Route>
        <Route exact path='/MaintainCart' element={<MaintainCart />}></Route>
        <Route exact path='/MaintainProfile' element={<MaintainProfile />}></Route>
        <Route exact path='/MaintainWishlist' element={<MaintainWishlist />}></Route>
        <Route exact path='/Products' element={<Products />}></Route>
      </Routes>
    </div>
  )
}
export default App;
