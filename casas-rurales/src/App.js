import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Index from './Pages/Index';
import Auth from './Pages/Auth';
import House from './Pages/House';
import Admin from './Pages/Admin/Admin';
import AdminReports from './Pages/Admin/AdminReports';
import AdminHouses from './Pages/Admin/AdminHouses';
import AdminUsers from './Pages/Admin/AdminUsers';
import Book from './Pages/Guest/Book'


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Index />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/house" element={<House />}></Route>
        <Route path="/panel/" element={<Admin />}></Route>
        <Route path="/panel/reports" element={<AdminReports />}></Route>
        <Route path="/panel/houses" element={<AdminHouses />}></Route>
        <Route path="/panel/users" element={<AdminUsers />}></Route>
        <Route path="/book" element={<Book />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/auth" element={<Auth />}></Route>

      </Routes>
    </Router>
  );
}

export default App;