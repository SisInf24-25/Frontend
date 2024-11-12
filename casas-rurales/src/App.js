import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Index from './Pages/Index';
import Auth from './Pages/Auth';
import House from './Pages/Houses/House';
import HouseAdd from './Pages/Houses/HouseAdd';
import HouseEdit from './Pages/Houses/HouseEdit';
import HouseList from './Pages/Houses/HouseList';
import HouseCalendar from './Pages/Houses/HouseCalendar';
import Admin from './Pages/Admin/Admin';
import AdminReports from './Pages/Admin/AdminReports';
import AdminHouses from './Pages/Admin/AdminHouses';
import AdminUsers from './Pages/Admin/AdminUsers';
import AdminUser from './Pages/Admin/AdminUser';
import Book from './Pages/Books/Book';
import BookList from './Pages/Books/BookList';
import BookEdit from './Pages/Books/BookEdit';
import ContactProfile from './Pages/ContactProfile';
import BookListWith from './Pages/Books/BookListWith';
import NotifList from './Pages/Notifs/NotifList';
import Notif from './Pages/Notifs/Notif';
import Host from './Pages/Host/Host';
import Profile from './Pages/Profile';
import Report from './Pages/Report';
import { SessionProvider } from './Context/SessionContext';

function App() {
  return (
    <SessionProvider>  {/* Envolvemos toda la app con el SessionProvider */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Index />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/contact" element={<ContactProfile />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/report" element={<Report />}></Route>
          <Route path="/panel" element={<Admin />}></Route>
          <Route path="/panel/users" element={<AdminUsers />}></Route>
          <Route path="/panel/user" element={<AdminUser />}></Route>
          <Route path="/panel/houses" element={<AdminHouses />}></Route>
          <Route path="/panel/reports" element={<AdminReports />}></Route>
          <Route path="/host" element={<Host />}></Route>
          <Route path="/books" element={<BookList />}></Route>
          <Route path="/books/element" element={<Book />}></Route>
          <Route path="/books/element/edit" element={<BookEdit />}></Route>
          <Route path="/books/with" element={<BookListWith />}></Route>
          <Route path="/houses" element={<HouseList />}></Route>
          <Route path="/houses/add" element={<HouseAdd />}></Route>
          <Route path="/houses/element" element={<House />}></Route>
          <Route path="/houses/element/edit" element={<HouseEdit />}></Route>
          <Route path="/houses/element/calendar" element={<HouseCalendar />}></Route>
          <Route path="/notifs" element={<NotifList />}></Route>
          <Route path="/notifs/element" element={<Notif />}></Route>
        </Routes>
      </Router>
    </SessionProvider>
  );
}

export default App;