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
import { useSelector } from 'react-redux';
import AppNavBar from './Navigation/AppNavBar';
import ProductDetails from './Pages/ProductDetails';

//Admin Imports
import Topbar from './ADMIN/components/topbar/Topbar';
import Sidebar from './ADMIN/components/sidebar/Sidebar';
import AdminHome from './ADMIN/Pages/AdminHome/AdminHome';
import Orders from './ADMIN/Pages/Orders/Orders';
import ManageProducts from './ADMIN/Pages/ManageProducts/ManageProducts';
import ManageUsers from './ADMIN/Pages/ManageUsers/ManageUsers';
import './ADMIN/App.css'
import AddProducts from './ADMIN/Pages/AddProducts/AddProducts';

function App() {

  //Seeing the role of who is logged in
  const role = useSelector((state) => state.reducerLogin.role);

  return (
    <div className={role !== "Admin" ? 'App' : ''}>
      <NotificationContainer />
      <BrowserRouter>
        {role !== "Admin" ?
          <AppNavBar />
          :
          <Topbar />
        }
        <div className={role === "Admin" ? 'admin-container' : ''}>
          {role === "Admin" &&
            <Sidebar />
          }
          <div className={role === "Admin" ? 'page-flex' : ''}>
            <Routes>
              {/* Client Routes */}
              <Route path='/' element={< Home />} />
              <Route exact path='Login' element={< Login />} />
              <Route exact path='Support' element={<Support />} />
              <Route exact path='Register' element={<Register />} />
              <Route exact path='MaintainCart' element={<MaintainCart />} />
              <Route exact path='MaintainProfile/:id' element={<MaintainProfile />} />
              <Route exact path='MaintainWishlist/:id' element={<MaintainWishlist />} />
              <Route exact path='Products' element={<Products />} />
              <Route path='Products/:id' element={<ProductDetails />} />
              {/* Admin Routes */}
              <Route exact path='admin' element={<AdminHome />} />
              <Route exact path='orders' element={<Orders />} />
              <Route exact path='manageproducts' element={<ManageProducts />} />
              <Route exact path='users' element={<ManageUsers />} />
              <Route exact path='addproducts' element={<AddProducts />} />
            </Routes>
          </div>
        </div>

      </BrowserRouter>
    </div>
  )
}
export default App;
