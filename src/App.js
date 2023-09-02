import 'bootstrap/dist/css/bootstrap.min.css'
// import './styles.scss'
import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  return (
    <BrowserRouter >
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
