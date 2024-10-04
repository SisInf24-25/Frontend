import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import Index from './Components/Index/Index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/index" element={<Index />}></Route>
      </Routes>
    </Router>
  );
}

export default App;