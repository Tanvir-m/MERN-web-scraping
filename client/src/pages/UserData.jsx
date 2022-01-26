import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import axios from 'axios';
import { Context } from '../context/Context';
import { useNavigate } from 'react-router-dom';

const UserData = () => {
  const context = useContext(Context);
  const navigation = useNavigate();
  const [userData, setUserData] = useState([]);

  const filterData = userData.filter(
    (ele) => ele.userName === context.getLocalStorage.userName
  );

  useEffect(async () => {
    try {
      const res = await axios.get('/api/');
      setUserData(res.data);
      console.log(res.data);
    } catch (err) {
      console.log('error in getting seats', err);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div class="grid gap-0 grid-cols-1 ">
        {filterData.map((ele, ind) => (
          <>
            <div className="bg-blue-100 my-5 mx-5">
              <div class="flex font-serif p-5">
                <div class="flex-none w-52 relative">
                  <img
                    src={ele.amImg}
                    alt=""
                    class="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                </div>
                <form class="flex-auto p-6">
                  <div class="flex flex-wrap items-baseline">
                    <h3>Product</h3>
                    <h1 class="w-full flex-none mb-3 leading-none text-slate-900">
                      {ele.title}
                    </h1>
                    <div class="flex-auto text-lg font-medium text-slate-500">
                      RS {ele.price}/-
                    </div>
                  </div>
                  <h4 className="mt-5">META TAGS</h4>
                  {ele.meta.map((ele) => (
                    <>
                      <p class="text-sm text-slate-500">{ele}</p>
                      <hr />
                      <br />
                    </>
                  ))}
                </form>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default UserData;
