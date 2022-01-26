import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import { useNavigate } from 'react-router-dom';
import { AiOutlineUserAdd } from 'react-icons/ai';

const Navbar = () => {
  const context = useContext(Context);
  const [localStorageData, setLocalStorage] = useState([]);
  let navigate = useNavigate();

  const logoutHandler = () => {
    context.logoutClickHandler();
    localStorage.setItem('userDetails', JSON.stringify([]));
    navigate('/login');
  };

  return (
    <>
      <section class="bg-white dark:bg-gray-800">
        <nav class="container p-6 mx-auto lg:flex lg:justify-between lg:items-center">
          <div class="flex items-center justify-between">
            <div>
              <p
                class="text-2xl text-center font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
                href="#"
              >
                <center>
                  <AiOutlineUserAdd />
                  {context.getLocalStorage?.userName}
                </center>
              </p>
            </div>

            <div class="flex lg:hidden">
              <button
                type="button"
                class="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                aria-label="toggle menu"
              >
                <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                  <path
                    fill-rule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <div class="flex flex-col mt-4 space-y-2 lg:-mx-6 lg:mt-0 lg:flex-row lg:space-y-0">
            <Link to={`/`}>
              <a class="text-gray-700 dark:text-gray-200 lg:px-6 dark:hover:text-blue-400 hover:text-blue-500">
                Post
              </a>
            </Link>
            <Link to="/user-posts">
              <a class="text-gray-700 dark:text-gray-200 lg:px-6 dark:hover:text-blue-400 hover:text-blue-500">
                All Post
              </a>
            </Link>
          </div>

          <button
            class="block h-10 px-5 py-2 mt-4 text-sm text-center text-gray-700 capitalize transition-colors duration-200 transform border rounded-md dark:hover:bg-gray-700 dark:text-white lg:mt-0 hover:bg-gray-100 lg:w-auto"
            href="#"
            onClick={logoutHandler}
          >
            Log Out
          </button>
        </nav>
      </section>
    </>
  );
};

export default Navbar;
