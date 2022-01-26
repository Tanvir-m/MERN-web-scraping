import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import { Context } from '../context/Context';
import { useNavigate } from 'react-router-dom';

const UserPost = () => {
  const navigation = useNavigate();
  const context = useContext(Context);
  const [data, setData] = useState('');
  const [webDetails, setWebDetails] = useState([]);

  const submitClickHandler = async () => {
    try {
      const res = await axios.post(`http://localhost:8000/api/fetch-data/`, {
        data,
      });
      console.log('res', res.data);
      setWebDetails(res.data);
    } catch (err) {
      console.log('Error in url');
    }
  };

  const postData = {
    title: webDetails[0]?.title,
    meta: webDetails[0]?.meta,
    amImg: webDetails[0]?.amImg,
    fbImg: webDetails[0]?.fbImg,
    price: webDetails[0]?.price,
    userName: context.getLocalStorage.userName,
  };

  const postClickHandler = async () => {
    try {
      await axios.post('http://localhost:8000/api/add/', {
        title: webDetails[0].title,
        meta: webDetails[0]?.meta,
        fbImg: webDetails[0]?.fbImg,
        amImg: webDetails[0]?.amImg,
        price: webDetails[0]?.price,
        userName: context.getLocalStorage.userName,
      });
      alert('Your product is added');
      navigation('/user-posts');
    } catch (err) {
      console.log('error in post');
    }

    console.log('postData', postData);
  };
  useEffect(() => {
    console.log('web details is updated', webDetails[0]?.title);
  }, [webDetails]);

  useEffect(() => {
    console.log('its called', context.getLocalStorage);
  }, [context.getLocalStorage]);

  return (
    <>
      {/* <input type="text" onChange={(e) => setData(e.target.value)} />
      <button
        onClick={submitClickHandler}
        classNameName="bg-indigo-600 text-white rounded-full h-6 px-3 justify-center items-center"
      >
        Send data
      </button> */}

      {/* {noData}
      {webData} */}

      <Navbar />

      <div className="flex items-center justify-center ">
        <div class="w-full mt-8 bg-transparent border rounded-md lg:max-w-sm dark:border-gray-700 focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 dark:focus-within:border-blue-400 focus-within:ring-opacity-40">
          <form class="flex flex-col lg:flex-row">
            <input
              onChange={(e) => setData(e.target.value)}
              type="email"
              placeholder="Enter your URL"
              class="flex-1 h-10 px-4 py-2 m-1 text-gray-700 placeholder-gray-400 bg-transparent border-none appearance-none dark:text-gray-200 focus:outline-none focus:placeholder-transparent focus:ring-0"
            />

            <button
              type="button"
              onClick={submitClickHandler}
              class="h-10 px-4 py-2 m-1 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {webDetails.map((ele, index) => (
        <>
          {/*  */}
          <div class="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center mt-72">
            <div class="w-full lg:w-1/2">
              <div class="lg:max-w-lg">
                <h3 class="text-3xl font-bold tracking-wide text-gray-800 dark:text-white">
                  {ele.title}
                </h3>

                {ele.price && (
                  <h3 class="h-10 px-4 py-2 m-1 text-blue-500">
                    RS {ele.price}/-
                  </h3>
                )}

                <div class="mt-8 space-y-5">
                  <h4>
                    <bold>META TAGS</bold>
                  </h4>
                  {ele.meta.map((ele) => (
                    <p class="flex items-center -mx-2 text-gray-700 dark:text-gray-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6 mx-2 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                      <span class="mx-2">{ele}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div class="flex items-center justify-center w-full h-96 lg:w-1/2">
              <img
                class="object-cover w-full h-auto mx-auto rounded-md lg:max-w-2xl"
                src={ele.amImg}
                alt={ele.amImg}
              />
            </div>
          </div>

          <div class="fixed inset-x-0 lg:inset-x-auto bottom-6 lg:right-8 xl:right-10 xl:bottom-8">
            <div class="lg:w-72 px-6 lg:px-0">
              <div
                style={{ cursor: 'pointer' }}
                class="p-2 bg-blue-600 rounded-lg shadow-lg sm:p-3"
                onClick={postClickHandler}
              >
                <div class="flex flex-wrap items-center justify-between">
                  <h2 class="ml-3 tracking-wide text-white truncate">POST</h2>
                </div>
              </div>
            </div>
          </div>
        </>
      ))}

      {/* {noData}
      {webData} */}
    </>
  );
};

export default UserPost;
