import { createContext } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

export const Context = createContext();

const ContextCom = (props) => {
  const [userDetails, setUserDetails] = useState([]);
  const [getLocalStorage, setGetLocalStorage] = useState([]);

  // user login details
  const loginClickHandler = async (state, setDetails) => {
    try {
      const res = await axios.post('/api/auth/login', state);
      setDetails(res.data);
      //   console.log(res.data);
      if (res.data) {
        setUserDetails(res.data);
        localStorage.setItem('userDetails', JSON.stringify(res.data));
      } else {
        console.log('');
      }
    } catch (err) {
      alert('Check username password');
      console.log('error in log in');
    }
  };

  const logoutClickHandler = () => {
    setUserDetails([]);
  };

  useEffect(() => {
    setGetLocalStorage(JSON.parse(localStorage.getItem('userDetails')));
  }, [getLocalStorage]);

  const store = {
    userDetails,
    loginClickHandler,
    logoutClickHandler,
    getLocalStorage,
    setGetLocalStorage,
  };
  return <Context.Provider value={store}>{props.children}</Context.Provider>;
};

export default ContextCom;
