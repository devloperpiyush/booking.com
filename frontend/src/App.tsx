import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Layout from './layouts/Layout';
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<p>Home Page</p>} />
          <Route path='/search' element={<p>Search Page</p>} />
          <Route path='/register' element={<Register />} />
          <Route path='/sign-in' element={<SignIn />} />
          {isLoggedIn && (<>
            <Route
              path="/add-hotel"
              element={<AddHotel />} />
            <Route
              path="/edit-hotel/:hotelId"
              element={<EditHotel />}
            />
            <Route
              path="/my-hotels"
              element={<MyHotels />}
            /></>)}
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
