
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import {Container} from 'react-bootstrap'
import Homescreen from './Screens/HomeScreen'
import CartScreen from './Screens/CartScreen';

import {BrowserRouter as Router , Route, Routes} from 'react-router-dom'
import ProductScreen from './Screens/ProductScreen';
import LoginScreen from './Screens/LoginScreen';
import RegistrationScreen from './Screens/registerScreen';
import ProfileScreen from './Screens/ProfileScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import UserListScreen from './Screens/UserListScreen';
import ProductListScreen from './Screens/ProductListScreen';
import ProductEditScreen from './Screens/ProductEditScreen';
import OrderListScreen from './Screens/OrderListScreen';





function App() {
  return (
    <Router>

    <Header></Header>
    
    <main className='py-3' >
   <Container>
    <Routes>
    <Route path='/register'  element={<RegistrationScreen/>} />
    <Route path='/placeorder'  element={<PlaceOrderScreen/>} />
    <Route path='/payment'  element={<PaymentScreen/>} />
    <Route path='/shipping'  element={<ShippingScreen/>} />
    <Route path='/order/:id'  element={<OrderScreen/>} />
    <Route path='/profile'  element={<ProfileScreen/>} />
    <Route path='/login'  element={<LoginScreen/>} />
    <Route path='/search/:keyword'  element={<Homescreen/>} />
    <Route path='/page/:pageNumber'  element={<Homescreen/>} />
    <Route path='/search/:keyword/page/:pageNumber'  element={<Homescreen/>} />
    <Route path='/'  element={<Homescreen/>} />
    <Route path='/product/:id' element={<ProductScreen/>}/>
    <Route path='/admin/userlist' element={<UserListScreen/>}/>
    <Route path='/admin/productlist' element={<ProductListScreen/>}/>
    <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen/>}/>
    <Route path='/admin/orderlist' element={<OrderListScreen/>}/>
    <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>}/>

    <Route path='/cart'>
         <Route path=':id' element={<CartScreen />} />
         <Route path='' element={<CartScreen />} />
    </Route>
    </Routes>
    </Container>
    </main>
    
    <Footer></Footer>

    </Router>
  );
}

export default App;
