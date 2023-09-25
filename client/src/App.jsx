import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageLayout from './PageLayout';
import Home from './components/Home/Home';
import Movies from './pages/Movies/Movies';
import SingleMovie from './pages/SingleMovie/SingleMovie';
import Contact from './layout/Contact/Contact';
import Login from './components/Login/Login';
import SignUp from './components/Login/SignUp';
import MyAccount from './pages/MyAccount/MyAccount';
import PrivateRoute from './utils/PrivateRoute';
import WatchList from './pages/Watchlist/WatchList';
import AdminLayout from './AdminLayout';
import AddMovie from './components/AdminDashboard/AddMovie/AddMovie';
import AllMovies from './components/AdminDashboard/AllMovies/AllMovies';
import DashboardPanel from './components/AdminDashboard/DashboardPanel';
import ScrollToTop from './utils/ScrollToTop';
import AdminRoute from './utils/AdminRoute';

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:id" element={<SingleMovie />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='' element={<PrivateRoute />}>
            <Route path="/account" element={<MyAccount />} />
            <Route path="/watchlist" element={<WatchList />} />
          </Route>
        </Route>

        <Route element={<AdminLayout />}>
          <Route path='' element={<AdminRoute />}>
            <Route path="/admin/admin-dashboard" element={<DashboardPanel />} />
            <Route path="/admin/add-movie" element={<AddMovie />} />
            <Route path="/admin/all-movies" element={<AllMovies />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
