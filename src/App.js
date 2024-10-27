
import './App.css';
import Home from './Pages/Home';
import AddNewCourt from './Pages/AddNewCourt';
import CourtUserViewPage from './Pages/CourtUserViewPage';
import Admin from './Pages/Admin';
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword';

import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter,Routes,Route } from 'react-router-dom';




function App() {
  return (
    <>
    
    <BrowserRouter>
    <Routes>
      <Route path ='/' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/addNewCourt' element={<AddNewCourt/>}/>
      <Route path='/courtUserViewPage/:id' element={<CourtUserViewPage/>} />
     <Route path='/admin' element={<Admin/>}/>
     <Route path='/forgot-password' element={<ForgotPassword/>}/>

      </Routes>
      </BrowserRouter>
   </>
  
  );
}

export default App;
