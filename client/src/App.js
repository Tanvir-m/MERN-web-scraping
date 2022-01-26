import Login from './pages/Login';
import SignUp from './pages/SignUp';
import UserData from './pages/UserData';
import UserPost from './pages/UserPost';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { useState } from 'react';
import { useEffect } from 'react';
import { Context } from './context/Context';
import { useContext } from 'react';

function App() {
  const context = useContext(Context);
  const [localStorage, setLocalStorage] = useState([]);
  return (
    <>
      <Router>
        <Routes>
          {/* {localStorage.userName && (
            
          )} */}
          <Route
            exact
            path="/"
            element={
              !context.getLocalStorage?.userName ? <Login /> : <UserPost />
            }
          />
          <Route exact path={`/`} element={<UserPost />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<SignUp />} />
          <Route exact path="/user-posts" element={<UserData />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
