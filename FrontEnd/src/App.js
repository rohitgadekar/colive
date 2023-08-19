import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import About from './About';
import PropPage from './PropPage';
import MyAccount from './MyAccount';
import Bookings from './Bookings';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignUp />}></Route>
          <Route path='/my-account' element={<MyAccount />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/property' element={<PropPage />}></Route>
          <Route path='/my-bookings' element={<Bookings />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
