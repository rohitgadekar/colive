import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import PropPage from './PropPage';
import MyAccount from './MyAccount';
import Bookings from './Bookings';
import Faq from './Faq';
import Document from './Document';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignUp />}></Route>
          <Route path='/my-account' element={<MyAccount />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/property' element={<PropPage />}></Route>
          <Route path='/my-bookings' element={<Bookings />}></Route>
          <Route path='/faq' element={<Faq />}></Route>
          <Route path='/document' element={<Document />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
