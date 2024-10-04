import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Auth from './Components/Auth/Auth';
import Index from './Components/Index/Index';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Index />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
      </Routes>
    </Router>
  );
}

export default App;