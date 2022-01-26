import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [state, setState] = useState({
    userName: '',
    email: '',
    password: '',
  });

  let navigate = useNavigate();
  const signUpClickHandler = async () => {
    if (state.userName && state.email && state.password) {
      if (state.email.includes('@') && state.email.includes('.')) {
        alert('Account created');
        setState({ ...state, userName: '', email: '', password: '' });
        navigate('/login');
      } else {
        alert('Please enter valid email id');
      }
    } else {
      alert('Please fill the all details');
    }
    try {
      await axios.post('/api/auth/register', state);
    } catch (err) {
      console.log('error in sign up');
    }
  };
  return (
    <>
      <section className="flex flex-col md:flex-row h-screen items-center">
        <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
          <img
            src="https://source.unsplash.com/random"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div
          className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
      flex items-center justify-center"
        >
          <div className="w-full h-100">
            <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
              Create new account
            </h1>

            <form className="mt-6" action="#" method="POST">
              <div>
                <label className="block text-gray-700">User Name</label>
                <input
                  type="text"
                  onChange={(e) =>
                    setState({ ...state, userName: e.target.value })
                  }
                  name=""
                  id=""
                  placeholder="Enter Your Name"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autoFocus
                  autoComplete
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  onChange={(e) =>
                    setState({ ...state, email: e.target.value })
                  }
                  name=""
                  id=""
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autoFocus
                  autoComplete
                  required
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  onChange={(e) =>
                    setState({ ...state, password: e.target.value })
                  }
                  name=""
                  id=""
                  placeholder="Enter Password"
                  minLength="6"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
              focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                onClick={signUpClickHandler}
                className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
            px-4 py-3 mt-6"
              >
                Sign Up
              </button>
            </form>

            <hr className="my-6 border-gray-300 w-full" />

            <p className="mt-8">
              Already have an account?{' '}
              <Link to="/login">
                <a className="text-blue-500 hover:text-blue-700 font-semibold">
                  Log In
                </a>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
