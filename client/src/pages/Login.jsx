import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';

const Login = () => {
  const context = useContext(Context);
  const [userDetails, setUserDetails] = useState([]);
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  let navigation = useNavigate();
  const loginClickHand = () => {
    if (state.email === '' || state.password === '') {
      alert('please fill all the feild');
    } else {
      context.loginClickHandler(state, setUserDetails);
      navigation(`/`);
    }
    console.log('useDetails', userDetails);
  };

  useEffect(() => {
    if (context.userDetails?.userName) {
      navigation(`/`);
    } else {
      navigation(`/login`);
    }
    console.log('get local', context.userDetails);
  }, [context.userDetails]);

  return (
    <>
      <section class="flex flex-col md:flex-row h-screen items-center">
        <div class="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
          <img
            src="https://source.unsplash.com/random"
            alt=""
            class="w-full h-full object-cover"
          />
        </div>

        <div
          class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
      flex items-center justify-center"
        >
          <div class="w-full h-100">
            <h1 class="text-xl md:text-2xl font-bold leading-tight mt-12">
              Log in to your account
            </h1>

            <div>
              <label class="block text-gray-700">Email Address</label>
              <input
                onChange={(e) => setState({ ...state, email: e.target.value })}
                type="email"
                name=""
                id=""
                placeholder="Enter Email Address"
                class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                autoComplete
                required
              />
            </div>

            <div class="mt-4">
              <label class="block text-gray-700">Password</label>
              <input
                onChange={(e) =>
                  setState({ ...state, password: e.target.value })
                }
                type="password"
                name=""
                id=""
                placeholder="Enter Password"
                minLength="6"
                class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
              focus:bg-white focus:outline-none"
                required
              />
            </div>

            {/* <div class="text-right mt-2">
                <a
                  href="#"
                  class="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                >
                  Forgot Password?
                </a>
              </div> */}

            <button
              onClick={loginClickHand}
              class="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
            px-4 py-3 mt-6"
            >
              Log In
            </button>

            <hr class="my-6 border-gray-300 w-full" />

            <p class="mt-8">
              Need an account?{' '}
              <Link to="/register">
                <a class="text-blue-500 hover:text-blue-700 font-semibold">
                  Create an account
                </a>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
