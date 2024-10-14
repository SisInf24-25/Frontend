import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Index from './Pages/Index';
import Auth from './Pages/Auth';
import House from './Pages/Houses/House';
import Admin from './Pages/Admin/Admin';
import AdminReports from './Pages/Admin/AdminReports';
import AdminHouses from './Pages/Admin/AdminHouses';
import AdminUsers from './Pages/Admin/AdminUsers';
import Book from './Pages/Books/Book'
import BookList from './Pages/Books/BookList';
import HostProfile from './Pages/ContactProfile';
import HostBookList from './Pages/Books/BookListWith';
import ContactProfile from './Pages/ContactProfile';
import BookListWith from './Pages/Books/BookListWith';
import NotifList from './Pages/Notifs/NotifList';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Index />}></Route>
        <Route path="/auth" element={<Auth />}></Route>        
        <Route path="/contact" element={<ContactProfile />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/report" element={<Report />}></Route>

        <Route path="/panel" element={<Admin />}></Route>
        <Route path="/panel/reports" element={<AdminReports />}></Route>
        <Route path="/panel/houses" element={<AdminHouses />}></Route>
        <Route path="/panel/users" element={<AdminUsers />}></Route>

        <Route path="/host" element={<Host />}></Route>
        <Route path="/host/calendar" element={<Calendar />}></Route>

        <Route path="/book" element={<Book />}></Route>
        <Route path="/book/list" element={<BookList />}></Route>
        <Route path="/book/edit" element={<BookEdit />}></Route>
        <Route path="/book/with" element={<BookListWith />}></Route>

        <Route path="/house" element={<House />}></Route>
        <Route path="/house/list" element={<HouseList />}></Route>
        <Route path="/house/edit" element={<HouseEdit />}></Route>
        <Route path="/house/add" element={<HouseAdd />}></Route>

        <Route path="/notifs" element={<NotifList />}></Route>
        <Route path="/notifs/notif" element={<Notif />}></Route>

      </Routes>
    </Router>
  );
}

export default App;