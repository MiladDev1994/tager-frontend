
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import Login from './Auth/Login';
import Home from './Home/Home';


function App() {
  return (
    <div className="container">
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
