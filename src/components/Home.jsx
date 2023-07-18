import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';

const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ name: "", username:"", email: "", bio: "" });
  useEffect(() => {
    const user = async () => {
      try {
        const res = await axios.get(`https://typingtest.onrender.com/v1/user/profile`, {
          withCredentials: true,
        });
        setUserInfo({
          name:res.data.data.name,
          username: res.data.data.username,
          email: res.data.data.email,
          bio: res.data.data.bio,
        });
      } catch (error) {
        navigate("/signin");
      }
    };
    user();
  }, [navigate]);

  const handleLogOut = async () => {
    try {
      await axios.get(`https://typingtest.onrender.com/v1/user/logout`);
      toast("Logout Successfully")
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        onClick={handleLogOut}
        className="fixed top-10 right-10 bg-[#4CB5F9] hover:bg-[#319ae0] active:bg-[#4CB5F9] text-white h-10 w-28 font-semibold rounded-lg"
      >
        Logout
      </button>
      <div className="flex justify-center items-center h-screen">
        <div className="shadow-gray-400 shadow-2xl w-[420px] px-8 gap-5 flex flex-col">
          <div className="flex "><p className="text-2xl font-bold mt-2 text-black">
            @{userInfo.username}
          </p></div>
          <div className="flex gap-10">
          <img className="rounded-full w-20 h-20" src="https://graph.org/file/b66211e60ca697e22b76e.jpg" alt="" />
          <div className="flex flex-col justify-center items-center">
            <p>12</p>
            <p>Posts</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p>10k</p>
            <p>Followers</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p>17</p>
            <p>Following</p>
          </div>
          </div>
          <p className="text-lg mt-2 text-gray-800">{userInfo.name}</p>
          <p className="mt-2 text-gray-500">
          {userInfo.bio}
          </p>
          <hr />
          <hr />
          <hr />
        </div>
      </div>
    </>
  );
};

export default Home;
