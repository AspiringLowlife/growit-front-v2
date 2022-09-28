import './App.css';
import './custom.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import { Provider } from 'react-redux';
import store from './store';
import AppNavBar from './Navigation/AppNavBar';
import ProductDetails from './Pages/ProductDetails';

function App() {

  return (
    <div className='App'>
      <Provider store={store}>
      <NotificationContainer />
        <BrowserRouter>          
          {/* <Navbar /> */}
          <AppNavBar />
          {/* Added A little Navbar for you with working hamburger bar and did some condtional rendering for login button and profile page */}
          <Routes>
            <Route path='/' element={< Home />}/>
            <Route exact path='Login' element={< Login />} />
            <Route exact path='Support' element={<Support />} />
            <Route exact path='Register' element={<Register />} />
            <Route exact path='MaintainCart' element={<MaintainCart />} />
            <Route exact path='MaintainProfile/:id' element={<MaintainProfile />} />
            <Route exact path='MaintainWishlist/:id' element={<MaintainWishlist />} />
            <Route exact path='Products' element={<Products />}/>
            <Route path='Products/:id' element={<ProductDetails />} />
            <Route path='*' element={<></>}/>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  )
}
export default App;
